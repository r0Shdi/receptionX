import React, { useRef } from 'react';
import { View, TouchableOpacity, PanResponder, StyleSheet } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { realtimeDB } from '@/firebaseConfig';
import { ref, child, push, update } from "firebase/database";




function moveForward(){
    const dbRef = ref(realtimeDB );
    const updates = {
        forward: 1, 
        backward: 0,  
        left: 0,     
        right: 0     
      };
      update(dbRef, updates)
    

}

function moveBackward(){
    const dbRef = ref(realtimeDB );
    const updates = {
        forward: 0, 
        backward: 1,  
        left: 0,     
        right: 0     
      };
      update(dbRef, updates)
   
}

function moveLeft(){
    const dbRef = ref(realtimeDB );
    const updates = {
        forward: 0, 
        backward: 0,  
        left: 1,     
        right: 0     
      };
      update(dbRef, updates)
      
}

function moveRight(){
    const dbRef = ref(realtimeDB );
    const updates = {
        forward: 0, 
        backward: 0,  
        left: 0,     
        right: 1    
        
      };
      update(dbRef, updates)
    
}

function movePause(){
    const dbRef = ref(realtimeDB );
    const updates = {
        forward: 0, 
        backward: 0,  
        left: 0,     
        right: 0     
      };
      update(dbRef, updates)
    .then(() => {
      console.log("Values updated successfully!");
    })
    .catch((error) => {
      console.error("Error updating values:", error);
    });

    console.log('robot Stops')
}




export default function Control() {
    const joystickRef = useRef(null);
    const [joystickPosition, setJoystickPosition] = React.useState({ x: 75, y: 75 });

    const joystickSize = 75; // Size of the joystick
    const containerSize = 200; // Size of the joystick container



   


    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
       
            
            
            <View style={{ flexDirection: 'column', alignItems: 'center' }}>
                <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity onPressIn={()=>{moveForward();}}  onPressOut={()=>{movePause();}}>
                        <Ionicons name="arrow-up" size={80} color="black" />
                    </TouchableOpacity>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: 220 }}>
                    <TouchableOpacity onPressIn={()=>{moveLeft();}}  onPressOut={()=>{movePause();}}>
                        <Ionicons name="arrow-back" size={80} color="black" />
                    </TouchableOpacity>
                    <TouchableOpacity onPressIn={()=>{ moveRight();}}  onPressOut={()=>{movePause();}}>
                        <Ionicons name="arrow-forward" size={80} color="black" />
                    </TouchableOpacity>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity  onPressIn={()=>{moveBackward();}}  onPressOut={()=>{movePause();}} >
                        <Ionicons name="arrow-down" size={80} color="black" />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}







const styles = StyleSheet.create({
    joystickContainer: {
        position: 'relative',
        width: 200,
        height: 200,
        borderRadius: 100,
        backgroundColor: 'lightgray',
        justifyContent: 'center',
        alignItems: 'center',
    },
    joystick: {
        position: 'absolute',
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: 'darkgray',
    },
});

















































// const panResponder = useRef(
//     PanResponder.create({
//         onMoveShouldSetPanResponder: () => true,
//         onPanResponderMove: (evt, gestureState) => {
//             const { moveX, moveY } = gestureState;

//             // Calculate the new position while keeping the joystick within the bounds
//             const centerX = containerSize / 2 - joystickSize / 2;
//             const centerY = containerSize / 2 - joystickSize / 2;

//             const newX = Math.max(0, Math.min(moveX - joystickSize / 2, containerSize - joystickSize));
//             const newY = Math.max(0, Math.min(moveY - joystickSize / 2, containerSize - joystickSize));

//             // Calculate the distance from the center
//             const distance = Math.sqrt(Math.pow(newX - centerX, 2) + Math.pow(newY - centerY, 2));

//             // If the distance exceeds the radius of the outer circle, adjust the position
//             if (distance > (containerSize / 2 - joystickSize / 2)) {
//                 const angle = Math.atan2(newY - centerY, newX - centerX);
//                 const constrainedX = centerX + (containerSize / 2 - joystickSize / 2) * Math.cos(angle);
//                 const constrainedY = centerY + (containerSize / 2 - joystickSize / 2) * Math.sin(angle);
//                 setJoystickPosition({ x: constrainedX, y: constrainedY });
//             } else {
//                 setJoystickPosition({ x: newX, y: newY });
//             }
//         },
//         onPanResponderRelease: () => {
//             setJoystickPosition({ x: (containerSize - joystickSize) / 2, y: (containerSize - joystickSize) / 2 }); // Reset position to center
//         },
//     })
// ).current;





    //  {/* Joystick 
    //         <View style={styles.joystickContainer}>
    //             <View
    //                 {...panResponder.panHandlers}
    //                 style={[styles.joystick, { left: joystickPosition.x, top: joystickPosition.y }]}
    //             />
    //         </View>
    //         */}