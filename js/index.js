

brandImage = [];
brandNames = [];
productNames = [];

function ShowMenu(){
	let mobile_navbar = document.getElementById("mobile_navbar");
	mobile_navbar.style.display = "block";
}
function CloseMenu(){
	let mobile_navbar = document.getElementById("mobile_navbar");
	mobile_navbar.style.display = "none";
}
function displayDropDown(){
	let search = document.getElementById('search');
	let dropdownSearch = document.getElementById("dropdownSearch");

	if(search.value == ""){
		dropdownSearch.style.display = "none";
	}
}

function Search(){
	
	let search = document.getElementById('search');
	let dropdownSearchItem = document.querySelectorAll(".dropdown-item");
	let dropdownSearch = document.getElementById("dropdownSearch");

	dropdownSearchItem.forEach(function(value,index){
		let searchValue = search.value.trim().toLowerCase();
		let dropdownSearchItemValue = value.innerHTML.toLowerCase();
		if(dropdownSearchItemValue.includes(searchValue)){
			value.style.display = "block";
			dropdownSearch.style.display = "block";
		}
		
		else{
			value.style.display = "none";
		}

		if(searchValue == ""){
			dropdownSearch.style.display = "none";
		}
	});

}

window.onscroll = function(){
	
	if(document.documentElement.scrollTop > 50){
		document.getElementById("header_container").style.boxShadow="1px 1px 10px lightgray";
	}
	else{
		document.getElementById("header_container").style.boxShadow="";
	}
}

function filterByPrice(minPrice,maxPrice){
	window.location.href=`otherPages/shopByPrice.html?minPrice=${minPrice}&maxPrice=${maxPrice}`;

}

function filterByBrand(brandName){
	window.location.href=`otherPages/shopByBrands.html?brand=${brandName}`;
}


const xhr = new XMLHttpRequest();

xhr.open("GET","JSON/phones.json",true);

xhr.onreadystatechange = function(){
 	document.getElementById("loadingbrand").style.display = "none";
	if(this.readyState == 4 && this.status == 200){
		let phonesData = JSON.parse(this.responseText);

		let brandContainer = document.getElementById("brands");
		let items = document.getElementById('items');

		
		phonesData.forEach(function(value,index){
			let productName = phonesData[index]['productName'];
			let productId = phonesData[index]['id'];
			productNames.push(productName);
			
			let dropdownSearch = document.getElementById("dropdownSearch");
				dropdownSearch.innerHTML+= `
					<div class="dropdown-item">
                       <a href="otherPages/productPage.html?id=${productId}&category=regular">${productName}</a>
                    </div>
			`;
			
			if(brandImage.includes(phonesData[index]["brandImage"])){
				return;
			}
			else{
				brandImage.push(phonesData[index]["brandImage"]);
				brandNames.push(phonesData[index]["brandName"]);
			}
		});
		brandImage.forEach(function(value,index){
			brandContainer.innerHTML += `
				<div class="brand">
					<img src="${value}" onclick="filterByBrand('${brandNames[index]}') ">
				</div>	
			`;
		});
		
		
	}
	else{
		if(this.readyState == 3){
			 document.getElementById("loadingbrand").style.display = "block";
		}
	}

	

	
}

xhr.send();



const latestPhones = new XMLHttpRequest();

latestPhones.open("GET","JSON/latestPhones.json",true)

latestPhones.onreadystatechange = function(){

	if(this.status == 200 && this.readyState == 4){
 		document.getElementById("loadingphones").style.display = "none";
	 	let latestPhonesData = JSON.parse(this.responseText);

		let items = document.getElementById('items');

		for(let index = 0;index<4;index++){
				
				let productId = latestPhonesData[index]['id'];
				// alert(productId);
				let productName = latestPhonesData[index]['productName'];
				let price = latestPhonesData[index]['prices'][0];
				let productImage = latestPhonesData[index]['defaultProductImage'];
				let storage = latestPhonesData[index]['memory'][0];
				let ram = latestPhonesData[index]['ram'][0];
				let newfeature = latestPhonesData[index]['bestFeature'];
				// alert(newfeature);

				let offer = latestPhonesData[index]['offer'];
				
				// add all productnames into the search dropdown

				

				if(offer == 0){
					items.innerHTML += `
							<a href="otherPages/productPage.html?id=${productId}&category=latest" target="_self">
		  						<div class="item">
		                             <div class="item_image">
		                                 <img src="${productImage}">
		                             </div> 
		                             <div class="item_content">
		                                <div>
		                                   <h5 class="title">${productName}</h5>
		                                     <p>(${storage} GB | ${ram} GB)</p>
		                                     <p>${newfeature}</p>
		                                     <h4 class="price">₹${price}</h4>
		                                 </div>
		                            </div>
		                      	</div>
		                      </a>
					`;
				}
				else{

					afterOfferPrice = Math.ceil(price - (price * offer / 100));
					offerPrice = price * offer/100;

					items.innerHTML += `
							<a href="otherPages/productPage.html?id=${productId}&category=latest" target="_self">
		  						<div class="item">
		                             <div class="item_image">
		                                 <img src="${productImage}">
		                             </div> 
		                             <div class="item_content">
		                                <div>
		                                   <h5 class="title">${productName}</h5>
		                                     <p>(${storage} GB | ${ram} GB)</p>
		                                     <p>${newfeature}</p>
		                                     <p class="oldPrice"><del>₹${price}</del></p>
		                                     <h4 class="price">₹${afterOfferPrice}</h4>
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
	}
	else{
		if(this.readyState == 3){
			 document.getElementById("loadingphones").style.display = "block";
		}
	}

	
}

latestPhones.send();

