import React, { useState, useRef } from "react";

import Card from "../UI/Card";
import Button from "../UI/Button";
import Wrappers from "../Helpers/Wrappers";
import ErrorModal from "../UI/ErrorModal";
import classes from "./AddUser.module.css";

const AddUser = (props) => {
  const inputName = useRef();
  const inputAge = useRef();

  const [error, setError] = useState();

  const addUserHandler = (event) => {
    event.preventDefault();
    const enterredName = inputName.current.value;
    const enterredAge = inputAge.current.value;
    if (enterredName.trim().length === 0 || enterredAge.trim().length === 0) {
      setError({
        title: "Invalid input",
        message: "Please enter a valid name and age (non-empty values).",
      });
      return;
    }
    if (+enterredAge < 1) {
      setError({
        title: "Invalid age",
        message: "Please enter a valid age (> 0).",
      });
      return;
    }
    props.onAddUser(enterredName, enterredAge);
    inputName.current.value = "";
    inputAge.current.value = "";
  };

  const errorHandler = () => {
    setError(null);
  };

  return (
    <Wrappers>
      {error && (
        <ErrorModal
          title={error.title}
          message={error.message}
          onConfirm={errorHandler}
        />
      )}
      <Card className={classes.input}>
        <form onSubmit={addUserHandler}>
          <label htmlFor="username">Username</label>
          <input id="username" type="text" ref={inputName} />
          <label htmlFor="age">Age (Years)</label>
          <input id="age" type="number" ref={inputAge} />
          <Button type="submit">Add User</Button>
        </form>
      </Card>
    </Wrappers>
  );
};

export default AddUser;
