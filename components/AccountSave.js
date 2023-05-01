
import { useEffect, useState } from 'react';
import ProductPage from './ProductPage'
import  DisplayTokens  from './DisplayTokens'
import { Token } from 'aws-sdk';
import verify from '../api/verify'
import { useAccount } from 'wagmi'
import React from 'react'
import VerifyAccout from './VerifyAccount'


export default function Account() {
  const [ status, setStatus ] = useState("")
  const [ account, setAccount ] = useState("")
  const { address } = useAccount();
  
  
  
  useEffect(() => {
    // wrap your async call here
    const loadData = async () => {
      

      
      home();

      

    };

    loadData();
  }, []);
  
  function ProductPageClaim(tokenid){
    setStatus(
      <div>
        <ProductPage tokenid={tokenid} error={errorFunction}></ProductPage>
      </div>
    );
  }

   function verifyWallet(){
   const thisAddress = address
    console.log(" FUnction account: "+ address)
    VerifyAccout(address, validWallet, denyWallet)
    
    setStatus(
      <div>
                <VerifyAccout address={address} approve={validWallet} deny={ denyWallet }></VerifyAccout>
        </div>
    );
  }

function TokenSelectClaim() {
  
    setStatus(
      <div>
                <DisplayTokens productPage={ProductPageClaim} error={errorFunction} account={ account }></DisplayTokens>
        </div>
    );
}
function validWallet(){
  setStatus(
    <div>
                      <h1>WALLET VERIFIED!</h1>
                      <p>Click the button below to proceed to the store</p>
                      <button>Shop Now</button>
              </div>
  );
}
function denyWallet(){
  setStatus(
    <div>
                      <h1>Denied</h1>
                      <p>Connect a different wallet to try again</p>
                      
              </div>
  );
}
 

  function errorFunction(){
    setStatus(
      <div className="redirect-section">
            <h1 data-w-id="aa3fb2eb-a63f-4694-1b36-4534ed4f5a82" className="heading mobile">Error!</h1>
            <p className="paragraph">There was an error verifying that you own this token</p>      
        </div>
    );
  }
  

  function home() {
    setStatus(
      <div>
              <div>
                <button onClick={verifyWallet}>Token Gate</button>
                <button onClick={TokenSelectClaim}>Merch Claim</button>
                <button>Burn To Redeem</button>
              </div>
              <div>
                <button>Mint token</button>
              </div>
        </div>
    );
  }

  

  return (
    <div>
    { status }
    
    
    </div>
  )
}

