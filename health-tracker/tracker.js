// Data structure
// BMI = 68 / (1.665^2) = 24.5 (Normal weight)
// Maintenance calories for 34yr, 68kg, 166.5cm: ~1800-2000 cal/day
let data = {
    calorieGoal: 1900, // Adjusted for maintenance at your stats
    waterGoal: 4.0, // 4 liters per day
    stepsGoal: 10000, // 10,000 steps per day
    sleepGoal: 7.5, // 7-8 hours per day
    foods: [],
    workouts: [],
    waterIntake: 0,
    steps: 0,
    sleepHours: 0,
    habits: [],
    history: []
};

// Initialize app
document.addEventListener('DOMContentLoaded', () => {
    loadData();
    updateDate();
    updateDisplay();
    loadGoalInput();
});

// Update current date display
function updateDate() {
    const dateElement = document.getElementById('currentDate');
    const today = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    dateElement.textContent = today.toLocaleDateString('en-US', options);
}

// Load data from localStorage
function loadData() {
    const savedData = localStorage.getItem('foodTrackerData');
    const today = new Date().toDateString();
    
    if (savedData) {
        data = JSON.parse(savedData);
        
        // Ensure data structure has all required fields
        if (!data.waterGoal) data.waterGoal = 4.0;
        if (!data.stepsGoal) data.stepsGoal = 10000;
        if (!data.sleepGoal) data.sleepGoal = 7.5;
        if (!data.workouts) data.workouts = [];
        if (!data.waterIntake) data.waterIntake = 0;
        if (!data.steps) data.steps = 0;
        if (!data.sleepHours) data.sleepHours = 0;
        if (!data.history) data.history = [];
        
        // Fix old workout entries that might not have proper structure
        if (data.workouts && data.workouts.length > 0) {
            data.workouts = data.workouts.map(w => {
                if (!w.name && w.type) {
                    w.name = w.details ? `${w.type} - ${w.details}` : w.type;
                }
                if (!w.id) w.id = Date.now() + Math.random();
                return w;
            });
        }
        
        // Check if it's a new day
        const lastDate = localStorage.getItem('lastAccessDate');
        
        if (lastDate && lastDate !== today) {
            // Save yesterday's data to history
            if (data.foods.length > 0 || data.workouts.length > 0 || data.steps > 0 || data.sleepHours > 0 || data.waterIntake > 0) {
                const totalCal = data.foods.reduce((sum, f) => sum + f.calories, 0);
                const totalBurn = data.workouts.reduce((sum, w) => sum + w.calories, 0);
                
                data.history.push({
                    date: lastDate,
                    foods: [...data.foods],
                    workouts: [...data.workouts],
                    waterIntake: data.waterIntake,
                    steps: data.steps,
                    sleepHours: data.sleepHours,
                    habits: [...data.habits],
                    totalCalories: totalCal,
                    totalBurned: totalBurn
                });
            }
            
            // Reset daily data
            data.foods = [];
            data.workouts = [];
            data.waterIntake = 0;
            data.steps = 0;
            data.sleepHours = 0;
            data.habits.forEach(habit => habit.completed = false);
            
            saveData();
        }
    }
    
    localStorage.setItem('lastAccessDate', today);
}

// Save data to localStorage
function saveData() {
    localStorage.setItem('foodTrackerData', JSON.stringify(data));
    localStorage.setItem('lastAccessDate', new Date().toDateString());
}

// Add food item
function addFood() {
    const nameInput = document.getElementById('foodName');
    const caloriesInput = document.getElementById('foodCalories');
    const mealTypeSelect = document.getElementById('mealType');
    
    const name = nameInput.value.trim();
    const calories = parseInt(caloriesInput.value);
    const mealType = mealTypeSelect.value;
    
    if (!name || !calories || calories < 0) {
        alert('Please enter valid food name and calories');
        return;
    }
    
    const food = {
        id: Date.now(),
        name,
        calories,
        mealType,
        timestamp: new Date().toISOString()
    };
    
    data.foods.push(food);
    saveData();
    updateDisplay();
    
    // Clear inputs
    nameInput.value = '';
    caloriesInput.value = '';
}

// Delete food item
function deleteFood(id) {
    data.foods = data.foods.filter(food => food.id !== id);
    saveData();
    updateDisplay();
}

// Add workout
function addWorkout() {
    const typeSelect = document.getElementById('workoutType');
    const detailsInput = document.getElementById('workoutDetails');
    const durationInput = document.getElementById('workoutDuration');
    const caloriesInput = document.getElementById('workoutCalories');
    
    const type = typeSelect.value;
    const details = detailsInput.value.trim();
    const duration = parseInt(durationInput.value);
    const calories = parseInt(caloriesInput.value);
    
    if (!type) {
        alert('Please select a workout type');
        return;
    }
    
    if (!duration || !calories || duration < 0 || calories < 0) {
        alert('Please enter valid duration and calories');
        return;
    }
    
    // Combine type and details for display
    const name = details ? `${type} - ${details}` : type;
    
    const workout = {
        id: Date.now(),
        name,
        type,
        details,
        duration,
        calories,
        timestamp: new Date().toISOString()
    };
    
    data.workouts.push(workout);
    saveData();
    updateDisplay();
    
    // Clear inputs
    typeSelect.value = '';
    detailsInput.value = '';
    durationInput.value = '';
    caloriesInput.value = '';
}

// Delete workout
function deleteWorkout(id) {
    data.workouts = data.workouts.filter(workout => workout.id !== id);
    saveData();
    updateDisplay();
}

// Add water intake
function addWater(amount) {
    data.waterIntake += amount;
    if (data.waterIntake > 10) data.waterIntake = 10; // Max 10L cap
    saveData();
    updateDisplay();
}

// Reset water intake
function resetWater() {
    if (confirm('Reset water intake to 0?')) {
        data.waterIntake = 0;
        saveData();
        updateDisplay();
    }
}

// Add steps
function addSteps() {
    const stepsInput = document.getElementById('stepsInput');
    const steps = parseInt(stepsInput.value);
    
    if (!steps || steps < 0) {
        alert('Please enter valid number of steps');
        return;
    }
    
    data.steps += steps;
    if (data.steps > 100000) data.steps = 100000; // Max 100k cap
    saveData();
    updateDisplay();
    
    stepsInput.value = '';
}

// Set sleep hours
function setSleep() {
    const sleepInput = document.getElementById('sleepInput');
    const hours = parseFloat(sleepInput.value);
    
    if (!hours || hours < 0 || hours > 24) {
        alert('Please enter valid sleep hours (0-24)');
        return;
    }
    
    data.sleepHours = hours;
    saveData();
    updateDisplay();
    
    sleepInput.value = '';
}

// Add habit
function addHabit() {
    const habitInput = document.getElementById('habitName');
    const habitName = habitInput.value.trim();
    
    if (!habitName) {
        alert('Please enter a habit name');
        return;
    }
    
    const habit = {
        id: Date.now(),
        name: habitName,
        completed: false
    };
    
    data.habits.push(habit);
    saveData();
    updateDisplay();
    
    habitInput.value = '';
}

// Toggle habit completion
function toggleHabit(id) {
    const habit = data.habits.find(h => h.id === id);
    if (habit) {
        habit.completed = !habit.completed;
        saveData();
        updateDisplay();
    }
}

// Delete habit
function deleteHabit(id) {
    data.habits = data.habits.filter(habit => habit.id !== id);
    saveData();
    updateDisplay();
}

// Calculate total calories consumed
function calculateTotalCalories() {
    return data.foods.reduce((total, food) => total + food.calories, 0);
}

// Calculate total calories burned
function calculateTotalBurned() {
    return data.workouts.reduce((total, workout) => total + workout.calories, 0);
}

// Calculate net calories
// Update history display
function updateHistoryDisplay() {
    const historyList = document.getElementById('history-list');
    
    if (!data.history || data.history.length === 0) {
        historyList.innerHTML = '<p style="color: #999; font-style: italic; text-align: center; padding: 20px;">No history yet. Data will appear here after the first day.</p>';
        return;
    }
    
    // Sort history by date (newest first)
    const sortedHistory = [...data.history].reverse();
    
    historyList.innerHTML = sortedHistory.map(day => {
        const netCal = day.totalCalories - day.totalBurned;
        return `
            <div class="history-item">
                <div class="history-date">${day.date}</div>
                <div class="history-stats">
                    <span>🍎 ${day.totalCalories} cal</span>
                    <span>🔥 ${day.totalBurned} cal</span>
                    <span>📊 Net: ${netCal} cal</span>
                    <span>💧 ${day.waterIntake.toFixed(1)}L</span>
                    <span>🚶 ${day.steps.toLocaleString()} steps</span>
                    <span>😴 ${day.sleepHours.toFixed(1)}h</span>
                    <span>💪 ${day.workouts.length} workouts</span>
                </div>
            </div>
        `;
    }).join('');
}

function calculateNetCalories() {
    return calculateTotalCalories() - calculateTotalBurned();
}

// Update all displays
function updateDisplay() {
    updateCalorieDisplay();
    updateWaterDisplay();
    updateStepsDisplay();
    updateSleepDisplay();
    updateHabitDisplay();
    updateFoodLists();
    updateWorkoutList();
    updateHabitsList();
    updateHistoryDisplay();
}

// Update calorie display
function updateCalorieDisplay() {
    const totalCalories = calculateTotalCalories();
    const totalBurned = calculateTotalBurned();
    const netCalories = calculateNetCalories();
    
    const totalCalEl = document.getElementById('totalCalories');
    const totalBurnedEl = document.getElementById('totalBurned');
    const netCalEl = document.getElementById('netCalories');
    const goalEl = document.getElementById('calorieGoal');
    
    if (totalCalEl) totalCalEl.textContent = totalCalories;
    if (totalBurnedEl) totalBurnedEl.textContent = totalBurned;
    if (netCalEl) netCalEl.textContent = netCalories;
    if (goalEl) goalEl.textContent = data.calorieGoal;
    
    // Color code based on net calories vs goal
    const netElement = document.getElementById('netCalories');
    if (netCalories > data.calorieGoal) {
        netElement.style.color = '#f56565';
    } else if (netCalories > data.calorieGoal * 0.8) {
        netElement.style.color = '#ed8936';
    } else {
        netElement.style.color = 'white';
    }
}

// Update water display
function updateWaterDisplay() {
    const waterElement = document.getElementById('waterIntake');
    if (!waterElement) return;
    waterElement.textContent = data.waterIntake.toFixed(1) + 'L';
    
    // Color code based on goal
    const percentage = (data.waterIntake / data.waterGoal) * 100;
    if (percentage >= 100) {
        waterElement.style.color = '#48bb78';
    } else if (percentage >= 75) {
        waterElement.style.color = '#ed8936';
    } else {
        waterElement.style.color = 'white';
    }
}
// Update steps display
function updateStepsDisplay() {
    const stepsElement = document.getElementById('stepsCount');
    if (!stepsElement) return;
    stepsElement.textContent = data.steps.toLocaleString();
    
    // Color code based on goal
    const percentage = (data.steps / data.stepsGoal) * 100;
    if (percentage >= 100) {
        stepsElement.style.color = '#48bb78';
    } else if (percentage >= 75) {
        stepsElement.style.color = '#ed8936';
    } else {
        stepsElement.style.color = 'white';
    }
}

// Update sleep display
function updateSleepDisplay() {
    const sleepElement = document.getElementById('sleepHours');
    if (!sleepElement) return;
    sleepElement.textContent = data.sleepHours.toFixed(1) + 'h';
    
    // Color code based on goal (7-8 hours is optimal)
    if (data.sleepHours >= 7 && data.sleepHours <= 8) {
        sleepElement.style.color = '#48bb78';
    } else if (data.sleepHours >= 6 && data.sleepHours <= 9) {
        sleepElement.style.color = '#ed8936';
    } else if (data.sleepHours > 0) {
        sleepElement.style.color = '#f56565';
    } else {
        sleepElement.style.color = 'white';
    }
}


// Update habit completion display
function updateHabitDisplay() {
    const completedCount = data.habits.filter(h => h.completed).length;
    const totalCount = data.habits.length;
    const habitElement = document.getElementById('habitsCompleted');
    if (!habitElement) return;
    habitElement.textContent = `${completedCount}/${totalCount}`;
}

// Update food lists by meal type
function updateFoodLists() {
    const mealTypes = ['breakfast', 'lunch', 'dinner', 'snack', 'pre-workout', 'post-workout'];
    
    mealTypes.forEach(mealType => {
        const listElement = document.getElementById(`${mealType}-list`);
        const mealFoods = data.foods.filter(food => food.mealType === mealType);
        
        if (mealFoods.length === 0) {
            listElement.innerHTML = '<li style="color: #999; font-style: italic;">No items yet</li>';
        } else {
            listElement.innerHTML = mealFoods.map(food => `
                <li class="food-item">
                    <span class="food-name">${food.name}</span>
                    <span class="food-calories">${food.calories} cal</span>
                    <button class="delete-btn" onclick="deleteFood(${food.id})">×</button>
                </li>
            `).join('');
        }
    });
}

// Update workout list
function updateWorkoutList() {
    const listElement = document.getElementById('workout-list');
    
    console.log('updateWorkoutList called');
    console.log('Workouts:', data.workouts);
    console.log('List element:', listElement);
    
    if (!listElement) {
        console.error('workout-list element not found!');
        return;
    }
    
    if (data.workouts.length === 0) {
        listElement.innerHTML = '<li style="color: #999; font-style: italic; padding: 15px;">No workouts logged yet</li>';
    } else {
        listElement.innerHTML = data.workouts.map(workout => `
            <li class="workout-item">
                <div class="workout-info">
                    <span class="workout-name">${workout.name}</span>
                    <span class="workout-duration">${workout.duration} min</span>
                </div>
                <div class="workout-calories">
                    <span class="calories-burned">-${workout.calories} cal</span>
                    <button class="delete-btn" onclick="deleteWorkout(${workout.id})">×</button>
                </div>
            </li>
        `).join('');
        console.log('Workout list updated with', data.workouts.length, 'workouts');
    }
}

// Update habits list
function updateHabitsList() {
    const listElement = document.getElementById('habits-list');
    
    if (data.habits.length === 0) {
        listElement.innerHTML = '<li style="color: #999; font-style: italic; padding: 15px;">No habits added yet</li>';
    } else {
        listElement.innerHTML = data.habits.map(habit => `
            <li class="habit-item ${habit.completed ? 'completed' : ''}">
                <input type="checkbox" 
                       class="habit-checkbox" 
                       ${habit.completed ? 'checked' : ''} 
                       onchange="toggleHabit(${habit.id})">
                <span class="habit-text">${habit.name}</span>
                <button class="delete-btn" onclick="deleteHabit(${habit.id})">×</button>
            </li>
        `).join('');
    }
}

// Load goal into input
function loadGoalInput() {
    document.getElementById('goalInput').value = data.calorieGoal;
}

// Update calorie goal
function updateGoal() {
    const goalInput = document.getElementById('goalInput');
    const newGoal = parseInt(goalInput.value);
    
    if (!newGoal || newGoal < 0) {
        alert('Please enter a valid calorie goal');
        return;
    }
    
    data.calorieGoal = newGoal;
    saveData();
    updateDisplay();
    alert('Calorie goal updated!');
}

// Clear today's data
function clearToday() {
    if (confirm('Are you sure you want to clear today\'s data? This cannot be undone.')) {
        data.foods = [];
        data.habits.forEach(habit => habit.completed = false);
        saveData();
        updateDisplay();
    }

// Debug function to show current data
function debugData() {
    console.log('=== DEBUG DATA ===');
    console.log('Workouts:', data.workouts);
    console.log('Workouts length:', data.workouts ? data.workouts.length : 0);
    console.log('Total burned:', calculateTotalBurned());
    console.log('Full data:', data);
    
    alert(`Workouts in data: ${data.workouts ? data.workouts.length : 0}\nCheck console (F12) for details`);
    
    // Force update display
    updateDisplay();
}
}

// Export data as JSON
function exportData() {
    const exportData = {
        calorieGoal: data.calorieGoal,
        waterGoal: data.waterGoal,
        currentDate: new Date().toDateString(),
        todaysFoods: data.foods,
        todaysWorkouts: data.workouts,
        todaysWaterIntake: data.waterIntake,
        todaysHabits: data.habits,
        totalCalories: calculateTotalCalories(),
        totalBurned: calculateTotalBurned(),
        netCalories: calculateNetCalories(),
        history: data.history
    };
    
    const dataStr = JSON.stringify(exportData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `food-tracker-export-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    
    URL.revokeObjectURL(url);
}

// Allow Enter key to submit
document.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        const activeElement = document.activeElement;
        
        if (activeElement.id === 'foodName' || activeElement.id === 'foodCalories' || activeElement.id === 'mealType') {
            addFood();
        } else if (activeElement.id === 'workoutType' || activeElement.id === 'workoutDetails' || activeElement.id === 'workoutDuration' || activeElement.id === 'workoutCalories') {
            addWorkout();
        } else if (activeElement.id === 'stepsInput') {
            addSteps();
        } else if (activeElement.id === 'sleepInput') {
            setSleep();
        } else if (activeElement.id === 'habitName') {
            addHabit();
        } else if (activeElement.id === 'goalInput') {
            updateGoal();
        }
    }
});
