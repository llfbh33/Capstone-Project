import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useState } from "react";

import { thunkLogin } from "../../../redux/session";
import { useModal } from "../../../context/Modal";
import "./LoginForm.css";


function LoginFormModal() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState(false);
    const { closeModal } = useModal();


    const handleSubmit = async (e) => {
        e.preventDefault();

        const serverResponse = await dispatch(
            thunkLogin({
                username: username,
                password,
            })
        );

        if (serverResponse) {
            setErrors(serverResponse);
        } else {
            setUsername('')
            setPassword('')
            closeModal();
            navigate('/')
        }
    };

    return (
        <div className="modal login-form-container">
            <h1 className="modal-form-title">Log In</h1>
            <form onSubmit={handleSubmit}>
                <div className="modal login-form-elements">

                    <label>User Name</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    <p className={errors ? 'login-error-validation' : 'regular-string'}>{errors.username}</p>

                    <label>Password</label>
                        <input
                            className="password-input"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />

                    <p className={errors ? 'login-error-validation' : 'regular-string'}>{errors.password}</p>
                    <button className='modal-button login-button' type="submit">Log In</button>
                </div>
            </form>
        </div>
    );
}

export default LoginFormModal;
