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

module.exports = {
    createBroadcast
};
