export default async function verify(address) {

    const result = fetch('http://localhost:4000/tokengate/'+address).then(function(response) {
         
         return response.json();
         
       }).then(function(jsonData) {
         
         return {
             jsonData
         }
       })
     return (result)
   }



   