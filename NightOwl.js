let warnNullApiKey = document.getElementById("warnNullApiKey");
let warnNoResult = document.getElementById("warnNoResult");
let mainCard = document.getElementById("mainCard");
let similarMoviesCard = document.getElementById("similarMoviesCard");
mainCard.style.display = "none";
warnNoResult.style.display = "none";
warnNullApiKey.style.display = "none";
similarMoviesCard.style.display = "none";

const element = document.getElementById("search");
element.addEventListener("click", searchMovie);

function searchMovie() {
    let apiKey = document.getElementById('apiKey').value;
    let movieName = document.getElementById('searchIMDB').value;
    verifyApiKey(apiKey);
    let searchMovieUrl = 'https://imdb-api.com/en/API/SearchMovie/' + apiKey + '/' + movieName;
    let titleUrl = 'https://imdb-api.com/en/API/Title/' + apiKey + '/';
    getMovie(searchMovieUrl, titleUrl);
}

function verifyApiKey (apiKey) {
    if (apiKey.length < 1){
        warnNullApiKey.style.display = "block";
    }
    else warnNullApiKey.style.display = "none";
}


function getMovie(searchMovieUrl, titleUrl) {
    fetch(searchMovieUrl)
        .then((response) => response.json())
        .then((movieList) => {
            console.log("movieList", movieList);
            if (movieList.errorMessage.length < 1){
                if (movieList.results.length !== 0) {
                    mainCard.style.display = "flex";
                    similarMoviesCard.style.display = "block";
                    warnNoResult.style.display = "none";
                    let movie = movieList.results[0];
                    console.log('movie', movie)
                    getInfo(titleUrl + movie.id);
                }
                else {
                    mainCard.style.display = "none";
                    similarMoviesCard.style.display = "none";
                    warnNoResult.style.display = "block";
                }
            }
            else {
                mainCard.style.display = "none";
                similarMoviesCard.style.display = "none";
                warnNoResult.style.display = "block";
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
    document.getElementById('movieRating').innerHTML = movie.imDbRating;
    document.getElementById('moviePlot').innerHTML = movie.plot;
    document.getElementById('movieDirector').innerHTML = movie.directors;
    document.getElementById('movieWriter').innerHTML = movie.writers;
    document.getElementById('movieStars').innerHTML = movie.stars;

    if (movie.directorList.length > 1){
        document.getElementById('directorTitle').innerHTML = "Directors";
    }
    else document.getElementById('directorTitle').innerHTML = "Director";
    if (movie.writerList.length > 1) {
        document.getElementById('writerTitle').innerHTML = "Writers";
    }
    else document.getElementById('writerTitle').innerHTML = "writer";

    while (document.getElementById('genreList').hasChildNodes()){
        document.getElementById('genreList').firstChild.remove();
    }

    for (let i = 0; i < movie.genreList.length; i++){
        let element = document.createElement("div");
        element.className = "genreItem";
        element.innerHTML = movie.genreList[i].value;
        document.getElementById('genreList').appendChild(element);
    }

    if (movie.awards.includes("Top rated movie")) {
        document.getElementById("awards").style.display = "flex";
        document.getElementById('topRated').innerHTML = movie.awards.split("|")[0];
        document.getElementById('awardsList').innerHTML = movie.awards.split("|")[1];
    }
    else document.getElementById("awards").style.display = "none";

    for (let i = 1; i < 5; i++) {
        document.getElementById('similarImg' + i).src = movie.similars[i-1].image;
        document.getElementById('similarScore' + i).innerHTML = movie.similars[i-1].imDbRating;
        document.getElementById('similarTitle' + i).innerHTML = movie.similars[i-1].title;
    }



}



