//We will create a React Context in this file that will house all authentication info (currentUser, login, logout). React contexts allow us to store information and transport that info to the components that use it. We could store this info in the App component and just pass props to send the user information to other components but this isn't ideal for larger apps. Instead, we create the context and a component that will communicate this context to its children. Think of this much like Session storage in a .NET application.
import React, { useState, useEffect, useContext } from 'react'
//auth gives us access to the auth object fro base.js, which in turn the authentication that we set up in our Firebase app
import { auth } from '../base'
//Below are Firebase functions we need to sign a use in and out with GitHub
//signInWithPopup pops up the auth in a smaller window.
import { GithubAuthProvider, signInWithPopup, signOut } from 'firebase/auth'

//Below we create a context (storage object) for all of our auth info
const AuthContext = React.createContext()

//Below we create a function that will allow us to use the context in components. We will import this function anytime we want the currentUser, login, or logout functionality
export function useAuth() {
    return useContext(AuthContext)
}

//This component will provide the AuthContext info to the children components nested inside of it. See App.js where we call to an instance of this component and nest all other components inside of it.
export default function AuthProvider({children}) {
    //The hook below will store the current user of our app
    const [currentUser, setCurrentUser] = useState();
    //The second hook is a custom hook that determines if a user has finished logging in so we can then display the relevant children to the screen.
    const [loading, setLoading] = useState(true);

    //Login functionality
    //Instantiate a GithubAuthProvider object
    const githubAuthProvider = new GithubAuthProvider()

    //Now we can build our login function
    async function login() {
        return (signInWithPopup(auth, githubAuthProvider).then(authData => { 
            console.log(authData)
            setCurrentUser(authData.user)
            //We could imagine adding some additional login functionality here. For instance, saving the user to our own db or giving the user a default role, etc.
         }))
    }

    //Logout functionality
    async function logout() {
        signOut(auth).then(setCurrentUser(null))
    }

    //The object below will hold currentUser info and login/logout functions, so we can use them in the child components. We will pass this as a prop in the return below.
    const value = { currentUser, login, logout }

    useEffect(() => {
        const authChange = auth.onAuthStateChanged(user => { 
            setCurrentUser(user)
            setLoading(false)
         })

         return authChange
    }, []);

  return (
    <AuthContext.Provider value={value}>
        {/* Below we are waiting for the AuthContext info to populate before loading the child components in the UI. */}
        { !loading && children }
    </AuthContext.Provider>
  )
}


