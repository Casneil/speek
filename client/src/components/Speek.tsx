import React from "react";
import {SafeAreaView, FlatList, TouchableOpacity} from "react-native";

//3rd party
import {Box, Text} from "react-native-design-utility";
import AntDesign from "react-native-vector-icons/AntDesign";

// Components
import MyImageComponent from "./MyImageComponent";

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

  const Item = ({title, content, excerpt, author}: ISpeekInterface) => (
    <Box bg="white" mb={6}>
      <Box mx={6} bg="white" style={{elevation: 5}}>
        <Box mx={30}>
          <Box my="sm">
            {author?.Profile.avatar ? (
              <MyImageComponent
                width={40}
                height={40}
                where={ImageLocationEnum.INTERNET}
                source={author.Profile.avatar}
                type={"jpeg"}
              />
            ) : (
              <MyImageComponent width={40} height={40} />
            )}
          </Box>
          <TouchableOpacity>
            <Box>
              <Text mb={4} size="base" lineH="tight" color="blue">
                {title}
              </Text>
            </Box>
          </TouchableOpacity>
          <Box>
            <Text mb={2} size="sm" lineH="tight" color="gray">
              {excerpt}
            </Text>
          </Box>
          <Box mt="sm">
            <Text color="black" size="sm" lineH="tight">
              {content}
            </Text>
          </Box>
          <Box dir="row" align="center" justify="between" my="sm">
            <TouchableOpacity>
              <Box>
                <Text my={2} size={14} color="gray">
                  {author.name}
                </Text>
              </Box>
            </TouchableOpacity>
            <TouchableOpacity>
              <AntDesign name="like1" style={{fontSize: 16}} />
            </TouchableOpacity>
            <TouchableOpacity>
              <AntDesign name="dislike1" style={{fontSize: 16}} />
            </TouchableOpacity>
            <TouchableOpacity>
              <Text my={2} size={14} color="gray">
                follow
              </Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text my={2} size={14} color="gray">
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
