import React from 'react'
import { ethers } from 'ethers'
import { Loader } from "@googlemaps/js-api-loader"
import customData from '../src/abi.json';
import addTransaction from '../api/addTransaction'
import sendNewOrder from '../api/sendNewOrder'
import { fetchSigner } from '@wagmi/core'

class ProductFormBurn extends React.Component {

    

    constructor(props) {
        super(props)
        this.state = this.initialState()
        this.handleFormChange = this.handleFormChange.bind(this)
        this.handlePlaceSelect = this.handlePlaceSelect.bind(this)
        this.autocomplete = null
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.updateSubmit = this.updateSubmit.bind(this)
        this.triggerCounter = this.triggerCounter.bind(this)
        this.burnToken = this.burnToken.bind(this)
        this.sendOrder = this.sendOrder.bind(this)

      }
      
      
    
      componentDidMount() {
        
        
        
        console.log("TOKEN ID CLICKED HERE: "+this.props.tokenid + "state is: "+this.state.token_id)

        const loader = new Loader({
            apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS,
            version: "weekly",
          });
          loader.load().then(async () => {
            const { Map } = await google.maps.importLibrary("places");
          
            const places = new google.maps.places.Autocomplete(document.getElementById("autocomplete"));
            places.addListener("place_changed", this.handlePlaceSelect)
            this.autocomplete = places;
          });
       

        
        
        
        
      }
    
      initialState() {
        return {
            token_id: this.props.tokenid,
            first_name: '',
            last_name: '',
            email:'',
            phone:'',
            street_address: '',
            apartment: '',
            city: '',
            state: '',
            country: '',
            postcode: '',
            button_status:'disabled',
            button_text: 'Select Size',
            googleMapLink: '',
            update_counter: 0,
            selectedTee: '',
            selectedHoodie: '',
            selectedTColor: '',
            selectedHColor: '',
            selected: '',
            shipping: '',
            shippingText: 'Select Rate',
            shippingButton: true,
            hidden: false,
            dis_status: true,
            small: true,
            med: true,
            large: true,
            xlarge: true,
            xxlarge: true,
            wallet: this.props.wallet,
            variant_ids:{
                  small: "44297250767140",
                  med: "44297250799908",
                  large: "44297250832676",
                  xlarge: "44297250865444",
                  xxlarge: "44297250898212"
                }
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
                  this.updateSubmit();
              });
        
      }


    //   handleSubmit = async event => {
    //     event.preventDefault();
    //     try{
    //       const provider = new ethers.providers.Web3Provider(window.ethereum);
    //       const signer = provider.getSigner();
    //       await signer.getAddress().then(async (res) => {
    //         console.log("RESPONSE: "+ res + " CONNECTED: "+ this.props.wallet );
    //         if(res === this.props.wallet){
    //           try{
    //           await signer.signMessage("Confirm merch claim on 1 Top Drawer Merch Club Hoodie").then((res) => {
    //             console.log("SUCCESS: "+res);
    //             //var url = "https://wagmi-united-shop.myshopify.com/cart/"+ this.state.selected +":1?note="+this.state.token_id;
                
                    
    //                 //console.log("URL: "+ url);
    //                 //window.location.href = url;
            
    //                 }).catch((err) => {
    //                         console.log('Error:', err);
                            
    //               });
    //             }
    //             catch(err){
    //               console.log(err);
    //             }
    //         }
    //         else{
    //           this.props.error();

    //         }
    //       })
                
    //                   //var url = "https://wagmi-united-shop.myshopify.com/cart/"+ this.state.selected +":1?note="+this.state.token_id;

                    
    //                 //console.log("URL: "+ url);
    //                 //window.location.href = url;
            
                    
            
        
    //     }
    //     catch(err){
    //       console.log(err);
    //     }

    // }
        updateSubmit = () => {
            let btnStatus = true;
    
           if(this.state.selected == '' ){
                btnStatus = false
                this.setState({['button_text']: 'Select Size'})
                console.log("CHECKING SUBMIT");
                console.log("1");
           }
           else{
                var min = 1;
                var max = 100;
                var rand =  min + (Math.random() * (max-min));
                this.setState({['update_counter']: rand});
                //this.triggerCounter()
                //console.log(JSON.stringify(this.state))
                
                btnStatus = true
            
            
                if(this.state.street_address == '' || this.state.city == '' || this.state.country == '' || this.state.postcode == ''){
                    btnStatus = false;
                    this.setState({['button_text']: 'Complete Form'});
                    console.log("2");
                }
    
                if(this.state.googleMapLink != '' && this.state.country != ''){
                    btnStatus = true;
                    this.setState({['button_text']: 'Submit'});
                    console.log("3");
                }
    
                if(this.state.country == "Ukraine" || this.state.country == "Russia" || this.state.country == "Belarus" || this.state.country == "UA" || this.state.country == "RUS" || this.state.country == "BYS" || this.state.country == "ua" || this.state.country == "rus" || this.state.country == "bys"){
                    btnStatus = false;
                    this.setState({['button_text']: 'Unsupported Address'});
                    console.log("4");
                }
                if(this.state.first_name == '' && this.state.last_name == ''){
                    btnStatus = false;
                    this.setState({['button_text']: 'Complete Form'});
                    console.log("5");
                }
                if(this.state.email.includes('@') == false){
                    btnStatus = false;
                    this.setState({['button_text']: 'Complete Form'});
                    console.log("6");
                }
                if(this.state.phone == ''){
                    btnStatus = false ;
                    this.setState({['button_text']: 'Complete Form'}); 
                    console.log("7");
                }
                
            }
            if( btnStatus == true){
                    
                    this.setState({['button_status']: ''});
                    this.setState({['button_text']: 'COMPLETE BURN'});
                    console.log("BUTTON STATUS: TRUE")
                }
                
                if( btnStatus == false){
                    this.setState({['button_status']: 'disabled'});
                    console.log("BUTTON STATUS: False");
                }
                    
      }
    
      handleFormChange = event => {
        this.setState({[event.target.name]: event.target.value},
            () => {
                var min = 1;
                var max = 100;
                var rand =  min + (Math.random() * (max-min));
                this.setState({['update_counter']: rand})
                    this.triggerCounter()
                this.updateSubmit()
            })
    
      }
      triggerCounter = () =>{
        var min = 1;
       var max = 100;
       var rand =  min + (Math.random() * (max-min));
       this.setState({['update_counter']: rand})
       
      
       //("Updating SUBMIT: ")
       this.updateSubmit()
      }
        
      handlePlaceSelect = () => {
    
        let addressObject = this.autocomplete.getPlace()
        //("Place Data: Length: "+addressObject.address_components.length+ " data : " +JSON.stringify(addressObject))
        let address = addressObject.address_components
        if(address.length >= 8){
        this.setState({
          ['street_address']: `${address[0].long_name} ${address[1].long_name}`})
          
        this.setState({
            ['city']: `${address[3].long_name}`, 
            ['state']: `${address[5].short_name}`,  
            ['country']: `${address[6].short_name}`,
            ['postcode']: `${address[7].short_name}`,
            ['googleMapLink']: `${addressObject.url}`, 
        },
        () => {
            this.updateSubmit()
        })
        var min = 1;
       var max = 100;
       var rand =  min + (Math.random() * (max-min));
       this.setState({['update_counter']: rand})
         this.triggerCounter()
        //this.fireEvent(address[5].short_name)
    
        // let placeObj = {
        //       'street_address': `${address[0].long_name} ${address[1].long_name}`,
        //       'city': address[3].long_name,
        //       'state': address[5].short_name,
        //       'country': address[6].short_name,
        //       'zip_code': address[7].short_name,
        //       'googleMapLink': addressObject.url
        //     }
        // this.refreshForm(placeObj)
       
        //console.log("THIS state: "+JSON.stringify(this.state));
      }
      else if(address.length == 7){
        this.setState({
          ['street_address']: `${address[0].long_name} ${address[1].long_name}`})
          
        this.setState({
            ['city']: `${address[3].long_name}`, 
            ['country']: `${address[5].short_name}`,
            ['postcode']: `${address[6].short_name}`,
            ['googleMapLink']: `${addressObject.url}`, 
        },
        () => {
            this.updateSubmit()
        })
      }
      else {
        this.setState({
          ['googleMapLink']: `${addressObject.url}`
        },
        () => {
            this.updateSubmit()
        })
    
      }
        
      }


    
        handleSubmit = async (event) => {
            event.preventDefault()
            this.setState({['button_status']: 'disabled'});
            //console.log("SUBMIT: "+JSON.stringify(this.state));
            console.log("Hoodie Size: "+ this.state.selectedHoodie  + "Hoodie Color: "+ this.state.selectedHColor + " Tee Size: "+ this.state.selectedTee + "Tee Color: "+ this.state.selectedTColor );

            
            //this.sendOrder();
            //this.chargeShipping();
            
            this.burnToken();
            //this.updateMetadata();
            //this.props.buttonFunction();
        }

        sendOrder = async () => {
            const order = {  
                "variant_id":this.state.selected,
                "product_id":"8276151009554",
                "name":"TDM Hoodie",
                "quantity":1,
                "first_name":this.state.first_name,
                "last_name":this.state.last_name,
                "email":this.state.email,
                "address1":this.state.street_address,
                "address2":this.state.apartment,
                "phone":this.state.phone,
                "state":this.state.state,
                "city":this.state.city,
                "country":this.state.country,
                "zip":this.state.postcode,
                "tokenID":this.props.tokenid,
                "walletAddress":this.props.address,
                "mapsLink":this.state.googleMapLink, 
                "wallet_address": this.props.wallet,
                "token_id":this.state.token_id
            }
            const response = await sendNewOrder(order);
            console.log("SEND FIRST RESPONSE: ",response)
            return(response)
        }

        burnToken = async () => {
            try{
                
                const provider = new ethers.providers.Web3Provider(window.ethereum);
                const signer = await fetchSigner()
                 const contract = new ethers.Contract("0x12374fdBC3caFbf899D99Aacd0BCa79cA0be56f0",customData.abi,signer);
                 console.log("TOKEN ID: "+this.props.tokenid+" CONTRACT DATA: "+JSON.stringify(contract.functions))
                 try{
                  contract.burn(this.state.token_id).then(async (res) => {
                        console.log("RESPONSE: "+ JSON.stringify(res) + " CONNECTED: "+ this.props.wallet );
                        this.props.burning()
                        const receipt = await res.wait();
                        console.log("Burn Receipt: ",receipt)
                        if(receipt.status == 1){
                            addTransaction(receipt.blockHash,this.props.wallet,this.props.tokenid)
                            const sendRes = await this.sendOrder()
                            console.log("SEND RES: ",sendRes)
                            if(sendRes.jsonData.success == true){this.props.success()}
                            else{this.props.error()}
                        }
                        else {
                            this.props.error()
                        }
                        
                      }).catch((err) => {
                                console.log('Error:', err);
                                this.setState({['button_status']: ''});
                                
                    });
                    }
                    catch(err){
                        console.log(err)
                    }
    
            }
            catch(err){
                 console.log(err);
            }
        }
        


      render() {
        return(
        <div>
            
            <div className="product-container burn-container">
                <div className="split-parent">
                <div className="split-child">
                <img src="nftimg.png"  />
                </div>
                <div className="split-child">
                    <h1  className="heading mobile product title-product third">Top Drawer Merch Club Hoodie</h1>
                    <h5 className='title-subheading'>BURN TO REDEEM</h5>
                    <p className="sub-heading">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse tincidunt sagittis eros. Quisque quis euismod lorem. Etiam sodales ac felis id interdum.</p>
                    <p className="sub-heading">• Lorem ipsum dolor sit amet<br></br>• Lorem ipsum dolor sit amet<br></br>• Lorem ipsum dolor sit amet<br></br>• Lorem ipsum dolor sit amet</p>
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
                            
                        </div>
                </div>
                </div> 
            </div>
            <div className="form-parent">
                <h1 className="heading mobile">Complete Burn</h1>
                <p className="paragraph">Fill out the form below to claim your reward. The burn-to-claim will process once you click the "Submit" button at the end of the form.</p>
                <div className="checkout-form">
                    <div className='form-imput-parent'>
                    <div className="input-parent first">
                        <label htmlFor="first_name" className="">First Name *</label>
                        <div className="input-div-parent">
                        <div className="input-div">
                            <input 
                            id='name-input'
                            className='name-input'
                            name={"first_name"}
                            placeholder={"John"}
                            value={this.state.first_name}
                            onChange={this.handleFormChange}
                            />
                        </div>
                        </div>
                    </div>
                    <div className="input-parent">
                        <label htmlFor="last_name" className="">Last Name *</label>
                        <div className="input-div-parent">
                        <div className="input-div">
                            <input 
                            className='name-input'
                            name={"last_name"}
                            placeholder={"Doe"}
                            value={this.state.last_name}
                            onChange={this.handleFormChange}
                            />
                        </div>
                        </div>
                    </div>
                    </div>
                    <div className="input-parent">
                    <label htmlFor="email" className="">Email *</label>
                    <div className="input-div-parent">
                        <div className="input-div">
                        <input 
                            name={"email"}
                            placeholder={"example@domain.com"}
                            value={this.state.email}
                            onChange={this.handleFormChange}
                        />
                        </div>
                    </div>
                    </div>
                    <div className="input-parent">
                    <label htmlFor="phone" className="">Phone *</label>
                    <div className="input-div-parent">
                        <div className="input-div">
                        <input 
                            name={"phone"}
                            placeholder={"+1-999-999-9999"}
                            value={this.state.phone}
                            onChange={this.handleFormChange}
                        />
                        </div>
                    </div>
                    </div>
                    <div className="input-parent">
                    <label htmlFor="street_address" className="">Address *</label>
                    <div className="input-div-parent">
                        <div className="input-div">
                        <input 
                            id="autocomplete"
                            className="input-field"
                            ref="input"
                            type="text"
                            name={"street_address"}
                            value={this.state.street_address}
                            placeholder={"123 Cool Cats Place"}
                            onChange={this.handleFormChange}
                        />
                        </div>
                    </div>
                    </div>
                    <div className='form-imput-parent'>
                    <div className="input-parent first">
                        <label htmlFor="apartment" className="">Apartment, suite, unit (optional)</label>
                        <div className="input-div-parent">
                        <div className="input-div">
                            <input 
                            name={"apartment"}
                            value={this.state.apartment}
                            placeholder={"#1234"}
                            onChange={this.handleFormChange}
                            />
                        </div>
                        </div>
                    </div>
                    <div className="input-parent">
                        <label htmlFor="city" className="">City/Town *</label>
                        <div className="input-div-parent">
                        <div className="input-div">
                            <input 
                            name={"city"}
                            value={this.state.city}
                            placeholder={"Catsville"}
                            onChange={this.handleFormChange}
                            />
                        </div>
                        </div>
                    </div>
                    </div>
                    <div className='form-imput-parent'>
                    <div className="input-parent first">
                        <label htmlFor="state" className="">State/Province/Region *</label>
                        <div className="input-div-parent">
                        <div className="input-div">
                            <input
                            name={"state"}
                            id="form-state"
                            value={this.state.state}
                            placeholder={"State"}
                            onChange={this.handleFormChange}
                            />
                        </div>
                        </div>
                    </div>
                    <div className="input-parent">
                        <label htmlFor="postcode" className="">Postal/Zip Code *</label>
                        <div className="input-div-parent">
                        <div className="input-div">
                            <input 
                            name={"postcode"}
                            value={this.state.postcode}
                            placeholder={"12345"}
                            onChange={this.handleFormChange}
                            />
                        </div>
                        </div>
                    </div>
                    </div>
                    <div className="input-parent">
                        <label htmlFor="country" className="">Country *</label>
                        <div className="input-div-parent">
                        <div className="input-div">
                            <input
                            name={"country"}
                            value={this.state.country}
                            placeholder={"Country"}
                            onChange={this.handleFormChange}
                            />
                        </div>
                        </div>
                    </div>
                    
                    
                    <button id="walletButton" className="cta button burn submit-buttom disabled" disabled={this.state.button_status} onClick={this.handleSubmit}>{this.state.button_text}</button>
                    
                </div>
                
            </div>
         </div>
            
        )
      }


}



export async function getServerSideProps() {
    const loader = new Loader({
        apiKey: process.env.GOOGLE_MAPS,
        version: "weekly",
      });
    const mapInstance = await loader.load().then(async () => {
        
        return (google.maps)
        
        
      });

    return {
      props: {mapInstance}, // will be passed to the page component as props
    }
  }

export default ProductFormBurn