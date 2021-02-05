import React, {useState, useEffect} from "react";
import {ScrollView, TouchableOpacity} from "react-native";

//3rd party
import {useQuery} from "@apollo/client";
import {Box, Text} from "react-native-design-utility";
import AntDesign from "react-native-vector-icons/AntDesign";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import {formatDistance, subDays} from "date-fns";

//Components
import MyActivityIndicator from "../components/MyActivityIndicator";
import MyImageComponent from "../components/MyImageComponent";

//Enums and Interfaces
import {ISpeekInterface} from "../components/Interfaces";
import {ImageLocationEnum} from "../components/enums";

//Styles
import {theme} from "../constants/theme";

// Queries and Mutations
import {SPEEKS_QUERY} from "./Home";

const Trending = () => {
  const [sortedSpeeks, setSortedSpeeks] = useState<ISpeekInterface[]>();
  //States
  const {loading, error, data} = useQuery(SPEEKS_QUERY);

  if (error) <Text>{error.message}</Text>;

  useEffect(() => {
    data && sortTrending();
  }, [loading]);

  const sortTrending = async () => {
    let speeksData = await data.speeks
      .map((speek: ISpeekInterface) => speek)
      .sort(
        (a: ISpeekInterface, b: ISpeekInterface) =>
          b.likes.length - a.likes.length,
      )
      .slice(0, 50);

    setSortedSpeeks(speeksData);
  };

  return (
    <>
      {loading ? (
        <Box>
          <MyActivityIndicator size="large" color={theme.color.blueLightest} />
        </Box>
      ) : (
        <ScrollView style={{marginTop: 4}}>
          {sortedSpeeks?.map((speek: ISpeekInterface) => (
            <Box bg={theme.color.white} mb={6} key={speek.id}>
              <Box
                mx={5}
                bg={theme.color.white}
                style={{
                  elevation: 3,
                  borderBottomRightRadius: 12,
                  borderBottomLeftRadius: 12,
                }}>
                <Box mx={35}>
                  <Box my="sm">
                    {speek?.author?.Profile.avatar ? (
                      <>
                        <Box radius="lg" w={40} style={{elevation: 12}}>
                          <MyImageComponent
                            width={40}
                            height={40}
                            where={ImageLocationEnum.INTERNET}
                            source={speek?.author.Profile.avatar}
                            type={"jpeg"}
                          />
                        </Box>
                        <Box dir="row" align="center">
                          <Box mr="lg">
                            <TouchableOpacity>
                              <Box>
                                <Text
                                  size={14}
                                  color={theme.color.blueLightest}
                                  bold>
                                  {speek?.author.name}
                                </Text>
                              </Box>
                            </TouchableOpacity>
                          </Box>
                          <Text size={11.5} color={theme.color.grey}>
                            {formatDistance(
                              // @ts-ignore
                              subDays(new Date(speek?.createdAt), 0),
                              new Date(),
                            )}{" "}
                            ago
                          </Text>
                        </Box>
                      </>
                    ) : (
                      <MyImageComponent width={40} height={40} />
                    )}
                  </Box>
                  <TouchableOpacity>
                    <Box>
                      <Text
                        mb={4}
                        size="base"
                        lineH="tight"
                        color={theme.color.blue}>
                        {speek?.title}
                      </Text>
                    </Box>
                  </TouchableOpacity>
                  <Box>
                    <Text
                      mb={2}
                      size="sm"
                      lineH="tight"
                      color={theme.color.grey}>
                      {speek?.excerpt}
                    </Text>
                  </Box>
                  <Box mt="sm">
                    <Text color={theme.color.black} size="sm" lineH="tight">
                      {speek?.content}
                    </Text>
                  </Box>
                  <Box>
                    {/* likes count box */}
                    <Box dir="row" align="center" my="sm">
                      <Box
                        bg={theme.color.white}
                        radius="sm"
                        style={{elevation: 10}}>
                        <Box self="end" mb={-10}>
                          <Text
                            color={theme.color.blueLightest}
                            size={12}
                            bold
                            pl={2}>
                            {speek.likes.length > 0 && speek.likes.length}
                          </Text>
                        </Box>
                        <AntDesign
                          name={speek.likes.length > 0 ? "like1" : "like2"}
                          style={{
                            fontSize: 18,
                            color: theme.color.blueLightest,
                          }}
                        />
                      </Box>
                      <Box
                        bg="white"
                        radius="sm"
                        p={2}
                        style={{elevation: 10}}
                        mx="sm">
                        <TouchableOpacity>
                          <FontAwesome5
                            name="comment-dots"
                            style={{
                              fontSize: 18,
                              color: theme.color.blueLightest,
                            }}
                          />
                        </TouchableOpacity>
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </Box>
              <Box bg="white" radius="sm" style={{elevation: 10}}></Box>
            </Box>
          ))}
        </ScrollView>
      )}
    </>
  );
};

export default Trending;
