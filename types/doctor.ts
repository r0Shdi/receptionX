export interface Patient {
  id: string;
  name: string;
  age: number;
  condition: string;
  roomNumber?: string;
  nextAppointment?: Date;
  status: 'stable' | 'critical' | 'recovering';
  gender: string;
  bloodType: string;
  allergies: string[];
  medications: [{
    name: string;
    dosage: string;
  }];
  recentVitals: {
    bloodPressure: string;
    heartRate: string;
    temperature: string;
    oxygenSaturation: string;
  };
}

export interface Doctor {
  id: string;
  name: string;
  specialization: string;
  department: string;
  profileImage: string;
  patients:  Patient[];
}










// // Mock data (later you'd fetch this from an API)
// const doctorData: Doctor = {
//   id: '1',
//   name: 'Dr. Roshdi Fxxxx',
//   specialization: 'Cardiology',
//   department: 'Cardiac Care Unit',
//   profileImage: 'https://example.com/doctor-image.jpg', // Replace with your image URL
//   // Or use a local image: require('@/assets/images/doctor-profile.jpg')
//   patients: [
//     {
//       id: '1',
//       name: 'Mona xxxxx',
//       age: 45,
//       condition: 'Post-cardiac surgery',
//       roomNumber: '301',
//       status: 'stable',
//       nextAppointment: new Date('2024-03-20'),
//       gender: 'female',
//       bloodType: 'A+',
//       allergies: ['penicillin'],
//       medications: [
//         {
//           name: 'Aspirin',
//           dosage: '81mg daily'
//         }
//       ],
//       recentVitals: {
//         bloodPressure: '120/80',
//         heartRate: '72 bpm',
//         temperature: '98.6°F',
//         oxygenSaturation: '98%'
//       }
//     },
//     {
//       id: '2',
//       name: 'Roshdi Fxxxx',
//       age: 62,
//       condition: 'Hypertension',
//       roomNumber: '302',
//       status: 'critical',
//       nextAppointment: new Date('2024-03-21'),
//       gender: 'male',
//       bloodType: 'O+',
//       allergies: ['sulfa'],
//       medications: [
//         {
//           name: 'Lisinopril',
//           dosage: '10mg daily'
//         },
//         {
//           name: 'Metoprolol',
//           dosage: '25mg twice daily'
//         }
//       ],
//       recentVitals: {
//         bloodPressure: '160/95',
//         heartRate: '88 bpm',
//         temperature: '98.8°F',
//         oxygenSaturation: '96%'
//       }
//     },
//     {
//       id: '3',
//       name: 'Makka xxxxx',
//       age: 35,
//       condition: 'Arrhythmia',
//       roomNumber: '303',
//       status: 'recovering',
//       nextAppointment: new Date('2024-03-22'),
//       gender: 'female',
//       bloodType: 'B-',
//       allergies: [],
//       medications: [
//         {
//           name: 'Amiodarone',
//           dosage: '200mg daily'
//         }
//       ],
//       recentVitals: {
//         bloodPressure: '118/75',
//         heartRate: '92 bpm',
//         temperature: '98.4°F',
//         oxygenSaturation: '97%'
//       }
//     },
//     // Add more mock patients as needed
//   ],
// };