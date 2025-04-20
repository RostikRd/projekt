// Sample match data (in a real application, this would come from an API)
const matches = [
    {
        stage: "Group Stage",
        match_date: "2022-11-20",
        team1_name: "Qatar",
        team1_score: 0,
        team2_name: "Ecuador",
        team2_score: 2,
        stadium_name: "Al Bayt Stadium",
        attendance: 67372,
        referee_name: "Daniele Orsato"
    },
    // Add more matches here...
];

function displayMatches(filteredMatches = matches) {
    const container = document.getElementById('matches-container');
    container.innerHTML = '';

    filteredMatches.forEach(match => {
        const matchCard = document.createElement('div');
        matchCard.className = 'match-card';
        matchCard.innerHTML = `
            <div class="match-header">
                <span class="stage">${match.stage}</span>
                <span class="date">${new Date(match.match_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
            </div>
            <div class="teams">
                <div class="team">
                    <span class="team-name">${match.team1_name}</span>
                    <span class="score">${match.team1_score}</span>
                </div>
                <div class="vs">vs</div>
                <div class="team">
                    <span class="team-name">${match.team2_name}</span>
                    <span class="score">${match.team2_score}</span>
                </div>
            </div>
            <div class="match-details">
                <div class="stadium">
                    <i class="fas fa-stadium"></i>
                    ${match.stadium_name}
                </div>
                <div class="attendance">
                    <i class="fas fa-users"></i>
                    ${match.attendance.toLocaleString()}
                </div>
                <div class="referee">
                    <i class="fas fa-whistle"></i>
                    ${match.referee_name}
                </div>
            </div>
        `;
        container.appendChild(matchCard);
    });
}

function applyFilters() {
    const teamFilter = document.getElementById('team').value.toLowerCase();
    const stageFilter = document.getElementById('stage').value;

    const filteredMatches = matches.filter(match => {
        const teamMatch = !teamFilter || 
            match.team1_name.toLowerCase().includes(teamFilter) || 
            match.team2_name.toLowerCase().includes(teamFilter);
        const stageMatch = !stageFilter || match.stage === stageFilter;
        return teamMatch && stageMatch;
    });

    displayMatches(filteredMatches);
}

// Display matches when the page loads
document.addEventListener('DOMContentLoaded', displayMatches); 