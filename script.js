const apiUrl = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false';
let cryptoData = [];

// Fetch data using .then
function fetchDataWithThen() {
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            cryptoData = data; 
            renderTable(cryptoData);
        })
        .catch(error => console.error('Error fetching data:', error));
}

// Fetch data using async/await
async function fetchDataWithAsyncAwait() {
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        cryptoData = data; 
        renderTable(cryptoData);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

// Render the data in the table
function renderTable(data) {
    const tbody = document.querySelector('#cryptoTable tbody');
    tbody.innerHTML = '';
    data.forEach(coin => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${coin.name}</td>
            <td>${coin.id}</td>
            <td><img src="${coin.image}" alt="${coin.name}" width="30"></td>
            <td>${coin.symbol.toUpperCase()}</td>
            <td>${coin.current_price}</td>
            <td>${coin.total_volume}</td>
        `;
        tbody.appendChild(row);
    });
}

// Search functionality
document.getElementById('searchBtn').addEventListener('click', () => {
    const searchTerm = document.getElementById('search_box').value.toLowerCase();
    const filteredData = cryptoData.filter(coin => coin.name.toLowerCase().includes(searchTerm));
    renderTable(filteredData);
});

// Sort by Market Cap
document.getElementById('mtk_cap').addEventListener('click', () => {
    const sortedData = [...cryptoData].sort((a, b) => b.market_cap - a.market_cap);
    renderTable(sortedData);
});

// Sort by Percentage Change 
document.getElementById('sort_percenatge').addEventListener('click', () => {
    const sortedData = [...cryptoData].sort((a, b) => b.price_change_percentage_24h - a.price_change_percentage_24h);
    renderTable(sortedData);
});

fetchDataWithAsyncAwait(); 
