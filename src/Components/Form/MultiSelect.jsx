import React from 'react';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';

const animatedComponents = makeAnimated();

export let MultiSelect = ({ menuOptions, onChange, value }) => {
  const multiSelectOptions = menuOptions.map(item => ({
    value: item.id,
    label: `${item.name} - ${item.price} ش`,
    product: item.name,
    price: item.price,
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
    totalPrice += option.price;
  });
  return totalPrice;
};




