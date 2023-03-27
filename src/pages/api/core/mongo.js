const mongoose = require('mongoose');
mongoose.set('strictQuery', false);

var isConnected;

const connectToDatabase = async () => {
    if (isConnected) return isConnected;
    try {
        let db = await mongoose.connect(process.env.NEXT_PUBLIC_DB, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        isConnected = db.connections[0].readyState;
    } catch (e) {
        console.error("error: ", e);
        isConnected = 0;
    }
    return isConnected;
};

const disconnect = async () => {
    await mongoose.disconnect();
}

module.exports = { connectToDatabase, disconnect };