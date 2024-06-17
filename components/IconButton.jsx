import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'

import { icons } from '../constants'

const IconButton = ({ icon, handlePress, containerStyles }) => {
    return (
        <TouchableOpacity 
        onPress={handlePress}
        activeOpacity={0.7}
    
        className={`bg-white rounded-full p-2 items-center justify-center ${containerStyles}`}
        >
        
        <Image 
            className="w-8 h-8 tint-white"
            source={icon}
            resizeMode="contain"
        />
        
        </TouchableOpacity>
      )
}

export default IconButton