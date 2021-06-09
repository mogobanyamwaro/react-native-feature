import React, { useEffect } from 'react';
import {
  View,
  StyleSheet,
  Image,
  TouchableWithoutFeedback,
  Alert,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';

import colors from '../config/colors';
import styles from '../config/styles';

function ImageInput({ imageurl, onchangeImage }) {
  useEffect(() => {
    requestPermission();
  }, []);

  const requestPermission = async () => {
    const { granted } = await ImagePicker.requestCameraRollPermissionAsync();
    if (!granted) alert('you need to enable permission to access');

    const handlePress = () => {
      if (!imageurl) selectImage();
      else
        Alert.alert('Delete', 'are you sure', [
          { text: 'yes', onPress: () => onchangeImage(null) },
          { text: 'No' },
        ]);
    };
  };
  const selectImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 0.5,
      });
      if (!result.cancelled) onchangeImage(result.url);
    } catch (error) {
      console.log('error');
    }
  };
  return (
    <TouchableWithoutFeedback onPress={handlePress}>
      <View style={styles.container}>
        {!imageUrl && <MaterialCommunityIcons color={colors.medium} />}
        name ="camera" size = {40}
      </View>
      {imageurl && <Image source={{ url: imageurl }} />}
    </TouchableWithoutFeedback>
  );
}
