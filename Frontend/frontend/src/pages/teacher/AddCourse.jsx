import { useNavigate } from "react-router-dom";

import DashboardLayout from "../../layouts/DashboardLayout";
import CourseForm from "../../components/CourseForm";

import { createCourse } from "../../services/courseService";

function AddCourse() {

    const navigate = useNavigate();

    const onSubmit = async (data) => {

        try {

            await createCourse(data);

            navigate("/teacher/courses");

        } catch (err) {

            alert(
                err.response?.data?.message ||
                "Failed to create course."
            );

        }

    };

    return (

        <DashboardLayout>

            <div className="max-w-4xl">

                <h1 className="text-4xl font-bold mb-8">

                    Create New Course

                </h1>

                <CourseForm

                    onSubmit={onSubmit}

                    buttonText="Create Course"

                />

            </div>

        </DashboardLayout>

    );

}

export default AddCourse;