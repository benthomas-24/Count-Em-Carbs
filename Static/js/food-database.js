const foodDatabaseList = document.getElementById('food-database-list');
const foodSearch = document.getElementById('food-search');
const trackedFoodsList = document.getElementById('tracked-foods-list');
const totalTrackedCarbs = document.getElementById('total-tracked-carbs');

let trackedFoods = JSON.parse(localStorage.getItem('trackedFoods')) || [];
let foodDatabase = [];

const NUTRITIONIX_APP_ID = os.env(NUTRITIONIX_API_ID);
const NUTRITIONIX_API_KEY = os.env(NUTRITIONIX_API_KEY);

async function searchNutritionix(query) {
    const url = 'https://trackapi.nutritionix.com/v2/natural/nutrients';
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'x-app-id': NUTRITIONIX_APP_ID,
            'x-app-key': NUTRITIONIX_API_KEY,
        },
        body: JSON.stringify({ query: query }),
    });
    const data = await response.json();
    return data.foods;
}

async function loadFoodDatabase() {
    try {
        const commonFoods = ['apple', 'banana', 'chicken breast', 'rice', 'bread'];
        for (const food of commonFoods) {
            const results = await searchNutritionix(food);
            if (results && results.length > 0) {
                foodDatabase.push({
                    name: results[0].food_name,
                    carbs: Math.round(results[0].nf_total_carbohydrate)
                });
            }
        }
    } catch (error) {
        console.error('Error loading food database:', error);
    }

    // Add local food list as fallback
    const localFoodList = [
        { name: "French fries", carbs: 47 },
        { name: "Pizza slice", carbs: 30 },
        { name: "Chocolate chip cookie", carbs: 20 },
        // Add more items from your local list
    ];

    foodDatabase = [...foodDatabase, ...localFoodList];
    displayFoods(foodDatabase);
}

function displayFoods(foods) {
    foodDatabaseList.innerHTML = '';
    foods.forEach(food => {
        const li = document.createElement('li');
        li.innerHTML = `
            ${food.name} (${food.carbs}g carbs)
            <button class="track-button" data-food="${food.name}" data-carbs="${food.carbs}">Add item</button>
            <span class="tracking-status"></span>
        `;
        foodDatabaseList.appendChild(li);
    });
    addTrackButtonListeners();
}

function addTrackButtonListeners() {
    const trackButtons = document.querySelectorAll('.track-button');
    trackButtons.forEach(button => {
        button.addEventListener('click', function() {
            const foodName = this.getAttribute('data-food');
            const foodCarbs = parseFloat(this.getAttribute('data-carbs'));
            trackFood(foodName, foodCarbs, this);
        });
    });
}

function trackFood(name, carbs, button) {
    trackedFoods.push({ name, carbs });
    updateTrackedFoodsList();
    saveTrackedFoods();
    showTrackingStatus(button);
}

function updateTrackedFoodsList() {
    trackedFoodsList.innerHTML = '';
    let totalCarbs = 0;
    trackedFoods.forEach((food, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <div class="tracked-food-item">
                <span class="food-info">${food.name} (${food.carbs}g carbs)</span>
                <button class="remove-button" data-index="${index}">
                    <span class="remove-icon">×</span>
                </button>
            </div>
        `;
        trackedFoodsList.appendChild(li);
        totalCarbs += food.carbs;
    });
    totalTrackedCarbs.textContent = totalCarbs.toFixed(1);
    addRemoveButtonListeners();
}

function addRemoveButtonListeners() {
    const removeButtons = document.querySelectorAll('.remove-button');
    removeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const index = parseInt(this.getAttribute('data-index'));
            removeTrackedFood(index);
        });
    });
}

function removeTrackedFood(index) {
    trackedFoods.splice(index, 1);
    updateTrackedFoodsList();
    saveTrackedFoods();
}

function saveTrackedFoods() {
    localStorage.setItem('trackedFoods', JSON.stringify(trackedFoods));
}

foodSearch.addEventListener('input', async (e) => {
    const searchQuery = e.target.value;
    if (searchQuery.length > 0) {
        const apiResults = await searchNutritionix(searchQuery);
        const apiFoods = apiResults.map(food => ({
            name: food.food_name,
            carbs: Math.round(food.nf_total_carbohydrate)
        }));
        const localFoods = foodDatabase.filter(food =>
            food.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
        const filteredFoods = [...apiFoods, ...localFoods];
        displayFoods(filteredFoods);
    } else {
        displayFoods(foodDatabase);
    }
});

function showTrackingStatus(button) {
    const statusDiv = document.createElement('div');
    statusDiv.className = 'tracking-status';
    statusDiv.innerHTML = '<span>A</span><span>d</span><span>d</span><span>e</span><span>d</span><span>!</span>';
    button.parentNode.insertBefore(statusDiv, button.nextSibling);
    setTimeout(() => {
        statusDiv.remove();
    }, 2000);
}

document.addEventListener('DOMContentLoaded', () => {
    loadFoodDatabase();
    loadTrackedFoods();
});