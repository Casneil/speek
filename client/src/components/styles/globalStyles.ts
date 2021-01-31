import {Dimensions, StyleSheet} from "react-native";

const deviceHeight = Dimensions.get("window").height;

export const globalColors = {
  backgroundColorTomato: "rgba(255, 99, 71,.89)",
  greenPrimary: "rgba(48, 252, 3, .65)",
  grayPrimary: "rgba(255,241,204, 0.12)",
  graySecondary: "rgba(255,241,204, 0.3)",
  whitePrimary: "rgba(250,250,250)",
  whiteSecondary: "rgba(250,250,250,.4)",
};

export const layout = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    marginTop: deviceHeight / 3.7,
    flex: 1,
  },
  author: {
    fontSize: 16,
    textDecorationLine: "underline",
    fontStyle: "italic",
    color: "rgba(50,50,50,.7)",
    marginBottom: 10,
  },
  card: {
    alignItems: "center",
    backgroundColor: "rgba(255, 250, 246, 0.89)",
    borderTopRightRadius: -40,
    borderBottomRightRadius: 40,
    borderTopLeftRadius: 40,
    borderBottomLeftRadius: -40,
    height: "50%",
    marginHorizontal: 15,
    marginVertical: 4,
    paddingHorizontal: 25,
    flex: 1,
  },
  content: {
    fontSize: 14,
    letterSpacing: 0.5,
    color: "rgba(20,20,20,.65)",
    fontWeight: "bold",
  },
  heading: {
    fontSize: 28,
    fontWeight: "bold",
    color: globalColors.backgroundColorTomato,
    alignSelf: "center",
  },
  image: {
    height: "100%",
    width: "100%",
    flex: 1,
    resizeMode: "cover",
    opacity: 0.92,
  },
  iconStyle: {
    marginHorizontal: 8,
    color: "white",
  },
  inputContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
    backgroundColor: globalColors.grayPrimary,
    borderRadius: 25,
    marginHorizontal: 10,
    padding: 1,
  },
  loginContainer: {
    backgroundColor: "black",
    opacity: 0.9,
    width: "100%",
    minHeight: "70%",
    bottom: "0%",
    position: "absolute",
    flex: 1,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
  },
  postContainer: {
    backgroundColor: "rgba(20,20,20,.65)",
    flex: 1,
  },
  loginLinks: {
    display: "flex",
    flexDirection: "row",
    marginTop: 20,
    justifyContent: "center",
    marginBottom: 30,
  },
  textInput: {
    color: "white",
    fontSize: 18,
    alignSelf: "center",
    width: "100%",
    marginHorizontal: -5,
  },
});
