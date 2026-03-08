const CONFIG = {
    PLANK_WIDTH: 600,
    PLANK_CENTER: 300,
    MAX_ANGLE: 30
};

const plank = document.getElementById("seesaw-plank");

let state = {
    placedObjects: []
};

plank.addEventListener("click", function (event) {
    const center = 300;
    const distance = event.offsetX - center;
    const newWeight = {
        weight: 5,
        position: distance
    };
    state.placedObjects.push(newWeight);
    drawBox(newWeight);
    calculateBalance();
    saveData();
})

function drawBox(obj) {
    const div = document.createElement("div");
    div.innerText = obj.weight + 'kg';
    div.className = 'weight-item';
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

loadData();
