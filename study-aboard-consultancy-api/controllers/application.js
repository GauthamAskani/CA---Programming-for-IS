const models = require('../models');

async function createApplication(data) {
    try {
        const application = await models.Application.create(data);
        return application;
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
        return result;
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
        return { message: 'Application deleted successfully' };
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

module.exports = {
    createApplication,
    updateApplication,
    deleteApplication,
    getApplications
};
