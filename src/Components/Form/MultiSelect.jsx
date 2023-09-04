import React, { useState } from 'react';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';

const animatedComponents = makeAnimated();

export let MultiSelect = ({ menuOptions, onChange, value }) => {
  const [quantities, setQuantities] = useState({});
  const increase = (e, itemId) => {
    e.preventDefault();
    e.stopPropagation(); 
    setQuantities(prevQuantities => ({
      ...prevQuantities,
      [itemId]: (prevQuantities[itemId] || 0) + 1,
    }));
  };

  const decrease = (e, itemId) => {
    e.preventDefault(); 
    e.stopPropagation(); 
    if (quantities[itemId] && quantities[itemId] > 0) {
      setQuantities(prevQuantities => ({
        ...prevQuantities,
        [itemId]: prevQuantities[itemId] - 1,
      }));
    }
  };

  const multiSelectOptions = menuOptions.map(item => ({
    value: item.id,
    label: (
      <div>
        {`${item.name} - ${item.price} ش`}
        <button onClick={(e) => increase(e, item.id)}>+</button>
        <span>{quantities[item.id] || 1}</span>
        <button onClick={(e) => decrease(e, item.id)}>-</button>
      </div>
    ),
    product: item.name,
    price: item.price,
    quantity: quantities[item.id] || 1,
  }));


  return (
    <Select
      options={multiSelectOptions}
      components={animatedComponents}
      isMulti
      onChange={onChange}
      value={value}
    />
  );
};

export const calculateTotalPrice = (selectedOptions) => {
  if (!Array.isArray(selectedOptions)) {
    return 0; 
  }

  let totalPrice = 0;
  selectedOptions.forEach(option => {
    totalPrice += option?.price * ((option?.quantity ?? 0));
  });
  return totalPrice;
};