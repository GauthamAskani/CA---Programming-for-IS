const models = require('../models');

async function createUniversity(data) {
    try {
        const university = await models.University.create(data);
        return {
            message: "University Created Successfully"
        };
    } catch (error) {
        console.log(error);
        throw error;
    }
}

async function updateUniversity(id, data) {
    try {
        const result = await models.University.update(data, {
            where: { university_id: id }
        });
        return {
            message: "University Details Update Successfull"
        };
    } catch (error) {
        console.log(error);
        throw error;
    }
}

async function deleteUniversity(id) {
    try {
        await models.University.destroy({
            where: { university_id: id }
        });
        return { message: 'University deleted successfully' };
    } catch (error) {
        console.log(error);
        throw error;
    }
}

async function getAllUniversities() {
    try {
        const universities = await models.University.findAll();
        return universities;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

module.exports = {
    createUniversity,
    updateUniversity,
    deleteUniversity,
    getAllUniversities
};
