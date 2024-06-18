import axios from "axios";
import { Alert } from "react-native";

const apiSource = axios.create({
    baseURL: 'http://10.0.2.2:8000',
});

const signUp = async (username, email, password, firstName, lastName) => {
    try {
        const res = await apiSource.post('/api/auth/users/', {
            username: username,
            email: email,
            password: password,
            first_name: firstName,
            last_name: lastName,
            department: "STI",
            role: "Runner"
        });
        if (res.data) {
            Alert.alert("Success", "You have successfully signed up");
            return res.data;
        }
    } catch (err) {
        console.error(err);
        Alert.alert("Error", "An error occurred while signing up");
    }
}

export { signUp }