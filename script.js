const CONFIG = {
    PLANK_WIDTH: 600,
    PLANK_CENTER: 300,
    MAX_ANGLE: 30
};

const plank = document.getElementById("seesaw-plank");

let state = {
    placedObjects: [],
    nextWeight: null
};

const wrapper = document.querySelector(".seesaw-wrapper");
const previewBox = document.getElementById("next-weight-box");
const wooshSound = new Audio("sound/swing-woosh.wav");
const landSound = new Audio("sound/pots_and_cans_49.wav");

function generateNextWeight() {
    const randomWeight = Math.floor(Math.random() * 10) + 1;
    state.nextWeight = { weight: randomWeight, position: 0 };
    previewBox.textContent = randomWeight;
}

function applyStyleToBox(div, weight) {
    const size = 30 + (weight - 1) * 5;
    div.style.width = size + 'px';
    div.style.height = size + 'px';
    const colors = [
        "#a38e31ff", "#023b1aff", "#3498db", "#18dfadff", "#bf10ebff",
        "#f1c40f", "#e67e22", "#e61700ff", "#c0392b", "#e739c2ff"
    ];
    div.style.backgroundColor = colors[weight - 1];
}

wrapper.addEventListener("click", function (event) {
    if (event.target !== plank) return;
    const clickX = event.clientX;
    const screenCenter = window.innerWidth / 2;
    const distance = clickX - screenCenter;

    const newWeight = {
        weight: state.nextWeight.weight,
        position: distance
    };

    state.placedObjects.push(newWeight);
    wooshSound.currentTime = 0;
    wooshSound.play();
    drawBox(newWeight, true);
    calculateBalance();
    saveData();
    generateNextWeight();
})

function drawBox(obj, isNew = false) {
    const div = document.createElement("div");
    div.innerText = obj.weight + 'kg';
    div.className = 'weight-item';

    if (isNew) {
        div.classList.add('falling');
        div.addEventListener('animationend', function () {
            landSound.currentTime = 0;
            landSound.play();
        });
    }

    applyStyleToBox(div, obj.weight);

    const leftPos = obj.position + 300;
    div.style.left = leftPos + 'px';
    plank.appendChild(div);
}

function calculateBalance() {
    let leftTorque = 0;
    let rightTorque = 0;
    let leftWeightSum = 0;
    let rightWeightSum = 0;

    state.placedObjects.forEach(obj => {
        if (obj.position < 0) {
            leftTorque += obj.weight * Math.abs(obj.position);
            leftWeightSum += obj.weight;
        } else {
            rightTorque += obj.weight * obj.position;
            rightWeightSum += obj.weight;
        }
    });

    document.getElementById("left-weight").textContent = leftWeightSum;
    document.getElementById("right-weight").textContent = rightWeightSum;

    const angle = Math.max(-30, Math.min(30, (rightTorque - leftTorque) / 10));
    document.getElementById("tilt-angle").textContent = angle;
    plank.style.transform = `rotate(${angle}deg)`;
}

function saveData() {
    localStorage.setItem('seesawData', JSON.stringify(state.placedObjects));
}
function loadData() {
    const data = localStorage.getItem('seesawData');
    if (data) {
        state.placedObjects = JSON.parse(data);
        state.placedObjects.forEach(drawBox);
        calculateBalance();
    }
}

const resetBtn = document.getElementById("reset-btn");
resetBtn.addEventListener("click", function () {
    state.placedObjects = [];
    const boxes = document.querySelectorAll('.weight-item');
    boxes.forEach(box => box.remove());
    calculateBalance();
    saveData();
});

loadData();
if (!state.nextWeight) {
    generateNextWeight();
}
