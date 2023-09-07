import React from 'react'
import Select from 'react-select'
import makeAnimated from 'react-select/animated';

const options = [
  { value: 'اسعد النواجحة', label: 'اسعد النواجحة' },
  { value: 'ابراهيم اللحام', label: 'ابراهيم اللحام' },
  { value: 'عبد العزيز عوض', label: 'عبد العزيز عوض' },
  { value: 'عبد الرحيم بحور', label: 'عبد الرحيم بحور' },
  { value: 'علاء مبارك', label: 'علاء مبارك' },
  { value: 'سعيد ابو فول', label: 'سعيد ابو فول' },
  { value: 'سهاد حماد', label: 'سهاد حماد' },
  { value: 'فتحية موسى', label: ' فتحية موسى' },
  { value: 'فدوه المصري', label: 'فدوه المصري' },
  { value: 'محمد ابو عودة', label: 'محمد ابو عودة' },
  { value: 'محمد موسى', label: 'محمد موسى' },
  { value: 'مدحت الكردي', label: 'مدحت الكردي' },
  { value: 'محمد منصور', label: 'محمد منصور' },
  { value: 'مصعب', label: 'مصعب' },
  { value: 'مها', label: 'مها' },
  { value: 'معين زملط', label: 'معين زملط' },
  { value: 'صبحي فوجو', label: 'صبحي فوجو' },
  { value: 'تامر', label: 'تامر' },
  { value: 'اخر', label: 'اخر' },
];

 export const Names = ({onChange,values}) => {
  return (
    <Select options={options} onChange={onChange} value={values} />
  )
}
