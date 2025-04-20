-- Create Teams table
CREATE TABLE Teams (
    team_id INT AUTO_INCREMENT PRIMARY KEY,
    team_name VARCHAR(50) NOT NULL,
    group_letter CHAR(1) NOT NULL,
    matches_played INT NOT NULL,
    wins INT NOT NULL,
    draws INT NOT NULL,
    losses INT NOT NULL,
    goals_for INT NOT NULL,
    goals_against INT NOT NULL,
    goal_difference INT NOT NULL,
    points INT NOT NULL,
    group_rank INT NOT NULL
);

-- Create Players table
CREATE TABLE Players (
    player_id INT AUTO_INCREMENT PRIMARY KEY,
    player_name VARCHAR(100) NOT NULL,
    position VARCHAR(20) NOT NULL,
    club VARCHAR(100) NOT NULL,
    team_id INT NOT NULL,
    goals_scored INT DEFAULT 0,
    FOREIGN KEY (team_id) REFERENCES Teams(team_id)
);

-- Create Stadiums table
CREATE TABLE Stadiums (
    stadium_id INT AUTO_INCREMENT PRIMARY KEY,
    stadium_name VARCHAR(100) NOT NULL,
    city VARCHAR(50) NOT NULL,
    country VARCHAR(50) NOT NULL,
    capacity INT NOT NULL
);

-- Create Referees table
CREATE TABLE Referees (
    referee_id INT AUTO_INCREMENT PRIMARY KEY,
    referee_name VARCHAR(100) NOT NULL,
    country VARCHAR(50) NOT NULL
);

-- Create Matches table
CREATE TABLE Matches (
    match_id INT AUTO_INCREMENT PRIMARY KEY,
    match_date DATE NOT NULL,
    stage VARCHAR(50) NOT NULL,
    team1_id INT NOT NULL,
    team2_id INT NOT NULL,
    team1_score INT NOT NULL,
    team2_score INT NOT NULL,
    stadium_id INT NOT NULL,
    attendance INT NOT NULL,
    referee_id INT NOT NULL,
    FOREIGN KEY (team1_id) REFERENCES Teams(team_id),
    FOREIGN KEY (team2_id) REFERENCES Teams(team_id),
    FOREIGN KEY (stadium_id) REFERENCES Stadiums(stadium_id),
    FOREIGN KEY (referee_id) REFERENCES Referees(referee_id)
);

-- Create Goals table
CREATE TABLE Goals (
    goal_id INT AUTO_INCREMENT PRIMARY KEY,
    match_id INT NOT NULL,
    player_id INT NOT NULL,
    team_id INT NOT NULL,
    minute_scored INT NOT NULL,
    FOREIGN KEY (match_id) REFERENCES Matches(match_id),
    FOREIGN KEY (player_id) REFERENCES Players(player_id),
    FOREIGN KEY (team_id) REFERENCES Teams(team_id)
); 