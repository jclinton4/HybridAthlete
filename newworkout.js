const addMovementButton = document.getElementById("addMovement");
const workoutContainer = document.getElementById('workoutList');
const movementName = document.getElementById('movementName');
const setsInput = document.getElementById('sets');
const repsInput = document.getElementById('reps');
const weightInput = document.getElementById('weight');
const clearWorkout = document.getElementById('clear');

const workouts = JSON.parse(localStorage.getItem("workouts")) || [];
let currentWorkout = {};

const clearForm = () => {
    console.log("Entered Clearform")
    workouts.splice(0,workouts.length);
    currentWorkout = {};
    localStorage.removeItem("workouts");
    workoutContainer.innerHTML = "";
};

const addOrUpdateWorkout = () => {
    console.log(workouts);
    console.log(currentWorkout);
    const workoutArrIndex = workouts.findIndex((item) => item.id === currentWorkout.id);
    const workoutObj = {
        id: `${movementName.value.split(" ").join("-")}-${Date.now()}`,
        exercise: movementName.value,
        sets: setsInput.value,
        reps: repsInput.value,
        weight: weightInput.value
    };

    if (workoutArrIndex === -1) {
        workouts.unshift(workoutObj);
    } else {
        workouts[workoutArrIndex] = workoutObj;
    }

    localStorage.setItem("workouts", JSON.stringify(workouts));
    updateWorkoutContainer();
};

const updateWorkoutContainer = () => {
    workoutContainer.innerHTML = (`
    <div>
        <button onclick="clearForm(this)" type="button" class="btn">Delete All</button>
    </div>
    `);

    workouts.forEach(
        ({id, exercise, sets, reps, weight}) => {
            (workoutContainer.innerHTML += `
            <div class="task" id="${id}">
                <p><strong>Movement:</strong> ${exercise}</p>
                <p><strong>Sets:</strong> ${sets}</p>
                <p><strong>Reps:</strong> ${reps}</p>
                <p><strong>Weight:</strong> ${weight}</p>
                <button onclick="editWorkout(this)" type="button" class="btn">Edit</button>
                <button onclick="deleteWorkout(this)" type="button" class="btn">Delete</button> 
            </div>
            `)
        }
    );
};

const deleteWorkout = (buttonEl) => {
    const workoutArrIndex = workouts.findIndex((item) => item.id === buttonEl.parentElement.id);
    buttonEl.parentElement.remove();
    workouts.splice(workoutArrIndex, 1);
    if (workouts.length < 1) {
        workoutContainer.innerHTML = "";
    }
    localStorage.setItem("workouts", JSON.stringify(workouts));
}

const editWorkout = (buttonEl) => {
    const workoutArrIndex = workouts.findIndex((item) => item.id === buttonEl.parentElement.id);

    currentWorkout = workouts[workoutArrIndex];
    movementName.value = currentWorkout.exercise;
    setsInput.value = currentWorkout.sets;
    repsInput.value = currentWorkout.reps;
    weightInput.value = currentWorkout.weight;
}

addMovementButton.addEventListener("click", (e) => {
    e.preventDefault();
    addOrUpdateWorkout();
});