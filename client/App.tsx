import React from 'react';
import {SafeAreaView, StatusBar} from 'react-native';

import {ApolloClient, ApolloProvider, InMemoryCache} from '@apollo/client';
// 3rd Party
import {UtilityThemeProvider, Box, Text} from 'react-native-design-utility';
import {theme} from './src/constants/theme';

const client = new ApolloClient({
  uri: 'http://localhost:4000',
  cache: new InMemoryCache(),
});

const App = () => {
  return (
    <ApolloProvider client={client}>
      <UtilityThemeProvider theme={theme}>
        <StatusBar barStyle="light-content" />
        <Box bg="purpleLightest" f={1}>
          <SafeAreaView>
            <Text size="xl" center>
              Hello Casneil
            </Text>
          </SafeAreaView>
        </Box>
      </UtilityThemeProvider>
    </ApolloProvider>
  );
};

export default App;
