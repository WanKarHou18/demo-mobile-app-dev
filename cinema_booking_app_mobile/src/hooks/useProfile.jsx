import { useDispatch, useSelector } from "react-redux";
import { fetchProfileInfo } from "../redux/slices/profileSlice";

export const useProfile = () => {
  const dispatch = useDispatch();
  const { profile, loading, error } = useSelector((state) => state.profile);

  const fetchProfileInfoData = () => {
    dispatch(fetchProfileInfo());
  };

  return {
    profile,
    loading,
    error,
    fetchProfileInfoData,
  };
};
