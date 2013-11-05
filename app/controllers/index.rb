get '/' do
  # Look in app/views/index.erb
  erb :index
end

get '/games/new' do 

  erb :new_game  #there are conventions, but we don't care right now. 

end 

post '/games' do 
  player1 = Player.create(name: params['player1'] )
  player2 = Player.create(name: params['player2'] )
  game = Game.create(player1: player1, player2: player2)
  #Game.create(player1_id: player1.id) alternative 

  redirect to "/games/#{game.id}/?player=#{player1.name}&player2=#{player2.name}"
end 

get '/games/:game_id/' do
  erb :game
end 

put '/games/:game_id' do 
  #update game with winner 
  thegame = Game.find(params[:game_id])

  #stinky code to add new player have to modify twelve places in code.  
  winner = "?"
  if params[:winner] == "player2"
    winner = thegame.player2
  else
    winner = thegame.player1
  end

  thegame.winner = winner
  thegame.save 

  200 
end