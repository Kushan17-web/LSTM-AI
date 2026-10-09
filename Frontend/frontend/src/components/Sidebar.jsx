import {
    LayoutDashboard,
    BookOpen,
    ClipboardList,
    Users,
    BarChart3,
    BrainCircuit,
    Settings,
    LogOut,
    GraduationCap
} from "lucide-react";

import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Sidebar() {

    const navigate = useNavigate();

    const { user, logout } = useAuth();

    const menu = [

        {
            icon: LayoutDashboard,
            title: "Dashboard",
            path: "/teacher/dashboard"
        },

        {
            icon: BookOpen,
            title: "Courses",
            path: "/teacher/courses"
        },

        {
            icon: ClipboardList,
            title: "Quizzes",
            path: "/teacher/quizzes"
        },

        {
            icon: Users,
            title: "Students",
            path: "/teacher/students"
        },

        {
            icon: BarChart3,
            title: "Analytics",
            path: "/teacher/analytics"
        },

        {
            icon: BrainCircuit,
            title: "AI Tutor",
            path: "/teacher/ai"
        },

        {
            icon: Settings,
            title: "Settings",
            path: "/teacher/settings"
        }

    ];

    const handleLogout = () => {

        logout();

        navigate("/");

    };

    return (

        <aside className="w-72 bg-slate-900 border-r border-slate-800 flex flex-col justify-between">

            <div>

                <div className="p-8 border-b border-slate-800">

                    <div className="flex items-center gap-3">

                        <div className="bg-cyan-500 p-3 rounded-xl">

                            <GraduationCap size={26} />

                        </div>

                        <div>

                            <h1 className="text-2xl font-bold text-white">

                                Smart LMS

                            </h1>

                            <p className="text-cyan-400 text-sm">

                                AI Platform

                            </p>

                        </div>

                    </div>

                </div>

                <nav className="p-5 space-y-2">

                    {

                        menu.map((item) => {

                            const Icon = item.icon;

                            return (

                                <NavLink

                                    key={item.title}

                                    to={item.path}

                                    className={({ isActive }) =>

                                        `flex items-center gap-4 rounded-xl px-5 py-4 transition-all duration-300 ${
                                            isActive
                                                ? "bg-cyan-500 text-white"
                                                : "text-gray-300 hover:bg-slate-800 hover:text-white"
                                        }`

                                    }

                                >

                                    <Icon size={20} />

                                    <span className="font-medium">

                                        {item.title}

                                    </span>

                                </NavLink>

                            );

                        })

                    }

                </nav>

            </div>

            <div className="p-5 border-t border-slate-800">

                <div className="mb-5">

                    <h3 className="text-white font-semibold">

                        {user?.name || "Teacher"}

                    </h3>

                    <p className="text-gray-400 text-sm">

                        {user?.role || "Teacher"}

                    </p>

                </div>

                <button

                    onClick={handleLogout}

                    className="flex items-center justify-center gap-3 bg-red-500 hover:bg-red-600 rounded-xl w-full py-3 font-semibold transition"

                >

                    <LogOut size={18} />

                    Logout

                </button>

            </div>

        </aside>

    );

}

export default Sidebar;