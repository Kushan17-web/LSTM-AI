import { TrendingUp } from "lucide-react";

function StatCard({
    title,
    value,
    subtitle,
    color
}) {

    return (

        <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6 hover:border-cyan-500 transition">

            <div className="flex justify-between items-start">

                <div>

                    <p className="text-gray-400 text-sm">
                        {title}
                    </p>

                    <h2 className="text-4xl font-bold mt-3">
                        {value}
                    </h2>

                    <p className="text-sm text-gray-500 mt-3">
                        {subtitle}
                    </p>

                </div>

                <div className={`${color} p-3 rounded-xl`}>

                    <TrendingUp size={22} />

                </div>

            </div>

        </div>

    );

}

export default StatCard;