import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import User from './models/user.js';
import Student from './models/student.js';
import Teacher from './models/teacher.js';
import Parent from './models/parent.js';
import Class from './models/class.js';
import Contact from './models/contact.js';
import Application from './models/application.js';
import Finance from './models/finance.js';
import Report from './models/report.js';
import Settings from './models/settings.js';
import connectDB from './config/db.js';

dotenv.config();

const indianNames = {
  male: ['Arjun', 'Aarav', 'Vivaan', 'Aditya', 'Vihaan', 'Sai', 'Aryan', 'Krishna', 'Ishaan', 'Shaurya', 'Atharv', 'Advait', 'Rudra', 'Reyansh', 'Ayaan', 'Kabir', 'Yuvaan', 'Shivansh', 'Dhruv', 'Kian'],
  female: ['Aadhya', 'Ananya', 'Diya', 'Saanvi', 'Pari', 'Kavya', 'Anika', 'Myra', 'Sara', 'Prisha', 'Kiara', 'Riya', 'Navya', 'Ira', 'Tara', 'Zara', 'Siya', 'Avni', 'Ishika', 'Arya'],
  surnames: ['Sharma', 'Patel', 'Singh', 'Kumar', 'Gupta', 'Agarwal', 'Jain', 'Verma', 'Yadav', 'Reddy', 'Nair', 'Iyer', 'Mehta', 'Shah', 'Bansal', 'Malhotra', 'Chopra', 'Sinha', 'Mishra', 'Pandey']
};

const subjects = ['Mathematics', 'English', 'Hindi', 'Science', 'Social Studies', 'Computer Science', 'Physical Education', 'Art & Craft', 'Music'];
const grades = ['nursery', 'lkg', 'ukg', '1st', '2nd', '3rd', '4th', '5th'];
const sections = ['A', 'B', 'C'];

const getRandomName = (gender) => {
  const firstNames = indianNames[gender];
  const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
  const surname = indianNames.surnames[Math.floor(Math.random() * indianNames.surnames.length)];
  return `${firstName} ${surname}`;
};

const getRandomEmail = (name, index) => {
  return `${name.toLowerCase().replace(' ', '.')}.${index}@example.com`;
};

const getRandomPhone = () => {
  return `+91 ${Math.floor(Math.random() * 9000000000) + 1000000000}`;
};

const getRandomAddress = () => {
  const areas = ['Andheri', 'Bandra', 'Juhu', 'Powai', 'Thane', 'Borivali', 'Malad', 'Goregaon', 'Kandivali', 'Dahisar'];
  const area = areas[Math.floor(Math.random() * areas.length)];
  const houseNo = Math.floor(Math.random() * 999) + 1;
  return `${houseNo}, ${area}, Mumbai, Maharashtra - ${Math.floor(Math.random() * 90000) + 400001}`;
};

const seedDummyData = async () => {
  try {
    console.log('🌱 Starting dummy data seeding...');
    
    await connectDB();
    
    // Clear existing data (except admin)
    console.log('🧹 Clearing existing data...');
    await mongoose.connection.db.dropCollection('students').catch(() => {});
    await mongoose.connection.db.dropCollection('teachers').catch(() => {});
    await mongoose.connection.db.dropCollection('parents').catch(() => {});
    await mongoose.connection.db.dropCollection('classes').catch(() => {});
    await mongoose.connection.db.dropCollection('contacts').catch(() => {});
    await mongoose.connection.db.dropCollection('applications').catch(() => {});
    await mongoose.connection.db.dropCollection('finances').catch(() => {});
    await mongoose.connection.db.dropCollection('reports').catch(() => {});
    await mongoose.connection.db.dropCollection('settings').catch(() => {});
    await mongoose.connection.db.dropCollection('users').catch(() => {});
    
    // Recreate admin user
    const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD || 'SecureAdmin@2024', 12);
    const adminUser = new User({
      name: 'Admin',
      email: process.env.ADMIN_EMAIL || 'admin@school.com',
      password: hashedPassword,
      role: 'admin'
    });
    await adminUser.save();

    // Create Classes
    console.log('📚 Creating classes...');
    const classes = [];
    const gradeNumbers = [0, 1, 2, 3, 4, 5, 6, 7]; // Nursery=0, LKG=1, UKG=2, 1st=3, etc.
    
    for (let i = 0; i < grades.length; i++) {
      const grade = grades[i];
      const gradeNumber = gradeNumbers[i];
      
      for (const section of sections) {
        const classData = new Class({
          name: `${grade} ${section}`,
          grade: gradeNumber,
          section: section,
          maxCapacity: 30,
          academicYear: '2024-2025',
          isActive: true
        });
        await classData.save();
        classes.push(classData);
      }
    }

    // Create Teachers
    console.log('👨‍🏫 Creating teachers...');
    const teachers = [];
    const teacherUsers = [];
    
    for (let i = 0; i < 15; i++) {
      const gender = Math.random() > 0.6 ? 'female' : 'male';
      const name = getRandomName(gender);
      const email = getRandomEmail(name, i);
      const hashedPassword = await bcrypt.hash('teacher123', 12);
      
      // Create user account
      const user = new User({
        name,
        email,
        password: hashedPassword,
        role: 'teacher'
      });
      await user.save();
      teacherUsers.push(user);

      // Create teacher profile
      const teacher = new Teacher({
        name,
        email,
        subject: subjects[Math.floor(Math.random() * subjects.length)],
        phone: getRandomPhone(),
        qualification: ['B.Ed', 'M.Ed', 'B.A', 'M.A', 'B.Sc', 'M.Sc'][Math.floor(Math.random() * 6)],
        experience: Math.floor(Math.random() * 15) + 1,
        joinDate: new Date(2020 + Math.floor(Math.random() * 4), Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1),
        userAccount: user._id,
        employeeId: `EMP${String(i + 1).padStart(3, '0')}`,
        isActive: true
      });
      await teacher.save();
      teachers.push(teacher);
    }

    // Assign class teachers
    for (let i = 0; i < classes.length && i < teachers.length; i++) {
      classes[i].classTeacher = teachers[i]._id;
      await classes[i].save();
    }

    // Create Parents and Students
    console.log('👨‍👩‍👧‍👦 Creating parents and students...');
    const parents = [];
    const students = [];
    
    for (let i = 0; i < 120; i++) {
      // Create parent
      const parentGender = Math.random() > 0.3 ? 'male' : 'female';
      const parentName = getRandomName(parentGender);
      const parentEmail = getRandomEmail(parentName, i);
      const hashedPassword = await bcrypt.hash('parent123', 12);
      
      const parentUser = new User({
        name: parentName,
        email: parentEmail,
        password: hashedPassword,
        role: 'parent'
      });
      await parentUser.save();

      const parent = new Parent({
        name: parentName,
        email: parentEmail,
        phone: getRandomPhone(),
        address: {
          street: getRandomAddress(),
          city: 'Mumbai',
          state: 'Maharashtra',
          zipCode: String(Math.floor(Math.random() * 90000) + 400001)
        },
        occupation: ['Engineer', 'Doctor', 'Teacher', 'Business', 'Lawyer', 'Accountant', 'Manager'][Math.floor(Math.random() * 7)],
        userAccount: parentUser._id,
        relationship: parentGender === 'male' ? 'Father' : 'Mother',
        isActive: true
      });
      await parent.save();
      parents.push(parent);

      // Create 1-2 students per parent
      const numStudents = Math.random() > 0.7 ? 2 : 1;
      for (let j = 0; j < numStudents; j++) {
        const studentGender = Math.random() > 0.5 ? 'female' : 'male';
        const studentName = getRandomName(studentGender);
        const studentEmail = getRandomEmail(studentName, i * 10 + j);
        const hashedPassword = await bcrypt.hash('student123', 12);
        
        const studentUser = new User({
          name: studentName,
          email: studentEmail,
          password: hashedPassword,
          role: 'student'
        });
        await studentUser.save();

        const randomClass = classes[Math.floor(Math.random() * classes.length)];
        const rollNumber = `${randomClass.grade}${randomClass.section}${String(i * 10 + j + 1).padStart(3, '0')}`;
        
        const student = new Student({
          name: studentName,
          rollNumber,
          class: grades[randomClass.grade], // Use grade name from array
          section: randomClass.section,
          dateOfBirth: new Date(2010 + Math.floor(Math.random() * 8), Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1),
          phone: getRandomPhone(),
          address: {
            street: parent.address.street,
            city: parent.address.city,
            state: parent.address.state,
            zipCode: parent.address.zipCode
          },
          parent: parentUser._id,
          enrollmentDate: new Date(2023, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1),
          userAccount: studentUser._id,
          isActive: true
        });
        await student.save();
        students.push(student);

        // Link student to parent
        parent.linkedStudents.push(student._id);
        await parent.save();
        
        // Link student to parent user
        parentUser.linkedStudent = student._id;
        await parentUser.save();
      }
    }

    // Create Contact Forms
    console.log('📞 Creating contact submissions...');
    const contactSubjects = ['admission', 'academic', 'transport', 'general', 'feedback'];
    const contactMessages = [
      'I would like to know about the admission process for my child.',
      'Can you provide information about the fee structure?',
      'What are the school timings and holidays?',
      'I need information about the transport facility.',
      'My child is interested in extracurricular activities.',
      'Can I schedule a school visit?',
      'What documents are required for admission?',
      'Is there any scholarship program available?'
    ];

    for (let i = 0; i < 25; i++) {
      const name = getRandomName(Math.random() > 0.5 ? 'female' : 'male');
      const contact = new Contact({
        name,
        email: getRandomEmail(name, i + 1000),
        phone: getRandomPhone(),
        subject: contactSubjects[Math.floor(Math.random() * contactSubjects.length)],
        message: contactMessages[Math.floor(Math.random() * contactMessages.length)],
        status: ['pending', 'in-progress', 'resolved'][Math.floor(Math.random() * 3)],
        isRead: Math.random() > 0.3,
        createdAt: new Date(Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000)
      });
      await contact.save();
    }

    // Create Applications
    console.log('📝 Creating applications...');
    for (let i = 0; i < 20; i++) {
      const studentName = getRandomName(Math.random() > 0.5 ? 'female' : 'male');
      const parentName = getRandomName(Math.random() > 0.5 ? 'female' : 'male');
      
      const application = new Application({
        studentName,
        parentName,
        email: getRandomEmail(parentName, i + 2000),
        phone: getRandomPhone(),
        address: getRandomAddress(),
        dateOfBirth: new Date(2012 + Math.floor(Math.random() * 6), Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1),
        grade: grades[Math.floor(Math.random() * grades.length)],
        previousSchool: Math.random() > 0.5 ? 'Little Angels School' : '',
        medicalInfo: Math.random() > 0.7 ? 'No known allergies' : '',
        status: ['pending', 'under_review', 'approved', 'rejected'][Math.floor(Math.random() * 4)],
        createdAt: new Date(Date.now() - Math.floor(Math.random() * 60) * 24 * 60 * 60 * 1000)
      });
      await application.save();
    }

    // Create Finance Records
    console.log('💰 Creating finance records...');
    const transactionTypes = ['fee_payment', 'fine', 'transport', 'books', 'uniform'];
    const paymentMethods = ['cash', 'card', 'upi', 'bank_transfer'];
    
    for (let i = 0; i < 200; i++) {
      const randomStudent = students[Math.floor(Math.random() * students.length)];
      const transactionType = transactionTypes[Math.floor(Math.random() * transactionTypes.length)];
      
      let amount;
      switch (transactionType) {
        case 'fee_payment': amount = 5000 + Math.floor(Math.random() * 10000); break;
        case 'transport': amount = 1000 + Math.floor(Math.random() * 2000); break;
        case 'books': amount = 500 + Math.floor(Math.random() * 1500); break;
        case 'uniform': amount = 800 + Math.floor(Math.random() * 1200); break;
        case 'fine': amount = 50 + Math.floor(Math.random() * 500); break;
        default: amount = 1000;
      }
      
      const finance = new Finance({
        studentId: randomStudent._id,
        transactionType,
        amount,
        description: `${transactionType.replace('_', ' ').toUpperCase()} - ${randomStudent.name}`,
        paymentMethod: paymentMethods[Math.floor(Math.random() * paymentMethods.length)],
        status: Math.random() > 0.1 ? 'completed' : 'pending',
        academicYear: '2024-2025',
        receiptNumber: `RCP${String(i + 1).padStart(6, '0')}`,
        paidDate: new Date(Date.now() - Math.floor(Math.random() * 180) * 24 * 60 * 60 * 1000)
      });
      await finance.save();
    }

    // Create Reports
    console.log('📈 Creating reports...');
    const reportTypes = ['academic', 'financial', 'attendance', 'performance'];
    const admin = await User.findOne({ role: 'admin' });
    
    for (let i = 0; i < 15; i++) {
      const reportType = reportTypes[Math.floor(Math.random() * reportTypes.length)];
      const report = new Report({
        title: `${reportType.charAt(0).toUpperCase() + reportType.slice(1)} Report ${i + 1}`,
        type: reportType,
        description: `Comprehensive ${reportType} analysis for academic year 2024-2025`,
        generatedBy: admin._id,
        data: {
          totalRecords: Math.floor(Math.random() * 1000) + 100,
          summary: `Generated ${reportType} report with detailed analytics`,
          charts: ['bar', 'pie', 'line'],
          metrics: {
            average: Math.floor(Math.random() * 100),
            total: Math.floor(Math.random() * 10000),
            percentage: Math.floor(Math.random() * 100)
          }
        },
        filters: {
          academicYear: '2024-2025',
          dateFrom: new Date('2024-04-01'),
          dateTo: new Date('2025-03-31')
        },
        status: 'completed',
        createdAt: new Date(Date.now() - Math.floor(Math.random() * 90) * 24 * 60 * 60 * 1000)
      });
      await report.save();
    }

    // Create Settings
    console.log('⚙️ Creating settings...');
    const settingsData = [
      { category: 'school', key: 'school_name', value: 'M.M. Vidya Mandir Primary School', description: 'Official school name' },
      { category: 'school', key: 'school_address', value: 'Mumbai, Maharashtra, India', description: 'School address' },
      { category: 'school', key: 'school_phone', value: '+91 98765 43210', description: 'School contact number' },
      { category: 'school', key: 'school_email', value: 'info@mmvidyamandir.edu.in', description: 'School email address' },
      { category: 'academic', key: 'academic_year', value: '2024-2025', description: 'Current academic year' },
      { category: 'academic', key: 'session_start', value: '2024-04-01', description: 'Academic session start date' },
      { category: 'academic', key: 'session_end', value: '2025-03-31', description: 'Academic session end date' },
      { category: 'academic', key: 'working_days', value: 220, description: 'Total working days in academic year' },
      { category: 'finance', key: 'currency', value: 'INR', description: 'School currency' },
      { category: 'finance', key: 'late_fee_percentage', value: 5, description: 'Late fee percentage' },
      { category: 'finance', key: 'discount_limit', value: 20, description: 'Maximum discount percentage' },
      { category: 'notification', key: 'email_notifications', value: true, description: 'Enable email notifications' },
      { category: 'notification', key: 'sms_notifications', value: true, description: 'Enable SMS notifications' },
      { category: 'security', key: 'password_expiry_days', value: 90, description: 'Password expiry in days' },
      { category: 'security', key: 'max_login_attempts', value: 5, description: 'Maximum login attempts' }
    ];
    
    for (const setting of settingsData) {
      const newSetting = new Settings({
        ...setting,
        updatedBy: admin._id
      });
      await newSetting.save();
    }

    console.log('✅ Dummy data seeding completed successfully!');
    console.log('\n📊 Summary:');
    console.log(`👨‍🏫 Teachers: ${teachers.length}`);
    console.log(`👨‍👩‍👧‍👦 Parents: ${parents.length}`);
    console.log(`🎓 Students: ${students.length}`);
    console.log(`📚 Classes: ${classes.length}`);
    console.log(`📞 Contacts: 25`);
    console.log(`📝 Applications: 20`);
    
    console.log('\n🔐 Login Credentials:');
    console.log('Admin: admin@school.com / SecureAdmin@2024');
    console.log('Teachers: [teacher-email] / teacher123');
    console.log('Parents: [parent-email] / parent123');
    console.log('Students: [student-email] / student123');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding dummy data:', error);
    process.exit(1);
  }
};

seedDummyData();