const moodInput = document.getElementById('mood-input');
const searchButton = document.getElementById('search-button');

document.addEventListener('DOMContentLoaded', function () {
    setupEventListeners();
    updateSearchButton();
});

function setupEventListeners() {
    moodInput.addEventListener('input', function () {
        updateSearchButton();
    });

    moodInput.addEventListener('keypress', function (event) {
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault();
            if (!searchButton.disabled) {
                handleSearch();
            }
        }
    });

    searchButton.addEventListener('click', handleSearch);
}

function updateSearchButton() {
    const hasText = moodInput.value.trim().length > 0;
    searchButton.disabled = !hasText;
}

async function handleSearch() {
    const mood = moodInput.value.trim();

    if (!mood) {
        alert('Por favor, descreva o que você quer assistir!');
        return;
    }

    const originalText = searchButton.innerHTML;
    searchButton.innerHTML = '<span style="animation: pulse 1s infinite;">🔍 Buscando...</span>';
    searchButton.disabled = true;

    const prompt = JSON.stringify({ userPrompt: mood });

    try {
        const response = await fetch('https://jasielrasec.app.n8n.cloud/webhook-test/botflix', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: prompt
        });

        const data = await response.json();

        if (data && Array.isArray(data.results) && data.results.length > 0) {
            const movie = data.results[0];

            let posterUrl = movie.poster_path || '';
            if (posterUrl && !/^https?:\/\//.test(posterUrl)) {
                posterUrl = `https://image.tmdb.org/t/p/w500${posterUrl}`;
            }

            const resultsDiv = document.getElementById('results');
            const moviesGrid = document.getElementById('movies-grid');
            if (resultsDiv && moviesGrid) {
                resultsDiv.style.display = 'block';
                moviesGrid.innerHTML = `
                    <div class="movie-card">
                        <div class="movie-poster">
                            ${posterUrl ? `<img src="${posterUrl}" alt="${movie.title}">` : '<div class="no-poster">Sem imagem</div>'}
                        </div>
                        <div class="movie-info">
                            <h4 class="movie-title">${movie.title}</h4>
                            <p class="movie-overview">${movie.overview || 'Sem descrição disponível.'}</p>
                            <p class="movie-rating">⭐ ${typeof movie.vote_average === 'number' ? movie.vote_average.toFixed(1) : 'N/A'} / 10</p>
                        </div>
                    </div>
                `;
            } else {
                alert('Não foi possível exibir o resultado. Elementos não encontrados.');
            }
        } else {
            alert('Nenhum filme encontrado para sua busca.');
        }
    } catch (error) {
        console.error('Erro ao fazer a requisição:', error);
        alert('Erro ao buscar filmes. Tente novamente.');
    } finally {
        searchButton.innerHTML = originalText;
        updateSearchButton();
    }
};

// Add typing effect to placeholder (optional enhancement)
// function addTypingEffect() {
//     const placeholders = [
//         "Digite como você está se sentindo...",
//         "Que tipo de filme você quer assistir?",
//         "Descreva seu humor atual...",
//         "O que combina com seu dia hoje?"
//     ];

//     let currentIndex = 0;

//     setInterval(() => {
//         if (!moodInput.value) {
//             moodInput.placeholder = placeholders[currentIndex];
//             currentIndex = (currentIndex + 1) % placeholders.length;
//         }
//     }, 3000);
// }

// Initialize typing effect
//addTypingEffect();