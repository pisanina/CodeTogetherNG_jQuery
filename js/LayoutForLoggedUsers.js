var currentLoggedUserName;
var currentLoggedUserID;
var urlParams = new URLSearchParams(window.location.search);

$(document).ready(function LoggedUser(){
	
    $.ajax(
			{            
				headers: {
	                 Authorization: 'Bearer ' 
	                 +window.localStorage.getItem('codetogetherng_jwt')
	            },
	            url:"https://localhost:44332/API/User/Logged",
	            dataType : "json" ,
	            crossDomain: true
			}
		)
        .done(function(data){
        
        	currentLoggedUserName = data.name;
        	currentLoggedUserID = data.id;
        	$(".unlogged").hide(); 
        	$(".logged").show();  
        	$("#LoggedUser").text('Hello '+currentLoggedUserName+'!');
        	$("#LoggedUser").attr("href", "Profile.html?userId="+data.id);
        })
        .fail();
});

$(document).ready(function(){
	$("#LogOut").click(function(event) {
	  	LogOut();
	});
});

function LogOut(){
  window.localStorage.removeItem('codetogetherng_jwt');
  window.location.href = "About.html";
}