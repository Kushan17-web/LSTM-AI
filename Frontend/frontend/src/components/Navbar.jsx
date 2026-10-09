import { Bell, Search, UserCircle } from "lucide-react";
import { useAuth } from "../context/AuthContext";

function Navbar() {

    const { user } = useAuth();

    return (

        <header className="h-20 bg-slate-900 border-b border-slate-800 px-8 flex justify-between items-center">

            <div>

                <h2 className="text-3xl font-bold text-white">

                    Dashboard

                </h2>


            </div>

            <div className="flex items-center gap-5">

                <div className="bg-slate-800 rounded-xl flex items-center px-4 py-2 gap-2">

                    <Search size={18} />

                    <input
                        placeholder="Search..."
                        className="bg-transparent outline-none text-white"
                    />

                </div>

                <Bell
                    size={22}
                    className="cursor-pointer hover:text-cyan-400"
                />

                <UserCircle
                    size={38}
                    className="text-cyan-400"
                />

            </div>

        </header>

    );

}

export default Navbar;