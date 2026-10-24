import { fetchJSON, renderProjects, fetchGitHubData } from './global.js';

/* ===== Step 2: latest 3 projects ===== */
const projects = await fetchJSON('./lib/projects.json');

// projects.json uses "../images/..." (correct for the /projects/ page).
// From the home page that "../" points the wrong way, so strip it here.
const latestProjects = projects.slice(0, 3).map((p) => ({
  ...p,
  image: p.image.replace(/^\.\.\//, ''),
}));

const projectsContainer = document.querySelector('.projects');
renderProjects(latestProjects, projectsContainer, 'h2');

/* ===== Step 3: GitHub stats ===== */
const githubData = await fetchGitHubData('natemcneill13');
const profileStats = document.querySelector('#profile-stats');

if (profileStats && githubData) {
  profileStats.innerHTML = `
    <dl>
      <dt>Public Repos:</dt><dd>${githubData.public_repos}</dd>
      <dt>Public Gists:</dt><dd>${githubData.public_gists}</dd>
      <dt>Followers:</dt><dd>${githubData.followers}</dd>
      <dt>Following:</dt><dd>${githubData.following}</dd>
    </dl>
  `;
}