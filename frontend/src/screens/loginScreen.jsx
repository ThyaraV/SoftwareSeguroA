import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from 'react-redux';
import FormContainer from "../components/formContainer.jsx";
import Loader from '../components/Loader.jsx';
import { useLoginMutation } from '../slices/usersApiSlice.js';
import { setCredentials } from '../slices/authSlice.js';
import { toast } from "react-toastify";
import image from "../assets/image.png";

const LoginScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const [login, { isLoading }] = useLoginMutation();

    const { userInfo } = useSelector((state) => state.auth);

    const { search } = useLocation();

    const sp = new URLSearchParams(search);
    const redirect = sp.get('redirect') || '/';

    useEffect(() => {
        if (userInfo) {
            navigate(redirect);
        }
    }, [userInfo, redirect, navigate]);

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            const res = await login({ email, password }).unwrap();
            dispatch(setCredentials({ ...res }));
            navigate(redirect);
        } catch (err) {
            toast.error(err?.data?.message || err.error);
        }
    };

    const handleMicrosoftLogin = () => {
        const popup = window.open("https://softwareseguroa-1.onrender.com/auth/microsoft", "targetWindow", 'toolbar=no,location=no,status=no,menubar=no,scrollbars=yes,resizable=yes,width=620,height=700');
        const messageHandler = (event) => {
            if (event.origin === "https://softwareseguroa-1.onrender.com") {
                if (event.data) {
                    const user = JSON.parse(event.data);
                    dispatch(setCredentials(user));
                    popup.close();
                    navigate(redirect);
                }
            }
        };
        window.addEventListener("message", messageHandler);
    
        // Limpia el event listener al desmontar el componente
        return () => {
            window.removeEventListener("message", messageHandler);
        };
    };

    return (
        <FormContainer>
            <h1>Sign In</h1>
            <Form onSubmit={submitHandler}>
                <Form.Group controlId="email" className="my-3">
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
                        type='email'
                        placeholder="Enter email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}>
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId="password" className="my-3">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type='password'
                        placeholder="Enter password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}>
                    </Form.Control>
                </Form.Group>
                <Button type='submit' variant='primary' className="mt-2" disabled={isLoading}>
                    Sign In
                </Button>
                {isLoading && <Loader />}
            </Form>
            <Form className="mt-4">
                <Button onClick={handleMicrosoftLogin} className="microsoft-login-btn" disabled={isLoading}>
                <img src={image} alt="microsoft" />
                    Login with Microsoft
                </Button>
            </Form>
            <Row className="py-3">
                <Col>
                    New Customer? <Link to={redirect ? `/register?redirect=${redirect}` : '/register'}>
                        Register
                    </Link>
                </Col>
            </Row>
        </FormContainer>
    );
}
export default LoginScreen;
