import IconButton from '../../../components/IconButton';
import { icons } from '../../../constants';
import CustomButton from '../../../components/CustomButton';
import { Event, events, groups, maps } from '../data';
import MapProf from '../map-prof';

import { router } from 'expo-router';
import {
  Text,
  TextInput,
  View,
  Modal,
  TouchableOpacity,
  FlatList
} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
