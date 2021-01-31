import React from "react";
import {SafeAreaView, StatusBar} from "react-native";

import {ApolloClient, InMemoryCache, ApolloProvider} from "@apollo/client";
// 3rd Party
import {UtilityThemeProvider, Box} from "react-native-design-utility";
import {theme} from "./src/constants/theme";

import StackNavigator from "./src/navigation/NavStack";

const client = new ApolloClient({
  uri: "http://192.168.1.13:4000/graphql",
  cache: new InMemoryCache(),
});

const App = () => {
  return (
    <UtilityThemeProvider theme={theme}>
      <ApolloProvider client={client}>
        <StatusBar barStyle="light-content" />
        {/* <SafeAreaView> */}
        <StackNavigator />
        {/* </SafeAreaView> */}
      </ApolloProvider>
    </UtilityThemeProvider>
  );
};

export default App;
