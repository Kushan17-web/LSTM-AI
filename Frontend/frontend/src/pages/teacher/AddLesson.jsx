import { useNavigate, useParams } from "react-router-dom";

import DashboardLayout from "../../layouts/DashboardLayout";

import LessonForm from "../../components/LessonForm";

import { addLesson } from "../../services/lessonService";

function AddLesson() {

    const navigate = useNavigate();

    const { courseId } = useParams();

    const onSubmit = async (data) => {

        try {

            await addLesson(courseId, data);

            navigate(
                `/teacher/courses/${courseId}/lessons`
            );

        } catch (err) {

            alert(
                err.response?.data?.message ||
                "Unable to add lesson."
            );

        }

    };

    return (

        <DashboardLayout>

            <div className="max-w-4xl">

                <h1 className="text-4xl font-bold mb-8">

                    Add Lesson

                </h1>

                <LessonForm

                    onSubmit={onSubmit}

                    buttonText="Add Lesson"

                />

            </div>

        </DashboardLayout>

    );

}

export default AddLesson;