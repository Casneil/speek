import React from 'react';
import {SafeAreaView, StatusBar, View} from 'react-native';

// 3rd Party
import {UtilityThemeProvider, Box, Text} from 'react-native-design-utility';
import {theme} from './src/constants/theme';

const App = () => {
  return (
    <UtilityThemeProvider theme={theme}>
      <StatusBar barStyle="light-content" />
      <Box bg="purpleLightest" f={1}>
        <SafeAreaView>
          <Text size="xl" center>
            Hello
          </Text>
        </SafeAreaView>
      </Box>
    </UtilityThemeProvider>
  );
};

export default App;
