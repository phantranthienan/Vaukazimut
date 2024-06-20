import axios from "axios";
import { Alert } from "react-native";
import { getId, getToken, clearStorage } from "./handleAsyncStorage";

const apiSource = axios.create({
    // baseURL: 'https://project-programmation-version2.vercel.app/api',
    baseURL: 'http://10.0.2.2:8000/api',
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
}

// For log in, log out, sign up

const signUp = async (username, email, password, firstName, lastName, department, secretCode) => {
    try {
        let req = secretCode ? {
            username: username,
            email: email,
            password: password,
            first_name: firstName,
            last_name: lastName,
            department: department,
            role: "Coach",
            secret_code: secretCode
        } : {
            username: username,
            email: email,
            password: password,
            first_name: firstName,
            last_name: lastName,
            department: department,
            role: "Runner",
        }
        const res = await apiSource.post('/auth/users/', req);
        console.log(res.data);
        if (res.data.data) {
            Alert.alert(res.data.message + " Please sign in.");
        }
        return res
    } catch (err) {
        console.log(err.response.data);
        if (err.response.data) {
            Alert.alert(err.response.data.message);
        } else {
            Alert.alert("An unexpected error occurred.");
        }
        console.error(err);
    }
}

const signIn = async (username, password) => {
    try {
        let req = {
            username: username,
            password: password,
        }
        const res = await apiSource.post('/auth/token/login/', req);
        return res
    } catch (err) {
        console.error(err);
    }
}

const logOut = async () => {
    try {
        const res = await apiSource.post('/auth/token/logout/');
        await clearStorage();
        updateAxios();
        Alert.alert(res.data.message)
    } catch (err) {
        console.error(err);
    }
}

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
        }
        const res = await apiSource.post('/join-group/', req);
        return res
    } catch (err) {
        console.log("Error joining group:", err);
    }
}

const fetchMyEvents = async () => {
    try {
        const res = await apiSource.get('/my-event-runner/')
        return res.data;
    } catch (err) {
        console.error("Error fetching my events:", err);
    }
}

const fetchEventDetail = async (eventId) => {
    try {
        const res = await apiSource.get(`/event-detail-runner/${eventId}/`)
        return res.data;
    } catch (err) {
        console.error("Error fetching event detail:", err);
    }
}

// Handle map student

const fetchRaceDetails = async (raceId) => {
    try {
        const res = await apiSource.get(`/race-runner/${raceId}/`)
        return res.data;
    }
    catch (err) {
        console.error("Error fetching race details:", err);
    }
}

const recordCheckpoint = async (number, longitude, latitude, id) => {
    console.log(id)
    let body = {
        number: number,
        longitude: longitude,
        latitude: latitude,
        race_runner_id: id
    }
    try {
        const res = await apiSource.post('/record-checkpoint/', body)
        console.log("Validate Success", res.data)
        return res.data;
    } catch (err) {
        console.log("Error recording checkpoint", err.response.data)
        Alert.alert(err.response.data.message, "Terminate the race to get result.")
    }
}

const startRace = async (raceId) => {
    console.log("race id:", raceId)
    try {
        const res = await apiSource.post(`/start-race/`, {race_id: raceId});
        return res.data;
    } catch(err) {
        console.error("Error starting race:", err);
        Alert.alert(err.response.data.message);
    }
}

const terminateRace = async (id, total_time) => {
    let body = {
        race_runner_id: id,
        total_time: total_time
    }
    try {
        const res = await apiSource.patch('/end-race-runner/', body);
        return res.data;
    } catch (err) {
        console.error("Error terminating race:", err);
    }
}

const fetchMyEventResult = async (eventId) => {
    try {
        const response = await apiSource.get(`/my-score/${eventId}/`);
        return response.data;
      } catch (error) {
        console.log("Failed to fetch score", error);
        Alert.alert("Failed to fetch score. Please try again.");
      }
}



export {
    signUp, signIn, logOut,
    updateAxios, fetchGroups, joinGroup,
    fetchMyEvents, fetchEventDetail, fetchMyEventResult,
    fetchRaceDetails, recordCheckpoint, terminateRace, startRace
}