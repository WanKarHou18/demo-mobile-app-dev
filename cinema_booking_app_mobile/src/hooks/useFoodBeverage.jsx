import { useDispatch, useSelector } from "react-redux";
import { fetchFoodBeverageItems } from "../redux/slices/foodBeverageSlice";

export const useFoodBeverage = () => {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.foodBeverage);

  const fetchData = () => {
    dispatch(fetchFoodBeverageItems());
  };

  return {
    data,
    loading,
    error,
    fetchData,
  };
};
