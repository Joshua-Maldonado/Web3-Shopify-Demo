export default async function verify(address) {

    const result = fetch('/tokengate/'+address).then(function(response) {
         
         return response.json();
         
       }).then(function(jsonData) {
         
         return {
             jsonData
         }
       })
     return (result)
   }



   