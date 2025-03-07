import { useState } from 'react';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3000/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, email, password })
      });

      if (response.ok) {
        setMessage('User registered successfully!');
      } else {
        setMessage('Registration failed');
      }
    } catch (error) {
      setMessage('Error connecting to server');
      console.error('Error:', error);
    }
  };

  return (
    <div style={styles.container}>
      <h2>Sign Up</h2>
  <form onSubmit={handleSubmit} style={styles.form}>
    <div style={styles.inputGroup}>
      <label>Username:</label>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
        style={styles.input}
      />
    </div>
    <div style={styles.inputGroup}>
      <label>Email: put</label>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        style={styles.input}
      />
    </div>
    <div style={styles.inputGroup}>
      <label>Password:</label>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        style={styles.input}
      />
    </div>
    <button type="submit" style={styles.button}>Sign Up</button>
  </form>
  {message && <p>{message}</p>}
</div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    backgroundColor: '#f0f0f0'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    width: '300px'
  },
  inputGroup: {
    marginBottom: '15px'
  },
  input: {
    width: '100%',
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #ccc'
  },
  button: {
    padding: '10px 15px',
    border: 'none',
    borderRadius: '5px',
    backgroundColor: '#28a745',
    color: 'white',
    cursor: 'pointer'
  }
};

export default Signup;
