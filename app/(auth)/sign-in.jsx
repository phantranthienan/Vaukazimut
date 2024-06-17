import { View, Text, Image, Alert } from 'react-native';
import { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Link, router } from 'expo-router';

import { images } from '../../constants';
import CustomButton from '../../components/CustomButton';
import FormField from '../../components/FormField';

const SignIn = () => {
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const submit = () => {
    // if (!form.email || !form.password) {
    //   Alert.alert('Error', 'Please fill in all the fields');
    // }

    setIsSubmitting(true);
    router.push('(prof)/tab-bar');
  };

  return (
    <SafeAreaView className="h-full">
      <View className="w-full h-full px-4 my-6">
        <Text className="text-2xl text-black text-semibold font-psemibold text-center">
          Sign in to Vaukazimut
        </Text>

        <FormField
          title="Email"
          value={form.email}
          handleChangeText={(e) => setForm({ ...form, email: e })}
          otherStyles="mt-7"
          keyboardType="email-address"
        />

        <FormField
          title="Password"
          value={form.password}
          handleChangeText={(e) => setForm({ ...form, password: e })}
          otherStyles="mt-7"
        />

        <CustomButton
          title="Sign In"
          handlePress={submit}
          containerStyles="mt-7"
          isLoading={isSubmitting}
        />

        <View className="justify-center pt-5 flex-row gap-2">
          <Text className="text-lg text-black font-pregular">
            Don't have an account?
          </Text>
          <Link
            href="/sign-up"
            className="text-lg font-psemibold text-secondary"
          >
            Sign Up
          </Link>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SignIn;
