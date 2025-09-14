import { useDispatch, useSelector } from "react-redux";
import { fetchPaymentMethod } from "../redux/slices/paymentSlice";

export const usePayment = () => {
  const dispatch = useDispatch();
  const { paymentMethod, loading, error } = useSelector(
    (state) => state.payment
  );

  const fetchPaymentMethodData = () => {
    dispatch(fetchPaymentMethod());
  };

  return {
    paymentMethod,
    loading,
    error,
    fetchPaymentMethodData,
  };
};
