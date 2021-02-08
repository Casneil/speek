import React from "react";

import {TouchableOpacity} from "react-native";
import {createMaterialTopTabNavigator} from "@react-navigation/material-top-tabs";

//3rd Party
import {Box, Text} from "react-native-design-utility";
import {formatDistance, subDays} from "date-fns";

// Components
import MyImageComponent from "../components/MyImageComponent";

//Enums and Interfaces
import {ImageLocationEnum} from "../components/enums";

//Styles
import {theme} from "../constants/theme";

const TabNavigator = createMaterialTopTabNavigator();
const SpeekView = ({route}: any) => {
  const {params} = route;

  const View = () => {
    return (
      <Box my="sm">
        <Box mx={35}>
          <Box radius="lg" w={40} style={{elevation: 12}}>
            <MyImageComponent
              width={40}
              height={40}
              where={ImageLocationEnum.INTERNET}
              source={params.data.author.Profile.avatar}
              type={"jpeg"}
            />
          </Box>
          <Box dir="row" align="center">
            <Box mr="lg">
              <TouchableOpacity>
                <Box>
                  <Text size={14} color={theme.color.blueLightest} bold>
                    {params.data.author.name}
                  </Text>
                </Box>
              </TouchableOpacity>
            </Box>
            <Text size={11.5} color={theme.color.grey}>
              {formatDistance(
                // @ts-ignore
                subDays(new Date(params.data.createdAt), 0),
                new Date(),
              )}
              ago
            </Text>
          </Box>
          <Box>
            <Text mb={4} size="base" lineH="tight" color={theme.color.blue}>
              {params.data.title}
            </Text>
          </Box>
        </Box>
        <Box></Box>
      </Box>
    );
  };
  return (
    <TabNavigator.Navigator>
      <TabNavigator.Screen name="SpeekView" component={View} />
    </TabNavigator.Navigator>
  );
};

export default SpeekView;
