import React from "react";
import {Text} from "react-native";
import {View} from "react-native";

// Styles
import {globalColors, layout} from "../../components/styles/globalStyles";
import {TextInput} from "react-native-gesture-handler";
import {APP_BASE_URL} from "../../constants";

const CreatePost = () => {
  const BASE_URL = APP_BASE_URL;

  const fetchData = async () => {
    const getData = await fetch(BASE_URL, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    const response = await getData.json();

    console.warn(response);
  };

  // useEffect(() => {
  //   fetchData();
  // }, []);
  return (
    <View style={layout.postContainer}>
      <Text style={layout.heading}>Post</Text>
      <View style={layout.inputContainer}>
        <TextInput
          placeholder="Title"
          style={[layout.textInput, {marginHorizontal: 10}]}
          placeholderTextColor={globalColors.whiteSecondary}
          maxLength={20}
        />
      </View>
      <View style={layout.inputContainer}>
        <TextInput
          placeholder="Excerpt"
          style={[layout.textInput, {marginHorizontal: 10}]}
          placeholderTextColor={globalColors.whiteSecondary}
          maxLength={20}
          numberOfLines={5}
        />
      </View>
      <View style={layout.inputContainer}>
        <TextInput
          placeholder="Content"
          style={[layout.textInput, {marginHorizontal: 10}]}
          placeholderTextColor={globalColors.whiteSecondary}
          maxLength={20}
          numberOfLines={10}
        />
      </View>
    </View>
  );
};

export default CreatePost;
