import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../Firebase/firebaseConfig';

const ForgetPassword = () => {

  const [email, setEmail] = useState('');
  const [btn, setBtn] = useState(false);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (email !== '') {
      setBtn(true)
    } else if (btn) {
      setBtn(false)
    }
  }, [email, btn])

  const handleSubmit = (e) => {
    e.preventDefault();

    sendPasswordResetEmail(auth, email)
    .then(user => {
      setError(null);
      setSuccess(`Le mail a bien été envoyé à : ${email}`);
      setEmail('');
      setTimeout(() => {
        navigate('/login')
      }, 5000)
    }).catch(error => {
      setError(error);
      setEmail('');
    })
  }

  const btnGet = <button disabled={btn ? false : true}>Récupérer</button>;

  // Gestion des erreurs
  const successMsg = success && 
    <span style={{
        border: "2px solid white", 
        background: "green", 
        color: "white"
        }}>
        {success}
    </span>;

    const errorMsg = error && <span>{error.message}</span>

  return (
    <div className='signUpLoginBox'>
      <div className='slContainer'>
        <div className='formBoxLeftForget'></div>
        <div className='formBoxRight'>
          <div className='formContent'>
            { successMsg }
            { errorMsg }

            <h2>Mot de passe oublié ?</h2>

            <form onSubmit={handleSubmit}>
              <div className='inputBox'>
                <input onChange={(e) => setEmail(e.target.value)} value={email} type="email" id='email' required autoComplete='off' />
                <label htmlFor='email'>Email</label>
              </div>

              { btnGet }
            </form>

            <div className='linkContainer'>
              <Link className='simpleLink' to="/login">Déjà inscrit ? Let's go !</Link>
              <br />
              <Link className='simpleLink' to="/signup">Nouveau sur le site ? Inscrivez-vous !</Link>
            </div>            
          </div>
        </div>
      </div>
    </div>
  )
}

export default ForgetPassword;