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

module.exports = {
    createApplication,
    updateApplication,
    deleteApplication
};
