import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";

import { thunkSignup } from "../../../redux/session";
import { useModal } from "../../../context/Modal";
import "./SignupForm.css";


function SignupFormModal() {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errors, setErrors] = useState({});
    const { closeModal } = useModal();

  useEffect(() => {
      let validationErrors = {}
      if (name.length < 4) validationErrors.name = 'Name must be 4 or more characters';
      if (name.length > 50) validationErrors.name = 'Name must be less than 50 characters';
      if (username.length < 8) validationErrors.username = 'Username must be 8 or more characters';
      if (username.length > 50) validationErrors.username = 'Username must be less than 50 characters';
      if (password.length < 8) validationErrors.password = 'Password must be 8 or more characters'
      if (password.length > 50) validationErrors.password = 'Password must be less than 50 characters';
      if (confirmPassword !== password) validationErrors.confirmPassword = 'Password and confirmed password must match'

      setErrors(validationErrors)

    }, [name, username, password, confirmPassword])

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (Object.values(errors).length) return;

        const serverResponse = await dispatch(
            thunkSignup({
                name,
                username,
                password,
            })
        );

        if (serverResponse) {
            setErrors(serverResponse);
        } else {
            closeModal();
            navigate('/')
        }
    };

    return (
        <div className='modal signup-form-container'>
          <h1 className="modal-form-title">Sign Up</h1>
            <form onSubmit={handleSubmit}>
                <div className="modal">

                    <label>Name</label>
                        <input
                          type="text"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          required
                        />
                    <p className={errors.name ? 'error-validation' : ''}>{errors.name ? `${errors.name} - ${name.length}/50` : `${name.length}/50`}</p>

                    <label>Username</label>
                        <input
                          type="text"
                          value={username}
                          onChange={(e) => setUsername(e.target.value)}
                          required
                        />
                    <p className={errors.username ? 'error-validation' : ''}>{errors.username ? `${errors.username} - ${username.length}/50` : `${username.length}/50`}</p>

                    <label>Password</label>
                        <input
                          type="password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                        />
                    <p className={errors.password ? 'error-validation' : ''}>{errors.password ? `${errors.password} - ${password.length}/50` : `${password.length}/50`}</p>

                    <label>Confirm Password</label>
                        <input
                          type="password"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          required
                        />
                    <p className={errors.confirmPassword ? "error-validation" :  'signup-invisible-validation'}>{errors.confirmPassword}</p>
                  <button className='modal-button signup-button' type="submit">Sign Up</button>
                  </div>
            </form>
        </div>
    );
}

export default SignupFormModal;
