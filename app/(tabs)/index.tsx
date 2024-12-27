import React from 'react';
import { View, SafeAreaView, ScrollView, StyleSheet, TouchableOpacity, Image, Alert } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Doctor, Patient } from '@/types/doctor';
import { StatusModal } from '@/components/StatusModal';
import { useRouter } from 'expo-router';


import { auth } from '@/firebaseConfig'; // Ensure you import auth from your Firebase config
import { useEffect, useState } from 'react';
import { User } from 'firebase/auth'; // Import User type


import { collection, getDocs, query, where } from "firebase/firestore"; 
import { db } from '@/firebaseConfig';
import { doc, getDoc } from "firebase/firestore"; // Ensure 'doc' and 'getDoc' are imported




import { DocumentReference } from 'firebase/firestore';


async function fetchPatients(patientRefs: string[] | { id: string }[]) {
  try {
   

    // Fetch the patient documents by their Firestore document IDs
    const patientDocs = await Promise.all(
      patientRefs.map(async (ref) => {
        const patientId = typeof ref === "string" ? ref : ref.id;
        const patientDocRef = doc(db, "patients", patientId);
        const patientDoc = await getDoc(patientDocRef);

        if (!patientDoc.exists()) {
          console.warn(`No patient found for ID: ${patientId}`);
          return null; // Return null if the document doesn't exist
        }

        
        return patientDoc.data() as Patient; // Return the patient data
      })
    );


    // Filter out null entries (patients that were not found)
    return patientDocs.filter(Boolean); 
  } catch (error) {
    console.error("Error fetching patients:", error);
    return [];
  }
}


 




export default function DoctorHomeScreen() {
  const router = useRouter();
  const [selectedPatient, setSelectedPatient] = React.useState<Patient | null>(null);
  const [isModalVisible, setIsModalVisible] = React.useState(false);


  const [user, setUser] = useState<User | null>(null); // State to hold user data
  const [doctorData, setDoctorData] = useState<Doctor | null>(null)

  useEffect(() => {
    // Directly get the current user
    const currentUser = auth.currentUser;
    if (currentUser) {
       currentUser.uid
      setUser(currentUser); 
      fetchDoctorData(currentUser.uid)
    } 
  }, []); 

  async function fetchDoctorData(uid: string) {
    try {
      // Create a query to find the doctor document where the 'id' field matches the uid
      const doctorQuery = query(collection(db, "Doctor"), where("id", "==", uid));
      const querySnapshot = await getDocs(doctorQuery);
  
      if (!querySnapshot.empty) {
        const data: Doctor = querySnapshot.docs[0].data() as Doctor;
        
        if (data.patients && Array.isArray(data.patients)) {
          // Ensure the 'patients' field contains references or patient IDs
          const patientRefs = data.patients;
  
          // Convert Firestore references to patient IDs if needed
          const patientIds = patientRefs.map(ref => {
            if (ref instanceof DocumentReference) {
              return ref.id;  // Extract patient ID from DocumentReference
            } else if (typeof ref === 'string') {
              return ref;  // Already a patient ID
            } else {
              return null;  // In case of any invalid format
            }
          }).filter(Boolean);
  
          // Fetch the patient data
          const patients = await fetchPatients(patientIds.filter((id): id is string => id !== null));
          
  
          // Assign the fetched patient data to the doctor document
          data.patients = patients.filter((patient): patient is Patient => patient !== null);
        }
        
        setDoctorData(data);
        
      } else {
        console.log('No doctor found for ID:', uid);
      }
    } catch (error) {
      console.error('Error fetching doctor data:', error);
    }
  }
  
 
  

  const handleStatusPress = (patient: Patient) => {
    setSelectedPatient(patient);
    setIsModalVisible(true);
  };

  

  const handlePatientPress = (patient: Patient) => {
    if (patient.id) {
      router.push({
        pathname: `./patient/${patient.id}`,
        params: { patient: JSON.stringify(patient) }
      });
    } else {
      console.error("Patient ID is missing");
    }
  };





  

  return (
    <SafeAreaView style={styles.container}>
    <ScrollView >
      <ThemedView style={styles.header}>
        <View style={styles.profileSection}>
          <View style={styles.profileImageContainer}>
            <Image 
              source={{ uri: doctorData?.profileImage }}
              style={styles.profileImage}
            />
            <View style={styles.statusBadge} />
          </View>
          <View style={styles.profileInfo}>
            <ThemedText type="title">{doctorData?.name}</ThemedText>
            <ThemedText type="subtitle">
              {doctorData?.specialization}
            </ThemedText>
            <ThemedText type="subtitle">
              {doctorData?.department}
            </ThemedText>
          </View>
        </View>
        
        <View style={styles.quickActions}>
          <TouchableOpacity style={styles.actionButton}>
            <ThemedText>Edit Profile</ThemedText>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <ThemedText>Schedule</ThemedText>
          </TouchableOpacity>
        </View>
      </ThemedView>

      <ThemedView style={styles.statsContainer}>
        <ThemedView style={styles.statBox}>
          <ThemedText type="title">{doctorData?.patients.length}</ThemedText>
          <ThemedText>Total Patients</ThemedText>
        </ThemedView>
        <ThemedView style={styles.statBox}>
          <ThemedText type="title">
            {doctorData?.patients.filter(p => p.status === 'critical').length}
          </ThemedText>
          <ThemedText>Critical Cases</ThemedText>
        </ThemedView>
      </ThemedView>

      <ThemedView style={styles.patientsList}>
        <ThemedText type="defaultSemiBold" style={styles.sectionTitle}>
          Current Patients
        </ThemedText>
        
        {doctorData?.patients.map((patient) => (
          <TouchableOpacity 
            key={patient.id}
            onPress={() => handlePatientPress(patient)}
            style={styles.patientCard}
          >
            <View>
              <ThemedText type="defaultSemiBold">{patient.name}</ThemedText>
              <ThemedText>Age: {patient.age}</ThemedText>
              <ThemedText>Condition: {patient.condition}</ThemedText>
            </View>
            <View style={styles.patientStatus}>
              <TouchableOpacity
                onPress={() => handleStatusPress(patient)}
              >
                <ThemedText 
                  style={[
                    styles.statusBadge,
                    { backgroundColor: getStatusColor(patient.status) }
                  ]}
                >
                  {patient.status}
                </ThemedText>
              </TouchableOpacity>
              {patient.roomNumber && (
                <ThemedText>Room {patient.roomNumber}</ThemedText>
              )}
            </View>
          </TouchableOpacity>
        ))}
      </ThemedView>

      {selectedPatient && (
        <StatusModal
          isVisible={isModalVisible}
          onClose={() => setIsModalVisible(false)}
          patient={selectedPatient}
        />
      )}
    </ScrollView>
    </SafeAreaView>
  );
}

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
  container: {
    flex: 1,
    backgroundColor: 'white'
    
  },
  header: {
    padding: 20,
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50, // Makes it circular
    marginRight: 15,
    borderWidth: 3,
    borderColor: '#fff', // Or use your theme color
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  profileInfo: {
    flex: 1,
  },
  statsContainer: {
    flexDirection: 'row',
    padding: 20,
    justifyContent: 'space-around',
  },
  statBox: {
    alignItems: 'center',
    padding: 15,
    borderRadius: 10,
    minWidth: 100,
  },
  patientsList: {
    padding: 20,
  },
  sectionTitle: {
    marginBottom: 15,
  },
  patientCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    marginBottom: 10,
    borderRadius: 10,
  },
  patientStatus: {
    alignItems: 'flex-end',
  },
  statusBadge: {
    position: 'absolute',
    bottom: 5,
    right: 5,
    width: 15,
    height: 15,
    borderRadius: 7.5,
    backgroundColor: '#4CAF50', // Green for "online" status
    borderWidth: 2,
    borderColor: '#fff',
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 15,
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  actionButton: {
    padding: 10,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    minWidth: 100,
    alignItems: 'center',
  },
  profileImageContainer: {
    position: 'relative',
  },
});
