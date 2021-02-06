import React, {useState} from "react";
import {SafeAreaView, FlatList, TouchableOpacity} from "react-native";

//3rd party
import {Box, Text} from "react-native-design-utility";
import {useMutation, gql} from "@apollo/client";
import AntDesign from "react-native-vector-icons/AntDesign";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import {formatDistance, subDays} from "date-fns";

// Components
import MyImageComponent from "./MyImageComponent";
import CreateComment from "./CreateComment";

// Styles
import {theme} from "../constants/theme";
// import LikeSpeek from "./LikeSpeek";

//Enums and Interfaces
import {ISpeekInterface} from "./Interfaces";
import {ImageLocationEnum} from "./enums";

// Queries and Mutations
import {SPEEKS_QUERY} from "../screens/Home";
import {ME_QUERY} from "../screens/Profile";

// Mutations
const LIKE_SPEEK_MUTATION = gql`
  mutation likeSpeek($id: Int) {
    likeSpeek(id: $id) {
      id
    }
  }
`;

const DELETE_LIKED_SPEEK_MUTATION = gql`
  mutation deleteLike($id: Int!) {
    deleteLike(id: $id) {
      id
    }
  }
`;

// Types
type SpeekTypes = {
  speek: Array<ISpeekInterface>;
  meData?: any;
};

const Speek: React.FC<SpeekTypes> = (props) => {
  const {speek, meData} = props;
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [speekId, setSpeekId] = useState<number>();

  const [likeSpeek] = useMutation(LIKE_SPEEK_MUTATION, {
    refetchQueries: [{query: SPEEKS_QUERY}, {query: ME_QUERY}],
  });

  const [deleteLike] = useMutation(DELETE_LIKED_SPEEK_MUTATION, {
    refetchQueries: [{query: SPEEKS_QUERY}, {query: ME_QUERY}],
  });

  const handleCreateLike = async (id: any) => {
    try {
      await likeSpeek({variables: {id}});
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteLike = async (id: any) => {
    try {
      await deleteLike({variables: {id}});
    } catch (error) {
      console.log(error);
    }
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const sortSpeeks = meData.me.likedSpeek.map(
    (speekEl: ISpeekInterface) => speekEl.speek.id,
  );

  const AllSpeeks = ({
    id,
    title,
    content,
    excerpt,
    author,
    likes,
    createdAt,
    comments,
  }: ISpeekInterface) => (
    <Box bg={theme.color.white} mb={6}>
      {modalOpen && (
        <CreateComment
          show={modalOpen}
          closeModal={closeModal}
          id={speekId!}
          data={speek[speekId!]}
        />
      )}
      <Box
        mx={5}
        bg={theme.color.white}
        style={{
          elevation: 5,
          borderBottomRightRadius: 12,
          borderBottomLeftRadius: 12,
        }}>
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
                      // @ts-ignore
                      subDays(new Date(createdAt), 0),
                      new Date(),
                    )}
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
            {sortSpeeks.includes(id) ? (
              <Box>
                {/* likes count box */}
                <Box bg={theme.color.white} radius="sm" style={{elevation: 10}}>
                  <Box self="end" mb={-10}>
                    <Text
                      color={theme.color.blueLightest}
                      size={12}
                      bold
                      pl={2}>
                      {likes.length}
                    </Text>
                  </Box>
                  <TouchableOpacity
                    //@ts-ignore
                    onPress={() => handleDeleteLike(likes[0].id)}>
                    <AntDesign
                      name="like1"
                      style={{fontSize: 18, color: theme.color.blueLightest}}
                    />
                  </TouchableOpacity>
                </Box>
              </Box>
            ) : (
              <Box>
                <Box bg={theme.color.white} radius="sm" style={{elevation: 10}}>
                  <Box self="end" mb={-10}>
                    <Text
                      color={
                        likes.length > 0
                          ? theme.color.blueLightest
                          : theme.color.white
                      }
                      size={12}
                      bold
                      pl={2}>
                      {likes.length}
                    </Text>
                  </Box>
                  <TouchableOpacity onPress={() => handleCreateLike(id)}>
                    <AntDesign
                      name="like2"
                      style={{fontSize: 18, color: theme.color.blueLightest}}
                    />
                  </TouchableOpacity>
                </Box>
              </Box>
            )}
            {/* Comments icon */}
            <Box bg="white" radius="sm" p={2} style={{elevation: 10}}>
              <Box self="end" mb={-4}>
                {comments?.length!! > 0 && (
                  <Text color={theme.color.blueLightest} size={12} bold pl={2}>
                    {comments?.length}
                  </Text>
                )}
              </Box>
              <TouchableOpacity
                onPress={() => {
                  setSpeekId(id);
                  setModalOpen(true);
                }}>
                <FontAwesome5
                  name="comment-dots"
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
                <Text my={2} size={12} color={theme.color.grey}>
                  unfollow
                </Text>
              </TouchableOpacity>
            </Box>
          </Box>
        </Box>
      </Box>
      <Box bg="white" radius="sm" style={{elevation: 10}}></Box>
    </Box>
  );

  const renderItem = ({item}: ISpeekInterface | any) => (
    <AllSpeeks
      id={item.id}
      likes={item.likes}
      title={item.title}
      content={item.content}
      comments={item.comments}
      createdAt={item.createdAt}
      author={item.author}
      avatar={item.avatar}
      excerpt={item.excerpt}
    />
  );

  return (
    <SafeAreaView>
      <FlatList
        data={speek}
        renderItem={renderItem}
        keyExtractor={(item) => String(item.id)}
      />
    </SafeAreaView>
  );
};

export default Speek;
