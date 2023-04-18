import { StyleSheet, Text, View } from 'react-native';
import NavigationWrapper from './src/navigation/navigation';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './src/screens/login';
import Signup from './src/screens/signup';
import Profile from './src/screens/profile';
import Home from './src/screens/home';
import Explore from './src/screens/explore';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
      <NavigationWrapper>
        <Stack.Navigator screenOptions={{
          headerShown:false,
        }}>
          <Stack.Screen name='Login' component={Login}/>
          <Stack.Screen name='Home' component={Home}/>
          <Stack.Screen name='Signup' component={Signup}/>
          <Stack.Screen name='Profile' component={Profile}/>
          <Stack.Screen name='Explore' component={Explore}/>
        </Stack.Navigator>
      </NavigationWrapper>
  );
}

