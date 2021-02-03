import React from "react";
import {StatusBar} from "react-native";

// 3rd Party
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink,
} from "@apollo/client";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {UtilityThemeProvider} from "react-native-design-utility";
import {setContext} from "apollo-link-context";
import {theme} from "./src/constants/theme";

// Navigation
import StackNavigator from "./src/navigation/NavStack";

// Interfaces and Enums
import {StorageKeyEnum} from "./src/components/enums";

// Context
import {AuthContextProvider} from "./src/components/context/AuthContext";

const httpLink = new HttpLink({uri: "http://192.168.1.13:4000/graphql"});
const authLink = setContext(async (req, {headers}) => {
  const token = await AsyncStorage.getItem(StorageKeyEnum.TOKEN);
  return {
    ...headers,
    headers: {
      Authorization: token ? `Bearer ${token}` : null,
    },
  };
});

const link = authLink.concat(httpLink as any);

const client = new ApolloClient({
  link: link as any,
  cache: new InMemoryCache(),
});

const App = () => {
  return (
    <AuthContextProvider>
      <UtilityThemeProvider theme={theme}>
        <ApolloProvider client={client}>
          <StatusBar barStyle="dark-content" backgroundColor="white" />
          {/* <SafeAreaView> */}
          <StackNavigator />
          {/* </SafeAreaView> */}
        </ApolloProvider>
      </UtilityThemeProvider>
    </AuthContextProvider>
  );
};

export default App;
