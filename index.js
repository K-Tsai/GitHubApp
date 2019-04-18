function displayResults(responseJson) {
	console.log(responseJson);
	console.log($('#results-list'));
	for (let i = 0; i < responseJson.length; i++) {
		$('#results-list').append(`
		<li><h1>${responseJson[i].name}</h1>
		<p>${responseJson[i].url}</p></li>`
	)};
	$('#results').removeClass('hidden');
}




function getGitHandle(searchTerm){
	const url = 'https://api.github.com/users/' + searchTerm + '/repos'
	$('#results-list').empty();
	fetch(url)
	.then(response => {
	  if (response.ok) {
		 return response.json();
	  }
	  throw new Error(response.statusText);
	})
	.then(responseJson => displayResults(responseJson))
	.catch(err => {
	  $('#js-error-message').text(`Something went wrong: ${err.message}`);
	});
}



function watchForm() {
   $('form').submit(event => {
      event.preventDefault();
      const searchTerm = $('#js-search-term').val();
		getGitHandle(searchTerm);
   });
}

$(watchForm);

