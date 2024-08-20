import React, { useEffect, useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { Form, Button, Alert } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { login } from '../../../services/auth.services';
// import { notification} from 'antd';
export default function LoginPage() {
    const navigate = useNavigate();
    const location = useLocation();
    const message = location.state ? location.state.message : null;
    const {register, handleSubmit, formState:{errors}} = useForm();
    const [isSuccess, setIsSuccess] = useState(false);
    const [apiMessage, setApiMessage] = useState('');
    // useEffect(()=>{
    //   if(message){
    //     notification.success({
    //       message: message,
    //       description: 'Please Login Again',
    //       placement: 'top',
    //       duration: 3,
    //     });
    //   }
    // },[])
    const onSubmit = async (loginData) => {
        const result = await login(loginData,setIsSuccess,navigate);
        console.log(result);
        setApiMessage(result);
    };

    return (
    <div className="flex justify-center items-center h-screen">
    <Form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-md">
      <h1 className="text-2xl font-bold text-center mb-4">Login</h1>
      {apiMessage && <Alert variant={isSuccess ? 'success' : 'danger'}>{apiMessage}</Alert>}
      <Form.Group controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" {...register("email", { required: "Email is required" })} />
        {errors.email && <Form.Text className="text-danger">{errors.email.message}</Form.Text>}
      </Form.Group>

      <Form.Group controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" {...register("password", { required: "Password is required" })} />
        {errors.password && <Form.Text className="text-danger">{errors.password.message}</Form.Text>}
      </Form.Group>

      <Button variant="primary" type="submit">
        Submit
      </Button>

      <p className="mt-2 text-center">
      not a member <Link to="/">signup</Link>
      </p>

    </Form>

  </div>
    );
}
