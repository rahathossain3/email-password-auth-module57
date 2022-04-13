import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Form from 'react-bootstrap/Form'
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import app from './firebase.init';
import Button from 'react-bootstrap/Button';
import { useState } from 'react';

// for firebase
const auth = getAuth(app);


function App() {
  // for get email
  const [email, setEmail] = useState('');

  // for show error 
  const [error, setError] = useState('');

  // for get password 
  const [password, setPassword] = useState('');

  //for validated -----
  const [validated, setValidated] = useState(false);



  //for email
  const handleEmailBlur = event => {
    setEmail(event.target.value);
  }

  // for password
  const handlePasswordBlur = event => {
    setPassword(event.target.value);
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




    // create new user
    createUserWithEmailAndPassword(auth, email, password)
      //success 
      .then(result => {
        const user = result.user;
        console.log(user);
      })
      //any error
      .catch(error => {
        console.error(error)
      })

    event.preventDefault();
  }


  return (
    <div>

      <div className="registration w-50 mx-auto mt-5">
        <h2 className='text-primary'>Please Register!!</h2>

        <Form noValidate validated={validated} onSubmit={handleFromSubmit}>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control onBlur={handleEmailBlur} type="email" placeholder="Enter email" required />

            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          {/* for invalid ---------------------------- */}
          <Form.Control.Feedback type="invalid">
            Please provide a valid Email.
          </Form.Control.Feedback>



          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control onBlur={handlePasswordBlur} type="password" placeholder="Password" required />

            {/* for invalid ---------------------------- */}
            <Form.Control.Feedback type="invalid">
              Please provide a valid Password.
            </Form.Control.Feedback>

          </Form.Group>

          <p className='text-danger'>{error}</p>

          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>

      </div>
    </div>
  );
}

export default App;
