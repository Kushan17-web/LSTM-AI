require("dotenv").config();

const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

// Models
const User = require("./models/User");
const Course = require("./models/Course");
const Quiz = require("./models/Quiz");
const QuizAttempt = require("./models/QuizAttempt");
const Enrollment = require("./models/Enrollment");
const LearningAnalytics = require("./models/LearningAnalytics");
const Certificate = require("./models/Certificate");
const Notification = require("./models/Notification");
const Chat = require("./models/Chat");
const Achievement = require("./models/Achievement");

const MONGO_URI = process.env.MONGO_URI;

async function connectDB() {
    await mongoose.connect(MONGO_URI);
    console.log("MongoDB Connected");
}

function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomItem(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

const courseCategories = [
    "Programming",
    "Artificial Intelligence",
    "Machine Learning",
    "Data Science",
    "Cyber Security",
    "Cloud Computing",
    "Web Development",
    "Mobile Development",
    "Blockchain",
    "DevOps"
];

const lessonTitles = [
    "Introduction",
    "Getting Started",
    "Theory",
    "Practical Demo",
    "Hands-on Exercise",
    "Mini Project",
    "Case Study",
    "Assignment"
];

const strengths = [
    "Java",
    "Python",
    "SQL",
    "React",
    "NodeJS",
    "MongoDB",
    "AI",
    "Networking"
];

const badges = [
    "Beginner",
    "Fast Learner",
    "Quiz Master",
    "Top Performer",
    "Consistency",
    "Gold Learner"
];

async function clearDatabase() {

    console.log("Deleting old data...");

    await Achievement.deleteMany({});
    await Chat.deleteMany({});
    await Notification.deleteMany({});
    await Certificate.deleteMany({});
    await LearningAnalytics.deleteMany({});
    await Enrollment.deleteMany({});
    await QuizAttempt.deleteMany({});
    await Quiz.deleteMany({});
    await Course.deleteMany({});
    await User.deleteMany({});

    console.log("Database Clean");
}

async function createUsers() {

    console.log("Creating Users...");

    const password = await bcrypt.hash("123456", 10);

    const admin = await User.create({
        name: "Admin",
        email: "admin@smartlms.com",
        password,
        role: "admin",
        isVerified: true,
        level: 10,
        xp: 5000
    });

    const teachers = [];

    for (let i = 1; i <= 5; i++) {

        const teacher = await User.create({

            name: `Teacher ${i}`,
            email: `teacher${i}@smartlms.com`,
            password,
            role: "teacher",
            isVerified: true,
            department: "Computer Science",
            level: random(5,8),
            xp: random(3000,6000)

        });

        teachers.push(teacher);

    }

    const students = [];

    for (let i = 1; i <= 50; i++) {

        const student = await User.create({

            name: `Student ${i}`,
            email: `student${i}@smartlms.com`,
            password,
            role: "student",

            college: "Smart University",

            department: "Computer Science",

            semester: random(1,8),

            isVerified: true,

            xp: random(100,3000),

            level: random(1,8),

            streak: random(0,60),

            badges: [
                randomItem(badges)
            ]

        });

        students.push(student);

    }

    console.log("Users Created");

    return {
        admin,
        teachers,
        students
    };

}
async function createCourses(teachers) {

    console.log("Creating Courses...");

    const courses = [];

    for (let i = 1; i <= 10; i++) {

        const teacher = teachers[(i - 1) % teachers.length];

        const lessons = [];

        let totalDuration = 0;

        for (let j = 1; j <= 8; j++) {

            const duration = random(10, 35);

            totalDuration += duration;

            lessons.push({
                title: `${lessonTitles[(j - 1) % lessonTitles.length]} ${j}`,
                description: `Lesson ${j} for Course ${i}`,
                videoUrl: `https://example.com/videos/course${i}/lesson${j}`,
                notesUrl: `https://example.com/notes/course${i}/lesson${j}.pdf`,
                duration,
                order: j,
                isPreview: j === 1
            });

        }

        const course = new Course({

            title: `${courseCategories[(i - 1) % courseCategories.length]} Masterclass ${i}`,

            description:
                `Complete professional course on ${courseCategories[(i - 1) % courseCategories.length]}.`,

            category:
                courseCategories[(i - 1) % courseCategories.length],

            teacher: teacher._id,

            thumbnail:
                `https://picsum.photos/seed/course${i}/800/450`,

            price: random(0, 4999),

            difficulty:
                randomItem([
                    "Beginner",
                    "Intermediate",
                    "Advanced"
                ]),

            status: "Published",

            lessons,

            students: [],

            totalEnrollments: 0,

            totalLessons: lessons.length,

            estimatedDuration: totalDuration,

            rating: Number((Math.random() * 2 + 3).toFixed(1)),

            totalRatings: random(20, 300),

            language: "English",

            tags: [
                courseCategories[(i - 1) % courseCategories.length],
                "LMS",
                "AI",
                "Smart Learning"
            ]

        });

        await course.save();

        teacher.createdCourses.push(course._id);

        await teacher.save();

        courses.push(course);

    }

    console.log(`${courses.length} Courses Created`);

    return courses;

}
async function createQuizzes(courses) {

    console.log("Creating Quizzes...");

    const quizzes = [];

    for (const course of courses) {

        for (let q = 1; q <= 2; q++) {

            const questions = [];

            for (let i = 1; i <= 10; i++) {

                questions.push({

                    question: `Question ${i} for ${course.title}`,

                    type: "mcq",

                    options: [
                        "Option A",
                        "Option B",
                        "Option C",
                        "Option D"
                    ],

                    correctAnswer: random(0,3),

                    marks: 2,

                    negativeMarks: 0,

                    explanation:
                        "This is the correct explanation."

                });

            }

            const quiz = new Quiz({

                title: `${course.title} Quiz ${q}`,

                description:
                    `Assessment ${q} for ${course.title}`,

                teacher: course.teacher,

                course: course._id,

                questions,

                passingMarks: 12,

                duration: 20,

                shuffleQuestions: true,

                shuffleOptions: true,

                maxAttempts: 3,

                isPublished: true

            });

            await quiz.save();

            quizzes.push(quiz);

        }

    }

    console.log(`${quizzes.length} Quizzes Created`);

    return quizzes;

}
async function createEnrollments(students, courses) {

    console.log("Creating Enrollments...");

    const enrollments = [];

    for (const student of students) {

        const count = random(2,5);

        const shuffled = [...courses].sort(() => Math.random() - 0.5);

        for (let i = 0; i < count; i++) {

            const course = shuffled[i];

            const progress = random(5,100);

            const enrollment = await Enrollment.create({

                student: student._id,

                course: course._id,

                progress,

                completedLessons: Math.floor(
                    (progress / 100) *
                    course.lessons.length
                ),

                completed: progress === 100,

                enrolledAt: new Date(),

                lastAccessed: new Date()

            });

            enrollments.push(enrollment);

            student.enrolledCourses.push(course._id);

            course.students.push({

                student: student._id,

                progress,

                completed: progress === 100,

                completedAt:
                    progress === 100 ? new Date() : null

            });

        }

        await student.save();

    }

    for (const course of courses) {

        await course.save();

    }

    console.log(`${enrollments.length} Enrollments Created`);

    return enrollments;

}
async function createQuizAttempts(students, quizzes) {

    console.log("Creating Quiz Attempts...");

    const attempts = [];

    for (const student of students) {

        const quizCount = random(2,6);

        const shuffledQuizzes = [...quizzes].sort(() => Math.random() - 0.5);

        for (let i = 0; i < quizCount; i++) {

            const quiz = shuffledQuizzes[i];

            const answers = [];

            let score = 0;

            for (const question of quiz.questions) {

                const selected = random(0,3);

                const correct = selected === question.correctAnswer;

                if (correct) score += question.marks;

                answers.push({

                    question: question._id,

                    selectedAnswer: selected,

                    isCorrect: correct,

                    marksAwarded: correct ? question.marks : 0

                });

            }

            const percentage = Number(
                ((score / quiz.totalMarks) * 100).toFixed(2)
            );

            const attempt = await QuizAttempt.create({

                student: student._id,

                quiz: quiz._id,

                course: quiz.course,

                answers,

                score,

                percentage,

                passed: percentage >= quiz.passingMarks,

                xpEarned: Math.floor(percentage),

                durationTaken: random(8,20),

                startedAt: new Date(),

                submittedAt: new Date()

            });

            attempts.push(attempt);

        }

    }

    console.log(`${attempts.length} Quiz Attempts Created`);

    return attempts;

}
async function createCertificatesAchievementsNotifications(students, courses) {

    console.log("Creating Certificates, Achievements & Notifications...");

    let certificateNo = 1000;

    for (const student of students) {

        // Completed Courses
        const completedCourses = courses.filter(() => Math.random() > 0.65);

        for (const course of completedCourses) {

            await Certificate.create({

                student: student._id,

                course: course._id,

                certificateId: `CERT-${certificateNo++}`,

                score: random(70,100),

                verificationUrl: `https://smartlms.com/verify/CERT-${certificateNo}`,

                status: "Active"

            });

            student.certificates.push({

                course: course._id,

                certificateUrl: `https://smartlms.com/certificates/CERT-${certificateNo}.pdf`,

                issuedAt: new Date()

            });

        }

        await student.save();

        // Achievement
        await Achievement.create({

            student: student._id,

            badge: randomItem(badges),

            description: "Achievement unlocked for excellent performance.",

            icon: "🏆",

            xpReward: random(50,250)

        });

        // Notifications

        const notificationTypes = [

            "quiz",
            "badge",
            "level",
            "certificate",
            "course",
            "system"

        ];

        for (let i = 0; i < 5; i++) {

            await Notification.create({

                user: student._id,

                title: `Notification ${i + 1}`,

                message: "This is an automated notification generated during database seeding.",

                type: randomItem(notificationTypes),

                isRead: Math.random() > 0.5

            });

        }

        // AI Chat History

        const chats = [

            [
                "Explain Machine Learning",
                "Machine Learning enables computers to learn from data."
            ],

            [
                "What is AI?",
                "Artificial Intelligence is the simulation of human intelligence."
            ],

            [
                "Explain React Hooks",
                "Hooks let you use state and lifecycle features in functional components."
            ],

            [
                "Difference between SQL and MongoDB",
                "SQL is relational while MongoDB is document-based."
            ],

            [
                "How to improve coding?",
                "Practice every day and build projects."
            ]

        ];

        for (const chat of chats) {

            await Chat.create({

                student: student._id,

                question: chat[0],

                answer: chat[1]

            });

        }

    }

    console.log("Certificates Created");
    console.log("Achievements Created");
    console.log("Notifications Created");
    console.log("Chat History Created");

}
async function seedDatabase() {

    try {

        await connectDB();

        await clearDatabase();

        const { admin, teachers, students } = await createUsers();

        const courses = await createCourses(teachers);

        const quizzes = await createQuizzes(courses);

        await createEnrollments(students, courses);

        await createQuizAttempts(students, quizzes);

        await createAnalytics(students);

        await createCertificatesAchievementsNotifications(
            students,
            courses
        );

        console.log("\n==================================");
        console.log("DATABASE SEEDED SUCCESSFULLY");
        console.log("==================================");

        console.log("Admin");
        console.log("Email    : admin@smartlms.com");
        console.log("Password : 123456");

        console.log("\nTeachers");
        console.log("teacher1@smartlms.com");
        console.log("teacher2@smartlms.com");
        console.log("teacher3@smartlms.com");
        console.log("teacher4@smartlms.com");
        console.log("teacher5@smartlms.com");

        console.log("\nStudents");
        console.log("student1@smartlms.com");
        console.log("student2@smartlms.com");
        console.log("...");
        console.log("student50@smartlms.com");

        console.log("\nPassword for every account:");
        console.log("123456");

        process.exit();

    } catch (err) {

        console.error(err);

        process.exit(1);

    }

}
async function createAnalytics(students) {

    console.log("Creating Learning Analytics...");

    for (const student of students) {

        await LearningAnalytics.create({

            student: student._id,

            learningPower: random(60, 100),

            category: randomItem([
                "Excellent",
                "Good",
                "Average",
                "Needs Improvement"
            ]),

            strengths: [
                randomItem(strengths),
                randomItem(strengths)
            ],

            weaknesses: [
                randomItem(strengths)
            ],

            recommendation:
                "Practice quizzes daily and revise weak topics.",

            learningCoach: {

                strongestTopic: randomItem(strengths),

                weakestTopic: randomItem(strengths),

                recommendedStudyTime: random(30, 90),

                estimatedNextScore: random(70, 99)

            },

            averageScore: random(60, 98),

            averageTime: random(10, 45),

            quizzesCompleted: random(5, 30),

            completedLessons: random(5, 80),

            completedCourses: random(0, 5),

            weeklyProgress: [

                { day: "Mon", score: random(50,100) },
                { day: "Tue", score: random(50,100) },
                { day: "Wed", score: random(50,100) },
                { day: "Thu", score: random(50,100) },
                { day: "Fri", score: random(50,100) },
                { day: "Sat", score: random(50,100) },
                { day: "Sun", score: random(50,100) }

            ],

            xp: random(100, 5000),

            xpEarned: random(100, 1000),

            level: random(1, 10),

            streak: random(0, 60),

            rank: random(1, 100),

            badges: [
                randomItem(badges),
                randomItem(badges)
            ],

            lastQuizScore: random(50, 100),

            predictions: [

                {
                    category: "AI Prediction",
                    score: random(60, 100),
                    createdAt: new Date()
                }

            ],

            lastUpdated: new Date()

        });

    }

    console.log("Learning Analytics Created");

}

seedDatabase();