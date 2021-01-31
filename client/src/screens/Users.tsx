import React, {useEffect} from "react";
import {Text} from "react-native";
import {View} from "react-native";
import {APP_BASE_URL} from "../../constants";

const Users = () => {
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
    <View>
      <Text>Hello from users</Text>
    </View>
  );
};

export default Users;
