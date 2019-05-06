$(document).ready(function(){
 $.ajax(
{             
 headers: {
             Authorization: 'Bearer ' 
             +window.localStorage.getItem('codetogetherng_jwt')},

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
			var request = $("<div class='list-group-item' id='project'"+data.Id">");

			// var link = $("<a class='list-group-item' id='project_"+data[i].id+"' href='ProjectDetails.html?id="+data[i].id+"'></a>");
			var FirstRow = $("<div class='flex' id='up_"+data[i].id+"'></div>");
				var title = $("<h4 float:left></h4>");
				title.text(data[i].title).html();
				var details = $("<small><p>"+data[i].MemberName+"</p><p>"+data[i].Date+"</p></small>");

			var LastRow = $("<div class='flex'></div>");
				var message = $("<p>"+data[i].Message"</p>");
				var buttons = $("<input type='button' class='btn btn-light' id='Accept_'"+data[i].MemberName+" value='Accept' onclick='Accept(, true)'>
                        <input type='button' class='btn btn-light' id='Decline_'"+data[i].MemberName+" value='Decline' onclick='location.href='/Member/ReactToRequest/7?accept=False&amp;ProjectId=2'">");

			reqest.append(FirstRow);
			reqest.append(LastRow);
			
			FirstRow.append(title);
			FirstRow.append(details);
			SecondRow.append(message);
			SecondRow.append(buttons);
			
			if(data[i].newMembers)
				SecondRow.append(members);

			$("#grid").append(request);
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
            	 headers: {
                     Authorization: 'Bearer ' 
                     +window.localStorage.getItem('codetogetherng_jwt')},

                type:"PUT",
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
  alert("Sorry, there was a problem")
};