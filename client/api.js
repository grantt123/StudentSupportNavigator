const BASE_URL = "https://student-support-navigator-vvsu.vercel.app";

async function searchResources(query) {
  const response = await fetch(`${BASE_URL}/api/search?q=${query}`);
  return response.json();
}

async function saveFavorite(data) {
  const response = await fetch(`${BASE_URL}/api/favorites`, {method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data)});
  return response.json();
}

async function getFavorites() {
  const response = await fetch(`${BASE_URL}/api/favorites`);
  return response.json();
}

async function deleteFavorite(id) {
  const response = await fetch(`${BASE_URL}/api/favorites/${id}`, {method: 'DELETE'});
  return response.json()
}