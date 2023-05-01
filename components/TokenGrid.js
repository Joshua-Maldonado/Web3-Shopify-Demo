
import { useAccount } from 'wagmi'
import getTokens from '../api/getTokens'



async function GetTokenData(productPage) {
  const { address } = useAccount()

  const waitingParent = document.createElement("div");
  waitingParent.classList.add('waiting-parent');
  const waitingText = document.createElement("h2");
  waitingText.innerText = "Reading wallet..."
  waitingParent.appendChild(waitingText);
    
    const data = await getTokens(address)
    console.log("DATA CAME HERE: "+ JSON.stringify(data))
    if(data){
      if(data.length >= 1){
        const list = document.createElement("div");
        list.classList.add('nfts-parent');   
    for (const nft of data) {

            let tokenName = nft.token;
            console.log("This NFT: ++ " + JSON.stringify(nft));

            let childSuper = document.createElement("div");
            childSuper.classList.add('nft-superchild');
            let child = document.createElement("div");
            child.classList.add('nft-child');
            let imageParent = document.createElement("div");
            imageParent.classList.add('imageParent');
            let image = document.createElement("img");
            let customName = tokenName.tokenId;
            let type = "";
            
             
              image.src = "nftimg.png";
            
            

            image.classList.add('nft-image');
            if(nft.dbres.jsonData.length != 0){
              image.classList.add('disabled');
            }
            imageParent.appendChild(image);
            let title = document.createElement("h3");
            title.classList.add('nft-title');
            
            title.innerText = "Top Drawer Merch Club #"+customName;
            
            let buttonParent = document.createElement("div");
            buttonParent.classList.add('buttonParent');
            let button = document.createElement("button");
            button.classList.add('cta');
            button.classList.add('button');
            button.classList.add('nft-button');
             
            console.log("DBRES DATA: ",nft.dbres.jsonData.length)
            if(nft.dbres.jsonData.length == 0){
              button.innerText = "CLAIM PRODUCT"
              button.addEventListener("click", function () {
                console.log("clicked this button")
                productPage(nft.token.tokenId)
              });
            }
            else {
              button.innerText = "CLAIMED"
              button.disabled = true;
            }
            

           
            buttonParent.appendChild(button);
            child.appendChild(imageParent);
            child.appendChild(title);
            
            child.appendChild(buttonParent);
            childSuper.appendChild(child)
            list.appendChild(childSuper);

        


      }

          const sectionHeadingParent = document.createElement("div");
          sectionHeadingParent.classList.add('section-heading-parent');
          const headingText = document.createElement("h2");
          headingText.classList.add('heading-text');
          headingText.classList.add('h2');
          headingText.classList.add('section-heading-text');
          headingText.innerText = "Select Claimable Token"
          const headingParagraph = document.createElement("p");
          headingParagraph.classList.add('paragraph');
          headingParagraph.classList.add('section-paragraph');
          headingParagraph.innerText = "Select a Top Drawer Merch Club token below to begin the claim process. Please note that only one token can be claimed at a time."
          sectionHeadingParent.appendChild(headingText);
          sectionHeadingParent.appendChild(headingParagraph);

          
            let parent = document.getElementById("nfts-container");
            if(parent){
              parent.innerHTML = "";
              parent.appendChild(sectionHeadingParent);
              parent.appendChild(list);
            }
           
    }
    else{
      const list = document.createElement("div");
        list.classList.add('nfts-parent');   
        list.classList.add('no-tokens'); 
      let noTokens = document.createElement("h1");
      noTokens.classList.add('no-token-text');
            
      noTokens.innerText = "NO TOKENS FOUND";
            let noTp = document.createElement("p");
            noTp.classList.add('no-token-p');
            
            noTp.innerText = "Try connecting a different wallet";

        list.appendChild(noTokens)
        list.appendChild(noTp)

        let parent = document.getElementById("nfts-container");
        if(parent){
          parent.innerHTML = "";
          parent.appendChild(list);
        }
          
    }
    }
}

export default function TokenGrid(props) {
    
     GetTokenData(props.productPage)


return (
            <div>
               
            </div>
          )
}