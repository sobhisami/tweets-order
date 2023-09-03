import React, { useState } from 'react';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';

const animatedComponents = makeAnimated();

export let MultiSelect = ({ menuOptions, onChange, value }) => {
  const [quantities, setQuantities] = useState({});

  const handleChange = (selectedValues) => {
    const newQuantities = {};
    selectedValues.forEach((option) => {
      newQuantities[option.value] = option.quantity || 0;
    });
    setQuantities(newQuantities);

    onChange(selectedValues);
  };

  const multiSelectOptions = menuOptions.map((item) => ({
    value: item.id,
    label: `${item.name} - ${item.price} ش`,
    product: item.name,
    price: item.price,
    quantity: quantities[item.id] || 1,
  }));

  const customStyles = {
    control: (base) => ({
      ...base,
      direction: 'rtl', 
    }),
  };

  return (
    <Select
      options={multiSelectOptions}
      components={animatedComponents}
      isMulti
      onChange={handleChange}
      value={value}
      isSearchable
      styles={customStyles} 
    />
  );
};

export const calculateTotalPrice = (selectedOptions) => {
  if (!Array.isArray(selectedOptions)) {
    return 0;
  }

  let totalPrice = 0;
  selectedOptions.forEach((option) => {
    totalPrice += option.price * (option.quantity || 1);
  });
  return totalPrice;
};
