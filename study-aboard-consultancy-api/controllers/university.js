const models = require('../models');

async function createUniversity(data) {
    try {
        const university = await models.University.create(data);
        return university;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

module.exports = {
    createUniversity
};
