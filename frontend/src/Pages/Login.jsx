import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Function to call the backend API and authenticate the user
const loginUser = async (credentials) => {
  try {
    const response = await fetch('http://localhost:5000/api/auth/login', { 
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
    });    

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || `Error: ${response.status}`);
    }

    return await response.json();  // Return the JSON response
  } catch (error) {
    console.error('Login failed:', error.message);
    return { error: error.message };
  }
};

const Login = ({ setToken }) => {
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null); // State to hold error message
  const navigate = useNavigate(); // Initialize useNavigate

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await loginUser({ username, password });
  
    if (response.error) {
      setError(response.error); // Display error message
    } else if (response.token) {
      setToken(response.token);  // Store the token
      navigate('/dashboard');     // Redirect to dashboard
    } else {
      // Handle unexpected response
      setError("Unexpected response from the server");
    }
  };

  return (
    <div className="login-wrapper">
      <h1>Please Log In</h1>
      <form onSubmit={handleSubmit}>
        <label>
          <p>Username</p>
          <input 
            type="text" 
            onChange={e => setUserName(e.target.value)} 
            required
          />
        </label>
        <label>
          <p>Password</p>
          <input 
            type="password" 
            onChange={e => setPassword(e.target.value)} 
            required
          />
        </label>
        {error && <p style={{ color: 'red' }}>{error}</p>} {/* Display error message */}
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default Login;
