import React from 'react'
import { ethers } from 'ethers'

class ProductForm extends React.Component {

    

    constructor(props) {
        super(props)
        this.state = this.initialState()
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        
      }
      
      
    
      componentDidMount() {
        
        
        
        console.log("TOKEN ID CLICKED HERE: "+this.props.tokenid)
        
          
        
        
        
      }
    
      initialState() {
        return {
          token_id: this.props.tokenid,
          selected: '',
          wallet: this.props.wallet,
          dis_status: true,
        }
      }

      

      handleChange = event => {
        
          this.setState({['selected']: event.target.id},
              () => {
                  
                  var old = document.getElementsByClassName("selected");
                  for(var i = 0; i<old.length; i++){
                      old[i].classList.remove("selected");
                  }
                  event.target.classList.add("selected");
              });
            var submitButton = document.getElementsByClassName('submit-buttom');
            submitButton[0].classList.remove("disabled");
            submitButton[0].innerText = "CLAIM YOUR KIT";
            this.setState({['dis_status']: false});
      }


      handleSubmit = async event => {
        event.preventDefault();
        try{
          const provider = new ethers.providers.Web3Provider(window.ethereum);
          const signer = provider.getSigner();
          await signer.getAddress().then(async (res) => {
            console.log("RESPONSE: "+ res + " CONNECTED: "+ this.props.wallet );
            if(res === this.props.wallet){
              try{
              await signer.signMessage("Confirm merch claim on 1 Top Drawer Merch Club Hoodie").then((res) => {
                console.log("SUCCESS: "+res);
                var url = "https://05-tdm-web3-demo.myshopify.com/cart/"+ this.state.selected +":1?note="+this.state.token_id+"&attributes[wallet]="+this.props.wallet+"&attributes[type]=claim";

                    console.log("URL: "+ url);
                    window.location.href = url;

                    }).catch((err) => {
                            console.log('Error:', err);
                            
                  });
                }
                catch(err){
                  console.log(err);
                }
            }
            else{
              this.props.error();

            }
          })
                
                      //var url = "https://wagmi-united-shop.myshopify.com/cart/"+ this.state.selected +":1?note="+this.state.token_id;

                    
                    //console.log("URL: "+ url);
                    //window.location.href = url;
            
                    
            
        
        }
        catch(err){
          console.log(err);
        }



        
    
      }

      render() {
        return(
            <div className="product-form">
              <p className="size-chart-button" onClick={this.props.sizeChart}>Size Chart</p>
                <div className="variant-parent">
                    <div className="label-parent"><p className="variant-label">Select Size</p></div>
                    <div className="buttons-parent">
                        
                    <button id="45004603195666" className="variant-button" onClick={this.handleChange}>S</button>
                    <button id="45004603228434" className="variant-button" onClick={this.handleChange}>M</button>
                    <button id="45004603261202" className="variant-button" onClick={this.handleChange}>L</button>
                    <button id="45004603293970" className="variant-button" onClick={this.handleChange}>XL</button>
                    <button id="45004603326738" className="variant-button" onClick={this.handleChange}>2XL</button>
                        
                    </div>
                </div>
                <button id="walletButton" className="cta button claim submit-buttom disabled" disabled={this.state.dis_status} onClick={this.handleSubmit}>SELECT SIZE</button>
            </div>
        )
      }


}

export default ProductForm