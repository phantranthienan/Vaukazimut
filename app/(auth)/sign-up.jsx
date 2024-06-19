import { View, Text } from 'react-native';
import React from 'react';
import CustomButton from '../../components/CustomButton';
import { router } from 'expo-router';

const SignUp = () => {
  return (
    <View className="w-full h-full px-4 my-6">
      <Text className="text-2xl text-black text-semibold font-psemibold text-center">
        YOU ARE ?
      </Text>

      <CustomButton
        title="Runner"
        handlePress={() => {
          router.push('/sign-up-runner');
        }}
        containerStyles="mt-7 h-32"
      />

      <CustomButton
        title="Coach"
        handlePress={() => {
          router.push('/sign-up-coach');
        }}
        containerStyles="mt-7 h-32"
      />
    </View>
  );
};

export default SignUp;
