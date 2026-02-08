import { useEffect, useMemo, useState } from "react";
import { BarChart } from "@mui/x-charts/BarChart";
import { getCaloriesSummary } from "../../../api/api";
import "./consumedCaloires.css";
const isoDay = (d = new Date()) => {
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const normalizeIsoDay = (value) => {
  if (!value) return "";
  if (typeof value === "string") return value.slice(0, 10);
  if (value instanceof Date) return isoDay(value);
  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime()) ? "" : isoDay(parsed);
};

function startOfWeekMonday(date) {
  const d = new Date(date);
  const day = d.getDay();
  const diff = day === 0 ? -6 : 1 - day; // adjust when day is Sunday
  d.setDate(d.getDate() + diff);
  d.setHours(0, 0, 0, 0);
  return d;
}

function addDays(date, n) {
  const d = new Date(date);
  d.setDate(d.getDate() + n);
  return d;
}

function isoToWeekdayShort(iso) {
  // iso: "YYYY-MM-DD"
  const d = new Date(iso + "T00:00:00");
  const day = d.getDay(); // Sun=0..Sat=6
  const map = {
    1: "Mon",
    2: "Tue",
    3: "Wed",
    4: "Thu",
    5: "Fri",
    6: "Sat",
    0: "Sun",
  };
  return map[day];
}

export default function ConsumedCalorie() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");
  const [weekOffset, setWeekOffset] = useState(0);

  useEffect(() => {
    const run = async () => {
      try {
        setLoading(true);
        setErr("");
        const data = await getCaloriesSummary();
        const list = data.history ?? data.user?.totalConsumedCalories ?? [];
        setHistory(list);
      } catch (e) {
        setErr(e.message || "Failed to load summary");
      } finally {
        setLoading(false);
      }
    };
    run();
  }, []);

  const { labels, values, weekStartIso, weekEndIso } = useMemo(() => {
    const today = new Date();
    const baseWeekStart = startOfWeekMonday(today);
    const weekStart = addDays(baseWeekStart, weekOffset * 7);

    // Build labels Mon..Sun
    const labels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

    // Start values at 0 for each day
    const values = Array(7).fill(0);

    // Normalize weekStart to midnight (local)
    const weekStartMidnight = new Date(weekStart);
    weekStartMidnight.setHours(0, 0, 0, 0);

    (history || []).forEach((h) => {
      const dateStr = normalizeIsoDay(h.date); // "YYYY-MM-DD"
      if (!dateStr) return;

      // Convert to a real date at local midnight
      const d = new Date(dateStr + "T00:00:00");
      d.setHours(0, 0, 0, 0);

      const diffDays = Math.floor((d - weekStartMidnight) / 86400000);
      if (diffDays >= 0 && diffDays < 7) {
        values[diffDays] += Number(h.consumedTotal || 0);
      }
    });

    const weekStartIso = isoDay(weekStartMidnight);
    const weekEndIso = isoDay(addDays(weekStartMidnight, 6));

    return { labels, values, weekStartIso, weekEndIso };
  }, [history, weekOffset]);
  if (err) return <div style={{ color: "crimson" }}>{err}</div>;

  return (
    <div className="consumed-card">
      <div className="consumed-controls">
        <button
          className="consumed-nav-btn"
          onClick={() => setWeekOffset((w) => w - 1)}
        >
          Prev
        </button>

        <div className="consumed-week-range">
          {weekStartIso} → {weekEndIso}
        </div>

        <button
          className="consumed-nav-btn"
          onClick={() => setWeekOffset((w) => w + 1)}
          disabled={weekOffset >= 0} // block future weeks (recommended)
        >
          Next
        </button>
      </div>

      <div className="consumed-chart-wrap">
        <div className="consumed-title">Consumed (kcal)</div>

        <BarChart
          sx={{ fontFamily: "Outfit" }}
          height={160}
          xAxis={[
            {
              data: labels,
              scaleType: "band",
              categoryGapRatio: 0.35, // smaller = thicker bars
              barGapRatio: 0.15,
            },
          ]}
          series={[
            {
              data: values,
              borderRadius: 8,
              label: "Consumed (kcal)",
            },
          ]}
          slotProps={{ legend: { hidden: true } }}
          grid={{ horizontal: false, vertical: false }}
          yAxis={[
            {
              disableLine: true,
              disableTicks: true,
            },
          ]}
          margin={{ left: 30, right: 10, top: 10, bottom: 30 }}
        />
      </div>
    </div>
  );
}
