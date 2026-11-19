document.addEventListener('DOMContentLoaded', () => {
  const searchForm = document.getElementById('searchForm');
  const searchBtn = document.getElementById('searchBtn');
  const searchInput = document.getElementById('searchInput');
  const newsCards = document.getElementById('newsCards');
  const popularNewsCarousel = document.querySelector('#myCarousel .carousel-inner');

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

  if (newsCards) {
    loadNews(newsCards);
  }

  if (popularNewsCarousel) {
    loadPopularNews(popularNewsCarousel);
  }
});

async function loadPopularNews(carousel) {
  try {
    const response = await fetch('/api/news/popular');
    const news = await response.json();

    if (!response.ok) {
      throw new Error(news.message || 'Unable to load popular news');
    }

    const articles = Array.isArray(news.articles) ? news.articles.slice(0, 3) : [];
    carousel.replaceChildren(...articles.map(createCarouselSlide));
  } catch (error) {
    console.error('Unable to load popular news:', error);
  }
}

function createCarouselSlide(article, index) {
  const slide = document.createElement('div');
  slide.className = `carousel-item${index === 0 ? ' active' : ''}`;
  slide.style.minHeight = '36rem';
  slide.style.backgroundColor = '#343a40';
  if (article.urlToImage) {
    slide.style.backgroundImage = `linear-gradient(rgb(0 0 0 / 40%), rgb(0 0 0 / 75%)), url("${article.urlToImage}")`;
    slide.style.backgroundSize = 'cover';
    slide.style.backgroundPosition = 'center';
  }

  const container = document.createElement('div');
  container.className = 'container';
  const caption = document.createElement('div');
  caption.className = 'carousel-caption text-start';
  caption.style.marginBottom = '10rem';

  const source = document.createElement('h5');
  source.className = 'mb-4 p-3 news-type';
  source.textContent = article.source?.name || 'Popular news';

  const title = document.createElement('h1');
  title.className = 'mb-4';
  title.textContent = article.title || 'Untitled article';
  limitTextToTwoLines(title);

  const description = document.createElement('p');
  description.className = 'mb-0';
  description.textContent = article.description || '';
  limitTextToTwoLines(description);

  const link = document.createElement('a');
  link.className = 'd-block mt-4 text-start text-decoration-none';
  link.href = article.url || '#';
  link.target = '_blank';
  link.rel = 'noopener noreferrer';
  link.textContent = 'Read article';

  caption.append(source, title, description, link);
  container.append(caption);
  slide.append(container);
  return slide;
}

async function loadNews(newsCards) {
  try {
    const response = await fetch('/api/news');
    const news = await response.json();

    if (!response.ok) {
      throw new Error(news.message || 'Unable to load news');
    }

    const articles = Array.isArray(news.articles) ? news.articles.slice(0, 6) : [];
    newsCards.replaceChildren(...articles.map(createNewsCard));
  } catch (error) {
    console.error('Unable to load news:', error);
  }
}

function createNewsCard(article) {
  const column = document.createElement('div');
  column.className = 'col';

  const card = document.createElement('a');
  card.className = 'card card-cover overflow-hidden text-bg-dark rounded-3 shadow-lg text-decoration-none';
  card.href = article.url || '#';
  card.target = '_blank';
  card.rel = 'noopener noreferrer';
  card.style.maxWidth = '420px';
  card.style.minHeight = '350px';
  if (article.urlToImage) {
    card.style.backgroundImage = `linear-gradient(rgb(0 0 0 / 35%), rgb(0 0 0 / 75%)), url("${article.urlToImage}")`;
    card.style.backgroundSize = 'cover';
    card.style.backgroundPosition = 'center';
  }

  const content = document.createElement('div');
  content.className = 'd-flex flex-column px-5 py-2';
  content.style.minHeight = '350px';

  const category = document.createElement('h6');
  category.className = 'p-3 my-4 lh-1 align-self-md-end news-type-bg';
  category.textContent = article.source?.name || 'News';

  const date = document.createElement('h6');
  date.className = 'pt-4 my-2 mx-0 lh-1';
  date.textContent = formatPublishedDate(article.publishedAt);

  const title = document.createElement('h4');
  title.className = 'pt-0 mt-0 mb-1 lh-base fw-bold';
  title.style.fontSize = '1.6rem';
  title.textContent = article.title || 'Untitled article';
  limitTextToTwoLines(title);

  const description = document.createElement('p');
  description.className = 'my-2 pb-4';
  description.textContent = article.description || '';
  limitTextToTwoLines(description);

  content.append(category, date, title, description);
  card.append(content);
  column.append(card);
  return column;
}

function limitTextToTwoLines(element) {
  element.style.display = '-webkit-box';
  element.style.webkitBoxOrient = 'vertical';
  element.style.webkitLineClamp = '2';
  element.style.overflow = 'hidden';
}

function formatPublishedDate(date) {
  if (!date) {
    return '';
  }

  const parsedDate = new Date(date);
  return Number.isNaN(parsedDate.getTime()) ? '' : parsedDate.toLocaleDateString();
}
