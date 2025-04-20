-- 1. Get all matches for a specific team
SELECT m.match_date, t1.team_name as team1, t2.team_name as team2, m.team1_score, m.team2_score
FROM Matches m
JOIN Teams t1 ON m.team1_id = t1.team_id
JOIN Teams t2 ON m.team2_id = t2.team_id
WHERE t1.team_name = 'Argentina' OR t2.team_name = 'Argentina';

-- 2. Get top goal scorers
SELECT p.player_name, t.team_name, p.goals_scored
FROM Players p
JOIN Teams t ON p.team_id = t.team_id
ORDER BY p.goals_scored DESC
LIMIT 10;

-- 3. Get stadium usage statistics
SELECT s.stadium_name, COUNT(m.match_id) as matches_played, 
       SUM(m.attendance) as total_attendance, 
       AVG(m.attendance) as average_attendance
FROM Stadiums s
JOIN Matches m ON s.stadium_id = m.stadium_id
GROUP BY s.stadium_id
ORDER BY matches_played DESC;

-- 4. Get team performance in group stage
SELECT t.team_name, t.group_letter, t.points, t.goals_for, t.goals_against, t.goal_difference
FROM Teams t
ORDER BY t.group_letter, t.points DESC;

-- 5. Get referee assignments
SELECT r.referee_name, r.country, COUNT(m.match_id) as matches_refereed
FROM Referees r
JOIN Matches m ON r.referee_id = m.referee_id
GROUP BY r.referee_id
ORDER BY matches_refereed DESC;

-- 6. Get matches with highest attendance
SELECT m.match_date, t1.team_name as team1, t2.team_name as team2, 
       m.team1_score, m.team2_score, s.stadium_name, m.attendance
FROM Matches m
JOIN Teams t1 ON m.team1_id = t1.team_id
JOIN Teams t2 ON m.team2_id = t2.team_id
JOIN Stadiums s ON m.stadium_id = s.stadium_id
ORDER BY m.attendance DESC
LIMIT 5;

-- 7. Get teams with most goals scored
SELECT t.team_name, t.goals_for, t.goals_against, t.goal_difference
FROM Teams t
ORDER BY t.goals_for DESC
LIMIT 5;

-- 8. Get players who scored in multiple matches
SELECT p.player_name, t.team_name, COUNT(g.goal_id) as goals_scored
FROM Players p
JOIN Teams t ON p.team_id = t.team_id
JOIN Goals g ON p.player_id = g.player_id
GROUP BY p.player_id
HAVING COUNT(g.goal_id) > 1
ORDER BY goals_scored DESC;

-- 9. Get matches with most goals
SELECT m.match_date, t1.team_name as team1, t2.team_name as team2, 
       m.team1_score, m.team2_score, (m.team1_score + m.team2_score) as total_goals
FROM Matches m
JOIN Teams t1 ON m.team1_id = t1.team_id
JOIN Teams t2 ON m.team2_id = t2.team_id
ORDER BY total_goals DESC
LIMIT 5;

-- 10. Get teams that advanced from group stage
SELECT t.team_name, t.group_letter, t.group_rank
FROM Teams t
WHERE t.group_rank <= 2
ORDER BY t.group_letter, t.group_rank; 