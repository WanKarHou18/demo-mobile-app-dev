import { Platform } from "react-native";

export const BASE_URL =
  Platform.OS === "web"
    ? "http://localhost:3000"
    : "http://192.168.100.63:3000"; // Android/ IOS real device -> http://LAPTOP ipv4

export const LAPTOP_IPV4 = "http://192.168.100.63";
export const LOCAL_HOST = "http://localhost";
