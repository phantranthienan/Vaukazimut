import axios from "axios";
import { Alert } from "react-native";
import { getId, getToken, clearStorage } from "./handleAsyncStorage";

const apiSource = axios.create({
    baseURL: 'https://django-apis-project-application-a52o4sa8a.vercel.app/api',
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
        const res = await apiSource.get('api/my-event-runner/')
        return res.data;
    } catch (err) {
        console.error("Error fetching my events:", err);
    }
}

const fetchEventDetail = async (eventId) => {
    try {
        const res = await apiSource.get(`api/event-detail-runner/${eventId}/`)
        return res.data;
    } catch (err) {
        console.error("Error fetching event detail:", err);
    }
}

export {
    signUp, signIn, logOut,
    updateAxios, fetchGroups, joinGroup,
    fetchMyEvents, fetchEventDetail
}