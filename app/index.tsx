import { NavigationContainer } from '@react-navigation/native'

import Main from './screens/main';
import {View, Text, ImageBackground, StyleSheet, Pressable} from 'react-native';
import React, { useEffect, useState } from 'react'
import  background  from '@/assets/images/welcome.png'
import { Link, router } from 'expo-router';
import Welcome from './screens/welcome'
const index = ()=>{

  const [isShowSplash, setIsShowSplash] = useState(true);
  useEffect(()=>{
    setTimeout(()=>{
      setIsShowSplash(false);
    }, 3000)
  })
  return <>{isShowSplash?<Welcome/>:<Main/>}</>

  
}



















const styles = StyleSheet.create({
    container: {
      flex: 1, // Makes sure the View fills the screen
       width: '100%',  // Add this
        height: '100%',
    },
    imageBackground: {
      flex: 1, 
      justifyContent: 'center', 
      alignItems: 'center', 
      width: '100%',  // Add this
        height: '100%',
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
  



export default index;