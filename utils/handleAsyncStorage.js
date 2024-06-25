import AsyncStorage from "@react-native-async-storage/async-storage";

const storeToken = async (value) => {
  try {
    await AsyncStorage.setItem("myToken", value);
  } catch (e) {
    console.log("Error storing token");
    console.error(e);
  }
};

const storeRole = async (value) => {
  try {
    await AsyncStorage.setItem("myRole", value);
  } catch (e) {
    console.log("Error storing role");
    console.error(e);
  }
};

const storeId = async (value) => {
  value = String(value);
  try {
    await AsyncStorage.setItem("myId", value);
  } catch (e) {
    console.log("Error storing id");
    console.error(e);
  }
}

const getToken = async () => {
  try {
    const value = await AsyncStorage.getItem("myToken");
    if (value !== null) {
      return value;
    }
    return null; // Explicitly return null if value is not found
  } catch (e) {
    console.log("Error getting token");
    console.error(e);
    return null; // Explicitly return null in case of error
  }
};

const getRole = async () => {
  try {
    const value = await AsyncStorage.getItem("myRole");
    if (value !== null) {
      return value;
    }
    return null; // Explicitly return null if value is not found
  } catch (e) {
    console.log("Error getting role");
    console.error(e);
    return null; // Explicitly return null in case of error
  }
};

const getId = async () => {
  try {
    const value = await AsyncStorage.getItem("myId");
    if (value !== null) {
      return value;
    }
    return null; // Explicitly return null if value is not found
  } catch (e) {
    console.log("Error getting id");
    console.error(e);
    return null; // Explicitly return null in case of error
  }
}

const clearStorage = async () => {
  try {
    await AsyncStorage.removeItem("myToken");
    await AsyncStorage.removeItem("myRole");
  } catch (e) {
    console.log("Error clearing storage");
    console.error(e);
  }
};

export { storeToken, storeRole, storeId, getToken, getRole, getId, clearStorage };
