import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Form from 'react-bootstrap/Form'
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, sendEmailVerification, sendPasswordResetEmail, updateProfile } from "firebase/auth";
import app from './firebase.init';
import Button from 'react-bootstrap/Button';
import { useState } from 'react';

// for firebase
const auth = getAuth(app);


function App() {

  //for registered-------------
  const [registered, setRegistered] = useState(false);

  //for validated -----
  const [validated, setValidated] = useState(false);

  // for get email
  const [email, setEmail] = useState('');

  // for show error 
  const [error, setError] = useState('');

  //for name
  const [name, setName] = useState('');

  // for get password 
  const [password, setPassword] = useState('');



  // for name-----------------
  const handleNameBlur = event => {
    setName(event.target.value);
  }


  //for email
  const handleEmailBlur = event => {
    setEmail(event.target.value);
  }

  // for password
  const handlePasswordBlur = event => {
    setPassword(event.target.value);
  }

  //--- for registered
  const handelRegisteredChange = event => {
    setRegistered(event.target.checked);
  }



  // for form
  const handleFromSubmit = event => {

    // for  validate function -------------
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {

      event.stopPropagation();
      return;
    }

    if (!/(?=.*?[#?!@$%^&*-])/.test(password)) {
      setError('Password Should contain at least on special character')
      return;
    }
    // set for valid -------
    setValidated(true);
    setError('')

    // for login condition
    if (registered) {
      //for login
      signInWithEmailAndPassword(auth, email, password)
        .then(result => {
          const user = result.user;
          console.log(user);
        })
        // for error
        .catch(error => {
          console.log(error);
          setError(error.message);
        })
    }

    //for create user condition
    else {

      // create new user
      createUserWithEmailAndPassword(auth, email, password)
        //success 
        .then(result => {
          const user = result.user;
          console.log(user);
          setEmail('');
          setPassword('');

          // verify email call
          verifyEmail();

          //set user name
          setUserName();

        })
        //any error
        .catch(error => {
          console.error(error)
          setError(error.message);
        })

    }


    event.preventDefault();
  }

  // for password reset--------------
  const handlePasswordReset = () => {
    sendPasswordResetEmail(auth, email)
      .then(() => {
        console.log('email sent')
      })
  }

  // for set user name
  const setUserName = () => {
    updateProfile(auth.currentUser, {
      displayName: name
    })
      .then(() => {
        console.log('updating name')
      })
      .catch(error => {
        setError(error.message)
      })
  }


  // for email verify by sending email ----
  const verifyEmail = () => {
    sendEmailVerification(auth.currentUser)
      .then(() => {
        console.log("email Verification Send")
      })
  }



  return (
    <div>

      <div className="registration w-50 mx-auto mt-5">
        <h2 className='text-primary'>Please {registered ? 'Login' : 'Register'}!!</h2>

        <Form noValidate validated={validated} onSubmit={handleFromSubmit}>

          {/* your name Group---------------------- */}
          {!registered && <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Your Name</Form.Label>
            <Form.Control onBlur={handleNameBlur} type="text" placeholder="Your Name" required />

            {/* for invalid ---------------------------- */}
            <Form.Control.Feedback type="invalid">
              Please provide a Your Name.
            </Form.Control.Feedback>
          </Form.Group>}




          {/* email Group---------------------- */}
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control onBlur={handleEmailBlur} type="email" placeholder="Enter email" required />

            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>

            {/* for invalid ---------------------------- */}
            <Form.Control.Feedback type="invalid">
              Please provide a valid Email.
            </Form.Control.Feedback>

          </Form.Group>


          {/* Password Group---------------------- */}
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control onBlur={handlePasswordBlur} type="password" placeholder="Password" required />

            {/* for invalid ---------------------------- */}
            <Form.Control.Feedback type="invalid">
              Please provide a valid Password.
            </Form.Control.Feedback>

          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Check onChange={handelRegisteredChange} type="checkbox" label="Already Registered?" />
          </Form.Group>


          {/* <p className='text-success'>{error}</p> */}
          <p className='text-danger'>{error}</p>

          {/* forgat password----------------- */}
          <Button onClick={handlePasswordReset} variant="link">Forger Password</Button>
          <br />

          <Button variant="primary" type="submit">
            {registered ? 'Login' : 'Register'}
          </Button>
        </Form>

      </div>
    </div>
  );
}

export default App;
