// src/hooks/useCartData.js
import { useQuery, useMutation, useQueryClient } from "react-query";
import { useDispatch } from "react-redux";
import { mainApi } from "@/ultils/axiosconfig";
import { setCartItems } from "../redux/slices/cartSlice";

const fetchCartItems = async () => {
  const response = await mainApi.get("/students/cart");
  return response.data.payload;
};

const addToCartMutation = async (courseId) => {
  const response = await mainApi.post(`/students/cart?courseId=${courseId}`);
  return response.data.payload;
};

const removeFromCartMutation = async (courseId) => {
  const response = await mainApi.delete(`/students/cart?courseId=${courseId}`);
  return response.data.payload;
};

export const useCartData = () => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  const {
    data: cartItems,
    isLoading,
    error,
  } = useQuery("cartItems", fetchCartItems, {
    onSuccess: (data) => {
      dispatch(setCartItems(data || []));
    },
  });

  const addToCartMutate = useMutation(addToCartMutation, {
    onMutate: async (courseId) => {
      await queryClient.cancelQueries("cartItems");
      const previousCartItems = queryClient.getQueryData("cartItems");
      const newCartItem = { id: courseId /* other necessary fields */ };
      queryClient.setQueryData("cartItems", (old) => [...(old || []), newCartItem]);
      return { previousCartItems };
    },
    onError: (err, newTodo, context) => {
      queryClient.setQueryData("cartItems", context.previousCartItems);
    },
    onSettled: () => {
      queryClient.invalidateQueries("cartItems");
    },
  });

  const removeFromCartMutate = useMutation(removeFromCartMutation, {
    onMutate: async (courseId) => {
      await queryClient.cancelQueries("cartItems");
      const previousCartItems = queryClient.getQueryData("cartItems");
      queryClient.setQueryData("cartItems", (old) => old.filter((item) => item.id !== courseId));
      return { previousCartItems };
    },
    onError: (err, courseId, context) => {
      queryClient.setQueryData("cartItems", context.previousCartItems);
    },
    onSettled: () => {
      queryClient.invalidateQueries("cartItems");
    },
  });

  const addToCart = async (courseId) => {
    try {
      await addToCartMutate.mutateAsync(courseId);
    } catch (error) {
      console.error("Failed to add to cart:", error);
    }
  };

  const removeFromCart = (courseId) => {
    removeFromCartMutate.mutate(courseId);
  };

  return {
    cartItems: Array.isArray(cartItems) ? cartItems : [],
    isLoading,
    error,
    addToCart,
    isAddingToCart: addToCartMutate.isLoading,
    removeFromCart,
    isRemovingFromCart: removeFromCartMutate.isLoading,
  };
};
