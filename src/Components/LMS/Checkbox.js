import React from 'react';
import { Checkbox } from 'react-mdl';

export default ({isCheckMarked, checkBox}) => {
  return (
    <Checkbox
      type="checkbox"
      checked={isCheckMarked}
      onChange={checkBox}
    />
  )
}
