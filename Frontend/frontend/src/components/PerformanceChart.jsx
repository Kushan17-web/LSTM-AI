import {
    ResponsiveContainer,
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip
} from "recharts";

const data = [
    { month: "Jan", score: 62 },
    { month: "Feb", score: 70 },
    { month: "Mar", score: 75 },
    { month: "Apr", score: 82 },
    { month: "May", score: 89 },
    { month: "Jun", score: 94 }
];

function PerformanceChart() {

    return (

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 h-[380px]">

            <h2 className="text-xl font-semibold mb-6">

                Performance Overview

            </h2>

            <ResponsiveContainer width="100%" height="90%">

                <LineChart data={data}>

                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" />

                    <XAxis dataKey="month" stroke="#94a3b8" />

                    <YAxis stroke="#94a3b8" />

                    <Tooltip />

                    <Line
                        type="monotone"
                        dataKey="score"
                        stroke="#06b6d4"
                        strokeWidth={3}
                    />


                </LineChart>

            </ResponsiveContainer>

        </div>

    );

}

export default PerformanceChart;