import { useEffect, useMemo, useState } from "react";
import { BarChart } from "@mui/x-charts/BarChart";
import { getCaloriesSummary } from "../../../api/api";

const WEEKDAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

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

export default function ConsumedCalorie({ user }) {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  useEffect(() => {
    (async () => {
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
    })();
  }, [user]);

  const { xLabels, seriesData } = useMemo(() => {
    // start with Mon–Fri = 0
    const buckets = Object.fromEntries(WEEKDAYS.map((d) => [d, 0]));

    // Fill buckets from history (latest value for that weekday wins)
    for (const entry of history) {
      const day = isoToWeekdayShort(entry.date);
      if (buckets[day] !== undefined) {
        buckets[day] = Number(entry.consumedTotal || 0);
      }
    }

    return {
      xLabels: WEEKDAYS,
      seriesData: WEEKDAYS.map((d) => buckets[d]),
    };
  }, [history]);

  if (err) return <div style={{ color: "crimson" }}>{err}</div>;

  return (
    <div style={{ width: "100%", maxWidth: 700 }}>
      <BarChart
        xAxis={[{ scaleType: "band", data: xLabels }]}
        series={[{ data: seriesData, label: "Consumed (kcal)" }]}
        height={320}
      />
    </div>
  );
}
