// src/hooks/useCart.js
import { useDispatch, useSelector } from "react-redux";
import { updateCartDetail, clearCart } from "../redux/slices/cartSlice";

export const useCart = () => {
  const dispatch = useDispatch();
  const { cart } = useSelector((state) => state.cart);

  const updateCart = (payload) => {
    dispatch(updateCartDetail(payload));
  };

  const resetCart = () => {
    dispatch(clearCart());
  };

  return {
    cart,
    updateCart,
    resetCart,
  };
};
