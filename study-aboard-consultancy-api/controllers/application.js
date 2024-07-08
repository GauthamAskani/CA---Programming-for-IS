const models = require('../models');

async function createApplication(data) {
    try {
        const existingApplication = await models.Application.findOne({
            where: {
                student_id: data.student_id,
                university_id: data.university_id,
                course_id: data.course_id,
            },
        });

        if (existingApplication) {
            throw new Error('Application already exists for this student, course, and university');
        }

        const application = await models.Application.create(data);
        return {
            message: "Application Request for Course is Successfull"
        };
    } catch (error) {
        console.log(error);
        throw error;
    }
}

async function updateApplication(id, data) {
    try {
        const result = await models.Application.update(data, {
            where: { application_id: id }
        });
        return {
            message: "Application Request Details Updated Successfully"
        };
    } catch (error) {
        console.log(error);
        throw error;
    }
}

async function deleteApplication(id) {
    try {
        await models.Application.destroy({
            where: { application_id: id }
        });
        return { message: 'Application Reqeust Deleted Successfully' };
    } catch (error) {
        console.log(error);
        throw error;
    }
}

async function getApplications(filters) {
    try {
        const where = {
            application_deleted_at: null
        };

        if (filters.student_id) {
            where.student_id = filters.student_id;
        }
        if (filters.university_id) {
            where.university_id = filters.university_id;
        }
        if (filters.course_id) {
            where.course_id = filters.course_id;
        }

        const applications = await models.Application.findAll({
            where: where
        });
        return applications;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

async function updateApplication(data) {
    try {
        const application = await models.Application.findByPk(data.application_id);
        if (!application) {
            throw new Error('Application not found');
        }

        if (data.admin_remarks !== undefined) {
            application.admin_remarks = data.admin_remarks;
        }
        if (data.application_status !== undefined) {
            application.application_status = data.application_status;
        }

        await application.save();
        return {
            message: "Application Status & Remarks Updated Successfully"
        };
    } catch (error) {
        console.log(error);
        throw error;
    }
}

module.exports = {
    createApplication,
    updateApplication,
    deleteApplication,
    getApplications,
    updateApplication
};
