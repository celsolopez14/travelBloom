const searchBtn = document.getElementById("search");

async function fetchApi() {
    try {
        const response = await fetch('travel_recommendation_api.json');
        if (!response.ok) {
            throw new Error(`Network response was not ok: ${response.status} ${response.statusText}`);
        }
        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.error('Error fetching JSON:', error);
    }
}

searchBtn.addEventListener("click", fetchApi);
