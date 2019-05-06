
var ownerName;
var Display;
var projectId= urlParams.get('id');

function IsTitleValid(title) {
    return (title.length>2 && title.length<50);
}

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
}

function IsDescriptionValid(desc) {
    return (desc.length>20 && desc.length<1000);
}

function ValidateDescription()
{

    if(IsDescriptionValid($("#Description").val()))
    {
        $("#errorDescription").hide();
         return true;
    }
    else { 
        $("#errorDescription").show(); 
         return false;
    }
}

$("#Title")
      .focusout(ValidateTitle);

$("#Description")
      .focusout(ValidateDescription);


function ValidateForm()
{
   return ValidateTitle() && ValidateDescription();
}



$(document).ready(function(){
debugger;
var urlParams = new URLSearchParams(window.location.search);


    $.ajax(
{
            url:"https://localhost:44332/API/Projects/"+projectId,
            dataType : "json" ,
            crossDomain: true
        })
        .done(populateDetails)
        .fail(errorInRetrievingDetails);
});

$(document).ready(function(){
debugger;
var urlParams = new URLSearchParams(window.location.search);
var projectId= urlParams.get('id');

     $.ajax(
{
            headers: {
                 Authorization: 'Bearer ' 
                 +window.localStorage.getItem('codetogetherng_jwt')},
            url:"https://localhost:44332/API/Projects/Request/"+projectId,
            dataType : "json" ,
            crossDomain: true
        })
        .done(function(data){Display=data})
        .fail(errorInRetrievingDetails);
});

var populateDetails = function (data){
    debugger;
    ownerName = data.owner.userName;
    $("#Title").val(data.title);
    
    $("#Owner")[0].text=data.owner.userName;
    $("#Owner")[0].href="/Profile.html?userId="+data.owner.id;
   
    for (i=0; i<data.member.length; i++)
        {
            var link = $("<a id='user_"+data.member[i].userName+"' href='Profile.html?userId="+data.member[i].id+"'>"+data.member[i].userName+" "+"</a>");
             $("#membersList").append(link);
        }

    $("#Description").val(data.description);
    $("#CreationDate").val(data.creationDate);
    $("#NewMembers").val(data.newMembers);
    $("#State").val(data.state);
    $("#TechList").val(data.technologies);
};

function errorInRetrievingDetails(){ alert("Sorry, there was a problem"); 
}



function ShowOptions()
{debugger

    if(currentLoggedUserName == ownerName.toLowerCase())
    {
            $("#Title").prop("readonly", false);
            $("#Description").prop("readonly", false);
            $("#NewMembers").prop("disabled", false);
            $("#State").prop("disabled", false);
            $("#TechList").prop("disabled", false);

            $(".owner").css("display", "block");
    }
    else if(currentLoggedUserName && Display.display)
     {
        $(".user").css("display", "block");
     }
    else if(currentLoggedUserName && Display.display==false && Display.message)
     {
        $("#stateOfRequest").text(Display.message);
     }
}

$(document).ajaxStop(ShowOptions);

function SendRequest(){
   
    var message = $("#RequestMessage").val(); 

     var RequestDto={ 
                    ProjectId:projectId,
                    Message: message
                };
        $.ajax(
            {
                 headers: {
                     Authorization: 'Bearer ' 
                     +window.localStorage.getItem('codetogetherng_jwt')},

                type:"POST",
                url:"https://localhost:44332/API/Projects/Request",
                // dataType : "json" ,
                crossDomain: true,
                contentType: "application/json; charset=utf-8",
                data: JSON.stringify(RequestDto)
            })
            .done(function(){location.reload(true);})
            .fail(Failed);
  
};
function Failed(e,a,c){debugger;
    alert("Problems with sending request")
}

function DeleteProject(){
    debugger;
        $.ajax(
            {
                 headers: {
                     Authorization: 'Bearer ' 
                     +window.localStorage.getItem('codetogetherng_jwt')},

                type:"DELETE",
                url:"https://localhost:44332/API/Projects/Delete/"+projectId,
                // dataType : "json" ,
                crossDomain: true
                
            })
            .done(function(){ window.location.href = "ProjectsGrid.html";})

            .fail(Failed);
  
};