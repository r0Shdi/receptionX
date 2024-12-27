import {  Stack } from 'expo-router';


const RootLayout = () => {

    return (
        <Stack>
          <Stack.Screen name="[id]" options={{ headerShown: false }} />
          <Stack.Screen name="call" options={{ headerShown: true, headerBackTitle: "patient" , 
          headerStyle: {
                backgroundColor: '#282828', // Change this to any color you want
              },}} />
          
        </Stack>
      );
    
}

export default RootLayout;