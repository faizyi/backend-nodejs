import { Link, useNavigate } from 'react-router-dom';
import { Form, Button,Alert } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { signup } from '../../../services/auth.services';
import { useState } from 'react';
export default function SignupPage() {
    const navigate = useNavigate();
    const { register, handleSubmit, reset, formState: { errors }, setError } = useForm();
    const [isSuccess, setIsSuccess] = useState(false);
    const [apiMessage, setApiMessage] = useState('');
    const onSubmit = async (formData) => {
        const result = await signup(formData, navigate, setIsSuccess, setApiMessage);
        if (result) {
          result.forEach(error => {
            setError(error.path, { type: 'server', message: error.msg });
          });
        }        
      }

    return (
        <div className="flex justify-center items-center h-screen">
    <Form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-md">
      <h1 className="text-2xl font-bold text-center mb-4">Signup</h1>
         {apiMessage && <Alert variant={isSuccess ? 'success' : 'danger'}>{apiMessage}</Alert>}
          <Form.Group controlId="formBasicName">
        <Form.Label>Username</Form.Label>
        <Form.Control type="text" placeholder="Enter username" {...register("username", { required: "Username is required" })} />
        {errors.username && <Form.Text className="text-danger">{errors.username.message}</Form.Text>}
      </Form.Group>

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
      Already a member? <Link to="/login">Login</Link>
      </p>

    </Form>

  </div>
    );
}
