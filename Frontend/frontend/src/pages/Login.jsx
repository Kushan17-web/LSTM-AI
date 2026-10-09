import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";

import { useAuth } from "../context/AuthContext";
import api from "../services/api";

function Login() {

    const { register, handleSubmit } = useForm();

    const navigate = useNavigate();

    const { login } = useAuth();

    const [loading, setLoading] = useState(false);

    const onSubmit = async (data) => {

        try {

            setLoading(true);

            const res = await api.post("/auth/login", data);

            login(res.data);

            if (res.data.user.role === "teacher") {

                navigate("/teacher/dashboard");

            } else if (res.data.user.role === "admin") {

                navigate("/teacher/dashboard");

            } else {

                navigate("/student/dashboard");

            }

        } catch (err) {

            alert(
                err.response?.data?.message ||
                "Invalid Email or Password"
            );

        } finally {

            setLoading(false);

        }

    };

    return (

        <div className="min-h-screen bg-slate-900 flex items-center justify-center">

            <form
                onSubmit={handleSubmit(onSubmit)}
                className="bg-slate-800 w-[420px] rounded-2xl shadow-2xl p-10"
            >

                <h1 className="text-4xl font-bold text-cyan-400 text-center">

                    Smart LMS AI

                </h1>

                <p className="text-center text-gray-400 mt-2 mb-8">

                    AI Powered Learning Platform

                </p>

                <input

                    type="email"

                    placeholder="Email"

                    {...register("email", { required: true })}

                    className="w-full p-3 rounded-lg bg-slate-700 text-white outline-none mb-4"

                />

                <input

                    type="password"

                    placeholder="Password"

                    {...register("password", { required: true })}

                    className="w-full p-3 rounded-lg bg-slate-700 text-white outline-none mb-6"

                />

                <button

                    type="submit"

                    disabled={loading}

                    className="w-full bg-cyan-500 hover:bg-cyan-600 transition rounded-lg p-3 font-bold"

                >

                    {loading ? "Logging In..." : "Login"}

                </button>

                <p className="text-center mt-6 text-gray-400">

                    Don't have an account?

                    <Link

                        to="/register"

                        className="text-cyan-400 ml-2"

                    >

                        Register

                    </Link>

                </p>

            </form>

        </div>

    );

}

export default Login;