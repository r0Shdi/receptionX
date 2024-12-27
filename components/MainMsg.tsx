import {View, Text, StyleSheet} from "react-native"


export default function MainMsg({header, msg}: {header:string, msg:string}){
    return(
        <View style={{justifyContent:'center', 
            alignItems:'center',}}>
       <Text style={styles.headerText}>{header}</Text>
        <Text style={styles.msgText}>{msg}</Text>

        </View>
        
    )
}


const styles = StyleSheet.create({
    headerText:{
        color:'white',
        fontSize:30,
        fontFamily: 'Geist-SemiBold',
        
      },
      msgText:{
        
        color:'white',
        fontSize:15,
        fontFamily: 'Geist-SemiBold',
        marginBottom:20
      },
})