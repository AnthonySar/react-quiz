import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../Firebase/firebaseConfig';

const Login = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [btn, setBtn] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (email !== '' && password.length > 5) {
      setBtn(true)
    } else if (btn) {
      setBtn(false)
    }
  }, [email, password, btn]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    signInWithEmailAndPassword(auth, email, password)
    .then(user => {
      setEmail('');
      setPassword('');
      navigate('/welcome', { replace: true });
    }).catch(error => {
      setError(error);
      setEmail('');
      setPassword('');
    })
  }

  const btnCo = <button disabled={btn ? false : true}>Connexion</button>;

  // Gestion des erreurs
  const errorMsg = error !== "" && <span>{error.message}</span>;

  return (
    <div className='signUpLoginBox'>
      <div className='slContainer'>
        <div className='formBoxLeftLogin'></div>
        <div className='formBoxRight'>
          <div className='formContent'>
            { errorMsg }

            <h2>Connexion</h2>

            <form onSubmit={handleSubmit}>
              <div className='inputBox'>
                <input onChange={(e) => setEmail(e.target.value)} value={email} type="email" id='email' required autoComplete='off' />
                <label htmlFor='email'>Email</label>
              </div>

              <div className='inputBox'>
                <input onChange={(e) => setPassword(e.target.value)} value={password} type="password" id='password' required autoComplete='off' />
                <label htmlFor='password'>Mot de passe</label>
              </div>

              { btnCo }
            </form>

            <div className='linkContainer'>
              <Link className='simpleLink' to="/signup">Pas encore inscrit ? Let's go !</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login;