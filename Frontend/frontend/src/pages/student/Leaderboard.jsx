// Production Leaderboard.jsx Template
// Replace your existing file with this starter and continue extending.

import { useEffect, useMemo, useState } from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import { Trophy, Crown, Medal, Flame, Star, Search } from "lucide-react";
import { getLeaderboard } from "../../services/leaderboardService";

export default function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    (async () => {
      try {
        const data = await getLeaderboard(filter);
        setLeaderboard(data.leaderboard || []);
      } finally {
        setLoading(false);
      }
    })();
  }, [filter]);

  const filtered = useMemo(() => {
    return leaderboard.filter(x =>
      (x.student?.name || "").toLowerCase().includes(query.toLowerCase())
    );
  }, [leaderboard, query]);

  const topThree = filtered.slice(0,3);
  const others = filtered.slice(3);

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="text-center">
          <Trophy className="mx-auto text-yellow-400" size={56}/>
          <h1 className="text-5xl font-bold mt-4">AI Leaderboard</h1>
          <p className="text-gray-400 mt-2">Top performers ranked by XP</p>
        </div>

        <div className="flex flex-col md:flex-row gap-4 justify-between">
          <div className="relative">
            <Search className="absolute left-3 top-3" size={18}/>
            <input
              value={query}
              onChange={e=>setQuery(e.target.value)}
              placeholder="Search student..."
              className="pl-10 pr-4 py-2 rounded-xl bg-slate-800 w-72"
            />
          </div>

          <div className="flex gap-2">
            {["all","weekly","monthly"].map(f=>(
              <button
                key={f}
                onClick={()=>setFilter(f)}
                className={`px-4 py-2 rounded-xl ${filter===f?"bg-cyan-600":"bg-slate-800"}`}>
                {f}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="text-center py-20">Loading leaderboard...</div>
        ) : (
          <>
            <div className="grid md:grid-cols-3 gap-6">
              {topThree.map((s,i)=>(
                <div key={s._id} className="bg-slate-900 rounded-3xl p-8 text-center">
                  {i===0?<Crown className="mx-auto text-yellow-400" size={56}/>:<Medal className="mx-auto" size={56}/>}
                  <h2 className="text-2xl font-bold mt-4">{s.student?.name}</h2>
                  <p>Level {s.level}</p>
                  <div className="text-4xl font-bold mt-4">{s.xp} XP</div>
                </div>
              ))}
            </div>

            <div className="bg-slate-900 rounded-3xl overflow-hidden">
              <table className="w-full">
                <thead className="bg-slate-800">
                  <tr>
                    <th className="p-4">Rank</th>
                    <th>Name</th>
                    <th>Level</th>
                    <th>XP</th>
                    <th>Streak</th>
                  </tr>
                </thead>
                <tbody>
                  {others.map(s=>(
                    <tr key={s._id} className="border-t border-slate-800">
                      <td className="p-4">#{s.rank}</td>
                      <td>{s.student?.name}</td>
                      <td><Star size={16} className="inline mr-1"/>{s.level}</td>
                      <td><Trophy size={16} className="inline mr-1"/>{s.xp}</td>
                      <td><Flame size={16} className="inline mr-1 text-red-500"/>{s.streak||0}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </DashboardLayout>
  );
}
