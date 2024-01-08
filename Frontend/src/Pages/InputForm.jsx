import { useState, useRef } from "react";
import { Form, Button, Container } from "react-bootstrap";

import Header from "../Component/Header/Header";
import axios from "axios";
import classes from "./InputForm.module.css";
const InputForm = () => {
  const PORT = import.meta.env.VITE_REACT_PORT;
  const [inputValue, setInputValue] = useState("");
  const [responseValue, setResponseValue] = useState("");
  const inputRef = useRef();
  const submitHandler = (event) => {
    event.preventDefault();
    const postHandler = async () => {
      try {
        const Id = inputRef.current.value;
        const response = await axios.get(`${PORT}/api/configuration/${Id}`);
        if (response.data.initialArray && response.status === 200) {
          setResponseValue(response.data.initialArray);
        }
      } catch (err) {
        console.log(err);
        setResponseValue("No data available");
      }
    };
    postHandler();

    setInputValue(inputRef.current.value);
  };

  const handleChange = () => {
    setInputValue("");
    setResponseValue("");
  };
  return (
    <>
      <Header />
      <br />
      <Container className={classes.inputContainer}>
        <h1>Fetch Config</h1>
        <br />
        <Form onSubmit={submitHandler}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Config to load (configId) : </Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter configId"
              ref={inputRef}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
        <br />
        {inputValue.length > 1 && (
          <div className={classes.responseBox}>
            <h2>
              Result : {PORT}/api/configurations/{inputValue}
            </h2>
            <p>{responseValue}</p>
          </div>
        )}
      </Container>
    </>
  );
};

export default InputForm;
