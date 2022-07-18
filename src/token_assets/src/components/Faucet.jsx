import React, { useState } from "react";
import {token,canisterId,createActor} from '../../../declarations/token';
import { AuthClient } from '../../../node_modules/@dfinity/auth-client/lib/cjs/index';
function Faucet(props) {


  const [isdisable,setDisable]=useState(false);
  const [buttonText,setText]=useState("Free Give away");
  async function handleClick(event) {
    setDisable(true);

    const authClient= await AuthClient.create();
    const identity = await authClient.getIdentity();

    const authenticatedCanister= createActor(canisterId,{
      agentOptions:{
        identity,

      },
    });

    const result=await authenticatedCanister.payOut();
    setText(result);
  }

  return (
    <div className="blue window">
      <h2>
        <span role="img" aria-label="tap emoji">
          🚰
        </span>
        Faucet
      </h2>
      <label>Get your free DAngela tokens here! Claim 10,000 MSV tokens to {props.userPrincipal}.</label>
      <p className="trade-buttons">
        <button id="btn-payout" onClick={handleClick} disabled={isdisable}>
          {buttonText}
        </button>
      </p>
    </div>
  );
}

export default Faucet;
