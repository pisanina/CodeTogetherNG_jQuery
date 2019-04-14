var errorInRetrievingUsers = function ()
	{
		alert("Unable to retrieve list of users")
	}

var populateUsersTable = function (data)
	{
		for (var i =0; i<data.length;++i)
		{
			var tr = document.createElement("tr");
			var tdName = document.createElement("td");
			var tdOwner = document.createElement("td");
			var tdMember = document.createElement("td");
			var tdBeginner = document.createElement("td");
			var tdAdvanced = document.createElement("td");
			var tdExpert = document.createElement("td");
			tr.append(tdName);
			tr.append(tdOwner);
			tr.append(tdMember);
			tr.append(tdBeginner);
			tr.append(tdAdvanced);
			tr.append(tdExpert);

			tdName.innerHTML = "<a href ='/Member/ShowUserProfile?userName="+data[i].userName+"'>"+data[i].userName+"</a>"
			tdOwner.textContent = data[i].owner;
			tdMember.textContent = data[i].member;
			tdBeginner.textContent = data[i].beginner;
			tdAdvanced.textContent = data[i].advanced;
			tdExpert.textContent = data[i].expert;
		
			$("#usersTable").append(tr);
		}
	}

$(document).ready(function(){
	$.ajax(
		{
			url:"https://localhost:44332/API/User",
			dataType : "json" ,
			crossDomain: true
		})
		.done(populateUsersTable)
		.fail(errorInRetrievingUsers)
});

		