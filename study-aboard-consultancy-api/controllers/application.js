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

module.exports = {
    createApplication
};
