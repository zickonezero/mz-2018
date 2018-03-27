import axios from 'axios';

const config = axios.create({
    baseURL: 'https://mz-portfolio.firebaseio.com/'
});

export default config;
