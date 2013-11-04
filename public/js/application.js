$(document).ready(function() {
  // This is called after the document has loaded in its entirety
  // This guarantees that any elements we bind to will exist on the page
  // when we try to bind to them

  var game = 'running';
  var winner = 'nobody_yet';

  $("#new_game").on('click', function(){
    game = 'running';
    winner = 'nobody_yet';
    $('td').removeClass('active');
    $('#player1_strip td').first().addClass('active');
    $('#player2_strip td').first().addClass('active');
    $('#game_over').css("visibility", "hidden");
  });

  // See: http://docs.jquery.com/Tutorials:Introducing_$(document).ready()
  $(document).on('keyup', function(event) {
    if (game === 'running'){
      raceTheCars(event);
    }
  });

  function raceTheCars(event){
    if (event.keyCode === 65){
      $('#player1_strip td.active').next().addClass('active');
    }
    else if (event.keyCode === 76){
      $('#player2_strip td.active').next().addClass('active');
    };

    if ( somebodyWon() ){
      game = 'over';
      $('#game_over').css("visibility", "visible");
    }
  }

  function somebodyWon(){
    if ( $('#player1_strip td').last().hasClass('active')){
      declareWinner('blue');
      return true;
    }
    else if ( $('#player2_strip td').last().hasClass('active') ) {
      declareWinner('red');
      return true;
    }
    return false;
  }

  function declareWinner(the_winner){
    winner = the_winner;
  }

});


