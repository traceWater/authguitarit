import React, {useState, useRef} from 'react';
import styles from './Log.module.css';
import { useDispatch } from 'react-redux';
import { sliceActions } from '../store';
import LoadingSpinner from '../components/LoadingSpinner';
import { useNavigate } from 'react-router-dom';

const Log = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isUserNew, setIsUserNew] = useState(true);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const emailValueRef = useRef();
  const passwordValueRef = useRef();

  const signHandler = () => {
    setIsUserNew(prevState => {
      return !prevState;
    })
  }

  const submitFormHandler = e => {
    e.preventDefault();

    const enteredEmail = emailValueRef.current.value;
    const enteredPassword = passwordValueRef.current.value;
    const sendData = async (url) => {
      setError(null)
      setIsLoading(true);
      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify({
          email: enteredEmail,
          password: enteredPassword,
          returnSecureToken: true
        }),
        headers: {
          'Content-Type' : 'application/json'
        }
      })

      try{
        const data = await response.json();
        if(!response.ok) {
          setError(data.error.message)
        } else {
          const expirationTime = new Date(new Date().getTime() + (+data.expiresIn * 1000))
          dispatch(sliceActions.login({ 
            idToken: data.idToken, 
          }))
          navigate('/react-auth-app/profile')
        }
        setIsLoading(false);
      } catch(err) {
        setError('Authentication failed!');
        setIsLoading(false);
        throw new Error(err);
      }
    }

      if(!isUserNew) {
        sendData('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyC64iHtcTOKr3b082gaY6Pj8XxPDmTSIio');
      } else {
        sendData('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyC64iHtcTOKr3b082gaY6Pj8XxPDmTSIio');
      }

  }

  return (
    <div className={styles.log}>
    <h2>{isUserNew ? "Sign up" : "Sign in"}</h2>
        <form onSubmit={submitFormHandler} className={styles['log-form']}>
        <div className={styles['form-group']}>
            <label>Email</label>
            <input ref={emailValueRef} type="email" required />
        </div>
        <div className={styles['form-group']}>
            <label>Password</label>
            <input ref={passwordValueRef} type="password" required />
        </div>
        <div className={styles['form-group']}>
          <span>{error && error}</span>
        </div>
        {isLoading && <LoadingSpinner />}
        {!isLoading && <button type='submit' className={styles['submit-btn']}>{isUserNew ? "Sign up" : "Sign in"}</button>}
        <a onClick={signHandler} className={styles['change-form__btn']}>{isUserNew ? "Already have an account? Sign in" : "Don't have an account? Create one"}</a>
    </form>
    </div>
  )
}

export default Log