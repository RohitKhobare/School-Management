import mongoose from "mongoose";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import User from "./models/user.js";
import Student from "./models/student.js";
import Teacher from "./models/teacher.js";
import Parent from "./models/parent.js";
import Class from "./models/class.js";
import Contact from "./models/contact.js";

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("MongoDB Connected for seeding");
  } catch (error) {
    console.error("DB Connection Failed:", error.message);
    process.exit(1);
  }
};

const seedData = async () => {
  try {
    // Clear existing data
    await User.deleteMany({});
    await Student.deleteMany({});
    await Teacher.deleteMany({});
    await Parent.deleteMany({});
    await Class.deleteMany({});
    await Contact.deleteMany({});

    console.log("Cleared existing data");

    // Create Admin User
    const adminPassword = await bcrypt.hash("admin123", 10);
    const adminUser = await User.create({
      name: "School Administrator",
      email: "admin@school.com",
      password: adminPassword,
      role: "admin",
    });

    // Create Teachers
    const teacherData = [
      { name: "Sarah Johnson", email: "sarah@school.com", subject: "Mathematics", experience: 5 },
      { name: "Michael Brown", email: "michael@school.com", subject: "English", experience: 8 },
      { name: "Emily Davis", email: "emily@school.com", subject: "Science", experience: 3 },
      { name: "David Wilson", email: "david@school.com", subject: "Social Studies", experience: 6 },
    ];

    const teachers = [];
    for (const teacher of teacherData) {
      const password = await bcrypt.hash("teacher123", 10);
      const user = await User.create({
        name: teacher.name,
        email: teacher.email,
        password,
        role: "teacher",
      });

      const teacherDoc = await Teacher.create({
        name: teacher.name,
        email: teacher.email,
        subject: teacher.subject,
        experience: teacher.experience,
        userAccount: user._id,
        classesAssigned: [
          { class: "Class 5", section: "A" },
          { class: "Class 6", section: "B" },
        ],
      });

      teachers.push(teacherDoc);
    }

    // Create Classes
    const classes = [];
    const classData = [
      { name: "Class 5A", grade: 5, section: "A", academicYear: "2024-2025" },
      { name: "Class 5B", grade: 5, section: "B", academicYear: "2024-2025" },
      { name: "Class 6A", grade: 6, section: "A", academicYear: "2024-2025" },
      { name: "Class 6B", grade: 6, section: "B", academicYear: "2024-2025" },
      { name: "Class 7A", grade: 7, section: "A", academicYear: "2024-2025" },
    ];

    for (const classInfo of classData) {
      const classDoc = await Class.create({
        ...classInfo,
        classTeacher: teachers[Math.floor(Math.random() * teachers.length)]._id,
      });
      classes.push(classDoc);
    }

    // Create Students and Parents
    const studentNames = [
      "Alex Smith", "Emma Johnson", "Liam Brown", "Olivia Davis", "Noah Wilson",
      "Ava Miller", "William Garcia", "Sophia Martinez", "James Anderson", "Isabella Taylor",
      "Benjamin Thomas", "Mia Jackson", "Lucas White", "Charlotte Harris", "Henry Martin",
      "Amelia Thompson", "Alexander Garcia", "Harper Lewis", "Sebastian Lee", "Evelyn Walker",
    ];

    const students = [];
    const parents = [];

    for (let i = 0; i < studentNames.length; i++) {
      const studentName = studentNames[i];
      const parentName = `Parent of ${studentName}`;
      const studentEmail = `student${i + 1}@school.com`;
      const parentEmail = `parent${i + 1}@school.com`;

      // Create student user
      const studentPassword = await bcrypt.hash("student123", 10);
      const studentUser = await User.create({
        name: studentName,
        email: studentEmail,
        password: studentPassword,
        role: "student",
      });

      // Create parent user
      const parentPassword = await bcrypt.hash("parent123", 10);
      const parentUser = await User.create({
        name: parentName,
        email: parentEmail,
        password: parentPassword,
        role: "parent",
      });

      // Create parent document
      const parentDoc = await Parent.create({
        name: parentName,
        email: parentEmail,
        userAccount: parentUser._id,
        phone: `+91 98765 ${43210 + i}`,
        relationship: "Father",
        occupation: ["Engineer", "Doctor", "Teacher", "Business"][i % 4],
      });

      parents.push(parentDoc);

      // Create student document
      const randomClass = classes[Math.floor(Math.random() * classes.length)];
      const studentDoc = await Student.create({
        name: studentName,
        rollNumber: `STU${2024}${String(i + 1).padStart(3, '0')}`,
        class: `Class ${randomClass.grade}`,
        section: randomClass.section,
        userAccount: studentUser._id,
        parent: parentDoc._id,
        phone: `+91 98765 ${43210 + i}`,
        dateOfBirth: new Date(2010 + Math.floor(Math.random() * 3), Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1),
        address: {
          street: `${i + 1} Main Street`,
          city: "Mumbai",
          state: "Maharashtra",
          zipCode: `400${String(i + 1).padStart(3, '0')}`,
        },
      });

      students.push(studentDoc);

      // Link student to parent
      await Parent.findByIdAndUpdate(parentDoc._id, {
        $push: { linkedStudents: studentDoc._id },
      });

      // Add student to class
      await Class.findByIdAndUpdate(randomClass._id, {
        $push: { students: studentDoc._id },
      });
    }

    // Create sample contact submissions
    const contactSubjects = ["admission", "academic", "transport", "general", "feedback"];
    const contactMessages = [
      "I would like to inquire about the admission process for my child.",
      "Could you please provide information about the academic curriculum?",
      "I need details about the school transport facility.",
      "What are the school timings and holiday schedule?",
      "The teachers are doing an excellent job. Thank you!",
      "I have some concerns about my child's progress.",
      "Could you arrange a parent-teacher meeting?",
      "What extracurricular activities are available?",
    ];

    for (let i = 0; i < 15; i++) {
      await Contact.create({
        name: `Contact Person ${i + 1}`,
        email: `contact${i + 1}@example.com`,
        phone: `+91 98765 ${54321 + i}`,
        subject: contactSubjects[i % contactSubjects.length],
        message: contactMessages[i % contactMessages.length],
        status: ["pending", "in-progress", "resolved"][i % 3],
        isRead: Math.random() > 0.3,
        createdAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000), // Random date within last 30 days
      });
    }

    console.log("✅ Sample data seeded successfully!");
    console.log("\n📊 Created:");
    console.log(`- 1 Admin user (admin@school.com / admin123)`);
    console.log(`- ${teachers.length} Teachers (teacher123)`);
    console.log(`- ${students.length} Students (student123)`);
    console.log(`- ${parents.length} Parents (parent123)`);
    console.log(`- ${classes.length} Classes`);
    console.log(`- 15 Contact submissions`);
    console.log("\n🔐 Login credentials:");
    console.log("Admin: admin@school.com / admin123");
    console.log("Teacher: sarah@school.com / teacher123");
    console.log("Student: student1@school.com / student123");
    console.log("Parent: parent1@school.com / parent123");

  } catch (error) {
    console.error("Seeding error:", error);
  } finally {
    mongoose.connection.close();
  }
};

// Run the seeding
connectDB().then(() => {
  seedData();
});