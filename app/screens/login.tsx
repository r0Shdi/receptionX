import MainMsg from '@/components/MainMsg'; 
import AuthInput from '@/components/AuthInput'
import NavArrow from '@/components/NavArrow';

import { useState } from "react";
import { KeyboardAvoidingView, StyleSheet, Text,  View } from "react-native"

import { TouchableOpacity } from 'react-native-gesture-handler'
import { GestureHandlerRootView } from 'react-native-gesture-handler'; 

import {Link, router} from 'expo-router'


import Checkbox from 'expo-checkbox';


import { app, auth } from '@/firebaseConfig';
import {  signInWithEmailAndPassword } from 'firebase/auth';

import { FirebaseError } from 'firebase/app';



const Login=()=>{
  const [isChecked, setChecked] = useState(false);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const signIn=async()=>{
    try{
    await signInWithEmailAndPassword(auth, email, password)
    }catch(e:any){
      const err = e as FirebaseError
      alert('Sign in Failed' + err.message)
    }


  }



    return (
      <GestureHandlerRootView style={{backgroundColor:'#576CD6',flex:1,  justifyContent: 'center', alignItems: 'center'}}>
          
          
          <NavArrow navTo="./main"></NavArrow>
          <KeyboardAvoidingView style={{ flex: 1, alignItems:"center",  }} behavior="padding">
          <View style={styles.mainInput}>
            <MainMsg header='Welcome Back' msg='Log in to you account'></MainMsg>
            <AuthInput placeholder='email' 
                      value={email}
                      onChangeText={setEmail}
                      autoCapitalize='none'
                      keyboardType='email-address'
            ></AuthInput>

            <AuthInput placeholder='password'
                      value={password}
                      onChangeText={setPassword}
                      secureTextEntry

            ></AuthInput>

            <View style={styles.remember}>
            <Checkbox
               style={styles.checkbox}
               value={isChecked}
               onValueChange={setChecked}
               color={isChecked ? '#4630EB' : undefined}
            />
            <Text style={styles.underTxt}>Remember Me</Text>

            <TouchableOpacity>
              <Text style={styles.rightTxt}>Forgot Password?</Text>
            </TouchableOpacity>
            </View>
          



        
          

            <TouchableOpacity style={styles.logButton}
            onPress={signIn}>
              <Text style={styles.buttonText}>LOGIN</Text>
            </TouchableOpacity>
            <View >
              <Text>Don't have an account?</Text>
              <Link href='/screens/signup'>
              <Text>Sign up</Text></Link>
            </View>
            </View>
          </KeyboardAvoidingView >
          

         
      </GestureHandlerRootView>
       
    )
}






const styles = StyleSheet.create({
  
  mainInput:{
         flex:1,  
         justifyContent: 'center', 
         alignItems: 'center',
         position:'absolute',
         top:300
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
  
    marginTop: 100,        
  },
  buttonText:{
    color:'white',
    fontSize:20,
    fontWeight:'bold',
    fontFamily:'Geist-SemiBold'
  },
  remember:{
    flexDirection: 'row',
    position:'relative',
    right:30,
    bottom:10 },

  checkbox: {
    
    backgroundColor:'white',
    marginRight:5
    
  },
  underTxt:{
    color:'white',
    fontSize:12,
    fontFamily: 'Geist-SemiBold',
    
  },
  rightTxt:{
    color:'white',
    fontSize:12,
    fontFamily: 'Geist-SemiBold',
    position:'relative',
    left:60,
     
  },

})






export default Login;