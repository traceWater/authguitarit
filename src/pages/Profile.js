import React, {useState, useRef} from 'react';
import { useSelector } from 'react-redux';
import styles from './Profile.module.css';
import LoadingSpinner from '../components/LoadingSpinner';

const Profile = () => {

  const idToken = useSelector(state => state.token);
  const passwordValueRef = useRef();
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  
  const formSubmitHandler = e => {
    e.preventDefault();
    
    const enteredNewPassword = passwordValueRef.current.value;
    
    const sendData = async () => {
      setIsLoading(true)
      const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyC64iHtcTOKr3b082gaY6Pj8XxPDmTSIio', {
        method: "POST",
        body: JSON.stringify({
          idToken: idToken,
          password: enteredNewPassword,
          returnSecureToken: false,
        }),
        headers: {
          "Content-Type": "application/json",
        }
        })

        try{
          const data = await response.json();
          if(!response.ok) {
            setError(data.error.message)
          } else {
            console.log('proceed')
          }
          setIsLoading(false);
        }catch(err) {
          setError(err)
          throw new Error(err);
        }
    }

    sendData();
  }

  return (
    <div className={styles.profile}>
    <h2>Username profile</h2>
    <form onSubmit={formSubmitHandler} className={styles['change-password__form']}>
      <div className={styles['form-group']}>
        <label>New Password</label>
        <input ref={passwordValueRef} type="password" minLength="6" required />
      </div>
      <div className={styles['form-group']}>
      <span>{error && error}</span>
      </div>
      {!isLoading &&<button type="submit">Change password</button>}
      {isLoading && <LoadingSpinner />}
    </form>
    </div>
  )
}

export default Profile