const map = L.map('map').setView([38.9869, -76.9426], 14)
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {attribution: 'OpenStreetMap'}).addTo(map)

let markers = []
let currentCategory = ''
let favoritesChart = null

async function search() {
  try {
    const query = document.getElementById('searchInput').value
    currentCategory = query
    const data = await searchResources(query)
    const resultsDiv = document.getElementById('results')
    resultsDiv.innerHTML = ''
    markers.forEach(marker => map.removeLayer(marker))
    markers = []

    data.forEach(item => {
    const div = document.createElement('div')
    div.className = 'card'
    div.innerHTML =
      `<h3>${item.display_name}</h3>

      <p>
      Latitude: ${item.lat}<br>
      Longitude: ${item.lon}
      </p>

      <button class="save-btn">
        Save Favorite
      </button>`

    resultsDiv.appendChild(div)
    div.querySelector('.save-btn')
      .addEventListener('click', () => {
        saveResource(item.display_name, item.lat, item.lon)
      })

    const marker = L.marker([parseFloat(item.lat), parseFloat(item.lon)]).addTo(map)
    marker.bindPopup(item.display_name)
    markers.push(marker)
    })
  } 

  catch (error) {
    console.log(error)
    alert('Search failed')
  }
}

async function saveResource(name, latitude, longitude) {

  try {
    const formattedCategory = currentCategory.charAt(0).toUpperCase() + currentCategory.slice(1).toLowerCase()
    await saveFavorite({name, latitude, longitude, category: formattedCategory})
    alert('Saved successfully!')
  }

  catch (error) {
    console.log(error)
    alert('Failed to save')
  }
}

async function loadFavorites() {
  try {
    const data = await getFavorites()
    const favoritesDiv = document.getElementById('favorites')
    favoritesDiv.innerHTML = ''

    if (data.length === 0) {
      favoritesDiv.innerHTML = '<p>No favorites saved yet.</p>'
      return
    }

    data.forEach(item => {
      const div = document.createElement('div')
      div.className = 'card'
      div.innerHTML =
        `<h3>${item.name}</h3>

        <p>
          ${item.latitude},
          ${item.longitude}
        </p>

        <p>${item.category}</p>

        <button class="delete-btn">
          Delete Favorite
        </button>`

      favoritesDiv.appendChild(div)
      div.querySelector('.delete-btn')
        .addEventListener('click', async () => {
          await deleteFavorite(item.id)
          alert('Favorite deleted successfully!')
          loadFavorites()
        })
    })

    const categories = {}
    data.forEach(item => {
      if (categories[item.category]) {
        categories[item.category]++
      } 
      else {
        categories[item.category] = 1
      }
    })

    const context = document.getElementById('favoritesChart')
    new Chart(context, {
      type: 'bar', data: {
          labels: Object.keys(categories), datasets: [{
            label: 'Saved Favorites', data: Object.values(categories)
          }]
        },

      options: {
        responsive: true, scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    })
  } 

  catch (error) {
    console.log(error)
  }
}