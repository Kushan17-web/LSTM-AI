import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import api from "../services/api";

function Register() {

    const { register, handleSubmit } = useForm();

    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);

    const onSubmit = async (data) => {

        try {

            setLoading(true);

            await api.post("/auth/register", data);

            alert("Registration Successful!");

            navigate("/");

        } catch (err) {

            alert(
                err.response?.data?.message ||
                "Registration Failed"
            );

        } finally {

            setLoading(false);

        }

    };

    return (

        <div className="min-h-screen bg-slate-900 flex items-center justify-center">

            <form
                onSubmit={handleSubmit(onSubmit)}
                className="bg-slate-800 rounded-2xl shadow-2xl p-10 w-[430px]"
            >

                <h1 className="text-4xl font-bold text-cyan-400 text-center">

                    Smart LMS AI

                </h1>

                <p className="text-center text-gray-400 mb-8 mt-2">

                    Create Your Account

                </p>

                <input

                    {...register("name")}

                    placeholder="Full Name"

                    className="w-full p-3 rounded-lg bg-slate-700 text-white mb-4"

                />

                <input

                    type="email"

                    {...register("email")}

                    placeholder="Email"

                    className="w-full p-3 rounded-lg bg-slate-700 text-white mb-4"

                />

                <input

                    type="password"

                    {...register("password")}

                    placeholder="Password"

                    className="w-full p-3 rounded-lg bg-slate-700 text-white mb-4"

                />

                <select

                    {...register("role")}

                    className="w-full p-3 rounded-lg bg-slate-700 text-white mb-6"

                >

                    <option value="student">

                        Student

                    </option>

                    <option value="teacher">

                        Teacher

                    </option>

                </select>

                <button

                    disabled={loading}

                    className="w-full bg-cyan-500 hover:bg-cyan-600 rounded-lg p-3 font-bold"

                >

                    {

                        loading

                        ?

                        "Creating Account..."

                        :

                        "Register"

                    }

                </button>

                <p className="text-center mt-6 text-gray-400">

                    Already have an account?

                    <Link

                        to="/"

                        className="text-cyan-400 ml-2"

                    >

                        Login

                    </Link>

                </p>

            </form>

        </div>

    );

}

export default Register;