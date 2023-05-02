
import { useEffect, useState } from 'react';
import ProductPage from './ProductPage'
import ProductPageBurn from './ProductPageBurn'
import DisplayTokens  from './DisplayTokens'
import DisplayToBurn  from './DisplayToBurn'
import { Token } from 'aws-sdk';
import verify from '../api/verify'
import { useAccount } from 'wagmi'
import React from 'react'
import VerifyAccout from './VerifyAccount'
import mintToken from '../api/mintToken'
import signMessage from '../api/signMessage'

export default function Account() {
  const [ status, setStatus ] = useState("")
  const [ logged, setLogged ] = useState("")
  const { address } = useAccount();
  const { connector: activeConnector } = useAccount()
  
  
  useEffect(() => {
    const handleConnectorUpdate = ({account, chain}) => {
        if (account) {
          console.log('new account', account)
          setLogged(account)
          home();
        } else if (chain) {
          console.log('new chain', chain)
        }
      }
  
      if (activeConnector) {
        activeConnector.on('change', handleConnectorUpdate)
      }

      const loadData = async () => {
      

      
        home();
        const homeBtn = document.getElementById("home-button")
        if(homeBtn){
          homeBtn.addEventListener("click", home)
        }
        
  
      };
  
      loadData();
  
    return () => activeConnector.off('change', handleConnectorUpdate)
    }, [activeConnector])

  
  function ProductPageClaim(tokenid){
    setStatus(
      <div>
        <ProductPage tokenid={tokenid} error={errorFunction} wallet={address}></ProductPage>
      </div>
    );
  }
  function ProductPagetoBurn(tokenid){
    setStatus(
      <div>
        <ProductPageBurn burning={burning} success={successBurn} tokenid={tokenid} error={errorBurn} wallet={address}></ProductPageBurn>
      </div>
    );
  }

   function verifyWallet(){

   var thisAddress = address
    console.log(" Function account: "+ address)
    
   
    setStatus(
      <div>
        <VerifyAccout address={address} approve={validWallet} deny={denyWallet}></VerifyAccout>
      </div>
    );
    
  }

function TokenSelectClaim() {
  
    setStatus(
      <div>
                <DisplayTokens productPage={ProductPageClaim} error={errorFunction} account={ address }></DisplayTokens>
        </div>
    );
}
function validWallet(){
  setStatus(
    <div className='index-section-subcontent'>
                      <h2 className='heading-text h2'>Successful Verification</h2>
                      <p className='paragraph'>Looks like you own one or more Top Drawer Merch Club NFTs. Click the button below to shop the members-only Top Drawer Shop.</p>
                      <button className='cta button big-btn'>Shop Now</button>
              </div>
  );
}
function denyWallet(){
  setStatus(
    <div className='index-section-subcontent'>
                      <h2 className='heading-text h2'>Denied</h2>
                      <p className='paragraph'>Connect a different wallet to try again</p>
                      
              </div>
  );
}
 
function burning(){
  setStatus(
    <div className="redirect-section">
          <h1 className="heading mobile">Burning Tokens</h1>
          <p className="paragraph">Do not refresh this page!</p>      
      </div>
  );
}

function successBurn () {
  setStatus(
    <div className="redirect-section">
          <h1 className="heading mobile">Your order has been placed!</h1>
          <p className="paragraph">You will receive a order confirmation email shortly.</p>
          <button className='cta button big-btn' onClick={home}>Return Home</button> 
      </div>
  );
}
function errorBurn () {
  setStatus(
    <div className="redirect-section">
          <h1 data-w-id="aa3fb2eb-a63f-4694-1b36-4534ed4f5a82" className="heading mobile">Error!</h1>
          <p className="paragraph">There was an error burning this token please try again</p>
          <button className='cta button big-btn' onClick={home}>Return Home</button> 
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

  async function sign(){
    
  }


  function TokenSelectBurn(){
    setStatus(
      <div>
                <DisplayToBurn productPage={ProductPagetoBurn} error={errorFunction} account={ address }></DisplayToBurn>
        </div>
    );
  }
  
  async function mint(){
    minting()
    const res = await mintToken(address);
    console.log("ACCOUNT RESPONSE: ", res)
    if(res.transactionHash.status == 1){
      home()
    } 
    else if(res.transactionHash.transactionHash == false){
      home()
    }
    else {
      mintingError()
    }
  }

  function minting() {
    setStatus(
      <div className='index-section-home'>
        <div className='mint-section'>
        <h2 className='heading-text h2 intro '>Select a Demo</h2>
          <p className='paragraph demo-select'>Select a demo below to view the user experience for the corresponding Top Drawer Web3 App. You'll need to mint at least one Top Drawer Merch Club NFT before you are able to view and interact with the demos.</p>
          <button className='cta button' disabled onClick={mint}>MINTING...</button>
        </div>
              <div className='demo-selector'>
                <div className='demo-select'>
                  <div className='demo-body'>
                    <h3 className='heading-text h3'>Tokengate Demo</h3>
                    <p className='paragraph demo'>Tokengate your entire Shopify store so it is only accessible to holders of your NFT.</p>
                    <button className='cta button' onClick={verifyWallet}>VIEW DEMO</button>
                  </div>
                </div>
                <div className='demo-select'>
                  <div className='demo-body'>
                    <h3 className='heading-text h3'>Claimer Demo</h3>
                    <p className='paragraph demo'>Allow your holders to claim a physical product or product bundle per NFT that they hold.</p>
                    <button className='cta button' onClick={TokenSelectClaim}>VIEW DEMO</button>
                  </div>
                </div>
                <div className='demo-select'>
                  <div className='demo-body'>
                    <h3 className='heading-text h3'>Burn to Redeem Demo</h3>
                    <p className='paragraph demo'>Give your holders the option to burn an NFT to redeem a physical product or product bundle.</p>
                    <button className='cta button' onClick={TokenSelectBurn}>VIEW DEMO</button>
                  </div>
                </div>
                
                
               
              </div>
              <div>
                
              </div>
        </div>

    );
  }
  function mintingError() {
    setStatus(
      <div className='index-section-home'>
      <div className='mint-section'>
      <h2 className='heading-text h2 intro '>Select a Demo</h2>
        <p className='paragraph demo-select'>Select a demo below to view the user experience for the corresponding Top Drawer Web3 App. You'll need to mint at least one Top Drawer Merch Club NFT before you are able to view and interact with the demos.</p>
        <h3>There was an error minting, try again</h3>
        <button className='cta button' onClick={mint}>MINT NFT</button>
      </div>
            <div className='demo-selector'>
              <div className='demo-select'>
                <div className='demo-body'>
                  <h3 className='heading-text h3'>Tokengate Demo</h3>
                  <p className='paragraph demo'>Tokengate your entire Shopify store so it is only accessible to holders of your NFT.</p>
                  <button className='cta button' onClick={verifyWallet}>VIEW DEMO</button>
                </div>
              </div>
              <div className='demo-select'>
                <div className='demo-body'>
                  <h3 className='heading-text h3'>Claimer Demo</h3>
                  <p className='paragraph demo'>Allow your holders to claim a physical product or product bundle per NFT that they hold.</p>
                  <button className='cta button' onClick={TokenSelectClaim}>VIEW DEMO</button>
                </div>
              </div>
              <div className='demo-select'>
                <div className='demo-body'>
                  <h3 className='heading-text h3'>Burn to Redeem Demo</h3>
                  <p className='paragraph demo'>Give your holders the option to burn an NFT to redeem a physical product or product bundle.</p>
                  <button className='cta button' onClick={TokenSelectBurn}>VIEW DEMO</button>
                </div>
              </div>
              
              
             
            </div>
            <div>
              
            </div>
      </div>


    );
  }

  function home() {
    setStatus(
      <div className='index-section-home'>
        <div className='mint-section'>
          <h2 className='heading-text h2 intro '>Select a Demo</h2>
          <p className='paragraph demo-select'>Select a demo below to view the user experience for the corresponding Top Drawer Web3 App. You'll need to mint at least one Top Drawer Merch Club NFT before you are able to view and interact with the demos.</p>
          <button className='cta button' onClick={mint}>MINT NFT</button>
        </div>
              <div className='demo-selector'>
                <div className='demo-select'>
                  <div className='demo-body'>
                    <h3 className='heading-text h3'>Tokengate Demo</h3>
                    <p className='paragraph demo'>Tokengate your entire Shopify store so it is only accessible to holders of your NFT.</p>
                    <button className='cta button demo-select' onClick={verifyWallet}>VIEW DEMO</button>
                  </div>
                </div>
                <div className='demo-select'>
                  <div className='demo-body'>
                    <h3 className='heading-text h3'>Claimer Demo</h3>
                    <p className='paragraph demo'>Allow your holders to claim a physical product or product bundle per NFT that they hold.</p>
                    <button className='cta button demo-select' onClick={TokenSelectClaim}>VIEW DEMO</button>
                  </div>
                </div>
                <div className='demo-select'>
                  <div className='demo-body'>
                    <h3 className='heading-text h3'>Burn to Redeem Demo</h3>
                    <p className='paragraph demo'>Give your holders the option to burn an NFT to redeem a physical product or product bundle.</p>
                    <button className='cta button demo-select' onClick={TokenSelectBurn}>VIEW DEMO</button>
                  </div>
                </div>
                
                
               
              </div>
              <div>
                
              </div>
        </div>
    );
  }

  

  return (
    <div className='page-section'>
    { status }
    </div>
  )
}

