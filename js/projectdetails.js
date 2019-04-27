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
var projectId= urlParams.get('id');

    $.ajax(
{
            url:"https://localhost:44332/API/Projects/"+projectId,
            dataType : "json" ,
            crossDomain: true
        })
        .done(populateDetails)
        .fail(errorInRetrievingDetails)
});

var populateDetails = function (data){
    debugger;
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
}

function errorInRetrievingDetails(){ alert("Sorry, there was a problem"); 
}