import { View, Text, Alert } from 'react-native'
import React from 'react'
import { router } from 'expo-router'

import CustomButton from '../../components/CustomButton'
import { clearStorage } from '../../utils/handleAsyncStorage'
import { logOut, updateAxios } from '../../utils/useAPI'

const Home = () => {
  const handleLogout = async () => {
    try {
      await logOut();
      await clearStorage();
      updateAxios();
      router.replace("/");
    } catch (error) {
      console.error("Error logging out:", error);
      Alert.alert("Error", "Something went wrong. Please try again.");
    }
  }

  return (
    <>
      <View>
        <Text>Home Professeur</Text>
      </View>

      <CustomButton 
        title="Log out"
        handlePress={() => {
          handleLogout();
        }}
      />
    </>
  )
}

export default Home