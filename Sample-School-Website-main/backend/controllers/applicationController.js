import Application from '../models/application.js';
import { sendApplicationNotification } from '../utils/emailService.js';

// Submit application form
export const submitApplication = async (req, res) => {
  try {
    const {
      studentName,
      parentName,
      email,
      phone,
      address,
      dateOfBirth,
      grade,
      previousSchool,
      medicalInfo
    } = req.body;

    // Validate required fields
    if (!studentName || !parentName || !email || !phone || !address || !dateOfBirth || !grade) {
      return res.status(400).json({
        success: false,
        message: 'Please fill in all required fields'
      });
    }

    // Create application submission
    const applicationSubmission = await Application.create({
      studentName: studentName.trim(),
      parentName: parentName.trim(),
      email: email.toLowerCase().trim(),
      phone: phone.trim(),
      address: address.trim(),
      dateOfBirth: new Date(dateOfBirth),
      grade,
      previousSchool: previousSchool?.trim() || '',
      medicalInfo: medicalInfo?.trim() || '',
      status: 'pending'
    });

    // Prepare application data for email
    const applicationData = {
      studentName,
      parentName,
      email,
      phone,
      address,
      dateOfBirth,
      grade,
      previousSchool: previousSchool || 'Not specified',
      medicalInfo: medicalInfo || 'None specified',
      submittedAt: new Date()
    };

    // Send application to admin email
    await sendApplicationNotification(applicationData);

    res.status(201).json({
      success: true,
      message: 'Application submitted successfully! We will contact you soon.',
      data: {
        id: applicationSubmission._id,
        submittedAt: applicationSubmission.createdAt
      }
    });

  } catch (error) {
    console.error('Application submission error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to submit application. Please try again.'
    });
  }
};

// Get all applications (admin only)
export const getAllApplications = async (req, res) => {
  try {
    const { status, page = 1, limit = 10 } = req.query;
    
    const filter = {};
    if (status && ['pending', 'under_review', 'approved', 'rejected'].includes(status)) {
      filter.status = status;
    }

    const applications = await Application.find(filter)
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const totalApplications = await Application.countDocuments(filter);

    return res.status(200).json({
      success: true,
      message: 'Applications retrieved successfully',
      data: {
        applications,
        pagination: {
          currentPage: parseInt(page),
          totalPages: Math.ceil(totalApplications / limit),
          totalApplications,
          hasNext: page * limit < totalApplications,
          hasPrev: page > 1,
        },
      }
    });
  } catch (error) {
    console.error('Get applications error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to retrieve applications.'
    });
  }
};

// Update application status (admin only)
export const updateApplicationStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, adminNotes } = req.body;

    const updateData = {};
    if (status && ['pending', 'under_review', 'approved', 'rejected'].includes(status)) {
      updateData.status = status;
      updateData.reviewedAt = new Date();
    }
    if (adminNotes) {
      updateData.adminNotes = adminNotes;
    }

    const updatedApplication = await Application.findByIdAndUpdate(
      id,
      updateData,
      { new: true }
    );

    if (!updatedApplication) {
      return res.status(404).json({
        success: false,
        message: 'Application not found.'
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Application status updated successfully',
      data: updatedApplication
    });
  } catch (error) {
    console.error('Update application status error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to update application status.'
    });
  }
};

// Delete application (admin only)
export const deleteApplication = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedApplication = await Application.findByIdAndDelete(id);

    if (!deletedApplication) {
      return res.status(404).json({
        success: false,
        message: 'Application not found.'
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Application deleted successfully'
    });
  } catch (error) {
    console.error('Delete application error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to delete application.'
    });
  }
};