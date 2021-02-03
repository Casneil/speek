import React from "react";
import {SafeAreaView, FlatList, TouchableOpacity} from "react-native";

//3rd party
import {Box, Text} from "react-native-design-utility";
import AntDesign from "react-native-vector-icons/AntDesign";
import {formatDistance, subDays} from "date-fns";

// Components
import MyImageComponent from "./MyImageComponent";

// Styles
import {theme} from "../constants/theme";

//Enums and Interfaces
import {ISpeekInterface} from "./Interfaces";
import {ImageLocationEnum} from "./enums";

//Resources

type SpeekTypes = {
  id?: any;
  speek: Array<ISpeekInterface>;
};

const Speek: React.FC<SpeekTypes> = (props: SpeekTypes) => {
  const {speek, id} = props;

  const Item = ({
    title,
    content,
    excerpt,
    author,
    createdAt,
  }: ISpeekInterface) => (
    <Box bg={theme.color.white} mb={6}>
      <Box mx={5} bg={theme.color.white} style={{elevation: 5}}>
        <Box mx={35}>
          <Box my="sm">
            {author?.Profile.avatar ? (
              <>
                <MyImageComponent
                  width={40}
                  height={40}
                  where={ImageLocationEnum.INTERNET}
                  source={author.Profile.avatar}
                  type={"jpeg"}
                />
                <Box dir="row" align="center">
                  <Box mr="lg">
                    <TouchableOpacity>
                      <Box>
                        <Text size={14} color={theme.color.blueLightest} bold>
                          {author.name}
                        </Text>
                      </Box>
                    </TouchableOpacity>
                  </Box>
                  <Text size={11.5} color={theme.color.grey}>
                    {formatDistance(
                      subDays(new Date(createdAt), 0),
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
              <Text mb={4} size="base" lineH="tight" color={theme.color.blue}>
                {title}
              </Text>
            </Box>
          </TouchableOpacity>
          <Box>
            <Text mb={2} size="sm" lineH="tight" color={theme.color.grey}>
              {excerpt}
            </Text>
          </Box>
          <Box mt="sm">
            <Text color={theme.color.black} size="sm" lineH="tight">
              {content}
            </Text>
          </Box>
          <Box dir="row" align="center" justify="between" my="sm">
            <TouchableOpacity>
              <AntDesign
                name="like2"
                style={{fontSize: 16, color: theme.color.blueLightest}}
              />
            </TouchableOpacity>
            <TouchableOpacity>
              <AntDesign
                name="dislike2"
                style={{fontSize: 16, color: theme.color.blueLightest}}
              />
            </TouchableOpacity>
            <TouchableOpacity>
              <Text my={2} size={14} color={theme.color.grey}>
                follow
              </Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text my={2} size={14} color={theme.color.grey}>
                unfollow
              </Text>
            </TouchableOpacity>
          </Box>
        </Box>
      </Box>
    </Box>
  );

  const renderItem = ({item}: ISpeekInterface | any) => (
    <Item
      title={item.title}
      content={item.content}
      createdAt={item.createdAt}
      author={item.author}
      avatar={item.avatar}
      excerpt={item.excerpt}
    />
  );

  return (
    <SafeAreaView>
      <FlatList data={speek} renderItem={renderItem} keyExtractor={id} />
    </SafeAreaView>
  );
};

export default Speek;
