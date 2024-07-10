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
        return {
            message: "Broadcast Infromation Update Successfully"
        };
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

async function getAllBroadcasts() {
    try {
        const broadcasts = await models.Broadcast.findAll();
        return broadcasts;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

async function getBroadcastMessages() {
    try {
        const today = new Date();
        const broadcasts = await models.Broadcast.findAll({
            where: {
                broadcast_send_date: {
                    [models.Sequelize.Op.lte]: today
                },
                broadcast_expiry_date: {
                    [models.Sequelize.Op.gte]: today
                }
            }
        });
        return broadcasts;
    } catch (error) {
        console.log(error);
        throw error;
    }
}


module.exports = {
    createBroadcast,
    updateBroadcast,
    deleteBroadcast,
    getAllBroadcasts,
    getBroadcastMessages
};
