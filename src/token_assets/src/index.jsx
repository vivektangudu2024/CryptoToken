import ReactDOM from 'react-dom'
import React from 'react'
import App from "./components/App";
import { AuthClient } from '../../../node_modules/@dfinity/auth-client/lib/cjs/index';

const init = async () => { 
  

  const authclient = await AuthClient.create();
  if(await authclient.isAuthenticated()){
    handeleAuthentication(authclient);
  }else
  {await authclient.login({
    identityProvider:"https://identity.ic0.app/#authorize",
    onSuccess:()=>{
      handeleAuthentication(authclient);
    }
  });}
}

async function handeleAuthentication(authclient){
  const identity=authclient.getIdentity();
  const userPrincipalId=identity._principal.toString();
  ReactDOM.render(<App loggedInPrincipal={userPrincipalId}/>, document.getElementById("root"));
}

init();


