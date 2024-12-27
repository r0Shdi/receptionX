import { StyleSheet, TextInput,  TextInputProps } from "react-native"
import {LinearGradient} from 'expo-linear-gradient'

interface AuthInput extends TextInputProps{
  
}

export default function AuthInput(props:AuthInput){
    return(
<LinearGradient
            colors={['#ffffff', 'transparent']}
            start={{x:0, y:0}}
            end={{x:1, y:1}}
            style={styles.outerGradient}>
            <LinearGradient
            colors={['#576CD6', '#98AAE6']}
            start={{x:0, y:0}}
            end={{x:1, y:1}}
            style={styles.innerGradient}>
            <TextInput style={styles.userInput}
             
             placeholderTextColor="silver"
             {...props}
             ></TextInput>
            </LinearGradient>
            </LinearGradient>
    )

}



const styles = StyleSheet.create({
    userInput:{
        backgroundColor: 'transparent',
        
       
        justifyContent: 'center',    
        alignItems: 'center', 
        
      },
      outerGradient:{
        width:280,
        padding: 2, 
        borderRadius: 10,
        marginBottom: 15,
      },
      innerGradient:{
        
        borderRadius: 7, 
        padding: 10,
        
        
        
        
      },
})