import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './(tabs)/Home';
import Logar from './(tabs)/Logar';
import RemoverUsuarioScreen from './(tabs)/RemoveUsuario';

const Tab = createBottomTabNavigator();

export default function Route() {
  return (
    <Tab.Navigator screenOptions={{ tabBarStyle: { display: 'none' } }}>
      <Tab.Screen name="Login" component={Logar} />
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="RemoverUsuario" component={RemoverUsuarioScreen} />
    </Tab.Navigator>
  );
}
