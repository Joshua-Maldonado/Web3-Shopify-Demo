import { useAccount } from 'wagmi'
import getTokens from '../api/getTokens'
import verify from '../api/verify'



    async function FetchValid(account, approve, deny) {
    
        const { address } = useAccount()
        
        console.log("PROPS_: "+address)
        if(address){
        const res = await verify(address);
    
        if(res){
            if(res.jsonData.success == true){
              approve()
            }
            else {
              deny()
            }
          }
          else {
            deny()
            
          }
        }
        
        
    }






export default function PostVerify(props) {
    
    FetchValid(props.account, props.approve, props.deny)


return (
           <div>
               
           </div>
         )
}