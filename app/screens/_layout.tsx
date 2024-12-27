import {  Stack, useRouter, useSegments } from 'expo-router';
import { auth } from '@/firebaseConfig';
import { useEffect, useState } from 'react';
import { User } from 'firebase/auth';
import { View } from 'react-native';
import { ActivityIndicator } from 'react-native';

const RootLayout = () => {
  const router =useRouter();
  const segments = useSegments();
const [initializing, setInitializing] = useState(true)
const [user, setUser] = useState<User | null>(null)

const onAuthStateChanged=(user : User |null)=>{
  console.log('onAuthStateChanged', user?.uid)
  setUser(user)
  if(initializing) setInitializing(false)

}

useEffect(()=>{
  const subscriber = auth.onAuthStateChanged(onAuthStateChanged)
  return subscriber
}, [])




useEffect(()=>{
if(initializing) return
const inAuthGroup = segments[0]=== '(tabs)'
if(user && !inAuthGroup){
  router.replace('/(tabs)')
} else if (!user && inAuthGroup){
  router.replace('/')
}
},[user, initializing])





if(initializing) {
  return(
    <View
    style={{
      alignItems:'center',
      justifyContent: 'center',
      flex: 1,
    }}>
<ActivityIndicator size="large"/>
    </View>
  )
}


  return (
    <Stack>
      <Stack.Screen name="main" options={{ headerShown: false }} />
      <Stack.Screen name="login" options={{ headerShown: false }} />
      <Stack.Screen name="signup" options={{ headerShown: false }} />
    </Stack>
  );
};

export default RootLayout;