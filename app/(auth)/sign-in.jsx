import { View, Text, Image, Alert } from 'react-native';
import { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Link, router } from 'expo-router';

import CustomButton from '../../components/CustomButton';
import FormField from '../../components/FormField';
import { signIn } from '../../utils/useAPI';
import { updateAxios } from '../../utils/useAPI';
import {
  storeRole,
  storeToken,
  storeId,
  getId,
  getRole,
  getToken
} from '../../utils/handleAsyncStorage';

const SignIn = () => {
  const [form, setForm] = useState({
    username: '',
    password: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = await getToken();
        const role = await getRole();
        if (token && role) {
          updateAxios();
          if (role === 'Coach') {
            router.replace('/(prof)/tab-bar');
          } else if (role === 'Runner') {
            router.replace('/group-list');
          }
        }
      } catch (error) {
        console.error('Error checking auth:', error);
      }
    };

    checkAuth();
  }, []);

  const submit = async () => {
    if (!form.username || !form.password) {
      Alert.alert('Error', 'Please fill in all the fields');
    } else {
      setIsSubmitting(true);

      try {
        const res = await signIn(form.username, form.password);
        if (res.status === 200) {
          Alert.alert('Success', 'You have successfully signed in');

          const accessToken = res.data.data.accessToken;
          const role = res.data.data.role;
          const id = res.data.data.user_id;

          await storeToken(accessToken);
          await storeRole(role);
          await storeId(id);

          updateAxios();

          if (role === 'Coach') {
            router.replace('/(prof)/tab-bar');
          } else {
            router.replace('/group-list');
          }
        }
      } catch (error) {
        Alert.alert('Error', 'Invalid credentials');
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <View className="w-full h-full px-4 my-6">
      <Text className="text-2xl text-black text-semibold font-psemibold text-center">
        Sign in to Vaukazimut
      </Text>

      <FormField
        title="Username"
        value={form.username}
        handleChangeText={(e) => setForm({ ...form, username: e })}
        otherStyles="mt-7"
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

      <View className="justify-center pt-5 flex-column items-center">
        <Text className="text-lg text-black font-pregular">
          Don't have an account?
        </Text>
        <Link
          href="/sign-up"
          className="block text-lg font-psemibold text-secondary"
        >
          Create an account
        </Link>
      </View>
    </View>
  );
};

export default SignIn;
