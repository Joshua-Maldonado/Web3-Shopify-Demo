

const express = require('express')
const next = require('next')
const DynamoDB = require('aws-sdk/clients/dynamodb')
const alch = require('alchemy-sdk')
const { parse } = require('url')
const { ethers } = require("ethers");
const contractA = require(".//src/abi.json")
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();


const port = parseInt(process.env.PORT, 10) || 4000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()



const config = {
    apiKey: process.env.ALCHEMY_ID,
    network: alch.Network.ETH_GOERLI,
  };

const web3 = new alch.Alchemy(config);

const dbb = new DynamoDB({accessKeyId: process.env.AWS_ACCESS_KEY_ID, secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY, region: 'us-west-2'});

// Provider
const alchemyProvider = new ethers.providers.AlchemyProvider("goerli", process.env.ALCHEMY_ID);

// Signer
const signer = new ethers.Wallet(process.env.PRIVATE_KEY, alchemyProvider);

// Contract
const installedContract = new ethers.Contract(process.env.CONTRACT_ADDRESS, contractA.abi, signer);




app.prepare().then(() => {
  const server = express()

  var jsonParser = bodyParser.json()


  var allowedOrigins = ['https://tdm-web3-demo.herokuapp.com','http://localhost:4000'];
  server.use(cors({
    origin: function(origin, callback){
      // allow requests with no origin 
      // (like mobile apps or curl requests)
      if(!origin) return callback(null, true);
      if(allowedOrigins.indexOf(origin) === -1){
        var msg = 'The CORS policy for this site does not ' +
                  'allow access from the specified Origin.';
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    }
  }));
  
  var corsOptions = {
    origin: 'http://localhost:4000',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  }

  server.get('/gettokens/:address', function (req, res) {

    var origin = req.get('sec-fetch-site');
    if(origin == "same-origin"){
    

    var params = {
      TableName: 'Undergound-Transactions',
      FilterExpression: "walletAddress = :walletAddress",
    // Define the expression attribute value, which are substitutes for the values you want to compare.
    ExpressionAttributeNames: {
      "#WA": "walletAddress"
      },
    ExpressionAttributeValues: {
      ":walletAddress": {S: "0x2231b0188dad7349695dc84b8fe5d1bee5e79cfe"}
    },
    // Set the projection expression, which are the attributes that you want.
    ProjectionExpression: "#WA"
      
    };

      

      dbb.scan(params, function(err, data) {
        if (err) {
           res.send("ERROR: " + err)
          console.log("Error", err);
          
        } else {
          //console.log("Success Res: ", data.Items)
          web3.nft.getNftsForOwner(req.params.address,{
            contractAddresses: ["0x8e7f940de2b92f85c310d8468af20d8d131c44a5"]
          }).then(
            function(response){
              const data = [];
              console.log("DT RESPONSE: " + JSON.stringify(response))
              for(var i = 0; i<response.ownedNfts.length; i++){
                var params = {
                  TableName: 'Undergound-Transactions',
                    FilterExpression: "walletAddress = :walletAddress",
                  // Define the expression attribute value, which are substitutes for the values you want to compare.
                  ExpressionAttributeNames: {
                    "#WA": "walletAddress"
                    },
                  ExpressionAttributeValues: {
                    ":walletAddress": {S: "0x2231b0188dad7349695dc84b8fe5d1bee5e79cfe"}
                  },
                  // Set the projection expression, which are the attributes that you want.
                  ProjectionExpression: "#WA"
                    
                  };
                }


              res.status(200).send(JSON.stringify({ data: data, tokens: response}))
            }
          )
            
           
          
        }
      })

    }
    else {
      res.status(400).send(JSON.stringify("NA_ERR"))
    }
    
  })

  server.get('/getdbdata/:search', async function (req, res) {
    var origin = req.get('sec-fetch-site');
    if(origin == "same-origin"){
    var params = {
      TableName: 'Demo-Claim',
        FilterExpression: "tokenID = :tokenID",
      // Define the expression attribute value, which are substitutes for the values you want to compare.
      ExpressionAttributeNames: {
        "#TI": "tokenID"
        },
      ExpressionAttributeValues: {
        ":tokenID": {S: req.params.search}
      },
      // Set the projection expression, which are the attributes that you want.
      ProjectionExpression: "#TI"
        
      };

      dbb.scan(params, function(err, data) {
        if (err) {
          
         console.log("Error", err);
         return(null)
       } else {
        console.log("INTERNAL RES DB: ", data.Items)
        const dataRes = data.Items
        res.status(200).send(JSON.stringify(dataRes))
       }
      })
    }
    else {
      res.status(400).send(JSON.stringify("NA_ERR"))
    }
  })

  server.get('/gettokendata/:address', cors(corsOptions), async function (req, res) {

    //console.log(req)
    var origin = req.get('sec-fetch-site');
    console.log(origin)
    if(origin == "same-origin"){

   


    const tokens = await web3.nft.getNftsForOwner(req.params.address,{
      contractAddresses: ["0x12374fdBC3caFbf899D99Aacd0BCa79cA0be56f0"]
    })

    if(tokens.ownedNfts){
        
        
        console.log("DT RESPONSE: " + JSON.stringify(tokens))
        
          res.status(200).send(JSON.stringify(tokens))
      
    }
  }
  else {
    res.status(400).send(JSON.stringify("NA_ERR"))
  }

  })


  server.get('/sign/:address',  async function (req, res) {
    var origin = req.get('sec-fetch-site');
    if(origin == "same-origin"){
    const sign = await signer.signMessage("SIGN THIS MESSAGE");
    console.log("SIGNED THIS: ", sign)
    }
    else{
      res.status(400).send(JSON.stringify("NA_ERR"))
    }
  })



  server.get('/claimtoken/:tokenID', function (req, res) {
    var origin = req.get('sec-fetch-site');
    if(origin == "same-origin"){
    

    var params = {
        TableName: 'Undergound-Transactions',
        FilterExpression: "walletAddress = :walletAddress",
      // Define the expression attribute value, which are substitutes for the values you want to compare.
      ExpressionAttributeNames: {
        "#WA": "walletAddress"
        },
      ExpressionAttributeValues: {
        ":walletAddress": {S: "0x2231b0188dad7349695dc84b8fe5d1bee5e79cfe"}
      },
      // Set the projection expression, which are the attributes that you want.
      ProjectionExpression: "#WA"
        
      };

      

      dbb.scan(params, function(err, data) {
        if (err) {
           res.send("ERROR: " + err)
          console.log("Error", err);
          
        } else {
          //console.log("Success Res: ", data.Items)
          web3.nft.getNftsForOwner(req.params.address,{
            contractAddresses: ["0x8e7f940de2b92f85c310d8468af20d8d131c44a5"]
          }).then(
            function(response){
              //console.log("DT RESPONSE: " + JSON.stringify(response))
              res.status(200).send(JSON.stringify({ data: data, tokens: response}))
            }
          )
            
           
          
        }
      })

    }
    else{
      res.status(400).send(JSON.stringify("NA_ERR"))
    }
  })


 
  server.get('/tokengate/:address',  function(req, res) {
    console.log("PINGED Gate: "+req.params.address)
    web3.nft.getNftsForOwner(req.params.address,{
      contractAddresses: ["0x8e7f940de2b92f85c310d8468af20d8d131c44a5"]
    }).then(function(response){
      console.log("DT RESPONSE: " + JSON.stringify(response))
      if(response.ownedNfts){
        if(response.ownedNfts.length > 0){
          res.status(200).send(JSON.stringify({success: true, tokens: response}))
        }
        else{
          res.status(200).send(JSON.stringify({success: false, tokens: response}))
        }

        
      }
      else{
        res.status(200).send(JSON.stringify({success: false, tokens: response}))
      }

    }
  )
    
   
  
})

server.post('/neworder', jsonParser, async function(req, res) {
  var origin = req.get('sec-fetch-site');
    if(origin == "same-origin"){

  await fetch('https://hooks.zapier.com/hooks/catch/5494090/3uxwcm0/', {
        method: 'POST',
        body: JSON.stringify({ data: req.body, code: 248885767729}),
       
      })
         .then((response) => response.json())
         .then((data) => {
            console.log(data);
            // Handle data
            //this.props.buttonFunction();
            res.status(200).send(JSON.stringify({success: true, data: data}))
         })
         .catch((err) => {
            console.log(err.message);
            //this.props.errorFunction();
            res.status(400).send(JSON.stringify({success: false, data: data}))
         });
        }
        else{
          res.status(200).send(JSON.stringify({success: false, tokens: response}))
        }
})

server.get('/add/:hash/:address/:token_id', function(req, res) {
  var origin = req.get('sec-fetch-site');
  if(origin == "same-origin"){
    if(origin == 'http://localhost:4000/'){
      console.log("PINGED add: "+req.params.hash+" "+req.params.address+" "+req.params.token_id)
      console.log(req)
      var params = {
        TableName: 'Demo-Transactions',
        Item: {
          'transaction': {S: req.params.hash},
          'tokenId': {S: req.params.token_id},
          'walletAddress': {S: req.params.address},
          'type': {S: "BURN"}
        }
        
      };

        dbb.putItem(params, function(err, data) {
          if (err) {
            console.log("Error", err);
            res.status(200).send(JSON.stringify({success: false, data: data}))
          } else {
            console.log("Success");
            res.status(200).send(JSON.stringify({success: true, data: data}))
          }
        });
    }
    else{
      res.status(400).send(JSON.stringify({success: false}))
    }
  }
  else {
    res.status(400).send(JSON.stringify({success: false}))
  }
})
    

server.get('/mint/:address', function(req, res) {
  var origin = req.get('sec-fetch-site');
  if(origin == "same-origin"){
  console.log("PINGED MINT: "+req.params.address)
  installedContract.mintTo(req.params.address,"ipfs://QmYRf8R677QDyFWMZCuVYJfa6o366RtFDYcUZvBaF8TJfo/Screen%20Shot%202023-03-24%20at%2010.22.33%20AM.png").then( async function(response)  {
    console.log("MINT RESPONSE: "+JSON.stringify(response));
    const receipt = await response.wait();
    console.log("MING RECEIPT: ",receipt)
    if(receipt.status == 1){
      res.status(200).send(JSON.stringify({transactionHash: receipt}))
    }
    else {
      res.status(400).send(JSON.stringify({transactionHash: receipt}))
    }
  })
  
  }
  else{
    res.status(400).send(JSON.stringify("NA_ERR"))
  }
})
    
     
    
 

  server.get('/', cors(), (req, res) => {
    console.log("PINGED");
    
    
    return handle(req, res)
  })

  server.all('*', cors(), (req, res) => {
    console.log("PINGED *");
    
    return handle(req, res)
  })

  server.listen(port, (err) => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${port}`)
  })

})