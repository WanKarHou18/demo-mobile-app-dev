import { StyleSheet, Text } from "react-native";

export const DottedLine = () => (
  <Text style={styles.dottedDivider}>
    - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  </Text>
);

const styles = StyleSheet.create({
  dottedDivider: {
    color: "#777",
    textAlign: "center",
    marginVertical: 10,
  },
});
