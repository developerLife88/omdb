// Initialize app
var myApp = new Framework7();


// If we need to use custom DOM library, let's save it to $$ variable:
var $$ = Dom7;

// Add view
var mainView = myApp.addView('.view-main', {
    // Because we want to use dynamic navbar, we need to enable it for this view:
    dynamicNavbar: true
});

// Handle Cordova Device Ready Event
$(document).on('deviceready', function(e) {

$('#movieForm').on('submit', function(e){
    var searchMovie = $('#movieName').val();
    console.log(searchMovie); 
    fetchMovies(searchMovie);

        e.preventDefault();
    
    
  });
  
    
    
    
    
    
    
    
    
/*---------------fetch movies------------------*/
    
function fetchMovies(searchMovie){
  $.ajax({
    method:'GET',
    url:'http://www.omdbapi.com/?apikey=80fe09c6&s=' + searchMovie
  }).done(function(data){
    console.log(data);
      if(data.Response == "False"){
        myApp.alert('please enter a valid movie name', 'Reminder');
    }
    var moviesArray = data.Search; // Search is the name of the array that holds all of the movies objects
    var output = '';
    $.each(moviesArray, function(index, movie){
      output += `
        <li>

 <a  onclick="movieClicked('${movie.imdbID}')" href="movie.html" class="item-link item-content">
        <div class="item-media"><img src="${movie.Poster}">
        </div>
        <div class="item-inner">
          <div class="item-title-row">
            <div class="item-title">${movie.Title}</div>
            <div class="item-after">${movie.Year}</div>
          </div>
        </div>
      </a>

    </li>
      `;
    });
    $('#movieslist').html(output);
  });
}
   
    

 }); /*---------end of onDeviceready function ------------*/
    










function movieClicked(id){
  sessionStorage.setItem('movieId', id);
}






myApp.onPageInit('movie', function (page) {
    var movieId = sessionStorage.getItem('movieId');
    getMovie(movieId);
    
    
    
    
   //  $$('.page').css('background', 'url("img/nataliewood") no-repeat center center fixed');
   // $$('.page').css('background-size', 'cover');       
   

}) /*------- end of movie page scripting -----*/ 









    // Get Single Movie
function getMovie(movieId){
  $.ajax({
    method:'GET',
     url:'http://www.omdbapi.com/?apikey=80fe09c6&i=' + movieId
  }).done(function(movie){
   console.log(movie);
    var movieDetails = `
     <div class="card">
          <img src="${movie.Poster}">    
            <ul>
      <li><i class="fas fa-film"></i> <strong> Genre:</strong> ${movie.Genre}</li><hr>
      <li><i class="fas fa-info-circle"></i> <strong> Plot:</strong> ${movie.Plot}</li><hr>
      <li><i class="far fa-calendar-alt"></i><strong> Released:</strong> ${movie.Released}</li><hr>
      <li><i class="far fa-clock"></i>  <strong> Runtime:</strong> ${movie.Runtime}</li><hr>
      <li><i class="fas fa-star-half-alt"></i> <strong> IMDB Rating:</strong> ${movie.imdbRating}</li><hr>
      <li><i class="fab fa-imdb"></i> <strong> Votes:</strong> ${movie.imdbVotes}</li><hr>
<li><i class="fas fa-award"></i> <strong> Awards:</strong> ${movie.Awards}</li><hr>
      <li><i class="fas fa-users"></i> <strong> Actors:</strong> ${movie.Actors}</li><hr>
            </ul>
         
          
          <div class="card-footer"><i class="fas fa-user"></i> <strong> Director:</strong> ${movie.Director}</div>
        </div>
    `;

    $('#movieDetails').html(movieDetails);
  });
}
    
   

          

  