import axios from 'axios';
import { Alert } from 'react-native';
import { getId, getToken, clearStorage } from './handleAsyncStorage';

const apiSource = axios.create({
  baseURL:
    'https://django-apis-project-application-a52o4sa8a.vercel.app/?fbclid=IwZXh0bgNhZW0CMTAAAR2M--qsgSVdscWZMS3IJxuHWSGkYErbcQKJNz3FaBoCUCDrHSq9iObLCvE_aem_ZmFrZWR1bW15MTZieXRlcw'
});

const updateAxios = () => {
  apiSource.interceptors.request.use(
    async (config) => {
      const token = await getToken();
      if (token) {
        config.headers.Authorization = `Token ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
};

const signUp = async (
  username,
  email,
  password,
  firstName,
  lastName,
  department,
  secretCode
) => {
  try {
    let req = secretCode
      ? {
          username: username,
          email: email,
          password: password,
          first_name: firstName,
          last_name: lastName,
          department: department,
          role: 'Coach',
          secret_code: secretCode
        }
      : {
          username: username,
          email: email,
          password: password,
          first_name: firstName,
          last_name: lastName,
          department: department,
          role: 'Runner'
        };
    const res = await apiSource.post('/api/auth/users/', req);
    console.log(res.data);
    if (res.data.data) {
      Alert.alert(res.data.message + ' Please sign in.');
    }
    return res;
  } catch (err) {
    console.log(err.response.data);
    if (err.response.data) {
      Alert.alert(err.response.data.message);
    } else {
      Alert.alert('An unexpected error occurred.');
    }
    console.error(err);
  }
};

const signIn = async (username, password) => {
  try {
    let req = {
      username: username,
      password: password
    };
    const res = await apiSource.post('/api/auth/token/login/', req);
    return res;
  } catch (err) {
    console.error(err);
  }
};

const logOut = async () => {
  try {
    const res = await apiSource.post('/api/auth/token/logout/');
    await clearStorage();
    updateAxios();
    Alert.alert(res.data.message);
  } catch (err) {
    console.error(err);
  }
};

const fetchGroups = async () => {
  try {
    const response = await apiSource.get('/api/group-runners-coach/');
    return response.data;
  } catch (error) {
    console.error('Error fetching groups:', error);
  }
};

const postGroup = async (name, department) => {
  try {
    let req = {
      name: name,
      department: department
    };
    const res = await apiSource.post('/api/group-runners-coach/', req);
    console.log(res.data);
    return res;
  } catch (err) {
    console.log(err.response.data);
    if (err.response.data) {
      Alert.alert(err.response.data.message);
    } else {
      Alert.alert('An unexpected error occurred.');
    }
    console.error(err);
  }
};

const joinGroup = async (groupId) => {
  id = await getId();
  id = parseInt(id);
  try {
    let req = {
      runner_id: id,
      group_id: groupId
    };
    const res = await apiSource.post('/api/join-group/', req);
    return res;
  } catch (err) {
    console.log('Error joining group:', err);
  }
};

const fetchMyEvents = async () => {
  try {
    const res = await apiSource.get('api/my-event-runner/');
    return res.data;
  } catch (err) {
    console.error('Error fetching my events:', err);
  }
};

const fetchEventDetail = async (eventId) => {
  try {
    const res = await apiSource.get(`api/event-detail-runner/${eventId}/`);
    return res.data;
  } catch (err) {
    console.error('Error fetching event detail:', err);
  }
};

export {
  signUp,
  signIn,
  logOut,
  updateAxios,
  postGroup,
  fetchGroups,
  joinGroup,
  fetchMyEvents,
  fetchEventDetail
};
