import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'

const CustomButton = ({ title, handlePress, containerStyles, textStyles, }) => {
    return (
        <TouchableOpacity 
        onPress={handlePress}
        activeOpacity={0.7}
    
        className={`rounded-xl min-h-[62px] px-4 justify-center items-center 
            ${containerStyles}`}
        >
          <Text className={`text-white font-psemibold text-lg ${textStyles}`}>
            {title}
          </Text>
        </TouchableOpacity>
      )
}

export default CustomButton