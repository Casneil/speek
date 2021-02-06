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
/**
 * This component renders local images as well as images from the internet.
 * If no source or where: "Photo Location" is passed it will default to the anonymous_user picture.
 *
 * @param props : height: number;  width: number; borderRadius: number;
 * source: any -> defaults to anonymous_user picture; type: jpeg or png;
 * where: ImageLocationEnum | undefined
 * marginBottom: PhotoFileEnum | number
 */
//@ts-ignore
const MyImageComponent: React.FC<MyImageTypes> = (props) => {
  const {type, source, height, width, where, marginBottom} = props;

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
