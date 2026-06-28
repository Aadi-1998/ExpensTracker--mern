import React,{useState,useEffect} from "react";
import { Form, Input,message } from "antd";
import { Link, Navigate, useNavigate } from "react-router-dom";
import axios from 'axios'
import Spinner from "../components/Spinner";




const Register = () => {

const [loading,setLoading]= useState(false)

    const navigate = useNavigate()

    //form submit
  const submitHandler = async(values) => {
    
    try {
        setLoading(true)
        await axios.post('/users/register', values)
        message.success('Registration Successful')
        setLoading(false)
        navigate('/login');

        
    } catch (error) {
        setLoading(false)
        message.error('something went wrong')

        
    }
  };

  //prevent for login user
useEffect(() => {
  if(sessionStorage.getItem("token"))
   {
    navigate('/')
  };
}, [navigate]);

  return (
    <>
      <div className="register-page">
        {
            loading && <Spinner />
        }
        <Form layout="vertical" onFinish={submitHandler}>
          <h1>Register Form</h1>
          <Form.Item label="name" name="name">
            <Input />
          </Form.Item>
          <Form.Item label="email" name="email">
            <Input />
          </Form.Item>
          <Form.Item label="password" name="password">
            <Input />
          </Form.Item>
          <div className="d-flex justify-content-between">
            <Link to="/login">Already register ? click here to login</Link>
            <button className=" btn btn-primary">Register</button>
          </div>
        </Form>
      </div>
    </>
  );
};

export default Register;
