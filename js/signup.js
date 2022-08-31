function ShowMenu(){
	let mobile_navbar = document.getElementById("mobile_navbar");
	mobile_navbar.style.display = "block";
}
function CloseMenu(){
	let mobile_navbar = document.getElementById("mobile_navbar");
	mobile_navbar.style.display = "none";
}
window.onscroll = function(){
	
	if(document.documentElement.scrollTop > 50){
		document.getElementById("header_container").style.boxShadow="1px 1px 10px lightgray";
	}
	else{
		document.getElementById("header_container").style.boxShadow="";
	}
}
$(function(){
	const commonErr = "** Filed Is Required !";
	let fname = $("#fname");
	let lname = $("#lname");
	let email = $("#email");
	let phno = $("#phno");
	let psw = $("#psw");
	let cpsw = $("#cpsw");

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

	let pswPattern1 = /[A-Z]{1,}/;
	let pswPattern2 = /[0-9]{1,}/;
	let pswPattern3 = /[!@#$&_.]{1,}/;
	let pswPattern4 = /.{8,}/;

	$("#psw").keyup(function(){
		if(psw.val() == "" || psw.val() == null){
			showError(commonErr,psw,4);
		}

		else{
			if(! ( pswPattern1.test(psw.val()) && pswPattern2.test(psw.val()) && pswPattern3.test(psw.val()) && pswPattern4.test(psw.val()) )){
				showError(`Password Must Be Contain Atleast 1 Capital Letter ! <br>
					Password Must Be Contain Atleast 1 Digit ! <br>
					Password Must Be Contain Atleast 1 Special Character !`,psw,4);
			}
			else{
				showError("",psw,4);
			}
		}
	});

	// cpsw

	$("#cpsw").keyup(function(){
		if(cpsw.val() == "" || cpsw.val() == null){
			showError(commonErr,cpsw,5);
		}
		else{
			if(cpsw.val() != psw.val()){
				showError("** Confrirm password doen't match with password !",cpsw,5);
			}
			else{
				showError("",cpsw,5);
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

	
});