export const API_URL = 
    process.env.NODE_ENV === 'production' 
    ? 'https://tetris-capstone-api.herokuapp.com'
    : 'http://localhost:5050';
