$(document).ready(function(){
 $.ajax(
{                   
            url:"https://localhost:44332/API/RequestList/"+projectId,
            dataType : "json" ,
            crossDomain: true
})
        .done(populateRequests)
        .fail(errorInRetrievingProfile)

});

var populateRequests = function (data)
	{	
		$("#grid").html("");
		for (var i =0; i<data.length;++i)
		{
			var request = $("<div class='col-md-6'></div>");

			var link = $("<a class='list-group-item' id='project_"+data[i].id+"' href='ProjectDetails.html?id="+data[i].id+"'></a>");
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
$("#Accept_").click(function(event) {
  Accept(true);
})
});


$(document).ready(function(){
$("#Decline_").click(function(event) {
  Accept(false);
})
});

function Accept(accept){
	 var HandleRequestDto={ 
                    ProjectId: $("#Input_Email").val(),
                    UserId: $("#Input_Password").val(),
                    Accept: accept
                };
        $.ajax(
            {
                type:"POST",
                url:"https://localhost:44332/API/Projects/Request",
                dataType : "json" ,
                crossDomain: true,
                contentType: "application/json; charset=utf-8",
                data: JSON.stringify(HandleRequestDto)
            })
            .done(Success)
            .fail(Failed);
  
};



function Success(){
  	location.reload();
};

function Failed(){
  Allert("Sorry, there was a problem")
};