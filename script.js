const plank = document.getElementById("seesaw-plank");

plank.addEventListener("click", function(event){
    const center=300;
    const distance=event.offsetX-center;
    const newWeight={
        weight:5,
        position:distance
    };
    state.placedObjects.push(newWeight);
    drawBox(newWeight);
    calculateBalance();
})

function drawBox(obj){
    const div=document.createElement("div");
    div.innerText=obj.weight + 'kg';
    div.className='weight-item';
    const leftPos=obj.position+300;
    div.style.left=leftPos+'px';
    plank.appendChild(div);
}

function calculateBalance(){
    let leftTorque = 0;
    let rightTorque = 0;
    state.placedObjects.forEach(obj => {
        if (obj.position < 0) {
            leftTorque += obj.weight * Math.abs(obj.position);
        } else {
            rightTorque += obj.weight * obj.position;
        }
    });
    let angle =(rightTorque-leftTorque)/100
    angle = Math.max(-30, Math.min(30, angle));
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
