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
import {ISpeekInterface} from "../components/Interfaces";

//Styles
import {theme} from "../constants/theme";

const TabNavigator = createMaterialTopTabNavigator();
const SpeekView = ({route}: any) => {
  const {
    params: {data},
  } = route;

  const filterSpeeks = data.speek.find(
    (speek: ISpeekInterface) => speek.id === data.id,
  );

  const View = () => {
    return (
      <Box my="sm">
        {filterSpeeks && (
          <Box mx={35}>
            <Box radius="lg" w={40} style={{elevation: 12}}>
              <MyImageComponent
                width={40}
                height={40}
                where={ImageLocationEnum.INTERNET}
                source={filterSpeeks.author.Profile.avatar}
                type={"jpeg"}
              />
            </Box>
            <Box dir="row" align="center">
              <Box mr="lg">
                <TouchableOpacity>
                  <Box>
                    <Text size={14} color={theme.color.blueLightest} bold>
                      {filterSpeeks.author.name}
                    </Text>
                  </Box>
                </TouchableOpacity>
              </Box>
              <Text size={11.5} color={theme.color.grey}>
                {formatDistance(
                  // @ts-ignore
                  subDays(new Date(filterSpeeks.createdAt), 0),
                  new Date(),
                )}
                ago
              </Text>
            </Box>
            <Box>
              <Text mb={4} size="base" lineH="tight" color={theme.color.blue}>
                {filterSpeeks.title}
              </Text>
            </Box>
          </Box>
        )}
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
