import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import AuthenticationNavigator from "./AuthenticationNavigator";
import HomeNavigator from "./HomeNavigator";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useSelector } from "react-redux";
type Props = {};

type AppStackRoutes = {
  Authentication: undefined;
  Home: undefined;
};
const AppStack = createStackNavigator<AppStackRoutes>();
const Navigation = (props: Props) => {
  const user = useSelector((state: any) => state.user);
  const [auth, setAuth] = useState(false);
  useEffect(() => {
    if (user.token) {
      setAuth(true);
    } else {
      setAuth(false);
    }
  }, [user.token]);
  return (
    <NavigationContainer>
      <SafeAreaProvider>
        <AppStack.Navigator screenOptions={{ headerShown: false }}>
          {!auth ? (
            <AppStack.Screen
              name="Authentication"
              component={AuthenticationNavigator}
            />
          ) : (
            <AppStack.Screen
              name="Home"
              component={HomeNavigator}
              options={{ gestureEnabled: false }}
            />
          )}
        </AppStack.Navigator>
      </SafeAreaProvider>
    </NavigationContainer>
  );
};

export default Navigation;
