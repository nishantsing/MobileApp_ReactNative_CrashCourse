import React, { useReducer } from 'react';
// A reducer is a function that describes how your state should change in response to an action.

// A helper function to create multiple context
// authReducer { signin, signout }  { isSignedIn: false }
export default (reducer, actions, defaultValue) => {
    const Context = React.createContext();


    const Provider = ({ children }) => {
        const [state, dispatch] = useReducer(reducer, defaultValue);

        const boundActions = {}

        for (let key in actions) {
            boundActions[key] = actions[key](dispatch)

        }
        /*  boundActions = {
             signin: ()=>{
                  dispatch({ type: 'signin' });
             },
             signup:()=>{
                  dispatch({ type: 'signin' });
             },
         } */

        return (
            <Context.Provider value={{ state, ...boundActions }}>
                {children}
            </Context.Provider>
        )
    }

    return { Context, Provider }

}


// Simple AuthContext without using reducer 
/*   import React, { createContext, useState } from 'react';

// 1️⃣ Create Context
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // 2️⃣ Define state directly (no reducer)
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [user, setUser] = useState(null);

  // 3️⃣ Define actions
  const signIn = async (userData) => {
    // pretend to call API here
    setUser(userData);
    setIsSignedIn(true);
  };

  const signOut = () => {
    setUser(null);
    setIsSignedIn(false);
  };

  // 4️⃣ Pass down both state + actions
  return (
    <AuthContext.Provider value={{ isSignedIn, user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}; */
