import React from 'react'

export const Item = ({product, amount}) => {
  return (
    <ul>
        <li>Product: {product}</li>
        <li>Amount: {amount}</li>
    </ul>
  )
}

export default Item;
