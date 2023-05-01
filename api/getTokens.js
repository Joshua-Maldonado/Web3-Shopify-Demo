async function fetchDBData(search) {
  const result = fetch('/getdbdata/'+search).then(function(response) {
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

async function fetchTokens(address) {
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

export default async function getTokens(address) {
    const tokens = await fetchTokens(address)
    const resData = []
    console.log(" TO FETCH "+tokens.jsonData.ownedNfts.length)
    for(let i=0;i<tokens.jsonData.ownedNfts.length;i++){
      console.log("FETCHING "+i)
      let dbResponse = await fetchDBData(tokens.jsonData.ownedNfts[i].tokenId)
      console.log("Found: ",dbResponse)
      resData.push({token: tokens.jsonData.ownedNfts[i], dbres: dbResponse})
      
    }
    console.log("CLIENT RESDATA: ", resData)
    return(resData)
    
  }