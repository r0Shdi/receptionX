import React, { useEffect, useState } from 'react';
import * as Notifications from 'expo-notifications';
import { ScrollView, View, StyleSheet, Image, TouchableOpacity, Text, Button, Platform, Alert } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Patient } from '@/types/doctor';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

import {Link, router} from 'expo-router'



// Set up notifications configuration (outside component)
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});





export default function PatientDetailsScreen() {
  const { patient: patientParam } = useLocalSearchParams();
  const [robotStatus, setRobotStatus] = useState<'available' | 'moving'>('available');
  const [expoPushToken, setExpoPushToken] = useState<string>('');

  // Add this useEffect for notification setup
  useEffect(() => {
    registerForPushNotificationsAsync().then(token => {
      if (token) setExpoPushToken(token);
    });

    // Set up notification listener
    const notificationListener = Notifications.addNotificationReceivedListener(notification => {
      console.log('Notification received:', notification);
    });

    // Set up response listener for when user taps notification
    const responseListener = Notifications.addNotificationResponseReceivedListener(response => {
      console.log('Notification response:', response);
    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener);
      Notifications.removeNotificationSubscription(responseListener);
    };
  }, []);

  // Update the registerForPushNotificationsAsync function
  async function registerForPushNotificationsAsync() {
    let token;
    
    if (Platform.OS === 'android') {
      await Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }

    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }

    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log('Expo push token:', token);
    
    return token;
  }

  if (!patientParam) {
    return (
      <ThemedView style={styles.errorContainer}>
        <ThemedText>Error: No patient data provided</ThemedText>
      </ThemedView>
    );
  }


  


  




  



let patient: Patient;

try {
  if (Array.isArray(patientParam)) {
    // If it's an array, parse the first element
    patient = JSON.parse(patientParam[0]);
  } else if (typeof patientParam === 'string') {
    
    // If it's a string, parse it directly
    patient = JSON.parse(patientParam);

    
  } else {
    throw new Error('Invalid patientParam type');
  }
  
} catch (error) {
  console.error('Error parsing patientParam:', error);
  return (
        <ThemedView style={styles.errorContainer}>
          <ThemedText>Error: Invalid patient data</ThemedText>
        </ThemedView>
      );
}















  

  // Add debugging
  //console.log('Parsed patient:', patient);

  // Connect the robot movement handler to the buttons
  const handleRobotMovement = async () => {
    try {
      setRobotStatus('moving');
      
      // Starting notification
      await Notifications.scheduleNotificationAsync({
        content: {
          title: "Robot Status",
          body: "Robot is starting its journey",
          sound: true,
        },
        trigger: null,
      });

      // Update the buttons to use this handler
      setTimeout(async () => {
        await Notifications.scheduleNotificationAsync({
          content: {
            title: "Robot Status",
            body: "Robot is halfway there",
            sound: true,
          },
          trigger: null,
        });
      }, 2000);

      setTimeout(async () => {
        await Notifications.scheduleNotificationAsync({
          content: {
            title: "Destination Reached",
            body: `Robot has arrived at Room ${patient.roomNumber}`,
            sound: true,
          },
          trigger: null,
        });
        setRobotStatus('available');
      }, 4000);
    } catch (error) {
      console.error('Error during robot movement:', error);
      setRobotStatus('available');
      Alert.alert('Error', 'Failed to send robot. Please try again.');
    }
  };

  // Update the button handlers
  return (
    <SafeAreaProvider>

    
    <SafeAreaView style={styles.safeContainer}>
    <ScrollView style={styles.container}>
      <ThemedView style={styles.header}>
        <View style={styles.patientInfo}>
          <Image 
            source={{ uri: 'https://via.placeholder.com/150' }}
            style={styles.patientImage}
          />
          <View style={styles.basicInfo}>
            <ThemedText type="title">{patient.name}</ThemedText>
            <ThemedText type="subtitle">Age: {patient.age}</ThemedText>
            <ThemedText 
              style={[
                styles.statusBadge,
                { backgroundColor: getStatusColor(patient.status) }
              ]}
            >
              {patient.status.toUpperCase()}
            </ThemedText>
          </View>
        </View>
      </ThemedView>

      <ThemedView style={styles.section}>
        <ThemedText type="defaultSemiBold" style={styles.sectionTitle}>
          Current Condition
        </ThemedText>
        <ThemedText>{patient.condition}</ThemedText>
        <ThemedText>Room: {patient.roomNumber}</ThemedText>
      </ThemedView>

      <ThemedView style={styles.section}>
        <ThemedText type="defaultSemiBold" style={styles.sectionTitle}>
          Vital Signs
        </ThemedText>
        <View style={styles.vitalsGrid}>
          <VitalCard title="BP" value={patient.recentVitals.bloodPressure} />
          <VitalCard title="Heart Rate" value={patient.recentVitals.heartRate} />
          <VitalCard title="Temp" value={patient.recentVitals.temperature} />
          <VitalCard title="O2 Sat" value={patient.recentVitals.oxygenSaturation} />
        </View>
      </ThemedView>

      <ThemedView style={styles.section}>
        <ThemedText type="defaultSemiBold" style={styles.sectionTitle}>
          Medications
        </ThemedText>
        {patient.medications.map((med, index) => (
          <View key={index} style={styles.medicationItem}>
            <ThemedText type="defaultSemiBold">{med.name}</ThemedText>
            <ThemedText>{med.dosage}</ThemedText>
          </View>
        ))}
      </ThemedView>

      <ThemedView style={styles.section}>
        <ThemedText type="defaultSemiBold" style={styles.sectionTitle}>
          Allergies
        </ThemedText>
        <View style={styles.allergiesList}>
          {patient.allergies.map((allergy, index) => (
            <ThemedText 
              key={index}
              style={styles.allergyItem}
            >
              {allergy}
            </ThemedText>
          ))}
        </View>
      </ThemedView>

      <ThemedView style={styles.section}>
        <ThemedText type="defaultSemiBold" style={styles.sectionTitle}>
          Robot Control
        </ThemedText>
        
        <View style={styles.robotControls}>
          <View style={styles.robotStatus}>
            <ThemedText type="defaultSemiBold">Robot Status: </ThemedText>
            <ThemedText style={[
              styles.statusText,
              { color: robotStatus === 'available' ? '#34C759' : '#FFA500' }
            ]}>
              {robotStatus.toUpperCase()}
            </ThemedText>
          </View>

          <View style={styles.commandSection}>
            <ThemedText type="defaultSemiBold" style={styles.commandTitle}>
              Schedule Visit
            </ThemedText>
            
            <View style={styles.commandButtons}>
              <TouchableOpacity 
                style={[styles.commandButton, styles.urgentButton]}
                onPress={handleRobotMovement}  // Connect the handler
                disabled={robotStatus !== 'available'}
              >
                <ThemedText style={styles.buttonText}>Immediate Visit</ThemedText>
              </TouchableOpacity>
              

              <TouchableOpacity 
                style={[
                  styles.commandButton,
                  robotStatus !== 'available' && styles.disabledButton
                ]}
                onPress={()=>{
                  try {
                    router.push({
                      pathname: "/control/control"
                    });
                  } catch (error) {
                    console.error("Navigation error:", error);
                  }
                }}  // Connect the handler
                disabled={robotStatus !== 'available'}
              >
                <ThemedText style={styles.buttonText}>Routine Check</ThemedText>
              </TouchableOpacity>


              <TouchableOpacity 
                style={[styles.commandButton, styles.commandButton]}
                onPress={() => { 
                  
                  try {
                    router.push({
                      pathname: "/patient/call"
                    });
                  } catch (error) {
                    console.error("Navigation error:", error);
                  }
                }}
                disabled={robotStatus !== 'available'}
              >
                <ThemedText style={styles.buttonText}>Call Now!</ThemedText>
              </TouchableOpacity>
              

            </View>
          </View>




          <View style={styles.visitHistory}>
            <ThemedText type="defaultSemiBold" style={styles.historyTitle}>
              Recent Visits
            </ThemedText>
            <View style={styles.historyItem}>
              <ThemedText>No recent visits</ThemedText>
            </View>
          </View>
        </View>
      </ThemedView>

      <Button 
        title="Send Robot to Patient"
        onPress={handleRobotMovement}
      />
    </ScrollView>
    </SafeAreaView>
    </SafeAreaProvider>
  );
}






const VitalCard = ({ title, value }: { title: string; value: string }) => (
  <ThemedView style={styles.vitalCard}>
    <ThemedText type="subtitle">{title}</ThemedText>
    <ThemedText type="defaultSemiBold">{value}</ThemedText>
  </ThemedView>
);

const getStatusColor = (status: Patient['status']) => {
  switch (status) {
    case 'critical':
      return '#FF4444';
    case 'stable':
      return '#44FF44';
    case 'recovering':
      return '#FFAA44';
    default:
      return '#CCCCCC';
  }
};









const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
     backgroundColor: 'white'
  },
  container: {
    flex: 1,
     
  },
  header: {
    padding: 20,
  },
  patientInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  patientImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 15,
  },
  basicInfo: {
    flex: 1,
  },
  statusBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
    marginTop: 5,
  },
  section: {
    margin: 10,
    padding: 15,
    borderRadius: 10,
  },
  sectionTitle: {
    marginBottom: 10,
  },
  vitalsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  vitalCard: {
    width: '48%',
    padding: 15,
    marginBottom: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  medicationItem: {
    padding: 10,
    marginBottom: 5,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
  },
  allergiesList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  allergyItem: {
    backgroundColor: '#FFE4E4',
    padding: 8,
    borderRadius: 15,
    margin: 5,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  robotControls: {
    padding: 10,
  },
  robotStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    backgroundColor: '#f5f5f5',
    padding: 12,
    borderRadius: 8,
  },
  statusText: {
    color: '#34C759', // Green for available state
    fontWeight: '600',
  },
  robotButtonsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  robotButton: {
    backgroundColor: '#007AFF',
    padding: 12,
    borderRadius: 8,
    width: '30%',
    alignItems: 'center',
  },
  startButton: {
    backgroundColor: '#34C759', // Green
  },
  stopButton: {
    backgroundColor: '#FF3B30', // Red
  },
  buttonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
  },
  robotDataDisplay: {
    backgroundColor: '#f5f5f5',
    padding: 15,
    borderRadius: 8,
    marginTop: 10,
  },
  commandSection: {
    marginBottom: 20,
  },
  commandTitle: {
    marginBottom: 10,
  },
  commandButtons: {
    flexDirection: 'column',
    gap: 10,
  },
  commandButton: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  urgentButton: {
    backgroundColor: '#FF3B30', // Red for urgent visits
  },
  visitHistory: {
    backgroundColor: '#f5f5f5',
    padding: 15,
    borderRadius: 8,
  },
  historyTitle: {
    marginBottom: 10,
  },
  historyItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  disabledButton: {
    opacity: 0.5,
  },
});




// Helper function (outside component)
async function registerForPushNotificationsAsync() {
  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;
  
  if (existingStatus !== 'granted') {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }

  if (finalStatus !== 'granted') {
    alert('Failed to get push token for push notification!');
    return;
  }
}

