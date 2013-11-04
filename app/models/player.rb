class Player < ActiveRecord::Base
  # has_many :player1_games  these relationships exist, mike says we don't need them right now.  
  # has_many :player2_games
  has_many :games_won, :class_name => "Game", :foreign_key => "winner_id"
  # Remember to create a migration!
end
