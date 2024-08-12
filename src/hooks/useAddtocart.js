// src/hooks/useAddToCart.js
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/slices/cartSlice";

export const useAddToCart = () => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const addToCartHandler = async (courseId) => {
    setIsLoading(true);
    try {
      await dispatch(addToCart(courseId)).unwrap();
    } catch (error) {
      console.error("Failed to add to cart:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return { addToCartHandler, isLoading };
};
