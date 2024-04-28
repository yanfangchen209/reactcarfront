import React, {useEffect, useState} from 'react'
import useTitle from './useTitle'

export const Counter = () => {
  const [count, setCount] = useState(0);
  useTitle(`You clicked ${count} times`)

  /**State updates are asynchronous, so you have to be careful when a new state value depends on the 
   * current state value. To be sure that the latest value is used, you can pass a function to the update 
   * function, Instead of directly setting the new count with setCount(count + 1), we use a function 
   * (prevCount => prevCount + 1) to calculate the new count based on the previous count value.
   * By using the function form of state updates, we ensure that we're always working with the latest state 
   * value, even if multiple state updates are queued up. This helps prevent race conditions and ensures 
   * that state updates are applied correctly.
   * 
   *  In React, state updates are asynchronous, which means that when you call the state update function 
   * (setState with class components or the updater function returned by useState in function components),
   *  React schedules the state update rather than applying it immediately.

    This can lead to issues when the new state depends on the current state value, especially if you're making 
    multiple state updates in quick succession. To ensure that you're working with the most up-to-date state 
    value, React provides a way to pass a function to the state update function instead of an object. 
    This function will receive the previous state value as an argument, and you can use it to calculate the new
    state based on the previous state.
   * 
   * 
   * 
   * */
  // Increment the count using the previous count value
  const clickHandler = () => {
    setCount(count => count + 1);
  }

  useEffect(()=>{
    console.log("hello from useeffect");
    return () => {
      console.log("clean up function");
    }
    }, []
  );


  return (
    <>
      <div>Counter={count}</div>
      <button onClick={clickHandler}>Increment</button>

    </>
  )
  

  /*
  return (
    <>
      <div>Counter={count}</div>
      <button onClick={()=>{setCount(count => count + 1)}}>Increment</button>

    </>
  )
  */
  
}

export default Counter;