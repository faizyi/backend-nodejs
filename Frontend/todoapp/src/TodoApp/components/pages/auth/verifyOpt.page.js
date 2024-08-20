import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Form, Button, Container, Row, Col, Alert } from 'react-bootstrap';
import { verifyOtp } from '../../../services/auth.services';
import { useForm } from 'react-hook-form';

export default function VerifyOTPPage() {
  const navigate = useNavigate();
  const { register, handleSubmit,setValue, formState: { errors }} = useForm();
  const [isSuccess, setIsSuccess] = useState(false);
  const [apiMessage, setApiMessage] = useState('');
  useEffect(()=>{
    const email = localStorage.getItem('email');
    if(email) setValue("email", email)
  },[])

  const onSubmit = async (otpData) => {
    const result = await verifyOtp(otpData, setIsSuccess, navigate);
    setApiMessage(result)
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-md-center">
        <Col md={6}>
          <h2>Verify OTP</h2>
          {apiMessage && <Alert variant={isSuccess ? 'success' : 'danger'}>{apiMessage}</Alert>}
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group controlId="otp">
              <Form.Label>OTP</Form.Label>
              <Form.Control type="number" placeholder="Enter otp" {...register("otp", 
              { required: "otp is required" })} />
              {errors.otp && <Form.Text className="text-danger">{errors.otp.message}</Form.Text>}
            </Form.Group>
            <Button variant="primary" type="submit" className="mt-3">Verify</Button>
            <p className="mt-2 text-center">
            <Link to="/">signup</Link>
            </p>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}
