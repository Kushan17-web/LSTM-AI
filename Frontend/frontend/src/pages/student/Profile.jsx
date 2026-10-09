import { useEffect, useState } from "react";

import DashboardLayout from "../../layouts/DashboardLayout";

import { getProfile } from "../../services/profileService";

function Profile() {

    const [profile, setProfile] = useState(null);

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        loadProfile();

    }, []);

    const loadProfile = async () => {

        try {

            const data = await getProfile();

            setProfile(data);

        } catch (err) {

            console.log(err);

        } finally {

            setLoading(false);

        }

    };

    if (loading) {

        return (

            <DashboardLayout>

                <div className="text-center py-20">

                    Loading Profile...

                </div>

            </DashboardLayout>

        );

    }

    return (

        <DashboardLayout>

            <div className="max-w-6xl mx-auto space-y-8">

                <div className="bg-slate-900 rounded-3xl p-8 flex items-center gap-8">

                    <img

                        src={
                            profile.user.avatar ||
                            "https://ui-avatars.com/api/?name=" +
                            profile.user.name
                        }

                        alt="avatar"

                        className="w-32 h-32 rounded-full"

                    />

                    <div>

                        <h1 className="text-4xl font-bold">

                            {profile.user.name}

                        </h1>

                        <p className="text-gray-400">

                            {profile.user.email}

                        </p>

                        <p className="mt-2">

                            {profile.user.bio || "No bio added"}

                        </p>

                    </div>

                </div>

                <div className="grid md:grid-cols-4 gap-6">

                    <div className="bg-slate-900 rounded-2xl p-6 text-center">

                        <h2 className="text-4xl font-bold">

                            {profile.analytics?.xp || 0}

                        </h2>

                        <p>XP</p>

                    </div>

                    <div className="bg-slate-900 rounded-2xl p-6 text-center">

                        <h2 className="text-4xl font-bold">

                            {profile.analytics?.level || 1}

                        </h2>

                        <p>Level</p>

                    </div>

                    <div className="bg-slate-900 rounded-2xl p-6 text-center">

                        <h2 className="text-4xl font-bold">

                            {profile.analytics?.streak || 0}

                        </h2>

                        <p>Streak</p>

                    </div>

                    <div className="bg-slate-900 rounded-2xl p-6 text-center">

                        <h2 className="text-4xl font-bold">

                            {profile.analytics?.averageScore || 0}%

                        </h2>

                        <p>Average</p>

                    </div>

                </div>

                <div className="bg-slate-900 rounded-3xl p-8">

                    <h2 className="text-3xl font-bold mb-5">

                        🏅 Badges

                    </h2>

                    <div className="flex flex-wrap gap-3">

                        {(profile.analytics?.badges || []).map((badge, index) => (

                            <span

                                key={index}

                                className="bg-yellow-500 text-black px-4 py-2 rounded-full"

                            >

                                {badge}

                            </span>

                        ))}

                    </div>

                </div>

                <div className="bg-slate-900 rounded-3xl p-8">

                    <h2 className="text-3xl font-bold mb-5">

                        📜 Recent Quiz History

                    </h2>

                    <div className="space-y-4">

                        {profile.history.map((quiz) => (

                            <div

                                key={quiz._id}

                                className="flex justify-between bg-slate-800 rounded-xl p-4"

                            >

                                <span>

                                    {quiz.quiz?.title}

                                </span>

                                <span>

                                    {quiz.percentage}%

                                </span>

                            </div>

                        ))}

                    </div>

                </div>

            </div>

        </DashboardLayout>

    );

}

export default Profile;