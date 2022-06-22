function searchMovie() {
	$('#movie-list').html('');
	//atur url kemana type dan data typenya apa...
	$.ajax({
		url: 'http://omdbapi.com',
		type: 'get',
		dataType: 'json',
		//kirim beberapa parameter seperti api dan typenya apa jika s pencarian berdasarkan judul (selain huruf s ini bisa liat di web omdbapinya)
		data: {
			'apikey' : '4fef6169',
			's': $('#search-input').val()
		},
		success: function (result) {
			// jika berhasil ditemukan judulnya
			if (result.Response == "True"){
				let movies = result.Search;

				$.each(movies, function(i, data) {
					$('#movie-list').append(`
						<div class="col-md-4">
						<div class="card mb-3">
						  	<img class="card-img-top" src="` + data.Poster + `" alt="Card image cap">
						  	<div class="card-body">
						    <h5 class="card-title">`+ data.Title +`</h5>
						    <h6 class="card-subtitle mb-2 text-muted">`+ data.Year +`</h6>
						    <a href="#" class="card-link see-detail" data-toggle="modal" data-target="#exampleModal" data-id="`+ data.imdbID +`">See Detail</a>
						  </div>
						</div>
						</div>
					`);
				});

				$('#search-input').val('');
				
			} else {
			//jika tidak berhasil ditemukan judulnya
				$('#movie-list').html(`
					<div class="col">
						<h1 class="text-center">` + result.Error + `</h1>
					</div>`)
			}
		}
	});
}

$('#search-button').on('click', function() {
	searchMovie();
});

$('#search-input').on('keyup', function(e){
	//ketika tombol enter di klik kodenya 13
	if(e.keyCode === 13) {
		searchMovie();
	}
});

$('#movie-list').on('click', '.see-detail', function(){
	$.ajax ({
		url: 'http://omdbapi.com',
		dataType: 'json',
		type: 'get',
		data: {
			'apikey' : '4fef6169',
			'i' : $(this).data('id')
		},
		success: function (result) {
			if (result.Response === "True") {

				$('.modal-body').html(`
					<div class="container-fluid">
						<div class="row">
							<div class="col-md-4">
								<img src="`+ result.Poster +`" class="img-fluid">
							</div>
								
							<div class="col-md-8">
								<ul class="list-group">
								  <li class="list-group-item"><h3>`+ result.Title +`</h3></li>
								  <li class="list-group-item">`+ result.Plot +`</li>
								  <li class="list-group-item">Released: `+ result.Released +`</li>
								  <li class="list-group-item">Genre: `+ result.Genre +`</li>
								  <li class="list-group-item">Director: `+ result.Director +`</li>
								  <li class="list-group-item">Writer: `+ result.Writer +`</li>
								  <li class="list-group-item">Actors: `+ result.Actors +`</li>
								  
								</ul>
							</div>
						</div>
					</div>
				`);
			}
		}
	});
});