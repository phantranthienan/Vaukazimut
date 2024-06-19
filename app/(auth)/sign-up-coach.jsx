import { Image, View, Text, ScrollView, Alert } from 'react-native';
import React, { useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState } from 'react';
import { Link, router } from 'expo-router';

import { images } from '../../constants';
import FormField from '../../components/FormField';
import CustomButton from '../../components/CustomButton';
import { signUp } from '../../utils/useAPI';

const SignUpCoach = () => {
  const [form, setForm] = useState({
    username: '',
    password: '',
    firstName: '',
    lastName: '',
    email: '',
    secretCode: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isSubmitting) {
      signUp(
        form.username,
        form.email,
        form.password,
        form.firstName,
        form.lastName,
        'STI',
        form.secretCode
      );
      setIsSubmitting(false);
      router.push('/sign-in');
    }
  }, [isSubmitting, form]);

  const submit = async () => {
    if (
      !form.username ||
      !form.email ||
      !form.password ||
      !form.firstName ||
      !form.lastName ||
      !form.secretCode
    ) {
      Alert.alert('Error', 'Please fill in all the fields');
    }
    setIsSubmitting(true);
  };

  return (
    <ScrollView>
      <View className="w-full h-full px-4 my-6">
        <Text className="text-2xl text-black text-semibold font-psemibold text-center">
          Sign up to Vaukazimut
        </Text>

        <FormField
          title="First Name"
          value={form.firstName}
          handleChangeText={(e) => setForm({ ...form, firstName: e })}
          otherStyles="mt-5"
        />

        <FormField
          title="Last Name"
          value={form.lastName}
          handleChangeText={(e) => setForm({ ...form, lastName: e })}
          otherStyles="mt-5"
        />

        <FormField
          title="Username"
          value={form.username}
          handleChangeText={(e) => setForm({ ...form, username: e })}
          otherStyles="mt-5"
        />

        <FormField
          title="Email"
          value={form.email}
          handleChangeText={(e) => setForm({ ...form, email: e })}
          otherStyles="mt-5"
          keyboardType="email-address"
        />

        <FormField
          title="Password"
          value={form.password}
          handleChangeText={(e) => setForm({ ...form, password: e })}
          otherStyles="mt-5"
        />

        <FormField
          title="Secret Code"
          value={form.secretCode}
          handleChangeText={(e) => setForm({ ...form, secretCode: e })}
          otherStyles="mt-5"
        />

        <CustomButton
          title="Create Account"
          handlePress={submit}
          containerStyles="mt-5"
          isLoading={isSubmitting}
        />

        <View className="justify-center pt-5 flex-row gap-2">
          <Text className="text-lg text-black font-pregular">
            Have an account already?
          </Text>
          <Link
            href="/sign-in"
            className="text-lg font-psemibold text-secondary"
          >
            Sign In
          </Link>
        </View>
      </View>
    </ScrollView>
  );
};

export default SignUpCoach;
