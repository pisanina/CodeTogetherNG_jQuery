function RedirectIfNotLogged(){
    if(!window.localStorage.getItem('codetogetherng_jwt')!=null)
             window.location.href= "http://localhost:4432/Login.html"
}

function IsTitleValid(title) {
    return (title.length>2 && title.length<50);
};

function ValidateTitle()
{
    if(IsTitleValid($("#Title").val()))
    {
        $("#errorTitle").hide();
         return true;
    }
    else { 
        $("#errorTitle").show(); 
         return false;
    }
};

function IsDescriptionValid(desc) {
    return (desc.length>20 && desc.length<1000);
};

function ValidateDescription()
{
debugger;
    if(IsDescriptionValid($("#Description").val()))
    {
        $("#errorDescription").hide();
         return true;
    }
    else { 
        $("#errorDescription").show(); 
         return false;
    }
};

$(document).ready(function(){

    IsLogged();

    $.ajax( $("#Title")
      .focusout(ValidateTitle));

    $.ajax($("#Description")
      .focusout(ValidateDescription))
});


function ValidateForm()
{
   return ValidateTitle() && ValidateDescription();
}

function Create(){
   debugger;
    if(ValidateForm())
    {                     
        var addProject={ 
                    Title: $("#Title").val(),
                    Description: $("#Description").val(),
                    NewMembers: $("#NewMembers")[0].checked,
                    Technologies: $("#TechList").val()
                };
        $.ajax(
             {
                headers: {
                     Authorization: 'Bearer ' 
                     +window.localStorage.getItem('codetogetherng_jwt')},

                type:"POST",
                url:"https://localhost:44332/API/Projects",
                crossDomain: true,
                contentType: "application/json; charset=utf-8",
                data: JSON.stringify(addProject)
            })
            .done(CreateSuccess)
            .fail(CreateFailed);
    }
}
function CreateSuccess(e){ 
  debugger;
  window.location.href= "http://localhost:4432/ProjectsGrid.html"
 }

function CreateFailed(a,b,c,d){ debugger; 
if(a.status=="401")
{
     window.location.href= "http://localhost:4432/Login.html"
     return;
}
    alert("Sorry, there was a problem"); 
}