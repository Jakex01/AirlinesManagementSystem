import React, { useEffect } from 'react';
import { useOktaAuth } from "@okta/okta-react";
import OktaSignInWidget from "./OktaSignInWidget";
import { useNavigate } from "react-router-dom";
import { SpinnerLoading } from "../layouts/Utils/SpinnerLoading";

const LoginWidget = ({ config }) => {
    const { oktaAuth, authState } = useOktaAuth();
    const navigate = useNavigate();

    const onSuccess = (tokens) => {
        oktaAuth.handleLoginRedirect(tokens);
    };

    const onError = (err) => {
        console.log("error logging in", err);
    }

    useEffect(() => {
        if (authState && authState.isAuthenticated) {
            navigate("/home");
        }
    }, [authState, navigate]);

    if (!authState) {
        return (
            <>
                <h2>Hello from authstate not</h2>
                <SpinnerLoading />
            </>
        );
    }

    return (
        <>
            <h2>TUTAJ JESTEM</h2>
            <OktaSignInWidget config={config} onSuccess={onSuccess} onError={onError} />
        </>
    );
}

export default LoginWidget;
