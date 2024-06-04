import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import { thunkLogin } from "../../../redux/session";
import { useModal } from "../../../context/Modal";
import "./LoginForm.css";


function LoginFormModal() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const users = useSelector(state => state.users);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState(false);
    const { closeModal } = useModal();


    useEffect(() => {
      setErrors(false)
    }, [username])

    const handleSubmit = async (e) => {
        e.preventDefault();

        const exists = Object.values(users).filter(user => user.username === username)
        console.log(exists)
        if (!exists.length) {
          setPassword('');
          setErrors(true);
          return
        }

        const serverResponse = await dispatch(
            thunkLogin({
                username: username,
                password,
            })
        );

        if (serverResponse) {
            setPassword('')
            setErrors(true);
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

                    <label>Password</label>
                        <input
                          type="password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                        />

                    <p className={errors ? 'login-error-validation' : 'regular-string'}>Incorrect password or username</p>
                    <button className='modal-button login-button' type="submit">Log In</button>
                </div>
            </form>
        </div>
    );
}

export default LoginFormModal;
