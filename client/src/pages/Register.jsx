import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Register() {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();


  async function handleRegister(e) {
    e.preventDefault();

    try {

      await axios.post(
        "https://omninews-qs4j.onrender.com/api/auth/register",
        {
          username,
          password,
        }
      );


      alert("✅ Registration successful! Please login.");

      navigate("/login");


    } catch (error) {

      console.log(error);

      alert(
        error.response?.data?.message ||
        "Registration failed"
      );

    }
  }


  return (
    <div
      className="container mt-5"
      style={{ maxWidth: "400px" }}
    >

      <h2 className="text-center mb-4">
        Register
      </h2>


      <form onSubmit={handleRegister}>


        <div className="mb-3">

          <label>
            Username
          </label>

          <input
            type="text"
            className="form-control"
            value={username}
            onChange={(e) =>
              setUsername(e.target.value)
            }
            required
          />

        </div>



        <div className="mb-3">

          <label>
            Password
          </label>

          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            required
          />

        </div>



        <button className="btn btn-success w-100">
          Create Account
        </button>


      </form>


    </div>
  );
}


export default Register;