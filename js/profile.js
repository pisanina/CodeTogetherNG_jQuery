var urlParams = new URLSearchParams(window.location.search);

var userId= urlParams.get('userId');
var profileUserName;

function ShowOptionsIfOwner()
{
    if (currentLoggedUserName && profileUserName && currentLoggedUserName.toLowerCase() == profileUserName.toLowerCase())
    {
        $(".owneronly").show();
    }
}

$(document).ajaxStop(ShowOptionsIfOwner);

$(document).ready(AjaxProfile);

function AjaxProfile(){
    $.ajax(
            {                   
                url:"https://localhost:44332/API/User/"+userId,
                dataType : "json" ,
                crossDomain: true
            }
        )
        .done(populateProfile)
        .fail(errorInRetrievingProfile)
};


var populateProfile = function (data){
    debugger;

    $("#ProfileHeader").text("Profile of "+data.userName)
        profileUserName = data.userName;

        populateSkills(data.userSkills);

        populateRoles(data.userITRole);

        populateProjects(data);
}

function errorInRetrievingProfile(){ 
    alert("Sorry, there was a problem"); 
}
function errorInRetrievingcurrentLoggedUserName(){
}

function GetNamesOfTechLevels(id){
    if (id == 1) return "Beginner" 
    if (id == 2) return "Advanced" 
    if (id == 3) return "Expert" 
}

function populateSkills(data)
{    
     $("#techbody").empty();
    if (data.length==0)
    {
         $("#TechTable").hide();
         $("#noSkills").show();
    }
    for (var i =0; i<data.length; ++i)
    {
        var trTech = document.createElement("tr");
        var tdName = document.createElement("td");
        var tdLevel = document.createElement("td");
        var tdDelete = document.createElement("td");

        trTech.append(tdName);
        trTech.append(tdLevel);
        trTech.append(tdDelete);

        tdDelete.class="owneronly";
        tdDelete.innerHTML = "<input type='button' class='btn btn-light owneronly' id=Delete_"+data[i].techName+" value='Delete' onclick='DeleteSkill("+data[i].id+")'>"

        tdName.textContent = data[i].techName;
        tdLevel.textContent = GetNamesOfTechLevels(data[i].techLevel);

        $("#techbody").append(trTech);
    }
}

function populateRoles(data)
{
    $("#rolesbody").empty();

    if (data.length==0)
    {
         $("#RolesTable").hide();
         $("#noRoles").show();
    }
    for (var i =0; i<data.length;++i)
    {
        var trRole = document.createElement("tr");
        var tdRoleName = document.createElement("td");
        var tdDelete = document.createElement("td");
       
        trRole.append(tdRoleName);
        trRole.append(tdDelete);

        tdDelete.class="owneronly";
        tdDelete.innerHTML = "<input type='button' class='btn btn-light owneronly' id=Delete_"+data[i].role+" value='Delete' onclick='DeleteITRole("+data[i].roleId+")'>"

        tdRoleName.textContent = data[i].role;
      
        $("#rolesbody").append(trRole);
    }
}


function populateProjects(data)
{
    if (data.userOwner.length==0&&data.userMember.length==0)
    {
         $("#ProjectsTable").hide();
         $("#noProjects").show();
    }
    if(data.userOwner.length>0)
    {
        for (var i =0; i<data.userOwner.length;++i)
        {
            var trProject = document.createElement("tr");
            var tdProjectName = document.createElement("td");
           
            trProject.append(tdProjectName);

            tdProjectName.innerHTML = "<a href=/ProjectDetails.html?id="+data.userOwner[i].id+">"+data.userOwner[i].title+"</a>"
           
            $("#projectsbody").append(trProject);
        }
    }

    if(data.userMember.length>0)
    {
        for (var i =0; i<data.userMember.length; ++i)
        {
            var trProject = document.createElement("tr");
            var tdProjectName = document.createElement("td");
           
            trProject.append(tdProjectName);

            tdProjectName.innerHTML = "<a href=/ProjectDetails.html?id="+data.userMember[i].id+">"+data.userMember[i].title+"</a>"
           
            $("#projectsbody").append(trProject);
        }
    }
}

function DeleteSkill(id)
{
    $.ajax({
        headers: {
                     Authorization: 'Bearer ' 
                     +window.localStorage.getItem('codetogetherng_jwt')},
        url: 'https://localhost:44332/API/User/Tech/'+id,
        type: 'DELETE'

})
    .done( AjaxProfile )
    .fail(function(){alert("Fail To delete Skill")} )
}

function DeleteITRole(id)
{
    $.ajax({
        headers: {
                     Authorization: 'Bearer ' 
                     +window.localStorage.getItem('codetogetherng_jwt')},
        url: 'https://localhost:44332/API/User/ITRole/'+id,
        type: 'DELETE'
})
    .done( AjaxProfile )
    .fail(function(){alert("Fail To delete ITRole")})
}


function AddSkill()
{
    var skillid = $("#TechList").val(); 
    var level = $("#Level").val(); 

    var addSkill={ 
                    TechnologyId: skillid,
                    TechLevel: level
                };
   
         $.ajax(
             {
                headers: {
                     Authorization: 'Bearer ' 
                     +window.localStorage.getItem('codetogetherng_jwt')},

                type:"POST",
                url:'https://localhost:44332/API/User/Tech/',
                crossDomain: true,
                contentType: "application/json; charset=utf-8",
                data: JSON.stringify(addSkill)

})
    .done( AjaxProfile )
    .fail(function(e,a){debugger; alert("Fail To Add Skill")} )
}

function AddITRole()
{
    var roleid = $("#ITRoleList").val();    

        $.ajax(
             {
                headers: {
                     Authorization: 'Bearer ' 
                     +window.localStorage.getItem('codetogetherng_jwt')},

                type:"POST",
                url:'https://localhost:44332/API/User/ITRole/',
                crossDomain: true,
                contentType: "application/json; charset=utf-8",
                data: JSON.stringify(roleid)
})
    .done( AjaxProfile )
    .fail(function(e,a){debugger; alert("Fail To Add ITRole")})
}