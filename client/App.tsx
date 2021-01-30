import React from "react";
import {SafeAreaView, StatusBar} from "react-native";

import {ApolloClient, InMemoryCache, ApolloProvider} from "@apollo/client";
// 3rd Party
import {UtilityThemeProvider, Box} from "react-native-design-utility";
import {theme} from "./src/constants/theme";

import Users from "./src/components/Users";

const client = new ApolloClient({
  uri: "http://192.168.1.13:4000/graphql",
  cache: new InMemoryCache(),
});

const App = () => {
  return (
    <UtilityThemeProvider theme={theme}>
      <ApolloProvider client={client}>
        <StatusBar barStyle="light-content" />
        <Box center bg="purpleLightest" f={1}>
          <SafeAreaView>
            <Users />
          </SafeAreaView>
        </Box>
      </ApolloProvider>
    </UtilityThemeProvider>
  );
};

export default App;
