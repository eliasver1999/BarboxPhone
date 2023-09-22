import { ThemeProvider } from "@shopify/restyle";

import { StyleSheet, Text, View, SafeAreaView, StatusBar } from "react-native";
import { Provider } from "react-redux";
import Navigation from "./src/Navigation";
import { persistor, store } from "./src/redux/store";
import theme from "./src/Theme/Theme";
import { PersistGate } from "redux-persist/integration/react";
export default function App() {
  return (
    <>
      <StatusBar hidden />
      <Provider store={store}>
        <PersistGate loading={<Text>Loading...</Text>} persistor={persistor}>
          <ThemeProvider theme={{ ...theme }}>
            <SafeAreaView style={styles.root}>
              <Navigation />
            </SafeAreaView>
          </ThemeProvider>
        </PersistGate>
      </Provider>
    </>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#F9FBFC",
  },
});
