const mongoose = require('mongoose');

const connectToMongo = async (retryCount = 0) => {
    const MAX_RETRIES = 3;
    const RETRY_DELAY = 2000;
    
    try {
        mongoose.set('strictQuery', false);
        
        // Use environment variable or fallback to local connection
        const mongoURI = process.env.MONGO_URI || 
            'mongodb://root:ehj5UFNy2fADEBvCfD5Q9zB1@172.21.85.140:27017/stayhealthybeta1?authSource=admin';
        
        console.log('Attempting MongoDB connection to:', 
            mongoURI.replace(/:[^@]+@/, ':*****@'));

        await mongoose.connect(mongoURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            connectTimeoutMS: 5000, // 5 seconds timeout
            socketTimeoutMS: 45000, // 45 seconds socket timeout
            authSource: 'admin'
        });

        console.log('✅ MongoDB connection established');
        return true;
    } catch (error) {
        console.error('❌ MongoDB connection failed:', error.message);
        
        if (retryCount < MAX_RETRIES - 1) {
            console.log(`Retrying in ${RETRY_DELAY/1000} seconds... (Attempt ${retryCount + 2}/${MAX_RETRIES})`);
            await new Promise(resolve => setTimeout(resolve, RETRY_DELAY));
            return connectToMongo(retryCount + 1);
        }
        
        throw new Error(`Failed to connect after ${MAX_RETRIES} attempts: ${error.message}`);
    }
};

// Connection events for better debugging
mongoose.connection.on('connecting', () => console.log('Connecting to MongoDB...'));
mongoose.connection.on('connected', () => console.log('MongoDB connected'));
mongoose.connection.on('disconnected', () => console.log('MongoDB disconnected'));
mongoose.connection.on('error', (err) => console.error('MongoDB connection error:', err));

module.exports = connectToMongo;