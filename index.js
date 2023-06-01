function getUserStatistics() {
    const username = document.getElementById("usernameInput").value;  // Set GitHub username here
    const api_url = `http://127.0.0.1:5000/api/github/${username}?forked=false`;  // Update with your API url
    
    fetch(api_url)
        .then(response => response.json())
        .then(data => {
            const { user_data, repo_statistics } = data;

            // Fill in user profile data
            const userProfileDiv = document.querySelector('.user-profile');
            userProfileDiv.innerHTML = `
                <h1>${user_data.name} (${user_data.login})</h1>
                <p>${user_data.bio}</p>
                <p>Location: ${user_data.location}</p>
                <p>Followers: ${user_data.followers}</p>
            `;

            // Fill in repository statistics
            const statisticsDiv = document.querySelector('.statistics');
            statisticsDiv.innerHTML = `
                <h2>Repository Statistics</h2>
                <p>Total Repositories: ${repo_statistics.total_repo_count}</p>
                <p>Total Stargazers: ${repo_statistics.total_stargazers}</p>
                <p>Total Forks: ${repo_statistics.total_forks}</p>
                <p>Average Repository Size: ${repo_statistics.avg_repo_size} KB</p>
            `;

            // Fill in languages used
            const languagesDiv = document.querySelector('.languages');
            languagesDiv.innerHTML = '<h2>Languages Used</h2>';
            for (let [lang, count] of repo_statistics.languages) {
                languagesDiv.innerHTML += `<p>${lang}: ${count} repos</p>`;
            }
        });
}