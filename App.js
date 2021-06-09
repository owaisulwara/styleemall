import React, { useState, useCallback, useEffect } from "react";
import {
  StyleSheet,
  BackHandler,
  Alert,
  SafeAreaView,
  ScrollView,
  RefreshControl,
  ActivityIndicator,
  View,
  Dimensions,
  StatusBar,
} from "react-native";
import { WebView } from "react-native-webview";

const { width, height } = Dimensions.get("window");

function exitApp() {
  Alert.alert(
    "Alert!",
    "Are you sure you want to exit from the app ?",
    [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      { text: "OK", onPress: () => BackHandler.exitApp() },
    ],
    { cancelable: false }
  );
}

export default function App() {
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", exitApp);
    return () => BackHandler.removeEventListener("hardwareBackPress", exitApp);
  }, []);

  const wait = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(1000).then(() => setRefreshing(false));
  }, []);

  const Loading = () => (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff",
        width,
        height,
        position: "absolute",
      }}
    >
      <ActivityIndicator color="#000" />
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flex: 1, backgroundColor: "#fff" }}
        refreshControl={
          <RefreshControl onRefresh={onRefresh} refreshing={refreshing} />
        }
      >
        {refreshing ? (
          <ActivityIndicator color="#000" />
        ) : (
          <WebView
            source={{ uri: "http://styleemall.com/" }}
            startInLoadingState={true}
            renderLoading={() => <Loading />}
          />
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
});
