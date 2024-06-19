import { View, Text, Image, StyleSheet, Button, Alert, Modal, TextInput, TouchableOpacity } from "react-native";
import MapView, { PROVIDER_GOOGLE, Marker, Circle } from "react-native-maps";
import React, { useState, useEffect, useRef } from "react";
import * as Location from "expo-location";
import { INSA_CVL, MAP_STYLE } from "../constants/map";
import { icons } from "../constants";

const StudentMap = () => {
  const [region, setRegion] = useState(INSA_CVL);
  const [userLocation, setUserLocation] = useState(null);

  const [isStarted, setIsStarted] = useState(false);
  const [isTerminated, setIsTerminated] = useState(false);
  const [time, setTime] = useState(0);
  const timerRef = useRef(null);

  const [validatedBalises, setValidatedBalises] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [baliseInput, setBaliseInput] = useState('');

  // Array of markers with number, points, and location (latitude, longitude)
  const markers = [
    {
      number: 1,
      point: 10,
      latitude: 47.082353,
      longitude: 2.415264,
    },
    {
      number: 2,
      point: 20,
      latitude: 47.081773,
      longitude: 2.416305,
    },
    {
      number: 3,
      point: 30,
      latitude: 47.081642,
      longitude: 2.415474,
    },
  ];

  // Request location permissions and get the initial location
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.error("Permission to access location was denied");
        console.log("Please enable location services and restart the app.")
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setUserLocation(location.coords);
    })();
  }, []);

  console.log("User location:", userLocation)

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
    const baliseIndex = markers.findIndex((marker) => marker.number === parseInt(number));
    if (baliseIndex !== -1 && !validatedBalises.includes(number)) {
      setValidatedBalises([...validatedBalises, number]);
      sendValidationToDatabase(userLocation, number);
      setModalVisible(false);
    } else {
      Alert.alert("Invalid Balise", "The balise number entered is invalid or already validated.");
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
        <MapView
          showsUserLocation={true}
          paddingAdjustmentBehavior="never"
          style={styles.map}
          provider={PROVIDER_GOOGLE}
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
                  coordinate={{ latitude: marker.latitude, longitude: marker.longitude }}
                  title={`Balise ${marker.number}`}
                  description={`${marker.point} points`}
                >
                  <View style={styles.marker}>
                    <Text style={isValidated ? styles.validatedMarkerText : styles.markerText}>
                      {marker.number}
                    </Text>
                    <Image
                      source={icons.balise}
                      style={isValidated ? styles.validatedMarkerImage : styles.markerImage}
                    />
                  </View>
                </Marker>
                <Circle
                  center={{ latitude: marker.latitude, longitude: marker.longitude }}
                  radius={10} // radius in meters
                  strokeColor={isValidated ? "rgba(0,255,0,0.5)" : "rgba(0,0,255,0.5)"}
                  fillColor={isValidated ? "rgba(0,255,0,0.1)" : "rgba(0,0,255,0.1)"}
                />
              </React.Fragment>
            );
          })}
        </MapView>

        <View style={styles.buttons}>
          {!isStarted && !isTerminated && (
            <TouchableOpacity className="bg-black rounded-xl w-[40vw] p-4 justify-center" onPress={() => startTimer()}>
              <Text className="w-full text-center text-white font-pbold text-3xl">Start</Text>
            </TouchableOpacity>
          )}
          {isStarted && !isTerminated && (
            <>
              <TouchableOpacity className="bg-white rounded-xl w-[30vw] h-12 justify-center border-2" onPress={() => setModalVisible(true)}>
                <Text className="w-full text-center font-pregular">Validate Balise</Text>
              </TouchableOpacity>
              <TouchableOpacity className="bg-white rounded-xl w-[30vw] h-12 justify-center border-2" onPress={terminateSession}>
                <Text className="w-full text-center font-pregular">Terminate</Text>
              </TouchableOpacity>
            </>
          )}
        </View>

        {isStarted && (
          <View style={styles.timer}>
            <Text className="text-xl font-psemibold">Time: {new Date(time * 1000).toISOString().substr(11, 8)}</Text>
          </View>
        )}
        {isTerminated && (
          <View style={styles.summary}>
            <Text style={styles.summaryText}>Number of balises validated: {validatedBalises.length}</Text>
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

              <View className="w-[80%] flex-row justify-center">

              <TouchableOpacity className="mx-auto bg-black w-[40%] h-8 justify-center rounded-md" onPress={() => validateBalise(baliseInput)}>
                <Text className="w-full text-center text-white font-pmedium text-sm">Validate</Text>
              </TouchableOpacity>

              <TouchableOpacity className="mx-auto bg-red-600 w-[40%] h-8 justify-center rounded-md" onPress={() => setModalVisible(false)}>
                <Text className="w-full text-center text-white font-pmedium text-sm">Cancel</Text>
              </TouchableOpacity>

              </View>

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
    bottom: 75,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginLeft: 20,
    marginRight: 20,
  },
  timer: {
    position: "absolute",
    top: 75,
    left: 0,
    right: 0,
    justifyContent: "center",
    alignItems: "center",
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
