import { ConnectKitButton } from 'connectkit'
import { useAccount } from 'wagmi'
import  Account  from '../components/Account'


function Page() {
  const { account, isConnected } = useAccount()
  

  
 if(isConnected){
  
  console.log("PAGE: "+JSON.stringify(isConnected))
  return (
    <div className='body-section'>
      <div className='page-header'>
        <div className='header-content'>
          <div id="home-button" className='home-button-parent'>
            <div className='png-wrapper'>
              <img src="home-48.png" className='home-btn'/>
            </div>
            
          </div>
          <div className='logo-content'>
            <img src="tdmLogo.png" className='logo-img'/>
          </div>
          <div className='wallet-button'><ConnectKitButton /></div>
        </div>
      </div>
      <div className='main-content'>
        {isConnected && <Account address={ account } connected={ isConnected } ></Account>}
      </div>
      <div className='footer'>
        <p className='footer-text'>Web3 & verification by Top Drawer Merch</p>
      </div>
    </div>
  )
 }
else {
  return (
    <div className='body-section'>
      <div className='page-header'>
        <div className='header-content'>
          <div className='logo-content'>
            <img src="tdmLogo.png" className='logo-img'/>
          </div>
        </div>
      </div>
      <div className='main-content'>
        <div className='index-section'>
          <h2 className='heading-text h2'>Connect Wallet</h2>
          <p className='paragraph welcome'>Only owners of a Top Drawer Merch Club NFT are allowed to access the Top Drawer Shop. Please connect your wallet now to verify NFT owenership.</p>
          <ConnectKitButton />
        </div>
      </div>
      <div className='footer'>
        <p className='footer-text'>Web3 & verification by Top Drawer Merch</p>
      </div>
    </div>
  )
}
}

export default Page
