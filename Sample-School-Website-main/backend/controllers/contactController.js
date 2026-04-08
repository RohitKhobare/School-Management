import Contact from "../models/contact.js";
import { errorResponse, successResponse } from "../utils/errorHandler.js";
import { sendContactNotification } from "../utils/emailService.js";

// Submit contact form (public endpoint)
export const submitContactForm = async (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body;

    // Validation
    if (!name || !email || !subject || !message) {
      return errorResponse(res, 400, "Name, email, subject, and message are required.");
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return errorResponse(res, 400, "Please provide a valid email address.");
    }

    // Message length validation
    if (message.length < 10) {
      return errorResponse(res, 400, "Message must be at least 10 characters long.");
    }

    // Create contact submission
    const contactSubmission = await Contact.create({
      name: name.trim(),
      email: email.toLowerCase().trim(),
      phone: phone?.trim() || null,
      subject,
      message: message.trim(),
    });

    // Send notification to siddheshj077@gmail.com
    await sendContactNotification({
      name: contactSubmission.name,
      email: contactSubmission.email,
      phone: contactSubmission.phone,
      subject: contactSubmission.subject,
      message: contactSubmission.message,
    });

    return successResponse(res, 201, "Your message has been sent successfully! We'll get back to you soon.", {
      id: contactSubmission._id,
      submittedAt: contactSubmission.createdAt,
    });
  } catch (error) {
    console.error("Contact form submission error:", error);
    return errorResponse(res, 500, "Failed to submit your message. Please try again.");
  }
};

// Get all contact submissions (admin only)
export const getAllContacts = async (req, res) => {
  try {
    const { status, page = 1, limit = 10 } = req.query;
    
    const filter = {};
    if (status && ["pending", "in-progress", "resolved"].includes(status)) {
      filter.status = status;
    }

    const contacts = await Contact.find(filter)
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const totalContacts = await Contact.countDocuments(filter);

    return successResponse(res, 200, "Contact submissions retrieved successfully", {
      contacts,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(totalContacts / limit),
        totalContacts,
        hasNext: page * limit < totalContacts,
        hasPrev: page > 1,
      },
    });
  } catch (error) {
    console.error("Get contacts error:", error);
    return errorResponse(res, 500, "Failed to retrieve contact submissions.");
  }
};

// Get contact statistics (admin only)
export const getContactStats = async (req, res) => {
  try {
    const totalContacts = await Contact.countDocuments();
    const pendingContacts = await Contact.countDocuments({ status: "pending" });
    const inProgressContacts = await Contact.countDocuments({ status: "in-progress" });
    const resolvedContacts = await Contact.countDocuments({ status: "resolved" });
    const unreadContacts = await Contact.countDocuments({ isRead: false });

    // Get contacts by subject for chart data
    const contactsBySubject = await Contact.aggregate([
      {
        $group: {
          _id: "$subject",
          count: { $sum: 1 },
        },
      },
      {
        $sort: { count: -1 },
      },
    ]);

    // Get recent contacts (last 7 days)
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    const recentContacts = await Contact.countDocuments({
      createdAt: { $gte: sevenDaysAgo },
    });

    return successResponse(res, 200, "Contact statistics retrieved successfully", {
      stats: {
        total: totalContacts,
        pending: pendingContacts,
        inProgress: inProgressContacts,
        resolved: resolvedContacts,
        unread: unreadContacts,
        recent: recentContacts,
      },
      chartData: {
        bySubject: contactsBySubject.map(item => ({
          subject: item._id,
          count: item.count,
        })),
      },
    });
  } catch (error) {
    console.error("Get contact stats error:", error);
    return errorResponse(res, 500, "Failed to retrieve contact statistics.");
  }
};

// Update contact status (admin only)
export const updateContactStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, isRead } = req.body;

    const updateData = {};
    if (status && ["pending", "in-progress", "resolved"].includes(status)) {
      updateData.status = status;
    }
    if (typeof isRead === "boolean") {
      updateData.isRead = isRead;
    }

    const updatedContact = await Contact.findByIdAndUpdate(
      id,
      updateData,
      { new: true }
    );

    if (!updatedContact) {
      return errorResponse(res, 404, "Contact submission not found.");
    }

    return successResponse(res, 200, "Contact status updated successfully", updatedContact);
  } catch (error) {
    console.error("Update contact status error:", error);
    return errorResponse(res, 500, "Failed to update contact status.");
  }
};

// Delete contact submission (admin only)
export const deleteContact = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedContact = await Contact.findByIdAndDelete(id);

    if (!deletedContact) {
      return errorResponse(res, 404, "Contact submission not found.");
    }

    return successResponse(res, 200, "Contact submission deleted successfully");
  } catch (error) {
    console.error("Delete contact error:", error);
    return errorResponse(res, 500, "Failed to delete contact submission.");
  }
};