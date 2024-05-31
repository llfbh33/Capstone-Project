import { useState } from "react";
import { thunkLogin } from "../../redux/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";

import { useNavigate } from "react-router-dom";
import LeftNavigation from "../LeftNavigation/LeftNavigation";

function EntryPage({entry}) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();
  console.log(entry)

  const handleSubmit = async (e) => {
    e.preventDefault();

    const serverResponse = await dispatch(
      thunkLogin({
        username: userName,
        password,
      })
    );

    if (serverResponse) {
      setErrors(serverResponse);
    } else {
      closeModal();
      navigate('/home')
    }
  };

  return (
    <div className='main-insite-container'>
    <div className='left-hand-nav-container'>
        <LeftNavigation />
    </div>
    <div className='main-insite-content-container'>
      <h1>{entry?.name}</h1>
      <form onSubmit={handleSubmit}>
        <label>
          User Name
          <input
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            required
          />
        </label>
        {errors.username && <p>{errors.username}</p>}
        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        {errors.password && <p>{errors.password}</p>}
        <button type="submit">Log In</button>
      </form>
      </div>
    </div>
  );
}

export default EntryPage;
