import User from "../models/user.js";
import Student from "../models/student.js";
import Teacher from "../models/teacher.js";
import Parent from "../models/parent.js";
import Contact from "../models/contact.js";
import { errorResponse, successResponse } from "../utils/errorHandler.js";

// Get comprehensive statistics for charts and analytics
export const getStatistics = async (req, res) => {
  try {
    const userRole = req.user.role;

    // Base statistics available to all roles
    const baseStats = {
      totalUsers: await User.countDocuments(),
      totalStudents: await Student.countDocuments(),
      totalTeachers: await Teacher.countDocuments(),
      totalParents: await Parent.countDocuments(),
    };

    // User growth over last 6 months
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

    const userGrowthData = await User.aggregate([
      {
        $match: {
          createdAt: { $gte: sixMonthsAgo }
        }
      },
      {
        $group: {
          _id: {
            year: { $year: "$createdAt" },
            month: { $month: "$createdAt" }
          },
          count: { $sum: 1 }
        }
      },
      {
        $sort: { "_id.year": 1, "_id.month": 1 }
      }
    ]);

    // Role distribution
    const roleDistribution = await User.aggregate([
      {
        $group: {
          _id: "$role",
          count: { $sum: 1 }
        }
      }
    ]);

    // Students by class distribution
    const studentsByClass = await Student.aggregate([
      {
        $group: {
          _id: "$class",
          count: { $sum: 1 }
        }
      },
      {
        $sort: { count: -1 }
      }
    ]);

    let roleSpecificData = {};

    // Role-specific statistics
    switch (userRole) {
      case 'admin':
        // Contact form statistics
        const contactStats = await Contact.aggregate([
          {
            $group: {
              _id: "$subject",
              count: { $sum: 1 }
            }
          }
        ]);

        // Recent activity (last 30 days)
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

        const recentActivity = {
          newStudents: await Student.countDocuments({ createdAt: { $gte: thirtyDaysAgo } }),
          newTeachers: await Teacher.countDocuments({ createdAt: { $gte: thirtyDaysAgo } }),
          newParents: await Parent.countDocuments({ createdAt: { $gte: thirtyDaysAgo } }),
          contactSubmissions: await Contact.countDocuments({ createdAt: { $gte: thirtyDaysAgo } }),
        };

        roleSpecificData = {
          contactStats: contactStats.map(item => ({
            subject: item._id,
            count: item.count
          })),
          recentActivity,
          pendingContacts: await Contact.countDocuments({ status: 'pending' }),
        };
        break;

      case 'teacher':
        const teacherId = req.user.id;
        const teacher = await Teacher.findOne({ userAccount: teacherId });
        
        if (teacher) {
          const assignedClasses = teacher.classesAssigned.map(c => c.class);
          const myStudents = await Student.find({ class: { $in: assignedClasses } });
          
          roleSpecificData = {
            myStudentsCount: myStudents.length,
            classesTaught: teacher.classesAssigned.length,
            studentsByClass: teacher.classesAssigned.map(cls => ({
              class: `${cls.class}-${cls.section}`,
              count: myStudents.filter(s => s.class === cls.class && s.section === cls.section).length
            }))
          };
        }
        break;

      case 'parent':
        const parentId = req.user.id;
        const parent = await Parent.findOne({ userAccount: parentId }).populate('linkedStudents');
        
        if (parent) {
          roleSpecificData = {
            childrenCount: parent.linkedStudents.length,
            childrenClasses: parent.linkedStudents.map(child => ({
              name: child.name,
              class: `${child.class}-${child.section}`,
              rollNumber: child.rollNumber
            }))
          };
        }
        break;

      case 'student':
        const studentId = req.user.id;
        const student = await Student.findOne({ userAccount: studentId });
        
        if (student) {
          const classmates = await Student.countDocuments({ 
            class: student.class, 
            section: student.section 
          });
          
          roleSpecificData = {
            myClass: `${student.class}-${student.section}`,
            classmates: classmates - 1, // Exclude self
            rollNumber: student.rollNumber
          };
        }
        break;
    }

    const statisticsData = {
      baseStats,
      chartData: {
        userGrowth: userGrowthData.map(item => ({
          month: `${item._id.year}-${String(item._id.month).padStart(2, '0')}`,
          users: item.count
        })),
        roleDistribution: roleDistribution.map(item => ({
          role: item._id,
          count: item.count
        })),
        studentsByClass: studentsByClass.map(item => ({
          class: item._id,
          students: item.count
        }))
      },
      roleSpecific: roleSpecificData
    };

    return successResponse(res, 200, "Statistics retrieved successfully", statisticsData);
  } catch (error) {
    console.error("Statistics error:", error);
    return errorResponse(res, 500, "Failed to retrieve statistics");
  }
};