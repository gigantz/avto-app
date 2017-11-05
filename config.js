const API = process.env.API || 'http://192.168.1.111:5000';
const WS = process.env.WS || 'ws://192.168.1.111:4408';

const CacheTime = {
  auth: 100000,

}

export default {
  API,
  WS,
  CacheTime
};