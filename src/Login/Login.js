import React, { useContext, useState } from 'react';
import * as firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './Firebase.Config';
import './Login.css';
import fb from '../imgse/fb.png';
import google from '../imgse/google.png';
import { useHistory, useLocation } from 'react-router-dom';
import { UserContext } from '../App';

const Login = () => {
    const [newUser, setNewUser] = useState(false);
    const [user, setUser] = useState({
        isSignedIn: false,
        name: '',
        email: '',
        password: ''

    });


    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const history = useHistory();
    const location= useLocation();
    const { from } = location.state || { from: {pathname:"/room" }}
    
    if(firebase.apps.length === 0){
        firebase.initializeApp(firebaseConfig);
    }

    
    

    const handleBlur = (e) => {

        let isFieldValid = true;
        
        if (e.target.name === 'email') {
            isFieldValid = /\S+@\S+\.\S+/.test(e.target.value);
        }

        if (e.target.name === 'password') {
            const isPasswordValid = e.target.value.length > 6;
            const passwordHasNumber = /\d{1}/.test(e.target.value);
            isFieldValid = isPasswordValid && passwordHasNumber;
        }

        if (isFieldValid) {
            const newUserInfo = { ...user };
            newUserInfo[e.target.name] = e.target.value;
            setUser(newUserInfo);
            
        }
    }
    const handleSubmit = (e) => {
        if (newUser &&  user.email && user.password) {
            firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
                .then(res => {
                    const newUserInfo = { ...user };
                    newUserInfo.error = '';
                    newUserInfo.success = true;
                    setLoggedInUser(newUserInfo);
                    history.replace(from);
                    
                })
                .catch(error => {
                    const newUserInfo = { ...user };
                    newUserInfo.error = error.message;
                    newUserInfo.success = false;
                    setLoggedInUser(newUserInfo);
                  
                });
        }
        if (!newUser && user.email && user.password) {
            firebase.auth().signInWithEmailAndPassword(user.email, user.password)
                .then(res => {
                    const newUserInfo = { ...user };
                    newUserInfo.error = '';
                    newUserInfo.success = true;
                    setLoggedInUser(newUserInfo);
                    history.replace(from);
                    
                    console.log('sign in user info', res.user);
                })
                .catch(error => {
                    const newUserInfo = { ...user };
                    newUserInfo.error = error.message;
                    newUserInfo.success = false;
                    setLoggedInUser(newUserInfo);

                });
        }
        e.preventDefault();
    }

    const signWithGoogle = () => {

        if (firebase.apps.length === 0) {
            firebase.initializeApp(firebaseConfig)
        }
        const provider = new firebase.auth.GoogleAuthProvider();

        firebase.auth().signInWithPopup(provider)
            .then(res => {
                const { displayName, email } = res.user;
                const signedInUser = { name: displayName, email }
                setLoggedInUser(signedInUser);
                history.replace(from);
                

            })
            .catch(err => {
                console.log(err);
                console.log(err.message);
            })
    }
    

    const signWithFacebook = () => {

        if (firebase.apps.length === 0) {
            // Initialize Firebase
            firebase.initializeApp(firebaseConfig);
        }
        const fbProvider = new firebase.auth.FacebookAuthProvider();
        firebase.auth().signInWithPopup(fbProvider).then(function(result) {
            const {displayName, email} = result.user;
            const signedInUser = {name: displayName, email}
            setLoggedInUser(signedInUser);
            history.replace(from);
            
            // ...
          }).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;
            // ...
          });
    }
    return (
        <div style={{height:"900px"}}>
            <div className='loginArea'>
                <form className="loginform" onSubmit={handleSubmit}>
                    
                    {newUser &&
                        <div className='inputBox'>
                            <input  onBlur={handleBlur} name="name" type="text" placeholder="first name" required/>
                        </div>
                    }
                    
                    <br/>
                
                    {newUser &&
                        <div className='inputBox'>
                            <input onBlur={handleBlur} name="name" type="text" placeholder="last name" required/>
                        </div>
                    }
                        <br/>
                    <div className='inputBox'> 
                        <input  onBlur={handleBlur} type="text" name='email' placeholder="email address" required />
                    </div>
                        <br />
                    <div className='inputBox'>
                        <input  onBlur={handleBlur} type="password" name="password" id="" placeholder="password" required />
                    </div>
                        <br />
                    
                        <input className="submitBtn" type="submit" value={newUser ? 'Sign up' : 'Sign In'} />
                    

                    <div className="newSignBtn">
                        <input type="checkbox" onChange={() => setNewUser(!newUser)} name="newUser" id="" />
                        <label htmlFor="">New User Sign up</label>
                    </div>
                </form>
                <br/>
                <div className='googleOrFbSignin'>
                    <div className='googleArea'>
                        <img src={google} alt=""/>
                        <input className="signIn" onClick={signWithGoogle} type="button" value="Continue with Google" />
                    </div>
                    <br />
                    <div className='facebookArea'>
                        <img src={fb} alt=""/>
                        <input className="signIn" onClick={signWithFacebook} type="button" value="Continue with Facebook" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;