import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Form from 'react-bootstrap/Form'
import { getAuth } from "firebase/auth";
import app from './firebase.init';
import Button from 'react-bootstrap/Button';

// for firebase
const auth = getAuth(app);


function App() {

  //for email
  const handleEmailBlur = event => {
    console.log(event.target.value);
  }

  // for password
  const handlePasswordBlur = event => {
    console.log(event.target.value);
  }


  // for form
  const handleFromSubmit = event => {
    console.log('from submitted');
    event.preventDefault();
  }


  return (
    <div>

      <div className="registration w-50 mx-auto mt-5">
        <h2 className='text-primary'>Please Register!!</h2>

        <Form onSubmit={handleFromSubmit}>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control onBlur={handleEmailBlur} type="email" placeholder="Enter email" />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control onBlur={handlePasswordBlur} type="password" placeholder="Password" />
          </Form.Group>

          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>

      </div>
    </div>
  );
}

export default App;
