import axios from "axios";
import { Alert } from "react-native";

const apiSource = axios.create({
    baseURL: 'http://10.0.2.2:8000',
});

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
        const res = await apiSource.post('/api/auth/users/', req);
        console.log(res.data);
        if (res.data.data) {
            Alert.alert(res.data.message);
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
        const res = await apiSource.post('/api/auth/token/login/', req);
        return res
    } catch (err) {
        console.error(err);
    }
}

export { signUp, signIn }