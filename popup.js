function updatePost(){
	chrome.storage.sync.get(null, function(items) {
		Object.keys(items).forEach((key,index) => {
			chrome.storage.sync.get(key, function(items) {
				var newDate = key.replace(/_/gi, "/");
				
				var week = Array("Sun.", "Mon.", "Tue.", "Wed.", "Thu.", "Fri.", "Sat.");
	
				var today = new Date(newDate);
				var day = week[today.getDay()];
	

				today = newDate + ' (' + day + ')'; 
				
				document.getElementById("recent-post").innerHTML += "<p style='font-size:15px;' class='post-day'>" + today + "</p>" +  "<div class='container post post-data'>" + items[key] + "</div>";
			});
		})
	});

}


document.addEventListener('DOMContentLoaded', function () {
	
	var week = Array("Sun.", "Mon.", "Tue.", "Wed.", "Thu.", "Fri.", "Sat.");
	
    var today = new Date();
	var dd = String(today.getDate()).padStart(2, '0');
	var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
	var yyyy = today.getFullYear();
	var day = week[today.getDay()];
	

	today = mm + '/' + dd + '/' + yyyy + ' (' + day + ')';	
	document.getElementById("today").innerHTML = today;   
	
	document.getElementById("recent-post").innerHTML = "";
	updatePost();
});

document.getElementById("btn-post").addEventListener("click", function(){ 
	var text = document.getElementById("myTextarea").value;
	
	var today = new Date();
	var dd = String(today.getDate()).padStart(2, '0');
	var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
	var yyyy = today.getFullYear();
	
	
	today = mm + '_' + dd + '_' + yyyy;
	
	var obj= {};
	
	obj[today] = text;
	
	if(text){
		chrome.storage.sync.set(obj, function() {
		 	// Notify that we saved.
			document.getElementById("recent-post").innerHTML = "";
			updatePost();
		});
	}
	
	document.getElementById("myTextarea").value = "";
}); 


document.getElementById("btn-clear").addEventListener("click", function(){ 
	document.getElementById("myTextarea").value = "";
}); 


document.getElementById("btn-remove").addEventListener("click", function(){
	var today = new Date();
	var dd = String(today.getDate()).padStart(2, '0');
	var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
	var yyyy = today.getFullYear();
	
	
	today = mm + '_' + dd + '_' + yyyy;
	
	chrome.storage.sync.remove(today);
	document.getElementById("recent-post").innerHTML = "";
	updatePost();
}); 


	