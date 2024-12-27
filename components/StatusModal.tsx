import React from 'react';
import { Modal, View, StyleSheet, TouchableOpacity } from 'react-native';
import { ThemedText } from './ThemedText';
import { ThemedView } from './ThemedView';
import { Patient } from '@/types/doctor';

interface StatusModalProps {
  isVisible: boolean;
  onClose: () => void;
  patient: Patient;
}

export function StatusModal({ isVisible, onClose, patient }: StatusModalProps) {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <View style={styles.centeredView}>
        <ThemedView style={styles.modalView}>
          <ThemedText type="title">{patient.name}</ThemedText>
          
          <View style={styles.statusDetails}>
            <View style={styles.statusRow}>
              <ThemedText type="defaultSemiBold">Status:</ThemedText>
              <ThemedText 
                style={[
                  styles.statusBadge,
                  { backgroundColor: getStatusColor(patient.status) }
                ]}
              >
                {patient.status.toUpperCase()}
              </ThemedText>
            </View>

            <View style={styles.detailRow}>
              <ThemedText type="defaultSemiBold">Room:</ThemedText>
              <ThemedText>{patient.roomNumber}</ThemedText>
            </View>

            <View style={styles.detailRow}>
              <ThemedText type="defaultSemiBold">Condition:</ThemedText>
              <ThemedText>{patient.condition}</ThemedText>
            </View>

            <View style={styles.detailRow}>
              <ThemedText type="defaultSemiBold">Next Appointment:</ThemedText>
              <ThemedText>
                {patient.nextAppointment?.toLocaleDateString()}
              </ThemedText>
            </View>

            <View style={styles.notesSection}>
              <ThemedText type="defaultSemiBold">Notes:</ThemedText>
              <ThemedText>
                Patient is currently {patient.status}. Regular monitoring required.
              </ThemedText>
            </View>
          </View>

          <TouchableOpacity
            style={styles.closeButton}
            onPress={onClose}
          >
            <ThemedText style={styles.closeButtonText}>Close</ThemedText>
          </TouchableOpacity>
        </ThemedView>
      </View>
    </Modal>
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
      return '#';
  }
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  statusDetails: {
    width: '100%',
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    marginBottom: 10
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    marginRight: 10
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10
  },
  notesSection: {
    marginBottom: 20
  },
  closeButton: {
    backgroundColor: '#2196F3',
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  closeButtonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 16
  }
});
