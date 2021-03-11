import React from "react";
import {useEffect} from "react";
import {Switch , Route} from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import {ToastContainer} from "react-toastify";


import Header from "./components/nav/Header";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Home from "./pages/Home";
import RegisterComplete from "./pages/auth/RegisterComplete"

import {auth} from './firebase';
import {useDispatch} from "react-redux";



const App = () => {

  const dispatch=useDispatch();

  //to check firebase auth state
  useEffect(()=>{
    const unsubscibe=auth.onAuthStateChanged(async (user)=> {
      if(user){
        const idTokenResult=await user.getIdTokenResult();    //getting user tokenid from firebase auth
        console.log("user",user);
        dispatch({
          type:"LOGGED_IN_USER",
          payload:{     //these things are all tfrom firebase auth  (i.e. email, token)
            email:user.email,
            token:idTokenResult.token,
          }
        });
      }
    });

    //cleanup
    return()=> unsubscibe();
  },[])


  return (
    <>
      <Header/>
      {/* /* for all messages as notifications toast  //instead of using it in everyppage i have used it here*/ }
      <ToastContainer/>     
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login}/>
        <Route exact path="/register" component={Register}/>
        <Route exact path="/register/complete" component={RegisterComplete}/>
      </Switch>
    </>
      
  )
}

export default App;