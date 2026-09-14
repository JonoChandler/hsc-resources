// script.js — powers the filterable library page.

(function () {
  const params = new URLSearchParams(window.location.search);

  const subjectFilterEl = document.getElementById('subject-filters');
  const typeFilterEl = document.getElementById('type-filters');
  const searchInput = document.getElementById('search-input');
  const resultsMeta = document.getElementById('results-meta');
  const resourceList = document.getElementById('resource-list');
  const clearBtn = document.getElementById('clear-filters');

  const ALL_TYPES = [...new Set(RESOURCES.map(r => r.type))].sort();

  // ---- Build filter checkboxes ----
  SUBJECTS.forEach(subject => {
    const id = `subject-${subject.slug}`;
    const label = document.createElement('label');
    label.innerHTML = `<input type="checkbox" id="${id}" value="${subject.slug}"> ${subject.name}`;
    subjectFilterEl.appendChild(label);
  });

  ALL_TYPES.forEach(type => {
    const id = `type-${type.replace(/\s+/g, '-').toLowerCase()}`;
    const label = document.createElement('label');
    label.innerHTML = `<input type="checkbox" id="${id}" value="${type}"> ${type}`;
    typeFilterEl.appendChild(label);
  });

  // ---- Restore state from URL params ----
  const initialSubject = params.get('subject');
  if (initialSubject) {
    const box = subjectFilterEl.querySelector(`input[value="${initialSubject}"]`);
    if (box) box.checked = true;
  }
  const initialQuery = params.get('q');
  if (initialQuery) searchInput.value = initialQuery;

  // ---- Filtering logic ----
  function getChecked(container) {
    return [...container.querySelectorAll('input:checked')].map(el => el.value);
  }

  function subjectName(slug) {
    const s = SUBJECTS.find(s => s.slug === slug);
    return s ? s.name : slug;
  }

  function render() {
    const checkedSubjects = getChecked(subjectFilterEl);
    const checkedTypes = getChecked(typeFilterEl);
    const query = searchInput.value.trim().toLowerCase();

    const filtered = RESOURCES.filter(r => {
      if (checkedSubjects.length && !checkedSubjects.includes(r.subject)) return false;
      if (checkedTypes.length && !checkedTypes.includes(r.type)) return false;
      if (query) {
        const haystack = `${r.title} ${r.topic} ${subjectName(r.subject)}`.toLowerCase();
        if (!haystack.includes(query)) return false;
      }
      return true;
    });

    resultsMeta.textContent = `${filtered.length} resource${filtered.length === 1 ? '' : 's'}`;
    resourceList.innerHTML = '';

    if (filtered.length === 0) {
      const li = document.createElement('li');
      li.className = 'empty-state';
      li.innerHTML = `<strong>No resources match those filters.</strong> Try clearing a filter or searching a different term.`;
      resourceList.appendChild(li);
      return;
    }

    filtered.forEach(r => {
      const li = document.createElement('li');
      li.className = 'resource-item';
      li.innerHTML = `
        <div class="resource-main">
          <span class="resource-title">${r.title}</span>
          <span class="resource-meta">${subjectName(r.subject)} · ${r.topic}</span>
        </div>
        <span class="resource-type">${r.type}</span>
        <a class="download-btn" href="${r.file}" download>Download</a>
      `;
      resourceList.appendChild(li);
    });
  }

  subjectFilterEl.addEventListener('change', render);
  typeFilterEl.addEventListener('change', render);
  searchInput.addEventListener('input', render);
  clearBtn.addEventListener('click', () => {
    subjectFilterEl.querySelectorAll('input').forEach(el => el.checked = false);
    typeFilterEl.querySelectorAll('input').forEach(el => el.checked = false);
    searchInput.value = '';
    render();
  });

  render();
})();
