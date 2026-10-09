import React from "react";
import {
    ResponsiveContainer,
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
} from "recharts";

const PerformanceChart = ({ data = [] }) => {
    const chartData =
        data.length > 0
            ? data
            : [
                  { day: "Mon", score: 0 },
                  { day: "Tue", score: 0 },
                  { day: "Wed", score: 0 },
                  { day: "Thu", score: 0 },
                  { day: "Fri", score: 0 },
                  { day: "Sat", score: 0 },
                  { day: "Sun", score: 0 },
              ];

    return (
        <div className="card shadow-lg border-0 h-100">
            <div className="card-body">
                <h4 className="mb-4">
                    📈 Weekly Performance
                </h4>

                <ResponsiveContainer
                    width="100%"
                    height={320}
                >
                    <LineChart data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" />

                        <XAxis dataKey="day" />

                        <YAxis domain={[0, 100]} />

                        <Tooltip />

                        <Line
                            type="monotone"
                            dataKey="score"
                            strokeWidth={3}
                            dot={{ r: 5 }}
                            activeDot={{ r: 8 }}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default PerformanceChart;