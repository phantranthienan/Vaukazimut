import { View, Text, TextInput } from 'react-native';
import React, { useState } from 'react';
import { TouchableOpacity, Image } from 'react-native';

import { icons } from '../constants';

const FormField = ({
  title,
  value,
  placeholder,
  handleChangeText,
  otherStyles,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View className={`space-y-2 ${otherStyles}`}>
      <Text className="text-xl text-black font-pmedium">{title}</Text>

      <View
        className="border-2 border-black-200 w-full h-16 px-4 bg-white
      rounded-2xl focus:border-secondary items-center flex-row"
      >
        <TextInput
          className="flex-1 bg- text-black font-psemibold text-base"
          value={value}
          placeholder={placeholder}
          placeholderTextColor="#7b7b8b"
          onChangeText={handleChangeText}
          secureTextEntry={title === 'Password' && !showPassword}
        />

        {title === 'Password' && (
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Image
              source={!showPassword ? icons.eye : icons.eyehide}
              className="w-6 h-6"
              resizeMode="contain"
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default FormField;
