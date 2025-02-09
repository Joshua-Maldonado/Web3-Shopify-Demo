
import ProductForm from './ProductForm'




export default function ProductPage(props) {
    function toggleSizeChart() {
        var target = document.getElementById("size-chart-target");
        //console.log("Target: "+target.classList.contains("hidden"));
        if(target.classList.contains("hidden")){
          target.classList.remove("hidden");
        }
     }

     function closeSizeChart() {
        var target = document.getElementById("size-chart-target");
        //console.log("Target: "+target.classList.contains("hidden"));
        if(target.classList.contains("hidden")){
          
        }
        else{
          target.classList.add("hidden");
        }
      }

      function runError() {
        props.error()
      }
      
      console.log("Token ID Clicked: "+props.tokenid)

  return (
    <div  className="verified-parent">
     <div className="redirect-section">
           <div className='product-header'>
            <h1 className="heading-text product">Claim Product</h1>
            <p className="paragraph product-page">Please select your hoodie size to begin the complete the claim process.</p>
           </div>
           <div className="product-container claim-container">
             <div className="split-parent">
               <div className="split-child">
               <img src="nftimg.png"  />
               </div>
               <div className="split-child">
                 <h1  className="heading mobile product title-product third">Top Drawer Merch Club Hoodie</h1>
                 <h5 className='title-subheading'>1 CLAIMABLE</h5>
                 <p className="sub-heading">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse tincidunt sagittis eros. Quisque quis euismod lorem. Etiam sodales ac felis id interdum.</p>
                 <p className="sub-heading">• Lorem ipsum dolor sit amet<br></br>• Lorem ipsum dolor sit amet<br></br>• Lorem ipsum dolor sit amet<br></br>• Lorem ipsum dolor sit amet</p>
                <ProductForm wallet={props.wallet} tokenid={props.tokenid} sizeChart={toggleSizeChart} error={props.error}></ProductForm> 
               </div>
             </div> 
         </div>
         {/* <img src="size-chart.png" loading="lazy" sizes=""  alt="" className="product-img"></img> */}
         <div id="size-chart-target" className="sizechart-parent hidden" onClick={closeSizeChart}>
         <div className="size-parent-container">
          <div className="modal-size-chart">
              <h1>Size Chart</h1>
              <div className="table">
                <div className="table-row first">
                  <div className="table-cell first">Size</div>
                  <div className="table-cell">Chest</div>
                  <div className="table-cell">Waist</div>
                  <div className="table-cell">Hip</div>
                </div>
                <div className="table-row">
                  <div className="table-cell first">S</div>
                  <div className="table-cell">34.5</div>
                  <div className="table-cell">29.5</div>
                  <div className="table-cell">34</div>
                </div>
                <div className="table-row">
                  <div className="table-cell first">M</div>
                  <div className="table-cell">36.5</div>
                  <div className="table-cell">32</div>
                  <div className="table-cell">36.5</div>
                </div>
                <div className="table-row">
                  <div className="table-cell first">L</div>
                  <div className="table-cell">39.5</div>
                  <div className="table-cell">35</div>
                  <div className="table-cell">39.5</div>
                </div>
                <div className="table-row">
                  <div className="table-cell first">XL</div>
                  <div className="table-cell">43</div>
                  <div className="table-cell">38.5</div>
                  <div className="table-cell">42.5</div>
                </div>
                <div className="table-row">
                  <div className="table-cell first">2XL</div>
                  <div className="table-cell">47</div>
                  <div className="table-cell">42.5</div>
                  <div className="table-cell">46</div>
                </div>
              </div>
            </div>
            <div className="close">x</div>
          </div>

        </div>
        
      </div>
   </div>
  )
}