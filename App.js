import NavigationWrapper from './src/navigation/navigation';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Feather,Octicons } from '@expo/vector-icons';
import {useState,useEffect} from "react";
import Bookmark from './src/screens/bookmark';
import Login from './src/screens/login';
import Signup from './src/screens/signup';
import Profile from './src/screens/profile';
import Home from './src/screens/home';
import Explore from './src/screens/explore';
import LocationContext from './src/context/locationContext';
import * as Location from "expo-location";
import Toast from "react-native-toast-message";
import userStore from './src/store/userStore';
import Place from './src/screens/place';
import AsyncStorage from '@react-native-async-storage/async-storage';
import currentLocationStore from './src/store/currentLocationStore';
import RefreshContext from './src/context/refreshContext';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();


const AuthStack = ()=>{

  return(
    <Stack.Navigator screenOptions={{
      headerShown:false,
    }}>
      <Stack.Screen name='Login' component={Login}/>
      <Stack.Screen name='Signup' component={Signup}/>
    </Stack.Navigator>
  )
}


const ButtomTabs = ()=>{
  return(
    <Tab.Navigator initialRouteName='Home' screenOptions={({route})=>({
      tabBarIcon: ({ color, size, focused }) => {
        let iconName;

        if (route.name === 'Home') {
          iconName = 'home';
        } else if (route.name === 'Profile') {
          iconName = 'person';
        } else if (route.name === "Bookmark"){
          iconName = "heart";
        } 
        return (
          <Octicons
            name={iconName}
            size={size}
            color={focused ? 'black' : color}
          />
        );
      },
      tabBarShowLabel:false,
      headerShown:false,
    })}>
      <Tab.Screen name='Bookmark' component={Bookmark}/>
    <Tab.Screen name="Home" component={Home}/>
    <Tab.Screen name='Profile' component={Profile}/>
    <Tab.Screen name='Place' component={Place} options={{tabBarLabel:"",
      tabBarButton:()=>null,
      tabBarVisible:false}}/>
  </Tab.Navigator>
  )
}

export default function App() {
  const [flag,setFlag] = useState(false);
  const isLoggedIn = userStore(state=>state.isLoggedIn);
  const setCurrentLocation = currentLocationStore(state=>state.setCurrentLocation);
  useEffect(()=>{
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        throw "Access to location denied";
      }

      let currentLocation = await Location.getCurrentPositionAsync({});
      setCurrentLocation(currentLocation);
    })();
  },[])
  return (
    <>
    <RefreshContext.Provider value={{flag,setFlag}}>
      <NavigationWrapper>
        {
          isLoggedIn ?
          <ButtomTabs/>:<AuthStack/>
        }
      </NavigationWrapper>
    <Toast/>
    </RefreshContext.Provider>
    </>
  );
}

