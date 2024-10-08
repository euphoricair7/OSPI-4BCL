import React, { useState } from 'react';
import OTPInput from "otp-input-react";
//import { CgSpinner } from "react-icon/cg";
import { BsTelephoneFill } from "react-icons/bs";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { auth } from "./firebase.config"
import { Toaster, toast } from "react-hot-toast"
import { useNavigate } from "react-router-dom";
import "./SignIn/signIn.css";

const PhoneOTP = () => {
	const [OTP, setOTP] =  useState("");
	const navigate = useNavigate();
	const [showph, setShowph] = useState(true);
	const [phone, setPhone] = useState();
	const [user, setUser] = useState(null);
	const [confirmationResult, setConfirmationResult] = useState(null);
	
	
	const sendOtp = async() => {
try{
	const recaptcha = new RecaptchaVerifier(auth, "recaptcha-container", {});
	const confirmation = signInWithPhoneNumber(auth, phone, recaptcha)
	setConfirmationResult(confirmation);	
	}catch(err){
		console.error(err)}
}	

 const verifyOtp = async () => {
    try {
      console.log(confirmationResult)
      navigate('/Home');
    } catch (err) {
      console.error('Error verifying OTP:', err);
      toast.error('Failed to verify OTP');
    }
  };	

	return <div style={{ backgroundColor: 'white', padding: '20px', textAlign: 'center' }}>
		{ showph &&(
		<div>

		<PhoneInput country = {"in"} value = {phone} onChange = {(phone) =>setPhone("+"+phone)} />
		</div>)
}		
		
		 <div>
		  <button onClick = {sendOtp}>Send Otp</button>
		  <div id = "recaptcha-container"></div>
		  <OTPInput value = {OTP} onChange = {setOTP}  OTPLength = {6} otpType = "number" disabled = {false} autoFocus />
		  <button onClick = {verifyOtp}>SUBMIT</button>
		</div>

		
			</div>
}

export default PhoneOTP;
