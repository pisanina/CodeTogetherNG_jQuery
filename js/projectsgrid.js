var errorInRetrievingProjects = function ()
	{
		alert("Unable to retrieve list of projects")
	}

var populateProjects = function (data)
	{	
		$("#grid").html("");
		for (var i =0; i<data.length;++i)
		{
			var project = $("<div class='col-md-6'></div>");

			var link = $("<a class='list-group-item' id='project_"+data[i].id+"' href='/Project/ProjectDetails/"+data[i].id+"'></a>");
			var FirstRow = $("<div class='flex' id='up_"+data[i].id+"'></div>");
				var title = $("<h4 float:left></h4>");
				title.text(data[i].title).html();
				var techs = $("<small>"+data[i].technologies+"</small>");

			var SecondRow = $("<div class='flex' id='up_"+data[i].id+"'></div>");
				var desc = $("<p></p>");
				desc.text(data[i].description).html();
				var members = $("<span id='newMembers-icon' class='glyphicon glyphicon-user' float:'right'></span>");

			project.append(link);
			link.append(FirstRow);
			link.append(SecondRow);
			FirstRow.append(title);
			FirstRow.append(techs);
			SecondRow.append(desc);
			
			if(data[i].newMembers)
				SecondRow.append(members);

			$("#grid").append(project);
		}
	}
	

$(document).ready(function(){
	$.ajax(
		{
			url:"https://localhost:44332/API/Projects",
			dataType : "json" ,
			crossDomain: true
		})
		.done(populateProjects)
		.fail(errorInRetrievingProjects)
});

function IsSearchValid(search) {
    return (search.length>2&& password.length<50);
};

function GenerateQuery()
{
	var query = "";

	if($("#SearchInput").val())
	{
		var si = "?toSearch="+$("#SearchInput").val();
		query += si;
	}
	

	if($("#TechList").val())
	{
		var t ="";
		for(a=0; a<$("#TechList").val().length;a++)
		{
			 t += "&techList="+$("#TechList").val()[a];
		};
		query += t;
	}

	if($("#State").val() && $("#State").val()!="null")
	{
		var s = "&projectState="+$("#State").val();
		query = query+s;
	}
	

	if($("#NewMembers").val() && $("#NewMembers").val() !="null")
	{
		var m = "&newMembers="+$("#NewMembers").val();
		query = query+m;
	}
	
	query="?"+query.slice(1);

	return query;
}

function Search()
{ 
	var query =GenerateQuery();

	 $.ajax(
	 {
			url:"https://localhost:44332/API/Projects"+query,
			dataType : "json",
			crossDomain: true
		})
		.done(populateProjects)
		.fail(errorInRetrievingProjects)
};


