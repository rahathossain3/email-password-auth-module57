import './App.css';
import { getAuth } from "firebase/auth";
import app from './firebase.init';

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
    <div className="App">

      <form onSubmit={handleFromSubmit} action="">
        <input onBlur={handleEmailBlur} type="email" name="" id="" />

        <br />
        <input onBlur={handlePasswordBlur} type="password" name="" id="" />
        <br />
        <input type="submit" value="Login" />
      </form>

    </div>
  );
}

export default App;
