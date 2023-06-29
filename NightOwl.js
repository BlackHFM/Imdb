


const element = document.getElementById("search");
element.addEventListener("click", searchMovie);

function searchMovie() {
    let apiKey = document.getElementById('apiKey').value;
    let movieName = document.getElementById('searchIMDB').value;
    // let apiKey = 'k_izu1224f';
    // let movieName = 'interstellar';
    let searchMovieUrl = 'https://imdb-api.com/en/API/SearchMovie/' + apiKey + '/' + movieName;
    let titleUrl = 'https://imdb-api.com/en/API/Title/' + apiKey + '/';
    getMovie(searchMovieUrl, titleUrl)
}


function getMovie(searchMovieUrl, titleUrl) {
    fetch(searchMovieUrl)
        .then((response) => response.json())
        .then((movieList) => {
            if (movieList.results !== null) {
                let movie = movieList.results[0];
                console.log('movie', movie)
                getInfo(titleUrl + movie.id);
            }
        });
}

function getInfo(titleUrl) {
    fetch(titleUrl)
        .then((response) => response.json())
        .then((movie) => {
            console.log("more about movie", movie);
            fillHtmlData(movie);
        });
}

function fillHtmlData(movie) {
    document.getElementById('movieImage').src = movie.image;
    document.getElementById('movieName').innerHTML = movie.title;
    document.getElementById('movieYear').innerHTML = movie.year;
    document.getElementById('movieDuration').innerHTML = movie.runtimeStr;
    document.getElementById('moviePlot').innerHTML = movie.plot;
    document.getElementById('movieDirector').innerHTML = movie.directors;
    document.getElementById('movieWriter').innerHTML = movie.writers;
    document.getElementById('movieStars').innerHTML = movie.stars;

    if (movie.directorList.size > 1){
        document.getElementById('directorTitle').innerHTML = "Directors";
    }
    else document.getElementById('directorTitle').innerHTML = "Director";
    if (movie.writerList.size > 1) {
        document.getElementById('writerTitle').innerHTML = "Writers";
    }
    else document.getElementById('writerTitle').innerHTML = "writer";


}



