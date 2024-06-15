import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const procesaFormLogin = (e) => {
        e.preventDefault();
        axios.post("http://localhost:8080/api/login", { email, password }, {
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then((response) => {
                console.log(response);
                setEmail('');
                setPassword('');
                setError('');
                navigate("/list");
            })
            .catch((error) => {
                console.log(error.response.data.message);
                setError(error.response.data.message);
            });
        }
    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={procesaFormLogin}>
                <label htmlFor="email">Email</label>
                <input
                    type="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit">Login</button>
            </form>
            {error && <p>{error}</p>}
        </div>
    );
};
export default Login;