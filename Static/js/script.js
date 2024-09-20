const foodList = [
    ["egg mcmuffin", 30],
    ["french fries", 47],
    ["apple", 15],
    ["banana", 27],
    ["chicken breast", 0],
    ["rice", 45],
    ["bread slice", 15],
    ["pizza slice", 30],
    ["chocolate chip cookie", 20],
    ["hershey's bar", 24],
    ["reese's cup", 13],
    ["m&m's", 31]
];

const form = document.getElementById('insulin-form');
const foodInput = document.getElementById('food');
const foodSuggestions = document.getElementById('food-suggestions');
const addFoodButton = document.getElementById('add-food');
const foodListElement = document.getElementById('food-list');
const resultsDiv = document.getElementById('results');
const resetButton = document.getElementById('reset-calculation');

let trackedFoods = [];
let totalCarbs = 0;

addFoodButton.addEventListener('click', addFood);
form.addEventListener('submit', calculateDosage);
foodInput.addEventListener('input', updateSuggestions);
foodInput.addEventListener('focus', showSuggestions);
foodInput.addEventListener('blur', () => setTimeout(hideSuggestions, 200));
resetButton.addEventListener('click', resetCalculation);

function loadTrackedFoods() {
    trackedFoods = JSON.parse(localStorage.getItem('trackedFoods')) || [];
    updateFoodList();
}

function updateFoodList() {
    foodListElement.innerHTML = '';
    totalCarbs = 0;
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
        foodListElement.appendChild(li);
        totalCarbs += food.carbs;
    });
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
    updateFoodList();
    saveTrackedFoods();
}

function saveTrackedFoods() {
    localStorage.setItem('trackedFoods', JSON.stringify(trackedFoods));
}

function addFood() {
    const foodName = foodInput.value.trim().toLowerCase();
    const food = foodList.find(item => item[0].toLowerCase() === foodName);

    if (food) {
        trackedFoods.push({ name: food[0], carbs: food[1] });
        updateFoodList();
        saveTrackedFoods();
        foodInput.value = '';
        showTrackingStatus(addFoodButton);
    } else {
        alert('Food not found in the database. Please try another item.');
    }
}

function updateSuggestions() {
    const input = foodInput.value.toLowerCase();
    const filteredFoods = foodList.filter(food => food[0].toLowerCase().includes(input));

    if (input.length > 0 && filteredFoods.length > 0) {
        showSuggestions(filteredFoods);
    } else {
        hideSuggestions();
    }
}

function showSuggestions(foods) {
    foodSuggestions.innerHTML = '';
    foods.forEach(food => {
        const li = document.createElement('li');
        li.textContent = `${food[0]} (${food[1]}g carbs)`;
        li.addEventListener('click', () => {
            foodInput.value = food[0];
            hideSuggestions();
        });
        foodSuggestions.appendChild(li);
    });
    foodSuggestions.style.display = 'block';
}

function hideSuggestions() {
    foodSuggestions.style.display = 'none';
}

function calculateDosage(e) {
    e.preventDefault();

    const currentBloodSugar = parseFloat(document.getElementById('current-blood-sugar').value);
    const targetBloodSugar = parseFloat(document.getElementById('target-blood-sugar').value);
    const correctionFactor = parseFloat(document.getElementById('correction-factor').value);
    const insulinToCarbRatio = parseFloat(document.getElementById('insulin-to-carb-ratio').value);

    const baseInsulinDosage = totalCarbs / insulinToCarbRatio;
    const correctionDose = Math.round((currentBloodSugar - targetBloodSugar) / correctionFactor);
    const totalInsulinDosage = baseInsulinDosage + correctionDose;

    document.getElementById('total-carbs').textContent = totalCarbs;
    document.getElementById('base-dosage').textContent = baseInsulinDosage.toFixed(2);
    document.getElementById('correction-dose').textContent = correctionDose;
    document.getElementById('total-dosage').textContent = totalInsulinDosage.toFixed(2);

    resultsDiv.classList.remove('hidden');
}

function resetCalculation() {
    // Clear tracked foods
    trackedFoods = [];
    updateFoodList();
    saveTrackedFoods();

    // Clear form inputs
    form.reset();
    foodInput.value = '';

    // Hide results
    resultsDiv.classList.add('hidden');
}

document.addEventListener('DOMContentLoaded', loadTrackedFoods);