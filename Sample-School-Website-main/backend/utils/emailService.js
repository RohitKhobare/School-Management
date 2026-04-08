import nodemailer from "nodemailer";

// Create transporter
const createTransporter = () => {
  const emailUser = process.env.EMAIL_USER || 'siddheshj077@gmail.com';
  const emailPass = process.env.EMAIL_PASS;
  
  console.log('Email config check:');
  console.log('- Email User:', emailUser);
  console.log('- Email Pass length:', emailPass ? emailPass.length : 0);
  
  if (!emailPass || emailPass === 'your-gmail-app-password') {
    console.warn('⚠️  Email service not configured properly. Please set EMAIL_PASS in .env file');
    return null;
  }
  
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: emailUser,
        pass: emailPass.replace(/\s/g, ''), // Remove any spaces from app password
      },
    });
    
    console.log('✅ Email transporter created successfully');
    return transporter;
  } catch (error) {
    console.error('❌ Failed to create email transporter:', error);
    return null;
  }
};

// Send contact form notification to admin
export const sendContactNotification = async (contactData) => {
  try {
    const transporter = createTransporter();
    
    if (!transporter) {
      console.log('❌ Email service not configured - contact form data:');
      console.log('Name:', contactData.name);
      console.log('Email:', contactData.email);
      console.log('Subject:', contactData.subject);
      console.log('Message:', contactData.message);
      return false;
    }

    const mailOptions = {
      from: process.env.EMAIL_USER || 'siddheshj077@gmail.com',
      to: 'siddheshj077@gmail.com',
      subject: `Contact Form: ${contactData.subject}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${contactData.name}</p>
        <p><strong>Email:</strong> ${contactData.email}</p>
        <p><strong>Phone:</strong> ${contactData.phone || 'Not provided'}</p>
        <p><strong>Subject:</strong> ${contactData.subject}</p>
        <p><strong>Message:</strong></p>
        <p>${contactData.message}</p>
        <p><strong>Submitted:</strong> ${new Date().toLocaleString()}</p>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log('Contact form email sent to siddheshj077@gmail.com');
    return true;
  } catch (error) {
    console.error('Contact email error:', error);
    return false;
  }
};

// Send application notification to admin
export const sendApplicationNotification = async (applicationData) => {
  try {
    const transporter = createTransporter();
    
    if (!transporter) {
      console.log('❌ Email service not configured - application data:');
      console.log('Student:', applicationData.studentName);
      console.log('Parent:', applicationData.parentName);
      console.log('Email:', applicationData.email);
      console.log('Phone:', applicationData.phone);
      console.log('Grade:', applicationData.grade);
      return false;
    }

    const mailOptions = {
      from: process.env.EMAIL_USER || 'siddheshj077@gmail.com',
      to: 'siddheshj077@gmail.com',
      subject: `New Admission Application - ${applicationData.studentName}`,
      html: `
        <h2>New Admission Application</h2>
        <h3>Student Information:</h3>
        <p><strong>Student Name:</strong> ${applicationData.studentName}</p>
        <p><strong>Parent/Guardian:</strong> ${applicationData.parentName}</p>
        <p><strong>Email:</strong> ${applicationData.email}</p>
        <p><strong>Phone:</strong> ${applicationData.phone}</p>
        <p><strong>Grade Applied:</strong> ${applicationData.grade}</p>
        <p><strong>Date of Birth:</strong> ${new Date(applicationData.dateOfBirth).toLocaleDateString()}</p>
        <p><strong>Previous School:</strong> ${applicationData.previousSchool}</p>
        <p><strong>Address:</strong> ${applicationData.address}</p>
        <p><strong>Medical Information:</strong> ${applicationData.medicalInfo}</p>
        <p><strong>Submitted:</strong> ${applicationData.submittedAt.toLocaleString()}</p>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log('Application email sent to siddheshj077@gmail.com');
    return true;
  } catch (error) {
    console.error('Application email error:', error);
    return false;
  }
};