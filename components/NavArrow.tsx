import { StyleSheet, View } from "react-native"
import { TouchableOpacity } from 'react-native-gesture-handler'
import { Ionicons } from '@expo/vector-icons';
import { Href, Link } from "expo-router";


export default function NavArrow({navTo}:{navTo: Href}){
    return(
        <View  style={{ position: 'absolute', top: '5%', left: '5%' }}>
          <Link href={navTo}>
          <TouchableOpacity  onPress={() => {}}>
          <Ionicons name="arrow-back" size={40} color="black" />
          </TouchableOpacity>
          </Link>
          </View>
    )
}