// app/cart/page.js
"use client";

import React, { useState, useEffect, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useCartData } from "@/hooks/useCartdata";
import {
  Trash2,
  CheckSquare,
  Square,
  ChevronDown,
  DollarSign,
  Star,
  Clock,
  Users,
} from "lucide-react";

export default function Cart() {
  const { cartItems, isLoading, error, removeFromCart } = useCartData();
  const [selectedItems, setSelectedItems] = useState({});
  const [expandedInstructors, setExpandedInstructors] = useState({});

  const instructorGroups = useMemo(() => {
    if (!Array.isArray(cartItems)) return {};
    return cartItems.reduce((acc, item) => {
      if (!acc[item.author]) {
        acc[item.author] = [];
      }
      acc[item.author].push(item);
      return acc;
    }, {});
  }, [cartItems]);

  useEffect(() => {
    if (Array.isArray(cartItems)) {
      const initialSelected = cartItems.reduce((acc, item) => {
        acc[item.id] = true;
        return acc;
      }, {});
      setSelectedItems(initialSelected);
    }
  }, [cartItems]);

  const toggleItemSelection = useCallback((itemId) => {
    setSelectedItems((prev) => ({ ...prev, [itemId]: !prev[itemId] }));
  }, []);

  const toggleInstructorSelection = useCallback(
    (instructor) => {
      const instructorItems = instructorGroups[instructor];
      const allSelected = instructorItems.every((item) => selectedItems[item.id]);
      const newSelection = !allSelected;
      setSelectedItems((prev) => {
        const updatedSelection = { ...prev };
        instructorItems.forEach((item) => {
          updatedSelection[item.id] = newSelection;
        });
        return updatedSelection;
      });
    },
    [instructorGroups, selectedItems],
  );

  const toggleInstructorExpand = useCallback((instructor) => {
    setExpandedInstructors((prev) => ({ ...prev, [instructor]: !prev[instructor] }));
  }, []);

  const handleRemoveFromCart = useCallback(
    (itemId) => {
      removeFromCart(itemId);
      setSelectedItems((prev) => {
        const newSelection = { ...prev };
        delete newSelection[itemId];
        return newSelection;
      });
    },
    [removeFromCart],
  );

  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error.message} />;
  if (!Array.isArray(cartItems) || cartItems.length === 0) return <EmptyCart />;

  const totalPrice = cartItems.reduce(
    (sum, item) => (selectedItems[item.id] ? sum + item.total : sum),
    0,
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-extrabold text-gray-900 dark:text-white mb-10 text-center"
        >
          Your Learning Journey
        </motion.h1>
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-grow space-y-6">
            <AnimatePresence>
              {Object.entries(instructorGroups).map(([instructor, items]) => (
                <InstructorGroup
                  key={instructor}
                  instructor={instructor}
                  items={items}
                  selectedItems={selectedItems}
                  expandedInstructors={expandedInstructors}
                  toggleItemSelection={toggleItemSelection}
                  toggleInstructorSelection={toggleInstructorSelection}
                  toggleInstructorExpand={toggleInstructorExpand}
                  removeFromCart={handleRemoveFromCart}
                />
              ))}
            </AnimatePresence>
          </div>
          <div className="lg:w-1/3">
            <CartSummary
              totalPrice={totalPrice}
              selectedItemsCount={Object.values(selectedItems).filter(Boolean).length}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

const InstructorGroup = React.memo(
  ({
    instructor,
    items,
    selectedItems,
    expandedInstructors,
    toggleItemSelection,
    toggleInstructorSelection,
    toggleInstructorExpand,
    removeFromCart,
  }) => {
    const allSelected = items.every((item) => selectedItems[item.id]);
    const isExpanded = expandedInstructors[instructor];

    return (
      <motion.div
        layout
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
        className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden"
      >
        <div
          className="flex items-center justify-between p-4 cursor-pointer"
          onClick={() => toggleInstructorExpand(instructor)}
        >
          <div className="flex items-center space-x-4">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={(e) => {
                e.stopPropagation();
                toggleInstructorSelection(instructor);
              }}
              className="text-blue-600 dark:text-blue-400"
            >
              {allSelected ? <CheckSquare size={24} /> : <Square size={24} />}
            </motion.button>
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white">{instructor}</h2>
          </div>
          <motion.div animate={{ rotate: isExpanded ? 180 : 0 }} transition={{ duration: 0.3 }}>
            <ChevronDown size={24} className="text-gray-600 dark:text-gray-400" />
          </motion.div>
        </div>
        <AnimatePresence initial={false}>
          {isExpanded && (
            <motion.div
              initial={{ height: 0 }}
              animate={{ height: "auto" }}
              exit={{ height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <AnimatePresence initial={false}>
                {items.map((item) => (
                  <CartItem
                    key={item.id}
                    item={item}
                    isSelected={selectedItems[item.id]}
                    toggleSelection={toggleItemSelection}
                    removeFromCart={removeFromCart}
                  />
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    );
  },
);
InstructorGroup.displayName = "InstructorGroup";
const CartItem = React.memo(({ item, isSelected, toggleSelection, removeFromCart }) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.3 }}
      className="p-4 border-t border-gray-200 dark:border-gray-700"
    >
      <div className="flex items-start space-x-4">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => toggleSelection(item.id)}
          className="mt-1 text-blue-600 dark:text-blue-400"
        >
          {isSelected ? <CheckSquare size={20} /> : <Square size={20} />}
        </motion.button>
        <div className="flex-shrink-0 w-24 h-24 relative rounded-md overflow-hidden">
          <Image
            src={item.img}
            alt={item.title}
            layout="fill"
            objectFit="cover"
            className="transition-transform duration-300 hover:scale-110"
          />
        </div>
        <div className="flex-grow">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">{item.title}</h3>
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">{item.sum}</p>
          <div className="flex flex-wrap gap-2 mb-3">
            <InfoBadge icon={<DollarSign size={14} />} text={`$${item.original.toFixed(2)}`} />
            <InfoBadge icon={<Star size={14} />} text={`${item.discount}% OFF`} />
            <InfoBadge icon={<Clock size={14} />} text="8 hours" />
            <InfoBadge icon={<Users size={14} />} text={`${item.buyNumber} students`} />
          </div>
          <div className="flex justify-between items-center">
            <span className="text-lg font-bold text-blue-600 dark:text-blue-400">
              ${item.total.toFixed(2)}
            </span>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => removeFromCart(item.id)}
              className="text-red-500 hover:text-red-600 dark:text-red-400 dark:hover:text-red-300"
            >
              <Trash2 size={20} />
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
});
CartItem.displayName = "CartItem";
const InfoBadge = React.memo(({ icon, text }) => (
  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200">
    {icon}
    <span className="ml-1">{text}</span>
  </span>
));
InfoBadge.displayName = "InfoBadge";
const CartSummary = React.memo(({ totalPrice, selectedItemsCount }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 sticky top-6"
  >
    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6">Order Summary</h2>
    <div className="flex justify-between mb-4">
      <span className="text-gray-600 dark:text-gray-300">Selected Courses:</span>
      <span className="font-medium text-gray-800 dark:text-white">{selectedItemsCount}</span>
    </div>
    <div className="flex justify-between mb-6">
      <span className="text-gray-600 dark:text-gray-300">Total:</span>
      <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">
        ${totalPrice.toFixed(2)}
      </span>
    </div>
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="w-full bg-blue-600 text-white font-semibold py-3 px-4 rounded-md transition-colors duration-300 hover:bg-blue-700"
    >
      Proceed to Checkout
    </motion.button>
  </motion.div>
));
CartSummary.displayName = "CartSummary";
const EmptyCart = () => (
  <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-lg shadow-md">
    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Your cart is empty</h2>
    <p className="text-gray-600 dark:text-gray-400 mb-4">
      Looks like you haven&apos;t added any courses yet.
    </p>
    <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors duration-200">
      Browse Courses
    </button>
  </div>
);

const LoadingSpinner = () => (
  <div className="flex justify-center items-center h-screen">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
  </div>
);

const ErrorMessage = ({ message }) => (
  <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-lg shadow-md">
    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
      Oops! Something went wrong.
    </h2>
    <p className="text-gray-600 dark:text-gray-400">{message}</p>
  </div>
);
