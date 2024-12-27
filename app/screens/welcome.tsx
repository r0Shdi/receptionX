import { NavigationContainer } from '@react-navigation/native'

import {View, Text, ImageBackground, StyleSheet, Pressable} from 'react-native';
import React from 'react'
import  background  from '@/assets/images/robot-doctor.png'
import { Link, router } from 'expo-router';

const Welcome = ()=>{
  return (
    <View style={styles.container}>
      <ImageBackground
      source={background}
      style={styles.imageBackground}
      resizeMode="cover"
      >
      
      </ImageBackground>
        
    </View>
  )
}



















const styles = StyleSheet.create({
    container: {
      flex: 1, // Makes sure the View fills the screen
       width: '100%',  // Add this
        height: '100%',
    },
    imageBackground: {
      flex: 3, 
      justifyContent: 'center', 
      alignItems: 'center', 
      width: '100%',  // Add this
        height: '83%',
        position: 'absolute',
        top: '15%',
      
        
    },
    text: {
      fontSize: 24, // Adjust the font size as needed
      fontWeight: 'bold', // Optional, for emphasis
      color: 'white', // Ensure the text is visible against the background
      textShadowColor: '#000', // Optional, for shadow effect to improve readability
      textShadowOffset: { width: 1, height: 1 },
      textShadowRadius: 5,
    },
  });
  



export default Welcome; 