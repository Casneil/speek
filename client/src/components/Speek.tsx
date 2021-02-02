import React from "react";
import {SafeAreaView, FlatList} from "react-native";

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
    <Box mx={50} mb="sm">
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
      <Box>
        <Text mb={4} size="sm" lineH="tight" color="blue">
          {title}
        </Text>
      </Box>
      <Box>
        <Text mb={2} size="sm" lineH="tight" color="blueLightest">
          {excerpt}
        </Text>
      </Box>
      <Box>
        <Text color="black" size="sm" lineH="tight">
          {content}
        </Text>
      </Box>
      <Box>
        <Text>{author.name}</Text>
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
