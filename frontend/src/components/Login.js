import React, { useState } from 'react';
import { setUserSession } from '../utils/Common';
 
function Login(props) {
  const username = useFormInput('');
//   const password = useFormInput('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
 
  // handle button click of login form
  const handleLogin = () => {
    setError(null);
    setUserSession(username.value);
    props.history.push('/dashboard');
  }
 
  return (
    <div>
      Login<br /><br />
      <div>
        User Token<br />
        <input type="text" {...username} autoComplete="new-password" />
      </div>
      
      {error && <><small style={{ color: 'red' }}>{error}</small><br /></>}<br />
      <input type="button" value={loading ? 'Loading...' : 'Login'} onClick={handleLogin} disabled={loading} /><br />
    </div>
  );
}
 
const useFormInput = initialValue => {
  const [value, setValue] = useState(initialValue);
 
  const handleChange = e => {
    setValue(e.target.value);
  }
  return {
    value,
    onChange: handleChange
  }
}
 
export default Login;