
    let category ;
    let brandChecked = [];
    let brandNames = [];

    function ShowMenu(){
    let mobile_navbar = document.getElementById("mobile_navbar");
    mobile_navbar.style.display = "block";
}
window.onscroll = function(){
	
	if(document.documentElement.scrollTop > 50){
		document.getElementById("header_container").style.boxShadow="1px 1px 10px lightgray";
	}
	else{
		document.getElementById("header_container").style.boxShadow="";
	}
}

function CloseMenu(){
    let mobile_navbar = document.getElementById("mobile_navbar");
    mobile_navbar.style.display = "none";
}

    function executeAJAX(){
                const latestPhones = new XMLHttpRequest();
let title = document.title;
                if(title == "Latest Products - DB Store"){
                    latestPhones.open("GET","../JSON/latestPhones.json?ran="+Math.random(),true)
                    category = "latest";
                }
                else{
                   category = "regular";
                    latestPhones.open("GET","../JSON/phones.json?ran="+Math.random(),true)
                }
              
                latestPhones.onreadystatechange = function(){

                    if(this.readyState == 4 && this.status == 200){
                         document.getElementById("loading").style.display = "none";
                        let phonesData = JSON.parse(this.responseText);

                        let items = document.getElementById('items');

                        phonesData.forEach(function(value,index){
                                
                                let productId = phonesData[index]['id'];
                                // alert(productId);
                                let productName = phonesData[index]['productName'];
                                let price = phonesData[index]['prices'][0];
                                let productImage = phonesData[index]['defaultProductImage'];
                                let storage = phonesData[index]['memory'][0];
                                let newfeature = phonesData[index]['bestFeature'];
                                let ram = phonesData[index]['ram'][0];
                                let brandName = phonesData[index]['brandName'];

                                if( brandNames.includes(brandName) == false){
                                    brandNames.push(brandName);
                                }
                               

                                let offer = phonesData[index]['offer'];

                                if(brandChecked.length == 0){
                                    
                                    let brandCheckBox = document.getElementById("brandCheckBox");
                                    brandCheckBox.innerHTML = "";

                                    brandNames.forEach(function(value,index){
                                        brandCheckBox.innerHTML += `
                                         <label>
                                                <input type="checkBox" class="brandCheck" name='${value}' onchange="showBrandProducts(this)"> ${value}
                                        </label>
                                        `;
                                    });
                                    
                                    showProducts(offer,productId,productImage,productName,storage,ram,newfeature,price,items);
                                }
                            
                                else{
                                    
                                    brandChecked.forEach(function(value,index){
                                        if(value == brandName){
                                             showProducts(offer,productId,productImage,productName,storage,ram,newfeature,price,items);
                                        }
                                    });

                                }
                                
                        }); 
                    }
                    else{
                        if(this.readyState == 3){
                           document.getElementById("loading").style.display = "block";
                        }
                    }

                   
            }

            latestPhones.send();
    }

    executeAJAX();
    

    function showProducts(offer,productId,productImage,productName,storage,ram,newfeature,price,items){
        
         if(offer == 0){
                    items.innerHTML += `
                            <a href="productPage.html?id=${productId}&category=${category}" target="_blank">
                                <div class="item">
                                     <div class="item_image">
                                         <img src="../${productImage}">
                                     </div> 
                                     <div class="item_content">
                                        <div>
                                           <h5 class="title">${productName}</h5>
                                             <p>(${storage} GB | ${ram} GB)</p>
                                             <p>${newfeature}</p>
                                             <h4 class="price">₹${price}</h4>
                                             <div class="likeAndCartButton">
                                                <button class="likeBtn"><ion-icon name="heart-outline"></ion-icon> </button>
                                                <button class="cartBtn"><ion-icon name="cart"></ion-icon></button>
                                             </div>
                                         </div>
                                         </div>
                                    </div>
                                </div>
                              </a>
                    `;
                }
                else{

                    let afterOfferPrice = Math.ceil(price - (price * offer / 100));
                    let offerPrice = price * offer/100;

                    items.innerHTML += `
                            <a href="productPage.html?id=${productId}&category=${category}" target="_blank">
                                <div class="item">
                                     <div class="item_image">
                                         <img src="../${productImage}">
                                     </div> 
                                     <div class="item_content">
                                        <div>
                                           <h5 class="title">${productName}</h5>
                                             <p>(${storage} GB | ${ram} GB)</p>
                                             <p>${newfeature}</p>
                                             <p class="oldPrice"><del>₹${price}</del></p><h4 class="price">₹${afterOfferPrice}</h4>
                                             <div class="likeAndCartButton">
                                                <button class="likeBtn"><ion-icon name="heart-outline"></ion-icon> </button>
                                                <button class="cartBtn"><ion-icon name="cart"></ion-icon></button>
                                             </div>
                                         </div>
                                    </div>
                                </div>
                            </a>
                    `;
                }
    }

    function showBrandProducts(ele){
        var items = document.getElementById('items');
        if(ele.checked){
           brandChecked.push(ele.getAttribute("name"));
            items.innerHTML = "";
           executeAJAX();
        }
        else{
            for (var i = brandChecked.length - 1; i >= 0; i--) {
                 if (brandChecked[i] === ele.getAttribute("name")) {
                    brandChecked.splice(i, 1);
                 }
            }
            items.innerHTML = "";
            executeAJAX();
        }
    }
