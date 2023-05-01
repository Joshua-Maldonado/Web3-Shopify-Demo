export default async function signMessage(address) {
    const result = fetch('/sign/'+address).then(function(response) {
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