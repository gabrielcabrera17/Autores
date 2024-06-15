import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const RegisterUser = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const procesaFormRegister = (e) => {
      e.preventDefault();
      axios.post("http://localhost:8080/api/register", { firstName, lastName, email, password, confirmPassword },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
        .then((response) => {
          console.log(response);
          setFirstName("");
          setLastName("");
          setEmail("");
          setPassword("");
          setConfirmPassword("");
          setError("");
          navigate("/");
        })
        .catch((error) => {
          console.log(error.response.data.message);
          setError(error.response.data.message);
        });
    };
    return (
      <div>
        <h1>Register</h1>
        <form onSubmit={procesaFormRegister}>
          <div>
            <label>First Name</label>
            <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} />  
          </div>
          <div>
            <label>Last Name</label>
            <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} />
          </div>
          <div>
            <label>Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div>
            <label>Password</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <div>
            <label>Confirm Password</label>
            <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
          </div>
          <div>
            <button type="submit">Register</button>
          </div>
        </form>
        {error && <p>{error}</p>}
      </div>
    );
  };

  export default RegisterUser;