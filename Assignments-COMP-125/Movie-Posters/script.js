"use strict";

/* Event Listeners */

let fileButton = document.getElementById("moviefile");
let yearsFilter = document.getElementById("movie-year");
let directorFilter = document.getElementById("movie-director");
let orderFilter = document.getElementById("movie-order");


//Constructor Function
function Movie(title, director, releaseDate, imgRating, posterUrl){
  this.title = title,
  this.director = director,
  this.releaseDate = releaseDate,
  this.imgRating = imgRating,
  this.posterUrl = posterUrl
};

//Object Literal
let movie={
  movieList:[],
  addNewMovie: function(title, director, releaseDate, imgRating, posterUrl){
    this.movieList.push(new Movie(title, director, releaseDate, imgRating, posterUrl));
 }
};

fileButton.addEventListener("change", function (e) {
  /* Your Code Here */
  const file = e.target.files[0];
  const reader = new FileReader();
  reader.onload = function(){
    let movieData = JSON.parse(reader.result);
    for(let i=0; i<movieData.movies.length;i++){
      movie.addNewMovie(movieData.movies[i].title, movieData.movies[i].director, movieData.movies[i].releaseDate, movieData.movies[i].imdbRating, movieData.movies[i].posterUrl);
  
      let posterDiv = document.createElement("div");
      moviePoster.appendChild(posterDiv);
      posterDiv.className = "movie";
  
      let poster = document.createElement("img");
      posterDiv.appendChild(poster);
      poster.src = "images/"+movie.movieList[i].posterUrl;
      poster.alt = movie.movieList[i].title;
    }
  }
   reader.readAsText(file); 
});

let moviePoster = document.getElementById("movie-posters");
let movieClass = document.getElementsByClassName("movie");

let statusReverse = false;

/*-----------------------YEARS----------------------------------*/ 
yearsFilter.addEventListener("change", function () {
  directorFilter.selectedIndex = 0;
  orderFilter.selectedIndex = 0;
  
  /* Your Code Here */
  
  if(statusReverse == true){
    reverse(moviePoster, "movie");
    statusReverse = false;
  }
    let yearIndex = yearsFilter.selectedIndex;
    let selectedYear = yearsFilter.options[yearIndex].value;

    if (yearIndex === 0){
      showAll(moviePoster,"movie");
    }
    else{
      
      for(let i=0; i<movieClass.length; i++){

        let movieRelease = movie.movieList[i].releaseDate.match(/\d{4}$/)[0];

          if(movieRelease >= selectedYear ){
            movieClass[i].style.display = "block";
          }
          else{
            movieClass[i].style.display = "none";
          }
      }
    }
});


/*-----------------------DIRECTORS--------------------------------*/ 

directorFilter.addEventListener("change", function () {
  yearsFilter.selectedIndex = 0;
  orderFilter.selectedIndex = 0;

  /* Your Code Here */

  let directorIndex = directorFilter.selectedIndex;
  let selectedDirector = directorFilter.options[directorIndex].value;

  if(statusReverse == true){
    reverse(moviePoster, "movie");
    statusReverse = false;
  }

    if (directorIndex === 0){
      showAll(moviePoster,"movie");
    }
    else{  
      for(let i=0; i<movieClass.length; i++){
        let directorName = movie.movieList[i].director;
          if(directorName == selectedDirector ){
            movieClass[i].style.display = "block";
          }
          else{
            movieClass[i].style.display = "none";
          }
      }
    }
});

/*---------------------------ORDER--------------------------------*/ 

orderFilter.addEventListener("change", function () {
  directorFilter.selectedIndex = 0;
  yearsFilter.selectedIndex = 0;

  /* Your Code Here */

  let orderIndex = orderFilter.selectedIndex;

  showAll(moviePoster,"movie");

  if (orderIndex !== 0){
    reverse(moviePoster, "movie");
    statusReverse = true;
  }
  else{
    reverse(moviePoster, "movie");
    statusReverse = false;
  }
});


/*---------------------------FUNCTIONS--------------------------------*/ 
function showAll(selectFilter, name){
  let displayPosters = selectFilter.getElementsByClassName(name);
  let displayLength = displayPosters.length;

  for(let i=0; i<displayLength; i++){
      displayPosters[i].style.display = "block";
  }
}


function reverse(nodeReverse, name) {
  let reverse = document.getElementsByClassName(name);

  for (let i = (reverse.length-1); i>=0; i--){
        nodeReverse.appendChild(reverse[i]);
  }
  console.log("NODE:",nodeReverse);
}

