import { useAccount } from 'wagmi'

function useGet(){
    const { address } = useAccount()
    const addr = address
    return (addr)
}

export default function getAddress() {
   
    
     return (useGet())
   }