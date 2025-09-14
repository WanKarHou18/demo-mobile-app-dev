// components/CustomToast.js
import React, { useEffect, useRef, useState } from "react";
import { Animated, Text, View, StyleSheet, Dimensions } from "react-native";

const CustomToast = ({ visible, message, onHide }) => {
  const [show, setShow] = useState(visible);
  const slideAnim = useRef(new Animated.Value(-100)).current;

  useEffect(() => {
    if (visible) {
      setShow(true);
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start(() => {
        setTimeout(() => {
          Animated.timing(slideAnim, {
            toValue: -100,
            duration: 300,
            useNativeDriver: true,
          }).start(() => {
            setShow(false);
            if (onHide) onHide();
          });
        }, 2000);
      });
    }
  }, [visible]);

  if (!show) return null;

  return (
    <Animated.View
      style={[
        styles.toastContainer,
        {
          transform: [{ translateY: slideAnim }],
        },
      ]}
    >
      <Text style={styles.toastText}>{message}</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  toastContainer: {
    position: "absolute",
    top: 40,
    alignSelf: "center",
    backgroundColor: "red",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    zIndex: 1000,
    elevation: 10,
  },
  toastText: {
    color: "white",
    fontSize: 14,
    fontWeight: "500",
  },
});

export default CustomToast;
