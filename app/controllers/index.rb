get '/' do
  # Look in app/views/index.erb
  erb :index
end

get '/games/new' do 

  erb :new_game  #there are conventions, but we don't care right now. 

end 

post '/games' do 
  #create player1
  #create player 2
  #create new game
  #send people to games page to play game
  
  player1 = Player.create(name: params['player1'] )
  player2 = Player.create(name: params['player2'] )
  game = Game.create(player1: player1, player2: player2)
  #Game.create(player1_id: player1.id) alternative 

  redirect to "/games/#{game.id}"
end 

get '/games/:game_id' do
  erb :game
end 
