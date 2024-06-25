import {
  View,
  Text,
  Image,
  StyleSheet,
  Alert,
  Modal,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  BackHandler,
} from "react-native";
import MapView, { PROVIDER_GOOGLE, Marker, Circle } from "react-native-maps";
import React, { useState, useEffect, useRef } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import * as Location from "expo-location";

import { INSA_CVL, MAP_STYLE } from "../../../../constants/map";
import { icons } from "../../../../constants";
import {
  fetchRaceDetails,
  recordCheckpoint,
  terminateRace,
  startRace,
} from "../../../../utils/useAPI";

const StudentMap = () => {
  const { raceId } = useLocalSearchParams();
  const router = useRouter(); // Use router for navigation

  //******************************************************/
  //******************** USE STATE ***********************/
  //******************************************************/
  const [region, setRegion] = useState(INSA_CVL);
  const [userLocation, setUserLocation] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [startPoint, setStartPoint] = useState(null);

  const [timeLimit, setTimeLimit] = useState("00:00:00");
  const [isStarted, setIsStarted] = useState(false);
  const [isTerminated, setIsTerminated] = useState(false);
  const [time, setTime] = useState(0);
  const timerRef = useRef(null);
  const locationIntervalRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true); // Add loading state

  const [validatedBalises, setValidatedBalises] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [baliseInput, setBaliseInput] = useState("");

  const [raceRunnerId, setRaceRunnerId] = useState(null);

  //******************************************************/
  //******************** USE EFFECT ***********************/
  //******************************************************/
  useEffect(() => {
    if (raceId) {
      getRaceDetails();
    }
  }, [raceId]);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.error("Permission to access location was denied");
        console.log("Please enable location services and restart the app.");
        return;
      }

      const location = await getCurrentLocation();
      setUserLocation(location);
    })();
  }, []);

  // Manage the timer
  useEffect(() => {
    if (isStarted) {
      timerRef.current = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);

      locationIntervalRef.current = setInterval(async () => {
        const location = await getCurrentLocation();
        setUserLocation(location);
      }, 100); // Update location every 100 milliseconds
    } else if (!isStarted) {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
      if (locationIntervalRef.current) {
        clearInterval(locationIntervalRef.current);
      }
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
      if (locationIntervalRef.current) {
        clearInterval(locationIntervalRef.current);
      }
    };
  }, [isStarted]);

  useEffect(() => {
    const backAction = () => {
      if (isStarted && !isTerminated) {
        Alert.alert("Hold on!", "You cannot go back until you terminate the race.", [
          { text: "OK" }
        ]);
        return true;
      }
      return false;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, [isStarted, isTerminated]);

  //******************************************************/
  //******************** SOME FUNCTION ***********************/
  //******************************************************/

  const getRaceDetails = async () => {
    try {
      setIsLoading(true); // Start loading
      const raceData = await fetchRaceDetails(raceId);
      // console.log(raceData);
      setMarkers(raceData.checkpoints);
      setStartPoint(raceData.event_location); // Set start point
      setTimeLimit(raceData.time_limit);
    } catch (err) {
      console.error(err);
      Alert.alert(
        "Error",
        "Failed to fetch race details. Please try again later."
      );
    } finally {
      setIsLoading(false); // Stop loading
    }
  };

  // Get the user's location
  const getCurrentLocation = async () => {
    let location = await Location.getCurrentPositionAsync({});
    return location.coords;
  };

  // Convert time to "HH:MM:SS" format
  const formatTime = (timeInSeconds) => {
    const hours = Math.floor(timeInSeconds / 3600);
    const minutes = Math.floor((timeInSeconds % 3600) / 60);
    const seconds = timeInSeconds % 60;
    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  };

  // Convert time limit to seconds
  const timeLimitInSeconds = () => {
    const [hours, minutes, seconds] = timeLimit.split(":").map(Number);
    return hours * 3600 + minutes * 60 + seconds;
  };

  // Start the timer
  const startTimer = async () => {
    try {
      const raceRunner = await startRace(raceId);
      // console.log(raceRunner);
      setRaceRunnerId(raceRunner.data.id);
      setIsStarted(true);
    } catch (err) {
      console.log("Error", err);
    }
  };

  // Terminate the session
  const terminateSession = async () => {
    setIsStarted(false);
    setIsTerminated(true);
    try {
      const formattedTime = formatTime(time);
      const result = await terminateRace(raceRunnerId, formattedTime);
      console.log(result);
      Alert.alert("Race Ended", `You achieved ${result.score} points in ${result.total_time}.`);
      router.back(); // Navigate back to previous page
    } catch (err) {
      Alert.alert("Error", "Failed to end race, please try again.");
    }
  };

  // Validate the balise
  const validateBalise = async (number) => {
    console.log(userLocation);
    const baliseIndex = markers.findIndex(
      (marker) => marker.number === parseInt(number)
    );
    if (baliseIndex !== -1) {
      try {
        await recordCheckpoint(
          number,
          userLocation.longitude,
          userLocation.latitude,
          raceRunnerId
        );
        setValidatedBalises((prevValidatedBalises) => {
          // Ensure no duplicates in the validated balises list
          if (!prevValidatedBalises.includes(number)) {
            return [...prevValidatedBalises, number];
          }
          return prevValidatedBalises;
        });
        setMarkers((prevMarkers) => {
          // Update markers to trigger re-render
          const updatedMarkers = [...prevMarkers];
          updatedMarkers[baliseIndex] = {
            ...updatedMarkers[baliseIndex],
            validated: true,
          };
          return updatedMarkers;
        });
        setModalVisible(false);
      } catch (error) {
        Alert.alert("Error", "Failed to record checkpoint. Please try again.");
      }
    } else {
      Alert.alert(
        "Invalid Balise",
        "The balise number entered is invalid."
      );
    }
  };

  const currentTime = formatTime(time);
  const limitExceeded = time > timeLimitInSeconds();

  return (
    <>
      <View style={styles.container}>
        {isLoading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
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
            {startPoint && (
              <Marker coordinate={startPoint}>
                <View style={styles.marker}>
                  <Image source={icons.start} style={styles.startMarkerImage} />
                </View>
              </Marker>
            )}
            {markers.map((marker) => {
              const location = {
                latitude: marker.latitude,
                longitude: marker.longitude,
              };
              const isValidated = validatedBalises.includes(marker.number);
              return (
                <React.Fragment key={`${marker.id}-${isValidated}`}>
                  <Marker
                    coordinate={location}
                    title={`Balise ${marker.number}`}
                    description={`${marker.score} points`}
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
                        source={isValidated ? icons.pingreen : icons.pin}
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
                    radius={5} // radius in meters
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
          </MapView>
        )}

        <View style={styles.buttons}>
          {!isStarted && !isTerminated && (
            <TouchableOpacity
              className="bg-primary-emerald rounded-xl w-[40vw] p-4 justify-center"
              onPress={startTimer}
            >
              <Text className="w-full text-center text-primary-jungle font-pbold text-3xl">
                Start
              </Text>
            </TouchableOpacity>
          )}
          {isStarted && !isTerminated && (
            <>
              <TouchableOpacity
                className="bg-primary-jungle rounded-xl w-[30vw] h-12 justify-center border-2"
                onPress={() => setModalVisible(true)}
              >
                <Text className="text-white w-full text-center font-psemibold">
                  Validate
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                className="bg-primary-jungle rounded-xl w-[30vw] h-12 justify-center border-2"
                onPress={terminateSession}
              >
                <Text className="text-white w-full text-center font-psemibold">
                  Terminate
                </Text>
              </TouchableOpacity>
            </>
          )}
        </View>

        {isStarted && (
          <View style={styles.timer}>
            <Text className="text-xl font-psemibold" style={{ color: limitExceeded ? 'red' : 'black' }}>
              Time: {currentTime}
            </Text>
          </View>
        )}
        {isTerminated && (
          <View style={styles.summary}>
            <Text style={styles.summaryText}>
              Number of balises validated: {validatedBalises.length}
            </Text>
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
                className="w-full border-2 mb-4 p-2 rounded-md px-4"
                keyboardType="numeric"
                value={baliseInput}
                onChangeText={setBaliseInput}
              />

              <View className="w-[80%] flex-row justify-center">
                <TouchableOpacity
                  className="mx-auto bg-black w-[40%] h-8 justify-center rounded-md"
                  onPress={() => validateBalise(baliseInput)}
                >
                  <Text className="w-full text-center text-white font-pmedium text-sm">
                    Validate
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  className="mx-auto bg-red-600 w-[40%] h-8 justify-center rounded-md"
                  onPress={() => setModalVisible(false)}
                >
                  <Text className="w-full text-center text-white font-pmedium text-sm">
                    Cancel
                  </Text>
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
  startMarkerImage: {
    width: 32,
    height: 32,
    tintColor: "blue",
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
});

export default StudentMap;
