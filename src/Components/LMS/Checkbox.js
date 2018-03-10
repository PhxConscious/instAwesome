import React from 'react';

export const Checkbox = ({isCheckMarked, checkBox}) => {
  return (
    <input
      type="checkbox"
      checked={isCheckMarked}
      onChange={checkBox}
    />
  )
}
