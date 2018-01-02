const API = 'http://192.168.1.111:5000'; //process.env.API || 
const WS = process.env.WS || 'ws://192.168.1.111:4408';
const PROFILE_PIC_PATH = `${API}/files/users/profile/`;
const MYAUTO_PIC_PATH = `${API}/files/users/myauto/`;
const MYAUTO_PIC_PATH_THUMBS = `${API}/files/users/myauto/thumbs/`;

const CacheTime = {
  auth: 100000,

}

export default {
  API,
  WS,
  CacheTime,
  PROFILE_PIC_PATH,
  MYAUTO_PIC_PATH,
  MYAUTO_PIC_PATH_THUMBS,
};