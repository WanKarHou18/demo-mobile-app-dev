import { useDispatch, useSelector } from "react-redux";
import { fetchMovies } from "../redux/slices/movieSlice";

export const useMovie = () => {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.movie);

  const fetchData = () => {
    dispatch(fetchMovies());
  };

  return {
    data,
    loading,
    error,
    fetchData,
  };
};
