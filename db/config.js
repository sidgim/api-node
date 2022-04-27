const mongoose = require('mongoose');

const dbConnection = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_CNN_ATLAS);

    } catch (e) {
        console.log(e)
        throw new Error('Error en la base de datos')
    }
}

module.exports = {
    dbConnection
}
