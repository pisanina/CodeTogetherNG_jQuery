var projectId= urlParams.get('projectId');

$(document).ready(function(){
 $.ajax(
{             
 headers: {
             Authorization: 'Bearer ' 
             +window.localStorage.getItem('codetogetherng_jwt')},

            url:"https://localhost:44332/API/Projects/RequestList/"+projectId,
            dataType : "json" ,
            crossDomain: true
})
        .done(populateRequests)
        .fail()
        debugger;

});

function populateRequests(data)
	{	
		  debugger;
		//$("#grid").html("");

		for (var i =0; i<data.length;++i)
		{
			var request = $("<div class='list-group-item' id='project'"+data[i].Id+">");

			// var link = $("<a class='list-group-item' id='project_"+data[i].id+"' href='ProjectDetails.html?id="+data[i].id+"'></a>");
			var FirstRow = $("<div class='flex' id='up_"+data[i].id+"'></div>");
				var title = $("<h4 float:left>"+data[i].projectName+"</h4>");
				//title.text(data[i].projectName).html();
				var details = $("<small><p>"+data[i].memberName+"</p><p>"+data[i].date+"</p></small>");

			var LastRow = $("<div class='flex'></div>");
				var message = $("<p>"+data[i].message+"</p>");
			var ButtonsRow = $("<div></div>");	
				var buttons = $("<input style=\"margin:3px\" type='button' class='btn btn-light' id='Accept_"+data[i].memberName+"' value='Accept' onclick=\"Accept(true, '"+data[i].memberId+"')\"><input type='button' class='btn btn-light' id='Decline_"+data[i].memberName+"' value='Decline' onclick=\"Accept(false, '"+data[i].memberId+"')\">");

			request.append(FirstRow);
			request.append(LastRow);
			request.append(ButtonsRow);
			
			FirstRow.append(title);
			FirstRow.append(details);
			LastRow.append(message);
			ButtonsRow.append(buttons);
			
			if(data[i].newMembers){
				LastRow.append(members);
			}

			$("#grid").append(request);
		}
}



function Accept(accept, id){
	 var HandleRequestDto={ 
                    ProjectId: projectId,
                    UserId: id,
                    Accept: accept
                };
                debugger;
        $.ajax(
            {
            	 headers: {
                     Authorization: 'Bearer ' 
                     +window.localStorage.getItem('codetogetherng_jwt')},

                type:"PUT",
                url:"https://localhost:44332/API/Projects/Request",
                //dataType : "json" ,
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
  alert("Sorry, there was a problem")
};