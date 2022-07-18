import React, { useState } from "react";
import {Principal} from '@dfinity/principal';
import {token} from '../../../declarations/token';

function Balance() {
  const [inputValue,update]=useState("");
  const [balanceResult,setBalnce]=useState("");
  const [cryptoSymbol,setSymbol]=useState("");
  const [hide,setHide]=useState(true);
  async function handleClick() {
   // console.log("Balance Button Clicked");
    const principal=Principal.fromText(inputValue);
    const balance=await token.balanceOf(principal);
    setBalnce(balance.toLocaleString());
    setSymbol(await token.getSymbol());
    setHide(false);
  }


  return (
    <div className="window white">
      <label>Check account token balance:</label>
      <p>
        <input
          id="balance-principal-id"
          type="text"
          placeholder="Enter a Principal ID"
          value={inputValue}
          onChange={(e)=>update(e.target.value)}
        />
      </p>
      <p className="trade-buttons">
        <button
          id="btn-request-balance"
          onClick={handleClick}
        >
          Check Balance
        </button>
      </p>
      <p hidden={hide}> This account has a balance of {balanceResult} {cryptoSymbol}</p>
    </div>
  );
}

export default Balance;
