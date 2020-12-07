import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "semantic-ui-react";
import { decrement, increment } from "./testReducer";
import { openModal } from "../../app/common/modals/modalReducer";
import { useState } from "react";

export default function Sandbox() {
  const data = useSelector((state) => state.test.data);
  const [target, setTarget] = useState(null);
  const dispatch = useDispatch();
  const {loading} = useSelector((state) => state.async);
  return (
    <>
      <h1>Testing 123</h1>
      <h3>The data is: {data}</h3>
      <Button
        name='increment'
        loading={loading && target === 'increment'}
        onClick={(e) => {
          dispatch(increment(20));
          setTarget(e.target.name);
        }}
        content="increment"
        color="green"
      />
      <Button
        name='decrement'
        loading={loading && target === 'decrement'}
        onClick={(e) => {
          dispatch(decrement(10))
          setTarget(e.target.name);
        }}
        content="decrement"
        color="pink"
      />
      <Button
        onClick={() =>
          dispatch(openModal({ modalType: "TestModal", modalProps: { data } }))
        }
        content="modal"
        color="teal"
      />
    </>
  );
}
