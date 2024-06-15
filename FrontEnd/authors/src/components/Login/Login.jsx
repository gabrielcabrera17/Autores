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
        axios.post("https://autores-n9w9.onrender.com/api/login", { email, password }, {
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
                // Loguear el error completo para más detalles
                console.error('Error:', error);
                
                if (error.response) {
                    // El servidor respondió con un estado diferente de 2xx
                    console.log('Error Response:', error.response);
                    setError(error.response.data.message || 'An error occurred.');
                } else if (error.request) {
                    // La solicitud fue hecha pero no se recibió ninguna respuesta
                    console.log('Error Request:', error.request);
                    setError('No response received from server.');
                } else {
                    // Algo sucedió al configurar la solicitud que provocó un error
                    console.log('Error Message:', error.message);
                    setError('An error occurred while setting up the request.');
                }
            });
    };

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
