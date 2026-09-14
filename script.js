// script.js — powers the library page: a focused single-topic view when arriving
// from a module/paper button, or a full filterable browse view otherwise.

(function () {
  const params = new URLSearchParams(window.location.search);
  const subjectSlug = params.get('subject');
  const yearParam = params.get('year');
  const topicParam = params.get('topic');

  const breadcrumbEl = document.getElementById('breadcrumb');
  const headingEl = document.getElementById('library-heading');
  const subtitleEl = document.getElementById('library-subtitle');
  const bodyEl = document.getElementById('library-body');
  const filtersPanel = document.getElementById('filters-panel');
  const resultsMeta = document.getElementById('results-meta');
  const resourceList = document.getElementById('resource-list');

  function subjectName(slug) {
    const s = subjectBySlug(slug);
    return s ? s.name : slug;
  }

  function renderResourceItems(list) {
    resourceList.innerHTML = '';
    resultsMeta.textContent = `${list.length} resource${list.length === 1 ? '' : 's'}`;

    if (list.length === 0) {
      const li = document.createElement('li');
      li.className = 'empty-state';
      li.innerHTML = `<strong>No resources match yet.</strong> Check back soon, or try a different filter.`;
      resourceList.appendChild(li);
      return;
    }

    list.forEach(r => {
      const li = document.createElement('li');
      li.className = 'resource-item';
      li.innerHTML = `
        <div class="resource-main">
          <span class="resource-title">${r.title}</span>
          <span class="resource-meta">${subjectName(r.subject)} · Year ${r.year} · ${r.topic}</span>
        </div>
        <span class="resource-type">${r.type}</span>
        <a class="download-btn" href="${r.file}" download>Download</a>
      `;
      resourceList.appendChild(li);
    });
  }

  // ---- FOCUSED MODE: arrived from a module or past-papers button ----
  if (subjectSlug && yearParam && topicParam) {
    const year = Number(yearParam);
    const subject = subjectBySlug(subjectSlug);
    const topic = topicParam;

    filtersPanel.remove();
    bodyEl.style.gridTemplateColumns = '1fr';

    if (!subject) {
      headingEl.textContent = 'Not found';
      subtitleEl.textContent = "That subject doesn't exist.";
      resourceList.innerHTML = '';
      resultsMeta.textContent = '';
      return;
    }

    breadcrumbEl.innerHTML = `
      <a href="index.html">Home</a> <span aria-hidden="true">/</span>
      <a href="subjects.html?year=${year}">Year ${year}</a> <span aria-hidden="true">/</span>
      <a href="subject.html?year=${year}&subject=${subject.slug}">${subject.name}</a> <span aria-hidden="true">/</span>
      <span>${topic}</span>
    `;
    headingEl.textContent = topic;
    subtitleEl.innerHTML = `${subject.name} · Year ${year} — <a href="library.html">browse the full library instead</a>`;

    const filtered = RESOURCES.filter(r => r.subject === subjectSlug && r.year === year && r.topic === topic);
    renderResourceItems(filtered);
    return;
  }

  // ---- BROWSE MODE: full filterable library ----
  const subjectFilterEl = document.getElementById('subject-filters');
  const yearFilterEl = document.getElementById('year-filters');
  const typeFilterEl = document.getElementById('type-filters');
  const searchInput = document.getElementById('search-input');
  const clearBtn = document.getElementById('clear-filters');

  const ALL_TYPES = [...new Set(RESOURCES.map(r => r.type))].sort();

  [11, 12].forEach(year => {
    const label = document.createElement('label');
    label.innerHTML = `<input type="checkbox" value="${year}"> Year ${year}`;
    yearFilterEl.appendChild(label);
  });

  SUBJECTS.forEach(subject => {
    const label = document.createElement('label');
    label.innerHTML = `<input type="checkbox" value="${subject.slug}"> ${subject.name}`;
    subjectFilterEl.appendChild(label);
  });

  ALL_TYPES.forEach(type => {
    const label = document.createElement('label');
    label.innerHTML = `<input type="checkbox" value="${type}"> ${type}`;
    typeFilterEl.appendChild(label);
  });

  // Pre-check filters from URL params, if any were passed without a topic
  if (subjectSlug) {
    const box = subjectFilterEl.querySelector(`input[value="${subjectSlug}"]`);
    if (box) box.checked = true;
  }
  if (yearParam) {
    const box = yearFilterEl.querySelector(`input[value="${yearParam}"]`);
    if (box) box.checked = true;
  }
  const initialQuery = params.get('q');
  if (initialQuery) searchInput.value = initialQuery;

  function getChecked(container) {
    return [...container.querySelectorAll('input:checked')].map(el => el.value);
  }

  function render() {
    const checkedSubjects = getChecked(subjectFilterEl);
    const checkedYears = getChecked(yearFilterEl).map(Number);
    const checkedTypes = getChecked(typeFilterEl);
    const query = searchInput.value.trim().toLowerCase();

    const filtered = RESOURCES.filter(r => {
      if (checkedSubjects.length && !checkedSubjects.includes(r.subject)) return false;
      if (checkedYears.length && !checkedYears.includes(r.year)) return false;
      if (checkedTypes.length && !checkedTypes.includes(r.type)) return false;
      if (query) {
        const haystack = `${r.title} ${r.topic} ${subjectName(r.subject)}`.toLowerCase();
        if (!haystack.includes(query)) return false;
      }
      return true;
    });

    renderResourceItems(filtered);
  }

  subjectFilterEl.addEventListener('change', render);
  yearFilterEl.addEventListener('change', render);
  typeFilterEl.addEventListener('change', render);
  searchInput.addEventListener('input', render);
  clearBtn.addEventListener('click', () => {
    [subjectFilterEl, yearFilterEl, typeFilterEl].forEach(el =>
      el.querySelectorAll('input').forEach(box => box.checked = false)
    );
    searchInput.value = '';
    render();
  });

  render();
})();
