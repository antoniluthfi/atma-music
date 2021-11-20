import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialIcons, Ionicons } from "@expo/vector-icons";

import AudioList from "../screens/AudioList";
import Player from "../screens/Player";
import PlayList from "../screens/PlayList";

const Tab = createBottomTabNavigator();

const AppNavigation = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ color, size }) => {
          if (route.name === "AudioList") {
            return <MaterialIcons name="headset" size={size} color={color} />;
          } else if (route.name === "Player") {
            return <Ionicons name="disc" size={size} color={color} />;
          } else if (route.name === "PlayList") {
            return (
              <MaterialIcons name="library-music" size={size} color={color} />
            );
          }
        },
        tabBarActiveTintColor: "tomato",
        tabBarInactiveTintColor: "gray",
      })}
    >
      <Tab.Screen name="AudioList" component={AudioList} />
      <Tab.Screen name="Player" component={Player} />
      <Tab.Screen name="PlayList" component={PlayList} />
    </Tab.Navigator>
  );
};

export default AppNavigation;
