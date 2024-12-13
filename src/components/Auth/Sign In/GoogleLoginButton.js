import React from "react";
import { useNavigate } from "react-router-dom";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { googleAuth } from "../../../api/Services/AuthServices";

const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;

const LoginByGoogle = () => {
  const navigate = useNavigate();
  const handleSuccess = async (credentialResponse) => {
    try {
      const response = await googleAuth(credentialResponse.credential);
      console.log("Backend Response:", response);
      if (response.message === "Success") {
        localStorage.setItem("token", response.token);
        navigate("/");
        window.location.reload();
      } else {
        console.error("Google Login Backend Error:", response);
      }
    } catch (error) {
      console.error("Error communicating with backend:", error);
    }
  };

  const handleError = () => {
    console.error("Google Login Failed");
  };

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <GoogleLogin
        onSuccess={handleSuccess}
        onError={handleError}
        text="Login with Google"
      />
    </GoogleOAuthProvider>
  );
};

export default LoginByGoogle;
