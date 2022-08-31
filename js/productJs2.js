
        let memoryText = "";
        let ramText = "";
        let afterOfferPrice,offerPrice;
        let offer;
        let colorImages;

        let finalColor,finalRam,finalStorage,finalPrice;
        
        let urlString = window.location.href;
        let id = urlString.substring(urlString.indexOf("id=")+3,urlString.indexOf("&category="));
        let category = urlString.substring(urlString.indexOf("category=")+9,urlString.length);
        
        let memory_Text = document.getElementById("memoryText");

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

        function changeLargeImage(src,index){
            let largeImage = document.getElementById('largeImage');
            largeImage.src = src;

            let imgBox = document.querySelectorAll(".imgBox");

            imgBox.forEach(function(value,index){
                value.classList.remove('active');
            });

            imgBox[index].classList.add('active');

        }
        function changeImage(src,index,key){
            let largeImage = document.getElementById('largeImage');
            largeImage.src = src;

            let clrimg = document.querySelectorAll(".clrimg");
            clrimg.forEach(function(value,index){
                    value.classList.remove("active");
            });

            clrimg[index].classList.add("active");

            let allImages = document.getElementById("allImages");

            allImages.innerHTML = "";

                colorImages[key].forEach(function(value,index){
                    allImages.innerHTML += `
                        <div class="imgBox" onmouseenter="changeLargeImage('../${value}',${index})">
                                    <img src="../${value}" >
                         </div>
                    `;
                });
            finalColor = index;   
        }

        function addCart(id){
            alert(id);
        }

        function buy(id){
            // alert(finalColor);
            window.location.href=`BuyNow.html?id=${id}&category=${category}&colorName=${finalColor}&storage=${finalStorage}&ram=${finalRam}&price=${finalPrice}`;
        }

        function memoryChange(m,element,index,price){
            
            let memoryStorage = document.querySelectorAll(".storage");
            let ramStorage = document.querySelectorAll(".ramStorage");

            memoryStorage.forEach(function(value,index){
                
                value.classList.remove("active");
            });

            ramStorage.forEach(function(value,index){
                value.classList.remove("active");
            })

            element.classList.add("active");
            ramStorage[index].classList.add("active");

            let memory_Text = document.getElementById("memoryText");
            memoryText = `${m}GB`;
            ramText = `${ramStorage[index].innerHTML}`;
            memory_Text.innerHTML = `( ${memoryText} | ${ramText} )`;
                

            let price_ = document.getElementById('price');
            let orignalPrice_ = document.getElementById('orignalPrice');
            
            afterOfferPrice = Math.ceil(price - (price * offer / 100));
            offerPrice = price * offer/100;

            price_.innerHTML = `₹${afterOfferPrice}`;
            orignalPrice_.innerHTML = `₹${price}`;

            finalStorage = m;
            finalPrice =afterOfferPrice;

            
        }

        function ramChange(r,element,index,price){
            let memoryStorage = document.querySelectorAll(".storage");
            let ramStorage = document.querySelectorAll(".ramStorage");

            memoryStorage.forEach(function(value,index){
            
                value.classList.remove("active");
            });

            ramStorage.forEach(function(value,index){
                value.classList.remove("active");
            })

            element.classList.add("active");
            memoryStorage[index].classList.add("active");

            let memory_Text = document.getElementById("memoryText");
            ramText = `${r}GB`;
            memoryText = `${memoryStorage[index].innerHTML}`;
            memory_Text.innerHTML = `( ${memoryText} | ${ramText} )`;

            let price_ = document.getElementById('price');
            let orignalPrice_ = document.getElementById('orignalPrice');
            
            afterOfferPrice = Math.ceil(price - (price * offer / 100));
            offerPrice = price * offer/100;

            price_.innerHTML = `₹${afterOfferPrice}`;
            orignalPrice_.innerHTML = `₹${price}`;

            finalRam = r;
            finalPrice = afterOfferPrice;
        }


       

        
        const xhr = new XMLHttpRequest();
        
        if(category == "regular"){
            xhr.open("GET","../JSON/phones.json",true);
        }
        else{
            xhr.open("GET","../JSON/latestPhones.json",true);
        }
        

        xhr.onreadystatechange = function(){

            if(this.readyState == 4 && this.status == 200){
                    
                    document.getElementById("loading").style.display = "none";

                    let latestPhonesDataArray = JSON.parse(this.responseText);

                    let latestPhonesData = latestPhonesDataArray[id];

                    let information = document.getElementById('information');
                    let colorImages_ = document.getElementById('colorImages');
                    let memorys = document.getElementById('memorys');
                    let rams = document.getElementById('rams');
                    let mainImage = document.getElementById('mainImage');

                    
                    let productName = latestPhonesData['productName'];
                    
                
                    // let price = latestPhonesData['prices'][0];
                    offer = latestPhonesData['offer'];
                    
                    let memory = latestPhonesData['memory'];
                    
                    let ram = latestPhonesData['ram'];
                    let defaultProductImage = latestPhonesData['defaultProductImage'];
                    // let multicolor = latestPhonesData['multiColor'];
                    
                    colorImages = latestPhonesData['colorImages'];
                    
                    let weight = latestPhonesData['weight'];
                    
                    let price = latestPhonesData['prices'];
                    
                    let screenSize = latestPhonesData['screenSize'];
                    
                    let refreshRate = latestPhonesData['refreshRate'];
                    
                    let os = latestPhonesData['OS'];
                    
                    let battery = latestPhonesData['Battery'];
                    
                    let camera = latestPhonesData['camera'];

                    let expandableStorage  = latestPhonesData['expandableStorage'];

                    let simType = latestPhonesData['simType'];
                    
                    let colors = latestPhonesData['colorNames'];

                    finalRam = ram[0];
                    finalStorage =memory[0];
                    finalColor = 0;
                    finalPrice = price[0];

                    let cartAndBuyButtons = document.getElementById('cartAndBuyButtons');
                    
                    cartAndBuyButtons.innerHTML = `
                              <button class="addToCart" onclick="addCart(${id})">Add To Cart</button>
                              <button class="buyNow" onclick="buy(${id})">Buy Now</button>
                    `;  


                    // alert(latestPhonesData['defaultProductImage']);
                    
                    mainImage.innerHTML = `
                        <img src="../${defaultProductImage}" id="largeImage">
                    `;



                    
                    // if(multicolor){
                        let index = 0;
                        for(key in colorImages){
                                colorImages_.innerHTML += `
                                    <img src="../${colorImages[key][0]}" class="clrimg" onclick="changeImage('../${colorImages[key][0]}',${index},'${key}')">
                                `;
                                index++;
                            
                        };
                    // }
                    // else{

                    // }

                    
                        colorImages["0"].forEach(function(value,index){
                                allImages.innerHTML += `
                                    <div class="imgBox">
                                                <img src="../${value}" onmouseenter="changeLargeImage('../${value}',${index})">
                                     </div>
                                `;
                        }); 
                    
                            

                    let clrimg = document.querySelectorAll(".clrimg")[0];
                    clrimg.classList.add('active');
                    

                    let storage = document.getElementsByClassName("storage");
                    memory.forEach(function(value,index){
                        memorys.innerHTML += `
                            <span class="storage" onclick = "memoryChange(${value},this,${index},${price[index]})" >${value} GB</span>
                        `;
                    });

                    ram.forEach(function(value,index){
                        rams.innerHTML += `
                            <span class="storage ramStorage" onclick = "ramChange(${value},this,${index},${price[index]})">${value} GB</span>
                        `
                    });

                    let memoryStorage = document.querySelectorAll(".storage");
                    let ramStorage = document.querySelectorAll(".ramStorage");
                    memoryStorage[0].classList.add("active");
                    ramStorage[0].classList.add("active");
                    memoryText = memoryStorage[0].innerHTML;
                    ramText = ramStorage[0].innerHTML;


                    let memory_Text = document.getElementById("memoryText");
                    memory_Text.innerHTML = `( ${memoryText} | ${ramText} )`;

                    let product_Name = document.getElementById('productName');
                    product_Name.innerHTML = productName;

                    let offer_ = document.getElementById('offer');
                    let price_ = document.getElementById("price");
                    let orignalPrice_ = document.getElementById('orignalPrice');
                    if(offer == 0){
                        offer_.innerHTML = "";
                    }
                    else{
                        offer_.innerHTML = `${offer}% Off`;

                        afterOfferPrice = Math.ceil(price[0] - (price[0] * offer / 100));
                        offerPrice = price[0] * offer/100;

                        price_.innerHTML = `₹${afterOfferPrice}`;
                        orignalPrice_.innerHTML = `₹${price[0]}`;
                    }



                    information.innerHTML += `
                                <div class="row">
                                        <div class="col-sm-2 ">
                                            About Order
                                        </div>
                                        <div class="col-sm-8">
                                            <li>7 Days Replacement Policy</li>
                                            <li>GST invoice availabl</li>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-sm-2 ">
                                            SIM Type
                                        </div>
                                        <div class="col-sm-8">
                                            <span id="simType">${simType}</span>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-sm-2 ">
                                            Expandable Storage
                                        </div>
                                        <div class="col-sm-8">
                                            <span id="expandableStorage">${expandableStorage}</span>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-sm-2 ">
                                            Wieght
                                        </div>
                                        <div class="col-sm-8">
                                            <span id="weight">${weight}</span>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-sm-2 ">
                                            OS
                                        </div>
                                        <div class="col-sm-8">
                                            <span id="os">${os}</span>
                                        </div>
                                    </div>

                                    <div class="row">
                                        <div class="col-sm-2 ">
                                            Refresh Rage
                                        </div>
                                        <div class="col-sm-8">
                                            <span id="refreshRate">${refreshRate}</span>
                                        </div>
                                    </div>

                                    <div class="row">
                                        <div class="col-sm-2 ">
                                            Battery
                                        </div>
                                        <div class="col-sm-8">
                                            <span>${battery}</span>
                                        </div>
                                    </div>

                                     <div class="row">
                                        <div class="col-sm-2 ">
                                            Camera
                                        </div>
                                        <div class="col-sm-8">
                                            <span >${camera}</span>
                                        </div>
                                    </div>

                                     <div class="row">
                                        <div class="col-sm-2 ">
                                            Screen Size
                                        </div>
                                        <div class="col-sm-8">
                                            <span >${screenSize}</span>
                                        </div>
                                    </div>
                    `;
        
            }
            else{
                if(this.readyState == 3){
                           document.getElementById("loading").style.display = "block";
                }
            }
        }

           

        xhr.send();
