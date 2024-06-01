import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { thunkSignup } from "../../redux/session";
import "./SignupForm.css";
import { useNavigate } from "react-router-dom";

function SignupFormModal() {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [validationErrors, setValidationErrors] = useState({});
  const { closeModal } = useModal();

  useEffect(() => {
    let errors = {}
    if (name.length < 4) errors.name = 'Name must be 4 or more characters long';
    if (name.length > 50) errors.name = 'Name must be less than 50 characters long';
    if (username.length < 8) errors.username = 'Username must be 8 or more characters long';
    if (username.length > 50) errors.username = 'Username must be less than 50 characters long';
    if (password.length < 8) errors.password = 'Password must be 8 or more characters long'
    if (confirmPassword !== password) errors.confirmPassword = 'Password and confirmed password must match'

    setValidationErrors(errors)

  }, [name, username, password, confirmPassword])

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setPassword('')
      setConfirmPassword('')
      return setValidationErrors({
        confirmPassword:
          "Confirm Password field must be the same as the Password field",
      });
    }

    const serverResponse = await dispatch(
      thunkSignup({
        name,
        username,
        password,
      })
    );

    if (serverResponse) {
      setValidationErrors(serverResponse);
    } else {
      closeModal();
      navigate('/')
    }
  };

  return (
    <>
      <h1>Sign Up</h1>
      {validationErrors.server && <p>{validationErrors.server}</p>}
      <form onSubmit={handleSubmit}>
        <label>
          Name
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>
        {name && validationErrors.name && <p>{validationErrors.name}</p>}
        <label>
          Username
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </label>
        {username && validationErrors.username && <p>{validationErrors.username}</p>}
        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        {password && validationErrors.password && <p>{validationErrors.password}</p>}
        <label>
          Confirm Password
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </label>
        {confirmPassword && validationErrors.confirmPassword && <p>{validationErrors.confirmPassword}</p>}
        <button type="submit">Sign Up</button>
      </form>
    </>
  );
}

export default SignupFormModal;
