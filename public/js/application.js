$(document).ready(function() {
 

  var QueryString = function () {
  //there has to be a better way to get variables than this.  Maybe have a gets request return some json. 
  // This function is anonymous, is executed immediately and 
  // the return value is assigned to QueryString!
  var query_string = {};
  var query = window.location.search.substring(1);
  var vars = query.split("&");
  for (var i=0;i<vars.length;i++) {
    var pair = vars[i].split("=");
      // If first entry with this name
    if (typeof query_string[pair[0]] === "undefined") {
      query_string[pair[0]] = pair[1];
      // If second entry with this name
    } else if (typeof query_string[pair[0]] === "string") {
      var arr = [ query_string[pair[0]], pair[1] ];
      query_string[pair[0]] = arr;
      // If third or later entry with this name
    } else {
      query_string[pair[0]].push(pair[1]);
    }
  } 
    return query_string;
} ();

  console.log(QueryString.player1);
  console.log(QueryString.player2);

  current_game = new Game()
  player1 = new Player(QueryString.player1, 65);
  player2 = new Player(QueryString.player2, 76);

  function Game (){
    this.state = 'running';
    this.winner = 'nobody_yet';
  }

  function Player(name, key_to_press){
    this.name = name;
    this.key = key_to_press; 
  }




  // See: http://docs.jquery.com/Tutorials:Introducing_$(document).ready()
  $(document).on('keyup', function(event) {
    if (current_game.state === 'running'){
      raceTheCars(event);
    }
  });

  function raceTheCars(event){
    if (event.keyCode === player1.key){
      $('#player1_strip td.active').next().addClass('active');
    }
    else if (event.keyCode === player2.key){
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


