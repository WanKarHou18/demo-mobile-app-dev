import { useDispatch, useSelector } from "react-redux";
import { fetchBookingSetting } from "../redux/slices/bookingSlice";

export const useBooking = () => {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.booking);

  const fetchData = () => {
    dispatch(fetchBookingSetting());
  };

  return {
    bookingSetting: data,
    loading,
    error,
    fetchData,
  };
};
