import { BarChart } from "@mui/x-charts/BarChart";
import "../../userTracking/consumedCalorie-chart/consumedCaloires.css";

export default function GuestBarChart() {
  const labels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const values = [1450, 1620, 1380, 1710, 1550, 1800, 1490];

  return (
    <div className="consumed-card">
      <div className="consumed-controls">
        <button className="consumed-nav-btn" type="button" disabled>
          Prev
        </button>

        <div className="consumed-week-range">Guest Demo</div>

        <button className="consumed-nav-btn" type="button" disabled>
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
              categoryGapRatio: 0.35,
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
