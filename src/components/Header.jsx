import { View, Text } from "react-native";
const Header = ({ title }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>{title || "Default Title"}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 12,
    paddingVertical: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  titleText: {
    fontWeight: "bold",
    fontSize: 20,
    color: "black",
  },
});

export default Header;
