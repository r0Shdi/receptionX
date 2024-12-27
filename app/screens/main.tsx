import React, { useEffect, useState } from 'react';
import * as Font from 'expo-font';
import {View, Text, StyleSheet, Image} from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import {Link, router} from 'expo-router'
import { TouchableOpacity } from 'react-native-gesture-handler'

import {LinearGradient} from 'expo-linear-gradient'
import  robotImg  from '@/assets/images/robot-doctor.png'

const Main = ()=>{
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
      const loadFonts = async () => {
          await Font.loadAsync({
              'Geist-SemiBold': require('../../assets/fonts/Geist-SemiBold.ttf'), 
          });
          setFontsLoaded(true);
      };
      loadFonts();
  }, []);

    return (
      <LinearGradient 
      colors={['#3060B3', '#576CD6', '#3060B3']}
      style={styles.gradient}>
            <GestureHandlerRootView>
<View style={styles.container}>
        <Image source={robotImg} style={styles.mainImg}></Image>
        <Text style= {styles.header}>The Robot</Text>
        <Text style={styles.txtMsg}>Connect To Your Patiants!</Text>
        <View style={styles.Buttons}>
       
          <Link href="/screens/login" asChild>
            <TouchableOpacity style={styles.logButton}>
              <Text style={styles.buttonText}>LOGIN</Text>
            </TouchableOpacity>
          </Link>
          
          <TouchableOpacity style={styles.signButton}
            onPress={()=>router.push("/screens/signup" )}>
              <Text style={styles.buttonText}>SIGN UP</Text>
            </TouchableOpacity>
         
            
          
        
        
        </View>
        
      </View>
      </GestureHandlerRootView>
      </LinearGradient>
  
      
    )
}



const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  container: {
   
    flex: 1,
    justifyContent: 'center', 
    alignItems: 'center',
  } ,
  mainImg:{
    flex: 3, 
    justifyContent: 'center', 
    alignItems: 'center', 
    width: '70%',  // Add this
      height: '45%',
      position: 'absolute',
      top: '5%',
  },
  header:{
    width:'100%',
    marginLeft:'60%',
    color:'white',
  fontSize:30,
  fontFamily:'Geist-SemiBold',
  marginTop: 50,  
},
txtMsg:{
  color:'white',
  fontSize:15
},

Buttons:{
position:'absolute',
top:'58%'
},
logButton:{
  backgroundColor:'#2C3F68',
  borderColor:'#2C3F68',
borderWidth:3,
justifyContent: 'center',     // Center text vertically
  alignItems: 'center', 
  width:280,
  
  paddingVertical:10,
  borderRadius: 50,             // Rounded corners

  marginTop: 10,        
},
signButton:{
backgroundColor: 'transparent',
borderColor:'#2C3F68',
borderWidth:3,


paddingVertical:10,
borderRadius:50,
marginTop: 20,
justifyContent: 'center',     // Center text vertically
  alignItems: 'center', 
  width:280,
},
buttonText:{
  color:'white',
  fontSize:20,
  fontWeight:'bold',
  fontFamily:'Geist-SemiBold'
}
})



export default Main;