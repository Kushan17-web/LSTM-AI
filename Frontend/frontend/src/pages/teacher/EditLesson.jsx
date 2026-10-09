import { useEffect, useState } from "react";

import {
    useNavigate,
    useParams
} from "react-router-dom";

import DashboardLayout from "../../layouts/DashboardLayout";

import LessonForm from "../../components/LessonForm";

import {
    getLessons,
    updateLesson
} from "../../services/lessonService";

function EditLesson() {

    const navigate = useNavigate();

    const {

        courseId,

        lessonId

    } = useParams();

    const [lesson, setLesson] = useState(null);

    useEffect(() => {

        loadLesson();

    }, []);

    const loadLesson = async () => {

        const data = await getLessons(courseId);

        const found = data.lessons.find(

            l => l._id === lessonId

        );

        setLesson(found);

    };

    const onSubmit = async (formData) => {

        try {

            await updateLesson(

                courseId,

                lessonId,

                formData

            );

            navigate(

                `/teacher/courses/${courseId}/lessons`

            );

        } catch (err) {

            alert("Update Failed");

        }

    };

    if (!lesson)

        return (

            <DashboardLayout>

                Loading...

            </DashboardLayout>

        );

    return (

        <DashboardLayout>

            <div className="max-w-4xl">

                <h1 className="text-4xl font-bold mb-8">

                    Edit Lesson

                </h1>

                <LessonForm

                    defaultValues={lesson}

                    onSubmit={onSubmit}

                    buttonText="Update Lesson"

                />

            </div>

        </DashboardLayout>

    );

}

export default EditLesson;