import React, {useEffect, useState} from "react";

import AsyncStorage from "@react-native-async-storage/async-storage";

import {axiosInstance} from "../../components/axios/axios";
import axios from "axios";
// Interfaces
import {IPostInterface} from "../../components/Interfaces.js";
// Imports
import Post from "../Post";
import {APP_BASE_URL} from "../../constants";

const HomeScreen = () => {
  const [posts, setPost] = useState<IPostInterface[] | undefined>();

  const fetchData = async () => {
    const access = await AsyncStorage.getItem("access_token");
    const refresh = await AsyncStorage.getItem("refresh_token");
    axios
      .get(APP_BASE_URL, {
        headers: {
          Authorization: `JWT ${access}`,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        setPost(response.data);
        console.log("Posts:", posts);
      })
      .catch((error) => {
        console.warn(error);
      });
  };

  useEffect(() => {
    fetchData().then((res) => {
      console.log(res);
    });
  }, []);

  return <>{posts && <Post posts={posts} />}</>;
};

export default HomeScreen;
