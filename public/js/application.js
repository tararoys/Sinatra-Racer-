$(document).ready(function() {
//Tara has commented on what needs to be fixed to make this more object-oriented.
//the comments are the first thing in the function.  
//Tara's self-evaluation: I understand the basic concepts of object oriented javascript
//  I also can recofnize at a basic level what is wrong with my code and how to refactor it better
//  Need to not be sick so that I actually have energy to refactor.  
 

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

  //game state
  current_game = new Game()
  player1 = new Player(QueryString.player1, 65);
  player2 = new Player(QueryString.player2, 76);
  players = [player1, player2];

  function Game (){
    this.state = 'running';
    this.winner = 'nobody_yet';
  }

  function Player(name, key_to_press){
    this.name = name;
    this.key = key_to_press; 
  }

  $(document).on('keyup', function(event) {
    if (current_game.state === 'running'){
      raceTheCars(event);
    }
  });

  function raceTheCars(event){
    //display code not separated from game logic.  
    //Fix: add a position attribute to player each player. Add track length to game.  
    //   This will permit the race the cars method to have just logic
    //   Then we can use that data to add a separate display method. 
    for (var i = 0; i < players.length; i++){
      if(event.keyCode === players[i].key){
        jquery_selector = '#player' + (i + 1) +'_strip td.active'; 
        $(jquery_selector).next().addClass('active');
      }
    }

    if ( somebodyWon() ){
      //display code not separated from game logic
      //see fix for RaceTheCars to fix this one.  
      current_game.state = 'over';
      $.post(window.location.pathname, {winner: current_game.winner, _method: "put"});
      $('#game_over').css("visibility", "visible");
    }
  }

  function somebodyWon(){
    //using display to determine if someobody has won. This function is 
    //highly coupled to how I display the race.  See raceTheCars comment for 
    //how to fix this. 

    for (var i=0; i < players.length; i++){
      jquery_selector = '#player' + (i + 1) +'_strip td';
      if ( $(jquery_selector).last().hasClass('active')){
        declareWinner('player' + (i + 1) );
      return true;
      }
    }
    return false;
  }

  function declareWinner(the_winner){
    //this is the only logic function that is not highly-coupled 
    //to the window.  yay.  
    current_game.winner = the_winner;
  }

});


