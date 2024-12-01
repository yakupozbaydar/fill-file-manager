import React from "react";
import { NavigatorScreenParams } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Home } from "@/views/Home";
import { Profile } from "@/views/Profile";
import { Detail, TopTabsParams } from "@/views/Detail";

export type RootStackParams = {
  BottomTabStack: NavigatorScreenParams<BottomTabStackParams>;
  FileStack: NavigatorScreenParams<FileStackParams>;
};

type BottomTabStackParams = {
  FileStack: NavigatorScreenParams<FileStackParams>;
  Profile: undefined;
};

export type FileStackParams = {
  Search: undefined;
  Detail: {
    initialRouteName?: keyof TopTabsParams;
  };
};

const RootStack = createNativeStackNavigator<RootStackParams>();
const FileStack = createNativeStackNavigator<FileStackParams>();
const BottomTabNavigator = createBottomTabNavigator<BottomTabStackParams>();

export const FileStackScreen = () => {
  return (
    <FileStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <FileStack.Screen name="Search" component={Home} />
      <FileStack.Screen name="Detail" component={Detail} />
    </FileStack.Navigator>
  );
};

export const BottomTab = () => {
  return (
    <BottomTabNavigator.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <BottomTabNavigator.Screen name="FileStack" component={FileStackScreen} />
      <BottomTabNavigator.Screen name="Profile" component={Profile} />
    </BottomTabNavigator.Navigator>
  );
};

export const RootStackNavigator = () => {
  return (
    <RootStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <RootStack.Screen name="BottomTabStack" component={BottomTab} />
    </RootStack.Navigator>
  );
};
