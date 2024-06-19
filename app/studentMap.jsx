import {
  Modal,
  Button,
  View,
  Text,
  Image,
  StyleSheet,
  Alert,
  TextInput,
  Platform,
  PermissionsAndroid
} from "react-native";
import MapView, { PROVIDER_GOOGLE, Marker, Circle } from "react-native-maps";
import React, { useState, useEffect, useRef } from "react";

import {
  INSA_CVL,
  STADE_JUSTICE,
  LAC_DAURON,
  CREPS,
  MAP_STYLE,
} from "../constants/map";

import IconButton from "../components/IconButton";
import { icons } from "../constants";
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";

const StudentMap = () => {
  const [region, setRegion] = useState(INSA_CVL);
  const [userLocation, setUserLocation] = useState(null);
  const [isStarted, setIsStarted] = useState(false);
  const [isTerminated, setIsTerminated] = useState(false);
  const [validatedBalises, setValidatedBalises] = useState([]);
  const [time, setTime] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [baliseToValidate, setBaliseToValidate] = useState("");
  const [baliseInput, setBaliseInput] = useState('');

  const timerRef = useRef(null);

  // Array of markers with number, points, and location (latitude, longitude)
  const markers = [
    {
      number: 1,
      points: 10,
      latitude: 47.082353,
      longitude: 2.415264,
    },
    {
      number: 2,
      points: 10,
      latitude: 47.081773,
      longitude: 2.416305,
    },
    {
      number: 3,
      points: 10,
      latitude: 47.081642,
      longitude: 2.415474,
    },
  ];

  // Request location permissions and get the initial location
  useEffect(() => requestLocationPermission(), []);

  const requestLocationPermission = async () => {
    try {
      if (Platfromm.OS === 'androind') {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: "Location Permission",
            message: "This app requires access to your location.",
            buttonNeutral: "Ask Me Later",
            buttonNegative: "Cancel",
            buttonPositive: "OK",
          }
        );

        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log("Location permission granted");
          getUserLocation();
        } else {
          Alert.alert("Location permission denied", "Please enable location services to use the app.");
        }
      } else {
        getUserLocation();
      }
    } catch (error) {
      console.error("Error requesting location permission:", error);
    }
  }

  const getUserLocation = () => {
    Geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setUserLocation({ latitude, longitude });
      },
      (error) => {
        console.error("Error getting location:", error);
        Alert.alert("Error getting location", "Please enable location services to use the app.");
      },
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
  }
  console.log("User location:", userLocation);


  // Manage the timer
  useEffect(() => {
    if (isStarted) {
      timerRef.current = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    } else if (!isStarted && timerRef.current) {
      clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isStarted]);

  // Start the timer
  const startTimer = () => {
    setIsStarted(true);
  };

  // Terminate the session
  const terminateSession = () => {
    setIsStarted(false);
    setIsTerminated(true);
  };

  // Validate the balise
  const validateBalise = (number) => {
    const baliseIndex = markers.findIndex(
      (marker) => marker.number === parseInt(number)
    );
    if (baliseIndex !== -1 && !validatedBalises.includes(number)) {
      setValidatedBalises([...validatedBalises, number]);
      sendValidationToDatabase(userLocation, number);
    } else {
      Alert.alert(
        "Invalid Balise",
        "The balise number entered is invalid or already validated."
      );
    }
  };

  // Function to send validation data to the database
  const sendValidationToDatabase = (location, number) => {
    console.log("Sending to database:", { location, number });
    // TODO: Implement the API call to send data to the server
  };

  return (
    <>
      <View style={styles.container}>
        {/* *************** Render Map View ***************  */}

        <MapView
          paddingAdjustmentBehavior="never"
          style={styles.map}
          prorvider={PROVIDER_GOOGLE}
          customMapStyle={MAP_STYLE}
          initialRegion={region}
          region={region}
          onRegionChangeComplete={(newRegion, gesture) => {
            if (!gesture.isGesture) {
              return;
            }
            setRegion(newRegion);
          }}
        >
          {markers.map((marker, index) => {
            const isValidated = validatedBalises.includes(marker.number);
            return (
              <React.Fragment key={index}>
                <Marker
                  coordinate={{
                    latitude: marker.latitude,
                    longitude: marker.longitude,
                  }}
                  title={`Balise ${marker.number}`}
                  description={`${marker.points} points`}
                >
                  <View style={styles.marker}>
                    <Text
                      style={
                        isValidated
                          ? styles.validatedMarkerText
                          : styles.markerText
                      }
                    >
                      {marker.number}
                    </Text>
                    <Image
                      source={icons.balise}
                      style={
                        isValidated
                          ? styles.validatedMarkerImage
                          : styles.markerImage
                      }
                    />
                  </View>
                </Marker>
                <Circle
                  center={{
                    latitude: marker.latitude,
                    longitude: marker.longitude,
                  }}
                  radius={10} // radius in meters
                  strokeColor={
                    isValidated ? "rgba(0,255,0,0.5)" : "rgba(0,0,255,0.5)"
                  }
                  fillColor={
                    isValidated ? "rgba(0,255,0,0.1)" : "rgba(0,0,255,0.1)"
                  }
                />
              </React.Fragment>
            );
          })}
          {userLocation && (
            <Marker
              coordinate={{ latitude: userLocation.latitude, longitude: userLocation.longitude }}
              title="Your Location"
            >
              <View style={styles.userMarker}>
                <Text style={styles.userMarkerText}>You</Text>
              </View>
            </Marker>
          )}
        </MapView>

        {/* *************** Render Map View ***************  */}
        <View style={styles.buttons}>
          {!isStarted && !isTerminated && (
            <Button title="Start" onPress={startTimer} />
          )}
          {isStarted && !isTerminated && (
            <>
              <Button
                title="Validate Balise"
                onPress={() => setModalVisible(true)}
              />
              <Button title="Terminate" onPress={terminateSession} />
            </>
          )}
        </View>
        {isStarted && (
          <View style={styles.timer}>
            <Text>
              Time: {new Date(time * 1000).toISOString().substr(11, 8)}
            </Text>
          </View>
        )}
        {isTerminated && (
          <View style={styles.summary}>
            <Text>Number of balises validated: {validatedBalises.length}</Text>
          </View>
        )}
        {/* Modal for validating balise */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>Enter Balise Number:</Text>
              <TextInput
                style={styles.input}
                keyboardType="numeric"
                value={baliseInput}
                onChangeText={setBaliseInput}
              />
              <Button
                title="Validate"
                onPress={() => validateBalise(baliseInput)}
              />
              <Button
                title="Cancel"
                onPress={() => setModalVisible(false)}
                color="red"
              />
            </View>
          </View>
        </Modal>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  marker: {
    alignItems: "center",
    justifyContent: "center",
  },
  markerText: {
    color: "black",
    fontWeight: "bold",
    fontSize: 16,
  },
  validatedMarkerText: {
    color: "green",
    fontWeight: "bold",
    fontSize: 16,
  },
  markerImage: {
    width: 32,
    height: 32,
  },
  validatedMarkerImage: {
    width: 32,
    height: 32,
    tintColor: "green",
  },
  buttons: {
    position: "absolute",
    bottom: 50,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  button: {
    backgroundColor: "#333", // Dark background color
    borderRadius: 20, // More rounded corners
    padding: 10,
    paddingHorizontal: 20,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  cancelButton: {
    backgroundColor: "red",
  },
  timer: {
    position: "absolute",
    top: 50,
    left: 0,
    right: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  timerText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  summary: {
    position: "absolute",
    bottom: 100,
    left: 0,
    right: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  summaryText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalView: {
    width: 300,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
  },
  input: {
    width: "100%",
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 15,
    paddingLeft: 10,
  },
});

export default StudentMap;
