import axios from 'axios';
import { Alert } from 'react-native';
import { getId, getToken, clearStorage } from './handleAsyncStorage';

const apiSource = axios.create({
  baseURL: 'https://project-programmation-version2.vercel.app/api'
  // baseURL: 'http://10.0.2.2:8000/api',
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

// For log in, log out, sign up

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
    const res = await apiSource.post('/auth/users/', req);
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
    const res = await apiSource.post('/auth/token/login/', req);
    return res;
  } catch (err) {
    console.error(err);
  }
};

const logOut = async () => {
  try {
    const res = await apiSource.post('/auth/token/logout/');
    await clearStorage();
    updateAxios();
    Alert.alert(res.data.message);
  } catch (err) {
    console.error(err);
  }
};

// Handle group and event

const fetchGroups = async () => {
  try {
    const response = await apiSource.get('/group-runners-coach/');
    return response.data;
  } catch (error) {
    console.error('Error fetching groups:', error);
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
    const res = await apiSource.post('/join-group/', req);
    return res;
  } catch (err) {
    console.log('Error joining group:', err);
  }
};

const fetchMyEvents = async () => {
  try {
    const res = await apiSource.get('/my-event-runner/');
    return res.data;
  } catch (err) {
    console.error('Error fetching my events:', err);
  }
};

const fetchEventDetail = async (eventId) => {
  try {
    const res = await apiSource.get(`/event-detail-runner/${eventId}/`);
    return res.data;
  } catch (err) {
    console.error('Error fetching event detail:', err);
  }
};

// Handle map student

const fetchRaceDetails = async (raceId) => {
  try {
    const res = await apiSource.get(`/race-runner/${raceId}/`);
    return res.data;
  } catch (err) {
    console.error('Error fetching race details:', err);
  }
};

const recordCheckpoint = async (number, longitude, latitude, id) => {
  console.log(id);
  let body = {
    number: number,
    longitude: longitude,
    latitude: latitude,
    race_runner_id: id
  };
  try {
    const res = await apiSource.post('/record-checkpoint/', body);
    console.log('Validate Success', res.data);
    return res.data;
  } catch (err) {
    console.log('Error recording checkpoint', err.response.data);
    Alert.alert(err.response.data.message, 'Terminate the race to get result.');
  }
};

const startRace = async (raceId) => {
  console.log('race id:', raceId);
  try {
    const res = await apiSource.post(`/start-race/`, { race_id: raceId });
    return res.data;
  } catch (err) {
    console.error('Error starting race:', err);
    Alert.alert(err.response.data.message);
  }
};

const terminateRace = async (id, total_time) => {
  let body = {
    race_runner_id: id,
    total_time: total_time
  };
  try {
    const res = await apiSource.patch('/end-race-runner/', body);
    return res.data;
  } catch (err) {
    console.error('Error terminating race:', err);
  }
};

const fetchMyEventResult = async (eventId) => {
  try {
    const response = await apiSource.get(`/my-score/${eventId}/`);
    return response.data;
  } catch (error) {
    console.log('Failed to fetch score', error);
    Alert.alert('Failed to fetch score. Please try again.');
  }
};

//******************* Fetch Data for Coach ********************/
const fetchCoachGroups = async () => {
  try {
    const res = await apiSource.get('/group-runners-coach/');
    return res.data;
  } catch (err) {
    console.log('Error fetching groups:', err);
    Alert.alert(err.response.data.message);
  }
};

const createGroup = async (name, department) => {
  try {
    const res = await apiSource.post('/group-runners-coach/', {
      name: name,
      department: department
    });
    return res.data;
  } catch (err) {
    console.log('Error creating group:', err);
    Alert.alert(err.response.data.message);
  }
};

const fetchCoachEvents = async () => {
  try {
    const res = await apiSource.get('/events-coach/');
    return res.data;
  } catch (err) {
    console.log('Error fetching my events:', err);
    Alert.alert(err.response.data.message);
  }
};

const createEvent = async (
  name,
  start,
  end,
  location_id,
  group_runner_id,
  department
) => {
  id = await getId();
  id = parseInt(id);

  try {
    let req = {
      name: name,
      start: start,
      end: end,
      location_id: location_id,
      coach_id: id,
      group_runner_id: group_runner_id,
      department: 'STI',
      publish: true
    };
    const res = await apiSource.post('/events-coach/', req);
    const token = await getToken();
    console.log(token);
    // console.log(res.data);
    return res;
  } catch (err) {
    console.log('Error creating event details:', err);
  }
};

const fetchCoachEventDetail = async (eventId) => {
  try {
    const res = await apiSource.get(`/events-coach/${eventId}/`);
    return res.data;
  } catch (err) {
    console.error('Error fetching event detail:', err);
  }
};

const fetchCoachResults = async (eventId) => {
  try {
    const res = await apiSource.get(`/score-total/${eventId}/`);
    return res.data;
  } catch (err) {
    console.error('Error fetching results:', err);
    Alert.alert(err.response.data.message);
  }
};

const fetchLocations = async () => {
  try {
    const res = await apiSource.get('/locations/');
    return res.data;
  } catch (err) {
    console.log('Error fetching locations:', err);
    Alert.alert(err.response.data.message);
  }
};

const createLocation = async (name, longitude, latitude) => {
  let body = {
    name: name,
    longitude: longitude,
    latitude: latitude
  };
  try {
    const res = await apiSource.post('/locations/', body);
    return res.data;
  } catch (err) {
    console.log('Error creating location:', err);
    Alert.alert(err.response.data.message);
  }
};
const saveListCheckpoints = async (raceId, checkpoints) => {
  const transformedCheckpoints = checkpoints.map((checkpoint) => ({
    number: checkpoint.number,
    longitude: checkpoint.longitude,
    latitude: checkpoint.latitude,
    score: checkpoint.score
  }));
  // const jsonCheckpoints = JSON.stringify(transformedCheckpoints);
  try {
    // console.log("Checkpoints:", JSON.stringify({
    //     race_id: raceId,
    //     checkpoints: transformedCheckpoints
    // }));
    const res = await apiSource.post(`/save-list-checkpoint/`, {
      race_id: raceId,
      checkpoints: transformedCheckpoints
    });
    Alert.alert(res.data.message);
    return res.data;
  } catch (err) {
    console.error('Error saving list checkpoints:', err);
    Alert.alert('Error saving list checkpoints:', err.response.data.message);
  }
};

const fetchCoachRaceDetails = async (raceId) => {
  try {
    const res = await apiSource.get(`/race-coach/${raceId}/`);
    return res.data;
  } catch (err) {
    console.error('Error fetching race details:', err);
  }
};

const createRace = async (
  eventId,
  raceName,
  timeLimit,
  raceType = 'Normal'
) => {
  let body = {
    event_id: eventId,
    name: raceName,
    time_limit: timeLimit,
    race_type_name: raceType
  };
  try {
    const res = await apiSource.post(`/create-race/`, body);
    return res.data;
  } catch (err) {
    console.error('Error creating race:', err);
    Alert.alert(err.response.data.message);
  }
};

export {
  signUp,
  signIn,
  logOut,
  updateAxios,
  fetchGroups,
  joinGroup,
  fetchMyEvents,
  fetchEventDetail,
  fetchMyEventResult,
  fetchRaceDetails,
  recordCheckpoint,
  terminateRace,
  startRace,
  fetchCoachEvents,
  fetchCoachGroups,
  fetchLocations,
  fetchCoachEventDetail,
  fetchCoachResults,
  createGroup,
  createLocation,
  createEvent,
  saveListCheckpoints,
  fetchCoachRaceDetails,
  createRace
};
