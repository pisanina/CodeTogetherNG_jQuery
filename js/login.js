function isEmail(email) {
  var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  return regex.test(email);
};


function ValidateEmail()
{
     if(isEmail($("#Input_Email").val()))
    {
        $("#errorEmail").hide();
         return true;
    }
    else { 
        $("#errorEmail").show(); 
         return false;
    }
};

function IsPasswordValid(password) {
    return (password.length>5&& password.length<101);
};

function ValidatePassword()
{
    if(IsPasswordValid($("#Input_Password").val()))
    {
        $("#errorPassword").hide();
         return true;
    }
    else { 
        $("#errorPassword").show(); 
         return false;
    }
};


$(document).ready(function(){
$("#Input_Email")
      .focusout(ValidateEmail);
$("#Input_Password")
      .focusout(ValidatePassword);
})

$("#Input_Password").keypress(function(event) {
  if ( event.which == 13 ) {
     Login();
   }

})

function Login(){
    debugger;
    if(ValidateEmail())
    {
        var userDto={ 
                    Username: $("#Input_Email").val(),
                    Password: $("#Input_Password").val()
                };
        $.ajax(
            {
                type:"POST",
                url:"https://localhost:44332/API/User/Login",
                dataType : "json" ,
                crossDomain: true,
                contentType: "application/json; charset=utf-8",
                data: JSON.stringify(userDto)
            })
            .done(LoginSuccess)
            .fail(LoginFailed);
    }
}

function LoginSuccess(e){ 
  debugger;
 window.localStorage.setItem('codetogetherng_jwt', e.token);
 window.location.href = "ProjectsGrid.html";


}

function LoginFailed(){ $("#errorLogin").show(); 
}



