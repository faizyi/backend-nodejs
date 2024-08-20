import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import SignupPage from '../components/pages/auth/signup.page';
import LoginPage from '../components/pages/auth/login.page';
import VerifyOTPPage from '../components/pages/auth/verifyOpt.page';
import Layout from '../components/layout/layout';
import PrivateRoute from './privateRoute';
import Profile from '../components/pages/profile/profile';
// import PublicRoute from './publicRoute';

export default function Routing() {
  return (
    <div>
    <BrowserRouter>
      <Routes>

        {/* <Route element={<PublicRoute/>}> */}
        <Route path="/" element={<SignupPage/>} />
        <Route path="/verify-otp" element={<VerifyOTPPage/>} />
        <Route path="/login" element={<LoginPage/>} />
        {/* </Route> */}

        <Route element={<PrivateRoute/>}>
        <Route path="/create-todo" element={<Layout/>}/>
        <Route path="/profile" element={<Profile/>}/>
        </Route>

      </Routes>
    </BrowserRouter>
  </div>
  )
}
