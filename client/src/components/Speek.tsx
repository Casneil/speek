import React from "react";
import {SafeAreaView, FlatList, TouchableOpacity} from "react-native";

//3rd party
import {Box, Text} from "react-native-design-utility";
import {useMutation, gql} from "@apollo/client";
import AntDesign from "react-native-vector-icons/AntDesign";
import {formatDistance, subDays} from "date-fns";

// Components
import MyImageComponent from "./MyImageComponent";

// Styles
import {theme} from "../constants/theme";
// import LikeSpeek from "./LikeSpeek";

//Enums and Interfaces
import {ISpeekInterface} from "./Interfaces";
import {ImageLocationEnum} from "./enums";

// Queries and Mutations
import {SPEEKS_QUERY} from "../screens/Home";

// Mutations
const LIKE_SPEEK_MUTATION = gql`
  mutation likeSpeek($id: Int) {
    likeSpeek(id: $id) {
      id
    }
  }
`;

type SpeekTypes = {
  id?: any;
  speek: Array<ISpeekInterface>;
  meData?: any;
};

const Speek: React.FC<SpeekTypes> = (props: SpeekTypes) => {
  const {speek, id, meData} = props;

  const [likeSpeek] = useMutation(LIKE_SPEEK_MUTATION, {
    refetchQueries: [{query: SPEEKS_QUERY}],
  });

  const handleCreateLike = async (id: number) => {
    try {
      await likeSpeek({variables: {id}});
    } catch (error) {
      console.log(error);
    }
  };

  const findSpeek = meData.me.likedSpeek.map(
    (speekEl: ISpeekInterface) => speekEl.speek.id,
  );

  console.log(findSpeek.length);

  // console.log(speek);

  const AllSpeeks = ({
    id,
    title,
    content,
    excerpt,
    author,
    likes,
    createdAt,
  }: ISpeekInterface) => (
    <Box bg={theme.color.white} mb={6}>
      {console.log(findSpeek.includes(id))}
      {console.log(id)}
      <Box
        mx={5}
        bg={theme.color.white}
        style={{
          elevation: 5,
          borderBottomRightRadius: 12,
          borderBottomLeftRadius: 12,
        }}>
        <Text>{likes.length}</Text>
        <Box mx={35}>
          <Box my="sm">
            {author?.Profile.avatar ? (
              <>
                <Box radius="lg" w={40} style={{elevation: 12}}>
                  <MyImageComponent
                    width={40}
                    height={40}
                    where={ImageLocationEnum.INTERNET}
                    source={author.Profile.avatar}
                    type={"jpeg"}
                  />
                </Box>
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
          {/* "Likes container" */}
          <Box dir="row" align="center" justify="between" my="sm">
            {meData.me.likedSpeek.map((t: any) => t.speek.id).includes(id) ? (
              <Box bg="white" radius="sm" style={{elevation: 10}}>
                <TouchableOpacity>
                  <AntDesign
                    name="like1"
                    style={{fontSize: 18, color: theme.color.blueLightest}}
                  />
                </TouchableOpacity>
                {/* <Text>{speek?.likes.length}</Text> */}
              </Box>
            ) : (
              <Box bg="white" radius="sm" style={{elevation: 10}}>
                <TouchableOpacity>
                  <AntDesign
                    name="like2"
                    style={{fontSize: 18, color: theme.color.blueLightest}}
                  />
                </TouchableOpacity>
                {/* <Text>{speek?.likes.length}</Text> */}
              </Box>
            )}
            <Box bg="white" radius="sm" style={{elevation: 10}}>
              <TouchableOpacity>
                <AntDesign
                  name="dislike2"
                  style={{fontSize: 18, color: theme.color.blueLightest}}
                />
              </TouchableOpacity>
            </Box>
            <Box bg="white" radius="sm" p={2} style={{elevation: 10}}>
              <TouchableOpacity>
                <Text my={2} size={12} color={theme.color.grey}>
                  follow
                </Text>
              </TouchableOpacity>
            </Box>
            <Box bg="white" radius="sm" p={2} style={{elevation: 10}}>
              <TouchableOpacity>
                <Text my={2} size={14} color={theme.color.grey}>
                  unfollow
                </Text>
              </TouchableOpacity>
            </Box>
          </Box>
        </Box>
      </Box>
      <Box bg="white" radius="sm" style={{elevation: 10}}>
        <TouchableOpacity onPress={() => handleCreateLike(6)}>
          <AntDesign
            name="like1"
            style={{fontSize: 18, color: theme.color.blueLightest}}
          />
        </TouchableOpacity>
        {/* <Text>{speek?.likes.length}</Text> */}
      </Box>
    </Box>
  );

  const renderItem = ({item}: ISpeekInterface | any) => (
    <AllSpeeks
      id={item.id}
      likes={item.likes}
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
