import { View, Text, Image, Alert } from "react-native";
import { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link, router } from "expo-router";

import { images } from "../../constants";
import CustomButton from "../../components/CustomButton";
import FormField from "../../components/FormField";
import { signIn } from "../../utils/useAPI";

import { storeRole, storeToken, getRole, getToken } from "../../utils/handleAsyncStorage";

import AsyncStorage from "@react-native-async-storage/async-storage";

const SignIn = () => {
  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const submit = async () => {
    if (!form.username || !form.password) {
      Alert.alert("Error", "Please fill in all the fields");
    } else {
      setIsSubmitting(true);

      try {
        const res = await signIn(form.username, form.password);
        if (res.status === 200) {
          Alert.alert("Success", "You have successfully signed in");

          const accessToken = res.data.data.accessToken;
          const role = res.data.data.role;

          await storeToken(accessToken);
          await storeRole(role);

          if (role === "Coach") {
            router.replace("/homeProf");
          } else {
            router.replace("/homeStu");
          }
        } 
      } catch (error) {
        Alert.alert("Error", "Invalid credentials");
      }
      finally {
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

      <View className="justify-center pt-5 flex-row gap-2">
        <Text className="text-lg text-black font-pregular">
          Don't have an account?
        </Text>
        <Link href="/sign-up" className="text-lg font-psemibold text-secondary">
          Sign Up
        </Link>
      </View>
    </View>
  );
};

export default SignIn;
