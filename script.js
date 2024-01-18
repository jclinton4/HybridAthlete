const addStrengthButton = document.getElementById("addStrength");
const addWeightButton = document.getElementById("addWeight");
const workoutList = document.getElementById("workout-list");

const allWorkouts = [
    {
        movement: "Bench Press",
        sets: "5",
        reps: "5",
        weight: "225"
    },
    {
        movement: "Back Squat",
        sets: "5",
        reps: "5",
        weight: "315"
    },
];

let userData = {
    workouts: [...allWorkouts],
    currentWorkout: null,
    workoutCurrentTime: 0,
  };

const renderWorkouts = (array) => {
    const workoutsHTML = array
      .map((workout)=> {
        return `
        <li id="workout-${workout.id}" class="workout-list">
            <button class="workout-list-info">
                <span class="workout-list-movement">${workout.movement}</span>
            </button>
        </li>
      `;
    }).join("");
    workoutList.innerHTML = workoutsHTML;
};

renderWorkouts(userData?.workouts);