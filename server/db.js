const mongoose = require('mongoose');

// Encode the password in case it contains special characters
const password = encodeURIComponent("oeDfvOpXfCVr8KjNTXd1vLGS");
const mongoURI = `mongodb://root:${password}@172.21.228.79:27017/stayhealthybeta1?authSource=admin`;

const connectToMongo = async (retryCount) => {
    const MAX_RETRIES = 3;
    const count = retryCount ?? 0;
    
    try {
        mongoose.set('strictQuery', false);
        
        console.log('Attempting to connect to MongoDB with URI:', mongoURI.replace(/:[^@]+@/, ':*****@'));
        
        await mongoose.connect(mongoURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            authSource: 'admin' // Important for authentication
        });
        
        console.info('Connected to Mongo Successfully');
        return;
    } catch (error) {
        console.error('MongoDB connection error:', error.message);

        const nextRetryCount = count + 1;
        if (nextRetryCount >= MAX_RETRIES) {
            throw new Error(`Unable to connect to Mongo after ${MAX_RETRIES} attempts: ${error.message}`);
        }

        console.info(`Retrying, retry count: ${nextRetryCount}`);
        await new Promise(resolve => setTimeout(resolve, 2000)); // Add delay between retries
        return await connectToMongo(nextRetryCount);
    }
};

module.exports = connectToMongo;