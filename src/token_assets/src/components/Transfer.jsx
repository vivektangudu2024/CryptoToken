import React, { useState } from "react";
import {Principal} from '@dfinity/principal';
import {token,canisterId,createActor} from '../../../declarations/token';
import { flattenDiagnosticMessageText } from "../../../../node_modules/typescript/lib/typescript";

function Transfer() {
  const [recipient,setrecipient]=useState("");
  const [transferAmount,setAmount]=useState("");
  const [isdisable,setDisable]=useState(false);
  const [isHidden,setHidden]=useState(true);
  const [feedBack,setFeed]=useState("");
  async function handleClick() {
    const authClient= await AuthClient.create();
    const identity = await authClient.getIdentity();

    const authenticatedCanister= createActor(canisterId,{
      agentOptions:{
        identity,

      },
    });
    setDisable(true);
    setHidden(true);
    const recipientId=Principal.fromText(recipient);
    const amountToTransfer=Number(transferAmount);
    let result = await authenticatedCanister.transfer(recipientId,amountToTransfer);
    setDisable(false);
    setFeed(result);
    setHidden(false);
  }

  return (
    <div className="window white">
      <div className="transfer">
        <fieldset>
          <legend>To Account:</legend>
          <ul>
            <li>
              <input
                type="text"
                id="transfer-to-id"
                value={recipient}
                onChange={(e)=>setrecipient(e.target.value)}
              />
            </li>
          </ul>
        </fieldset>
        <fieldset>
          <legend>Amount:</legend>
          <ul>
            <li>
              <input
                type="number"
                id="amount"
                value={transferAmount}
                onChange={(e)=>setAmount(e.target.value)}
              />
            </li>
          </ul>
        </fieldset>
        <p className="trade-buttons">
          <button id="btn-transfer" onClick={handleClick} hidden={isdisable}>
            Transfer
          </button>
        </p>
        <p hidden={isHidden}>{feedBack}</p>
      </div>
    </div>
  );
}

export default Transfer;
