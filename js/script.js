const projectsPerLoad = 6;
const projectContainer = document.getElementById('project-container');
const loadMoreButton = document.getElementById('load-more-button');
let loadedProjects = 0;
let allProjects = [];

function loadProjectsFromJSON() {
	fetch('projects/data.json')
		.then((response) => response.json())
		.then((data) => {
			allProjects = data;
			loadMoreProjects();
		})
		.catch((error) => console.error(error));
}

function loadMoreProjects() {
	for (let i = 0; i < projectsPerLoad; i++) {
		if (loadedProjects < allProjects.length) {
			const projectData = allProjects[loadedProjects];
			const projectCard = createProjectCard(projectData);
			projectContainer.appendChild(projectCard);
			loadedProjects++;
		}
	}

	if (loadedProjects >= projectsPerLoad) {
		loadMoreButton.style.display = 'block';
	}

	if (loadedProjects >= allProjects.length) {
		loadMoreButton.disabled = true;
	}
}

function createProjectCard(projectData) {
	const link = `<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" viewBox="0 0 16 16">
    <path fill-rule="evenodd" d="M8.636 3.5a.5.5 0 0 0-.5-.5H1.5A1.5 1.5 0 0 0 0 4.5v10A1.5 1.5 0 0 0 1.5 16h10a1.5 1.5 0 0 0 1.5-1.5V7.864a.5.5 0 0 0-1 0V14.5a.5.5 0 0 1-.5.5h-10a.5.5 0 0 1-.5-.5v-10a.5.5 0 0 1 .5-.5h6.636a.5.5 0 0 0 .5-.5z"></path>
    <path fill-rule="evenodd" d="M16 .5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h3.793L6.146 9.146a.5.5 0 1 0 .708.708L15 1.707V5.5a.5.5 0 0 0 1 0v-5z"></path></svg>`;
	const projectCard = document.createElement('div');
	projectCard.className = 'project-card';
	projectCard.innerHTML = `<img src="${projectData.image}" alt="${projectData.projectName}">
    <h2>${projectData.projectName}</h2>
    <p>${projectData.description}</p>\n<p class="tech-used">${projectData.techUsed}</p>
    <a href="${projectData.detailsLink}" target="_blank"><button>View ${link}</button></a>`;
	return projectCard;
}

loadMoreButton.style.display = 'none';

loadProjectsFromJSON();

loadMoreButton.addEventListener('click', () => {
	loadMoreProjects();
});
