$(function(){

  let urlString = window.location.href;
  let id = urlString.substring(urlString.indexOf("id=")+3,urlString.indexOf("&category"));

  let category = urlString.substring(urlString.indexOf("category=")+9,urlString.indexOf("&colorName"));

  let colorName = urlString.substring(urlString.indexOf("colorName=")+10,urlString.indexOf("&storage"));
 
  let storage = urlString.substring(urlString.indexOf("storage=")+8,urlString.indexOf("&ram"));
  
  let ram = urlString.substring(urlString.indexOf("ram=")+4,urlString.indexOf("&price"));

  let price = urlString.substring(urlString.indexOf("price=")+6,urlString.length);
 
  window.onscroll = function(){
	
	if(document.documentElement.scrollTop > 50){
		document.getElementById("header_container").style.boxShadow="1px 1px 10px lightgray";
	}
	else{
		document.getElementById("header_container").style.boxShadow="";
	}
}

  let productNameElement = $("#productName");
  let getUrl;
  if(category == "latest"){
        getUrl = "../JSON/latestPhones.json";
  }
  else{
      getUrl = "../JSON/phones.json";
  }
  
  $.getJSON(getUrl,function(data,status){
    let detail = "";
    let productName = data[id]['productName'];

    let items = $("#finalProduct");

    let productImage = data[id]['colorImages'][colorName][0];

    // alert(productImage);
    let newfeature = data[id]['bestFeature'];
    
    
    function ShowMenu(){
  let mobile_navbar = document.getElementById("mobile_navbar");
  mobile_navbar.style.display = "block";
}
function CloseMenu(){
  let mobile_navbar = document.getElementById("mobile_navbar");
  mobile_navbar.style.display = "none";
}

    items.append(`
               
                  <div class="item">
                                 <div class="item_image">
                                     <img src="../${productImage}">
                                 </div> 
                                 <div class="item_content ml-3">
                                    <div>
                                       <h5 class="title">${productName}</h5>
                                         <p>(${storage} GB | ${ram} GB)</p>
                                         <p>${newfeature}</p>
                                         <p style="color:rgb(58,198,113);">Quantity : </p>
                                         <div class="d-flex quantity">
                                          <button><ion-icon name="remove-circle-outline"  onclick="Sub()"></ion-icon></button>
                                          <input type="text" disabled value="1" style="text-align:center;" id="quantityText">
                                          <button><ion-icon name="add-circle-outline"  onclick="Add()"></ion-icon></button>
                                        </div>
                                         <p>Color : ${data[id]['colorNames'][colorName]}</p>
                                         <h4 class="price mt-2" style="color:rgb(58,198,113);">₹${price}</h4>
                                     </div>
                                </div>
                    </div>
      `);

  });


  const commonErr = "** Filed Is Required !";
  let fname = $("#fname");
  let lname = $("#lname");
  let email = $("#email");
  let phno = $("#phno");
  let address = $("#address");
  let pin = $("#pin");


 
  let error = $(".error");
  
  let submitButton = $("#submitButton");
  submitButton.attr("disabled",true);

  function showError(err,ele,index){
    error.eq(index).html(err);
    ele.focus();
    check();
  }

  // fname

  $("#fname").keyup(function(){
    if(fname.val() == "" || fname.val() == null){
      showError(commonErr,fname,0);
    }
    else{
      if(fname.val().length <= 2 || fname.val().length >= 20){
        showError("** Length Should Be Between 2 And 20 !",fname,0);
      }
      else{
        showError("",fname,0);
      }
    }
  });

  // lname

  $("#lname").keyup(function(){
    if(lname.val() == "" || lname.val() == null){
      showError(commonErr,lname,1);
    }
    else{
      if(lname.val().length <= 2 || lname.val().length >= 20){
        showError("** Length Should Be Between 2 And 20 !",lname,1);
      }
      else{
        showError("",lname,1);
      }
    }
  });

  // email
  let emailPattern = /^([^$#@*&^!0-9])([a-zA-Z])+([0-9])*\@([a-zA-Z]{2,6})\.([a-zA-Z]{2,5})+$/;
  $("#email").keyup(function(){
    if(email.val() == "" || email.val() == null){
      showError(commonErr,email,2);
    }
    else{
      if(!emailPattern.test(email.val())){
        showError("** Email Is Not Proper !",email,2);
      }
      else{
        showError("",email,2);
      }
    }
  });

  // phno
 
 let phnoPattern =  /^[0-9]{10}$/;
  $("#phno").keyup(function(){
    if(phno.val() == "" || phno.val() == null){
      showError(commonErr,phno,3);
    }
    else{
      if(!phnoPattern.test(phno.val())){
        showError("** Phone no is not valid !",phno,3);
      }
      else{
        showError("",phno,3);
      }
    }
  });
  // address

  $("#address").keyup(function(){
    if(address.val() == "" || address.val() == null){
      showError(commonErr,address,4);
    }
    else{
      if(address.val().length <= 10 || address.val().length >= 500){
        showError("** Length Should Be Between 10 And 500 !",address,4);
      }
      else{
        showError("",address,4);
      }
    }
  });
 
  // pin

   let pinPattern =  /^[0-9]{6}$/;
  $("#pin").keyup(function(){
    if(pin.val() == "" || pin.val() == null){
      showError(commonErr,pin,5);
    }
    else{
      if(!pinPattern.test(pin.val())){
        showError("** Pin Must Be Have 6 Digits !",pin,5);
      }
      else{
        showError("",pin,5);
      }
    }
  });

  let checkError = false;
  function check(){
    for(let i = 0;i<error.length;i++){
      if(error.eq(i).text() != ""){
        checkError = false;
        break;
      }
      else{
        checkError = true;
      }
    }

    if(checkError){
      submitButton.attr("disabled",false);
    }
    else{
      submitButton.attr("disabled",true);
    }
  }
  
  $("#form1").submit(function(){
      alert(`Your Order Is Placed , Your Order Id Is : ${ Math.ceil(Math.random()*1000000000)} `);
  })


});
