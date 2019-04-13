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

$("#Input_Email")
      .focusout(ValidateEmail);


function IsPasswordValid(password) {
    return (password.length>5&& password.length<101);
};

function ArePasswordsTheSame(password, confirmPassword) {
    return password==confirmPassword;
};

function ValidatePassword()
{
    if($("#Input_ConfirmPassword").val())
        ValidatePasswordsAreTheSame();

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

$("#Input_Password")
      .focusout(ValidatePassword);

function ValidatePasswordsAreTheSame() 
{
     if(ArePasswordsTheSame($("#Input_Password").val(), $("#Input_ConfirmPassword").val()))
    {
        $("#errorConfirmPassword").hide();
        return true;
    }
    else { 
        $("#errorConfirmPassword").show();
        return false; 
    }
 }

 $("#Input_ConfirmPassword")
  .focusout(ValidatePasswordsAreTheSame);

function ValidateForm()
{
    return ValidateEmail() && ValidatePassword() && ValidatePasswordsAreTheSame();
}

function Register(){
    debugger;
    if(ValidateForm())
    {
        var userDto={ 
                    Username: $("#Input_Email").val(),
                    Password: $("#Input_Password").val()
                };
        $.ajax(
            {
                type:"POST",
                url:"https://localhost:44332/API/User/Register",
                dataType : "json" ,
                crossDomain: true,
                contentType: "application/json; charset=utf-8",
                data: JSON.stringify(userDto)
            })
            .done(RegisterSuccess)
            .fail(RegisterFailed);
    }
}
function RegisterSuccess(){ debugger;
}
 
function RegisterFailed(e,w,q){ 
   debugger;
   $("#errorsList")[0].innerHTML='';

    e.responseJSON.forEach(function(item)
    {
            var li = document.createElement("li");
   
            li.textContent = item.description;

            $("#errorsList").append(li);
    })
}  
