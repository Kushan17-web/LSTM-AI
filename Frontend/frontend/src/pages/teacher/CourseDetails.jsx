import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import LessonTab from "../../components/course/LessonTab";

import DashboardLayout from "../../layouts/DashboardLayout";

import { getCourse } from "../../services/courseService";

import OverviewTab from "../../components/course/OverviewTab";

function CourseDetails() {

    const { id } = useParams();

    const [course, setCourse] = useState(null);

    const [loading, setLoading] = useState(true);

    const [activeTab, setActiveTab] = useState("overview");

    useEffect(() => {

        loadCourse();

    }, []);

    const loadCourse = async () => {

        try {

            const data = await getCourse(id);

            setCourse(data.course);

        }

        catch (err) {

            console.log(err);

        }

        finally {

            setLoading(false);

        }

    };

    if (loading) {

        return (

            <DashboardLayout>

                <div className="text-center py-24">

                    Loading...

                </div>

            </DashboardLayout>

        );

    }

    return (

        <DashboardLayout>

            <div className="space-y-8">

                <div>

                    <h1 className="text-4xl font-bold">

                        {course.title}

                    </h1>

                    <p className="text-gray-400 mt-2">

                        Manage your complete course.

                    </p>

                </div>

                <div className="flex gap-3">

                    {

                        [

                            "overview",

                            "lessons",

                            "quizzes",

                            "students",

                            "analytics",

                            "ai",

                            "settings"

                        ].map(tab => (

                            <button

                                key={tab}

                                onClick={() => setActiveTab(tab)}

                                className={`px-6 py-3 rounded-xl capitalize transition ${activeTab === tab

                                        ?

                                        "bg-cyan-500"

                                        :

                                        "bg-slate-900"

                                    }`}

                            >

                                {tab}

                            </button>

                        ))

                    }

                </div>
                {activeTab === "overview" && (
                    <OverviewTab course={course} />
                )}
                {activeTab === "lessons" && (
                    <LessonTab courseId={course._id} />
                )}

                {activeTab === "quizzes" && (
                    <div className="bg-slate-900 rounded-2xl p-20 text-center">
                        Quiz Module Coming Soon
                    </div>
                )}

                {activeTab === "students" && (
                    <div className="bg-slate-900 rounded-2xl p-20 text-center">
                        Student Module Coming Soon
                    </div>
                )}

                {activeTab === "analytics" && (
                    <div className="bg-slate-900 rounded-2xl p-20 text-center">
                        Analytics Module Coming Soon
                    </div>
                )}

                {activeTab === "ai" && (
                    <div className="bg-slate-900 rounded-2xl p-20 text-center">
                        AI Module Coming Soon
                    </div>
                )}

                {activeTab === "settings" && (
                    <div className="bg-slate-900 rounded-2xl p-20 text-center">
                        Settings Module Coming Soon
                    </div>
                )}





                <div className="bg-slate-900 border border-slate-800 rounded-2xl h-[500px] flex items-center justify-center text-3xl text-gray-500">

                    {activeTab.toUpperCase()}

                    Module Coming Next

                </div>



            </div>

        </DashboardLayout>

    );

}

export default CourseDetails;