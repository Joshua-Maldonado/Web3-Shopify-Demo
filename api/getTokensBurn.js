
  async function fetchTokensBurn(address) {
    const result = fetch('/gettokendata/'+address).then(function(response) {
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
  
  export default async function getTokensBurn(address) {
      const tokens = await fetchTokensBurn(address)
      const resData = tokens.jsonData.ownedNfts
      return(resData)
    }