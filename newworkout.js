const addMovementButton = document.getElementById("addMovement");
const output = document.getElementById('workoutList');
const movementName = document.getElementById('movementName');
const sets = document.getElementById('sets');
const reps = document.getElementById('reps');
const weight = document.getElementById('weight');
const clearWorkout = document.getElementById('clear');

const workouts = [];

const clearForm = () => {
    console.log("Entered Clearform")
    workout = [];
    output.innerHTML = '';
    output.classList.add('hide');
};

addMovementButton.addEventListener("click", (e) => {
    e.preventDefault();
    const workoutObj = {
        id: `${movementName.value.split(" ").join("-")}-${Date.now()}`,
        exercise: movementName.value,
        sets: sets.value,
        reps: reps.value,
        weight: weight.value
    }

    workouts.unshift(workoutObj);

    workouts.forEach(({id, exercise, sets, reps, weight}) => {
        (output.innerHTML += `
            <div class="workout" id="${id}">
                <p><strong>Exercise: </strong>${exercise}</p>
                <p><strong>Sets: </strong>${sets}</p>
                <p><strong>Reps: </strong>${reps}</p>
                <p><strong>Weight: </strong>${weight}</p>
                <button type="button" class="btn">Edit</button>
                <button type="button" class="btn">Delete</button>
            </div>
        `)
    });

    output.classList.toggle("hide");
});