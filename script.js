let drawArea = document.querySelector(".drawArea");
drawArea.style.backgroundColor = "white";

function createRow(userSize){
   let row = document.createElement("div");
   row.classList.add("row");
   
   for (numBoxes=0; numBoxes < userSize; numBoxes++){
       let box = document.createElement("div");
       box.classList.add("box");
       box.style.backgroundColor = "white";
       
        //set size of boxes and rows
       let width = (100 / userSize)+ "%"; 
       row.style.height = width;
       box.style.width = width;
       
       row.appendChild(box);
       drawArea.appendChild(row);
    } 
}

function createArea(userSize){
    for(numRows=0; numRows < userSize; numRows++){
    createRow(userSize);
    }
}

function trailEffect(){
    let boxes = document.querySelectorAll(".box");
    boxes.forEach(box => box.addEventListener("mouseover", (e)=>{
        if (rainbow == true){
            let randomColor = "#" + Math.floor(Math.random()*16777215).toString(16);
            box.style.backgroundColor = randomColor;
            box.style.opacity = 1;
        }
        else if (shade == true){
            box.style.backgroundColor = "black";
            if (e.target.style.opacity <= 0){
                e.target.style.opacity = e.target.style.opacity + 0.1;
            }
            else if (e.target.style.opacity <=0.9){
                let currentOpacity = e.target.style.opacity;
                let newOpacity = parseFloat(currentOpacity) + 0.1;
                e.target.style.opacity = newOpacity;
            }
            else {
                e.target.style.opacity = 0;
            }
        }
        else{
            box.style.backgroundColor = "black";
            box.style.opacity = 1;
        }
    }));

    let clear = document.getElementById("clear");
    clear.addEventListener("click", ()=>{
        drawArea.style.backgroundColor = "white";
        boxes.forEach(box => {
            box.style.backgroundColor = "white";
            box.style.opacity = null; 
        });
    });
}

//toggle rainbow button
let rainbow = false;
let rainbowButton = document.getElementById("rainbow");
rainbowButton.addEventListener("click",()=>{
    if (rainbow == false & shade == false){
        rainbow = true;
        rainbowButton.style.backgroundColor = "lightgreen";
    }
    else if (rainbow == true){ 
        rainbow = false;
        rainbowButton.style.backgroundColor = "";
    }
});

//toggle shade button
let shade = false;
let shadeButton = document.getElementById("shade");
shadeButton.addEventListener("click",()=>{
    if (shade == false & rainbow == false){
        shade = true;
        shadeButton.style.backgroundColor = "lightgreen";
    }
    else if (shade == true){
        shade = false;
        shadeButton.style.backgroundColor = "";
    }
});

//toggle grinch button
let grinchButton = document.getElementById("grinch");
grinchButton.addEventListener("click", ()=>{
    drawArea.style.backgroundColor = null;
    let boxes = document.querySelectorAll(".box");
    boxes.forEach(box => {
        box.style.backgroundColor = null;
        box.style.opacity = null; 
    })
});

//create the inital drawing area
let gridSizer = document.getElementById("gridSizer");
createArea(gridSizer.value);
trailEffect();

gridSizer.addEventListener("change", ()=>{
    let rows = document.querySelectorAll(".row");
    rows.forEach(row => row.remove());

    createArea(gridSizer.value);
    trailEffect(); 
    drawArea.style.backgroundColor = "white";
});