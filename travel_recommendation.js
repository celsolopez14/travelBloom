const searchBtn = document.getElementById("searchBtn");
const clearBtn = document.getElementById("clearBtn");

const timeOptions = {
    "Brazil": { 
        timeZone: 'Brazil/East',
        hour12: true,
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric' 
    },
    "Japan" : {
        timeZone: 'Japan',
        hour12: true,
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric'
    },
    "Australia": {
        timeZone: 'Etc/GMT+11',
        hour12: true,
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric'
    },

}
;

const countries = `brazil japan australia
Nations
    Sovereignty
    Nationalities
    Borders
    Territories
    International relations
    Geography
    National symbols
    Citizenship
    Government
    Politics
    Diplomacy
    National identity
    Country names
    Multiculturalism
    Homeland
    Motherland
    Foreign relations
    National anthem
    Capital cities
    Flags
    Diversity
    Statehood
    Patriotic
    Global community
    Regional cooperation
    Homeland security
    Independence
    Country codes
    National pride
    Country borders
    Federalism
    Unity in diversity
    State sovereignty
    International cooperation
    Nation-building
    Territorial integrity
    Constitutionalism
    National history
    Peaceful coexistence `


const keywords = {
    beaches: `Sandy beaches 
    Tropical shores 
    Coastal getaways 
    Seaside retreats 
    Oceanfront paradises 
    Sun-kissed shores
    Beach vacations
    Shoreline beauty
    Exotic beaches
    Picturesque coastlines
    Secluded bays
    Surfing destinations
    Relaxing by the sea
    Beach resorts
    Coastal charm
    Golden sands
    Ocean views
    Sea breeze
    Beachcombing
    Scenic waterfronts
    Coastal living
    Island beaches
    Seashell collecting
    Laid-back beaches
    White sand escapes
    Seaview retreats
    Palm-fringed shores
    Turquoise waters
    Seaside tranquility
    Beach activities
    Coastal adventures
    Oceanfront resorts
    Coastal communities
    Sandy coves
    Beach picnics
    Shoreline walks
    Clifftop views
    Hidden beaches
    Seagrass meadows
    Coastal sunsets`,

    temples: `Ancient temples
    Historical shrines
    Sacred places
    Religious monuments
    Architectural marvels
    Spiritual sites
    Cultural heritage
    Temples around the world
    Places of worship
    Pilgrimage destinations
    Sacred architecture
    Ornate temples
    Temple complexes
    Traditional rituals
    Iconic religious sites
    Holy sanctuaries
    Spiritual landmarks
    Sacred art
    Temple ceremonies
    Serene places of worship
    Divine architecture
    Buddhist temples
    Hindu temples
    Temples of worship
    Ancient rituals
    Religious traditions
    Temple pilgrimage
    Cultural significance
    Temple festivals
    Meditation spaces
    Historic sacred sites
    Religious practices
    Zen temples
    Spiritual retreats
    Temple architecture
    Venerated shrines
    Sacred grounds
    Place of contemplation
    Religious heritage
    Temple artistry`,
};
async function fetchApi(event) {
    try {
        event.preventDefault();
        const input = document.getElementById("search").value;
        const response = await fetch('travel_recommendation_api.json');
        const json = await response.json();
        const data = keywordSearch(input, json);
        recommendationResult(data);
    } catch (error) {
        console.error('Error fetching JSON:', error);
    }
}

function keywordSearch(input, json){
    const time = new Date().toLocaleTimeString('en-US', timeOptions["Australia"]);
    console.log("Current time:", time);

    const currInput = input.toLowerCase();
    let result = [];
    Object.entries(keywords).map( word =>{
        let currKeywords = word[1].toLowerCase();
        if(currKeywords.includes(currInput)){
            json[word[0]].forEach(city =>{
                result.push(city);
            })
        }
    });
    return result;
}

function recommendationResult(data){
    const resultCard = document.getElementById('recommendations');
    resultCard.innerHTML = '';
    data.forEach(element =>{
        resultCard.innerHTML+=`
        <div class="card border-0" style="margin:20px">
        <img src="${element.imageUrl}" class="card-img-top" alt="...">
        <div class="card-body">
        <h5 class="card-title">${element.name}</h5>
        <p class="card-text">${element.description}</p>
        <p class="card-text"><small class="text-body-secondary">Last updated 3 mins ago</small></p>
        </div>
        </div>
        `;

    });
}

function clearResults(){
    document.getElementById("recommendations").innerHTML = '';
}

searchBtn.addEventListener("click", fetchApi);
clearBtn.addEventListener("click", clearResults);
