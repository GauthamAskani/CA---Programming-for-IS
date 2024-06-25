const models = require('../models');

async function createBroadcast(data) {
    try {
        const broadcast = await models.Broadcast.create(data);
        return broadcast;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

async function updateBroadcast(id, data) {
    try {
        const result = await models.Broadcast.update(data, {
            where: { broadcast_id: id }
        });
        return result;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

async function deleteBroadcast(id) {
    try {
        await models.Broadcast.destroy({
            where: { broadcast_id: id }
        });
        return { message: 'Broadcast deleted successfully' };
    } catch (error) {
        console.log(error);
        throw error;
    }
}

module.exports = {
    createBroadcast,
    updateBroadcast,
    deleteBroadcast
};
