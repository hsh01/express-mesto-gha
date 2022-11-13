require('dotenv').config();

const {
  PORT = 3000,
  BASE_PATH = 'http://localhost',
  JWT_SECRET,
} = process.env;

module.exports = {
  PORT,
  BASE_PATH,
  JWT_SECRET,
};
