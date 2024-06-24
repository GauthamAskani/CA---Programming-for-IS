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

async function updateCourse(id, data) {
    try {
        const result = await models.Course.update(data, {
            where: { course_id: id }
        });
        return result;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

module.exports = {
    createCourse,
    updateCourse
};
