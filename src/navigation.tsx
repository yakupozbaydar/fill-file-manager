import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Home } from "@/views/Home";
import { Detail } from "@/views/Detail";

type BottomTabStackParams = {
  HomeStack: HomeStackParams;
  Profile: undefined;
};

type HomeStackParams = {
  Home: undefined;
  Detail: undefined;
};

const BottomTabNavigator = createBottomTabNavigator<BottomTabStackParams>();

const HomeStackNavigator = createNativeStackNavigator<HomeStackParams>();

const HomeStack = () => {
  return (
    <HomeStackNavigator.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <HomeStackNavigator.Screen name="Home" component={Home} />
      <HomeStackNavigator.Screen name="Detail" component={Detail} />
    </HomeStackNavigator.Navigator>
  );
};

export const MainStack = () => {
  return (
    <BottomTabNavigator.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <BottomTabNavigator.Screen name="HomeStack" component={HomeStack} />
      <BottomTabNavigator.Screen name="Profile" component={Detail} />
    </BottomTabNavigator.Navigator>
  );
};

export const RootStack = () => {
  return (
    <NavigationContainer>
      <MainStack />
    </NavigationContainer>
  );
};
