function DashboardCard({ title, value, color }) {

    return (

        <div className={`${color} rounded-2xl p-6 shadow-lg hover:scale-105 transition`}>

            <p className="text-lg opacity-80">
                {title}
            </p>

            <h1 className="text-5xl font-bold mt-4">
                {value}
            </h1>

        </div>

    );

}

export default DashboardCard;