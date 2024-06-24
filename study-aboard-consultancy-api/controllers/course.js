const models = require('../models');

async function createCourse(data) {
    try {
        const course = await models.Course.create(data);
        return course;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

module.exports = {
    createCourse
};
