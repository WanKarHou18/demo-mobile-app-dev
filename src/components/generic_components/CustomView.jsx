import { View } from "react-native";

const CustomView = ({ style, children, ...props }) => {
  return (
    <View style={style} {...props}>
      {children}
    </View>
  );
};

export default CustomView;
