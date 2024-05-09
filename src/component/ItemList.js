import React from 'react'
import Item from './Item'

export const ItemList = ({itemList}) => {
  return (
    <>
        {itemList.map(item => <Item product={item.product} amount={item.amount}/>)}
    </>
  )
}
export default ItemList;