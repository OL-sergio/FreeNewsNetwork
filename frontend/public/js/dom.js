document.addEventListener('DOMContentLoaded', () => {
  const searchForm = document.getElementById('searchForm');
  const searchBtn = document.getElementById('searchBtn');
  const searchInput = document.getElementById('searchInput');

  if (searchForm && searchBtn && searchInput) {
    searchBtn.addEventListener('click', (e) => {
      const isExpanded = searchForm.classList.contains('expanded');
      const hasValue = searchInput.value.trim().length > 0;

      if (!isExpanded) {
        e.preventDefault();
        searchForm.classList.add('expanded');
        searchInput.focus();
      } else if (hasValue) {
        searchForm.submit();
      } else {
        searchForm.classList.remove('expanded');
      }
    });

    document.addEventListener('click', (e) => {
      if (!searchForm.contains(e.target)) {
        searchForm.classList.remove('expanded');
      }
    });
  }
});
