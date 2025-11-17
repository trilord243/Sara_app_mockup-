import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';

// Import screens
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import PreTaskScreen from './screens/PreTaskScreen';
import PhotoUploadScreen from './screens/PhotoUploadScreen';
import RiskAssessmentScreen from './screens/RiskAssessmentScreen';
import RiskDetailScreen from './screens/RiskDetailScreen';
import RiskMatrixScreen from './screens/RiskMatrixScreen';
import SummaryScreen from './screens/SummaryScreen';
import CongratulationsScreen from './screens/CongratulationsScreen';
import RiskReassessmentScreen from './screens/RiskReassessmentScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="light" />
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="PreTask" component={PreTaskScreen} />
        <Stack.Screen name="PhotoUpload" component={PhotoUploadScreen} />
        <Stack.Screen name="RiskAssessment" component={RiskAssessmentScreen} />
        <Stack.Screen name="RiskDetail" component={RiskDetailScreen} />
        <Stack.Screen name="RiskMatrix" component={RiskMatrixScreen} />
        <Stack.Screen name="Summary" component={SummaryScreen} />
        <Stack.Screen name="Congratulations" component={CongratulationsScreen} />
        <Stack.Screen name="RiskReassessment" component={RiskReassessmentScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
