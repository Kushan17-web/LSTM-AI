import { BrowserRouter, Routes, Route } from "react-router-dom";
import Courses from "./pages/teacher/Courses";
import Login from "./pages/Login";
import Register from "./pages/Register";
import TeacherDashboard from "./pages/teacher/Dashboard";
import StudentDashboard from "./pages/student/Dashboard";
import AddCourse from "./pages/teacher/AddCourse";
import Lessons from "./pages/teacher/Lessons";
import AddLesson from "./pages/teacher/AddLesson";
import EditLesson from "./pages/teacher/EditLesson";
import CourseDetails from "./pages/teacher/CourseDetails";
import QuizList from "./pages/teacher/QuizList";
import CreateQuiz from "./pages/teacher/CreateQuiz";
import studentQuizList from "./pages/student/studentQuizList";
import AttemptQuiz from "./pages/student/AttemptQuiz";
import QuizResult from "./pages/student/QuizResult";
import Leaderboard from "./pages/student/Leaderboard";
import Profile from "./pages/student/Profile";
function App() {
    return (
        <BrowserRouter>
            <Routes>

                {/* Authentication */}
                <Route
                    path="/"
                    element={<Login />}
                />

                <Route
                    path="/register"
                    element={<Register />}
                />

                {/* Teacher */}
                <Route
                    path="/teacher/dashboard"
                    element={<TeacherDashboard />}
                />

                {/* Student */}
                <Route
                    path="/student/dashboard"
                    element={<StudentDashboard />}
                />
                <Route
                    path="/teacher/courses"
                    element={<Courses />}
                />
                <Route
                    path="/teacher/courses/add"
                    element={<AddCourse />}
                />
                <Route
                    path="/teacher/courses/:id"
                    element={<CourseDetails />}
                />
                <Route
                    path="/teacher/courses/:courseId/lessons"
                    element={<Lessons />}
                />

                <Route
                    path="/teacher/courses/:courseId/lessons/add"
                    element={<AddLesson />}
                />

                <Route
                    path="/teacher/courses/:courseId/lessons/edit/:lessonId"
                    element={<EditLesson />}
                />
                <Route
                    path="/teacher/quizzes"
                    element={<QuizList />}
                />

                <Route
                    path="/teacher/quizzes/add"
                    element={<CreateQuiz />}
                />
                <Route
                    path="/student/quizzes"
                    element={<QuizList />}
                />
                <Route
                    path="/student/quiz/:id"
                    element={<AttemptQuiz />}
                />
                <Route
                    path="/student/quiz/:id/result"
                    element={<QuizResult />}
                />
                <Route

                    path="/student/leaderboard"

                    element={<Leaderboard />}

                />
                <Route
    path="/student/profile"
    element={<Profile />}
/>

            </Routes>
        </BrowserRouter>
    );
}

export default App;