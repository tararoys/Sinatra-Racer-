$(document).ready(function() {
  // This is called after the document has loaded in its entirety
  // This guarantees that any elements we bind to will exist on the page
  // when we try to bind to them

  current_game = new Game()

  function Game (){
    this.state = 'running';
    this.winner = 'nobody_yet';
  }


  // See: http://docs.jquery.com/Tutorials:Introducing_$(document).ready()
  $(document).on('keyup', function(event) {
    if (current_game.state === 'running'){
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
      current_game.state = 'over';

      $.post(window.location.pathname, {winner: current_game.winner, _method: "put"});

      $('#game_over').css("visibility", "visible");

    }
  }

  function somebodyWon(){
    if ( $('#player1_strip td').last().hasClass('active')){
      declareWinner('player1');
      return true;
    }
    else if ( $('#player2_strip td').last().hasClass('active') ) {
      declareWinner('player2');
      return true;
    }
    return false;
  }

  function declareWinner(the_winner){
    current_game.winner = the_winner;
  }

});


