var currentLoggedUserName;

$(document).ready(function LoggedUser(){
	debugger;
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
        	debugger; 
        	currentLoggedUserName=data;
        	$(".unlogged").hide(); 
        	$(".logged").show();  
        	$("#LoggedUser").text('Hello '+data+'!' )
        })
        .fail(errorInRetrievingcurrentLoggedUserName)
});

$(document).ready(function(){
	$("#LogOut").click(function(event) {
	  	LogOut();
	})
});

function LogOut(){
  window.localStorage.removeItem('codetogetherng_jwt');
  window.location.href = "About.html";
};