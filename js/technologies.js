var errorInRetrievingTechnologies = function ()
	{
		alert("Unable to retrieve list of technologies")
	}

	var populateTechnologiesTable = function (data)
	{
		for (var i =0; i<data.length;++i)
		{
			var tr = document.createElement("tr");
			var td = document.createElement("td");
			tr.append(td);

			td.textContent = data[i].techName;

			$("#TechTable").append(tr);
		}
	}

	$.ajax(
		{
			url:"https://localhost:44332/API/TechList",
			dataType : "json" ,
			crossDomain: true
		})
		.done(populateTechnologiesTable)
		.fail(errorInRetrievingTechnologies);
