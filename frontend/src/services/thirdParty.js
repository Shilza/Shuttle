import {ipStackKey} from './api'

export const getIp = () => fetch('https://api.ipify.org?format=json');

export const getDataByIp = (ip) => fetch(`http://api.ipstack.com/${ip}?access_key=${ipStackKey}`);
