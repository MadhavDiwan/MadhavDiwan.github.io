const toolbar = document.querySelector('.project-tools');
const cards = [...document.querySelectorAll('.home-projects article')];
const categories = ['All', ...new Set(cards.map(card => card.dataset.category))];
const search = toolbar.querySelector('input');
const filters = toolbar.querySelector('.project-filters');
const status = toolbar.querySelector('[role="status"]');
let activeCategory = 'All';

function filterProjects() {
	const query = search.value.trim().toLowerCase();
	let visibleCount = 0;

	for (const card of cards) {
		const matchesCategory = activeCategory === 'All' || card.dataset.category === activeCategory;
		card.hidden = !matchesCategory || !card.textContent.toLowerCase().includes(query);
		if (!card.hidden) visibleCount++;
	}

	status.textContent = visibleCount === 0
		? 'No matching projects. Try another search or category.'
		: `${visibleCount} ${visibleCount === 1 ? 'project' : 'projects'} shown`;
}

for (const category of categories) {
	const button = document.createElement('button');
	button.type = 'button';
	button.textContent = category;
	button.setAttribute('aria-pressed', String(category === activeCategory));
	button.addEventListener('click', () => {
		activeCategory = category;
		for (const filter of filters.children) {
			filter.setAttribute('aria-pressed', String(filter === button));
		}
		filterProjects();
	});
	filters.append(button);
}

search.addEventListener('input', filterProjects);
filterProjects();
toolbar.hidden = false;
