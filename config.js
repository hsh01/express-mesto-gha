require('dotenv').config();

const {
  PORT = 3000,
  BASE_PATH = 'http://localhost',
  MONGODB_URI = 'mongodb://localhost:27017/mestodb',
  JWT_SECRET,
} = process.env;

module.exports = {
  PORT,
  BASE_PATH,
  MONGODB_URI,
  JWT_SECRET,
};
