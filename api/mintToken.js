import { ethers } from 'ethers'
import customData from '../src/abi.json';
import { fetchSigner } from '@wagmi/core'
//import { useAccount } from 'wagmi'
//import { InjectedConnector } from '@wagmi/core'

// export default async function mintToken(address) {

//     const result = await fetch('http://localhost:3000/mint/'+address).then(function(response) {
//          console.log("RES STATUS: "+response.status )
//          return response.json();
         
//        }).then(function(jsonData) {
//          console.log("RES DATA: "+ JSON.stringify(jsonData) )
//          return {
//              jsonData
//          }
//        })
//      return (result)
//    }

   export default async function mintToken(address) {
    //const { address } = useAccount()
    //const connector = new InjectedConnector()
    console.log("running function: ",address)
      //const provider = new ethers.providers.Web3Provider(address)
      //const signer = provider.getSigner()
      const signer = await fetchSigner()
      const contract = new ethers.Contract("0x12374fdBC3caFbf899D99Aacd0BCa79cA0be56f0",customData.abi,signer)
      const rec = await contract.mintTo(address,"ipfs://QmYRf8R677QDyFWMZCuVYJfa6o366RtFDYcUZvBaF8TJfo/Screen%20Shot%202023-03-24%20at%2010.22.33%20AM.png").then( async function(response)  {
        console.log("MINT RESPONSE: "+JSON.stringify(response));
        const receipt = await response.wait();
        console.log("MING RECEIPT: ",receipt)
        if(receipt.status == 1){
          console.log("FINAL SUCCESS")
          
        }
        else {
          console.log("FINAL error")
        }
        return(receipt)
      }).catch((err) => {
        console.log('Error:', err);
        return({transactionHash: false})
        
      });
      return({transactionHash: rec})
   }