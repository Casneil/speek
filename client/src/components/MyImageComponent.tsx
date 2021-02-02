import React from "react";
import {Image} from "react-native";

//Resource
const anonymous_user = require("../rsc/anonymous_user.png");

// Enums and Interfaces
import {ImageLocationEnum, PhotoFileEnum} from "../components/enums";

type MyImageTypes = {
  height?: number;
  width?: number;
  borderRadius?: number;
  source?: any;
  type?: string | undefined;
  where?: ImageLocationEnum | undefined;
  marginBottom?: PhotoFileEnum | number;
};
const MyImageComponent: React.FC<MyImageTypes> = (props) => {
  const {type, source, height, width, where, marginBottom} = props;
  console.log(typeof source);

  const base64 = `data:image/${type || "png"};base64,${source}`;

  const renderImage = () => {
    if (where === ImageLocationEnum.INTERNET) {
      return (
        <Image
          style={{
            height: height || PhotoFileEnum.HEIGHT,
            width: width || PhotoFileEnum.WIDTH,
            borderRadius: PhotoFileEnum.BORDER_RADIUS,
            marginBottom: marginBottom || PhotoFileEnum.MARGIN_BOTTOM,
          }}
          source={{uri: base64}}
        />
      );
    }
    if (where === ImageLocationEnum.LOCAL) {
      return (
        <Image
          style={{
            height: height || PhotoFileEnum.HEIGHT,
            width: width || PhotoFileEnum.WIDTH,
            borderRadius: PhotoFileEnum.BORDER_RADIUS,
            marginBottom: marginBottom || PhotoFileEnum.MARGIN_BOTTOM,
          }}
          source={source || anonymous_user}
        />
      );
    }

    if (!source || !where) {
      return (
        <Image
          style={{
            height: height || PhotoFileEnum.HEIGHT,
            width: width || PhotoFileEnum.WIDTH,
            borderRadius: PhotoFileEnum.BORDER_RADIUS,
            marginBottom: PhotoFileEnum.MARGIN_BOTTOM,
          }}
          source={anonymous_user}
        />
      );
    }
  };

  return renderImage();
};

export default MyImageComponent;
