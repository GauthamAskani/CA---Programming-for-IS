const models = require('../models');

async function createCourse(data) {
    try {
        const course = await models.Course.create(data);
        return {
            message: "Created Course Successfully"
        };
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
        return {
            message: "Course Details Update Successfull"
        };
    } catch (error) {
        console.log(error);
        throw error;
    }
}

async function deleteCourse(id) {
    try {
        await models.Course.destroy({
            where: { course_id: id }
        });
        return { message: 'Course deleted successfully' };
    } catch (error) {
        console.log(error);
        throw error;
    }
}

async function getCoursesByUniversity(university_id) {
    try {
        const courses = await models.Course.findAll({
            where: { university_id: university_id }
        });
        return courses;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

module.exports = {
    createCourse,
    updateCourse,
    deleteCourse,
    getCoursesByUniversity
};
