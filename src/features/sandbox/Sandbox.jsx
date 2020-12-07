import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "semantic-ui-react";
import { deccrement, increment} from "./testReducer";

export default function Sandbox() {
  const data = useSelector((state) => state.test.data);
  const dispatch = useDispatch();
  return (
    <>
      <h1>Testing 123</h1>
      <h3>The data is: {data}</h3>
      <Button onClick={() => dispatch(increment(20))} content='increment' color='green'/>
      <Button onClick={() => dispatch(deccrement(10))} content='decrement' color='pink'/>
    </>
  );
}
