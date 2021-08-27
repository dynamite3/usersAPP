import logo from './logo.svg';
import './App.css';


import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams
} from "react-router-dom";
import { Contact } from './Contact';

function App() {
  return (
    <div className="App">
        
        <div className="navlist">
            <ul>
              <li>  <Link to="/">Home </Link> </li>
              <li>  <Link to="/about">About</Link>  </li>
              <li>  <Link to="/contact">Contact</Link> </li>
              <li>  <Link to="/login">Login </Link> </li>
            </ul>
            
          </div>
          <div className="content">
          <Switch>
                
                <Route path="/about">  <About/> </Route>
                {/* <Route path="/contact/:id"> <UserDetails/>  </Route> */}
                <Route path="/contact"> <Contact/>  </Route>
                <Route path="/login"> <Login/>  </Route>
                <Route exact path="/">  <Home/>  </Route>
                <Route path="*"> <Notfound/>  </Route>
          </Switch>
          </div>
          
        </div>
  );
}

export default App;
     
function Home(){
  return(
    <div>Inside Home : GO TO CONTACT PAGE FOR USER CARDS</div>
 )
}

function About(){
  return(
    <div>Inisde About</div>
  )
}

function Login(){
  return(
    <div>Inside login</div>
    )
}

function Notfound(){
  return(
      <h1>Page Not Found</h1>
  )
}

// function UserDetails(){
//   const {id} =useParams();
//   const user = ini_users.find((user)=>  user.id=== +id)
//   return(
//     <div>
//       <h2>User details : {user.name}</h2>
//     </div>
//   )
// }