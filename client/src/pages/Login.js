import React, { useState,useEffect } from "react";
import { Form, Input, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Spinner from "../components/Spinner";
// import { token } from "morgan";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const submitHandler = async (values) => {
    try {
      setLoading(true);
      const { data } = await axios.post("/users/login", values);
      setLoading(false);
      message.success("login successful");
      console.log(    JSON.stringify({ ...data.user, password:""}));
      // sessionStorage.setItem(
      //   "user",
      //   JSON.stringify({ ...data.user, password:""})
      // );

      // store token seperatly
 sessionStorage.setItem(
  "token",data.token
 )

      navigate("/");
    } catch (error) {
      setLoading (false);
      message.error("something went wrong");
    }
  };

   //prevent for login user
   useEffect(() => {
    if (sessionStorage.getItem("token")) {
      navigate("/");
    }
  }, [navigate]);
  return (
    <>
      <div className="register-page">
        {loading && <Spinner />}

        <Form layout="vertical" onFinish={submitHandler}>
          <h1>Login Form</h1>

          <Form.Item label="email" name="email">
            <Input />
          </Form.Item>
          <Form.Item label="password" name="password">
            <Input />
          </Form.Item>
          <div className="d-flex justify-content-between">
            <Link to="/register">Not a user ? click here to register</Link>
            <button className=" btn btn-primary">Login</button>
          </div>
        </Form>
      </div>
    </>
  );
};

export default Login;
