export default async function addTransaction(hash, address, tokenId) {
    const result = fetch('http://localhost:4000/add/'+hash+'/'+address+'/'+tokenId).then(function(response) {
        console.log("RES STATUS: "+response.status )
        return response.json();
        
      }).then(function(jsonData) {
        console.log("RES DATA: "+ JSON.stringify(jsonData) )
        return {
            jsonData
        }
      })
      return (result)
  }