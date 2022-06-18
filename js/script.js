$('#search-button').on('click', function() {
	//atur url kemana type dan data typenya apa
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
				console.log(movies);
				//bersambung disini
			} else {
			//jika tidak berhasil ditemukan judulnya
				$('#movie-list').html(`
					<div class="col">
						<h1 class="text-center">` + result.Error + `</h1>
					</div>`)
			}
		}
	});
});