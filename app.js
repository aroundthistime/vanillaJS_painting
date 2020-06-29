const canvas =  document.querySelector("#jsCanvas"),
    ctx = canvas.getContext("2d"),
    colors = document.querySelectorAll(".jsColor"),
    rangeInput = document.querySelector("#jsRange"),
    mode = document.querySelector("#jsMode"),
    saveBtn = document.querySelector("#jsSave"),
    undo = document.querySelector("#jsUndo"),
    clearBtn = document.querySelector("#jsClear");

const INITIAL_COLOR = "#2c2c2c",
    CANVAS_SIZE = 530;

let currentColor = document.querySelector(".jsColor");
let history = [];

canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;


let painting = false,
    filling = false;

function saveCurrentCanvas(){
    if (canvas.toDataURL() != history[history.length-1]){
        history.push(canvas.toDataURL());
    }
}

function stopPainting(){
    painting = false;
    saveCurrentCanvas();
}

function startPainting(){
    if (filling){
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        saveCurrentCanvas();
    } else{
        painting = true;
    }
}

function onMouseMove(event){
    const x = event.offsetX;
    const y = event.offsetY;
    if(!painting){
        ctx.beginPath();
        ctx.moveTo(x, y);
    } else{
        ctx.lineTo(x, y);
        ctx.stroke();
    }
}

function changeColor(event){
    const colorBtn = event.target;
    const color = colorBtn.style.backgroundColor;
    currentColor.innerText = "";
    if (filling){
        colorBtn.innerText="🧺";
    } else{
        colorBtn.innerText='✏️';
    }
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
    currentColor = colorBtn;
}

function handleRangeChange(event){
    const penSize = rangeInput.value;
    ctx.lineWidth = penSize;
}

function handleModeClick(event){
    if (filling){
        filling = false;
        mode.innerText = "Fill";
        currentColor.innerText='✏️';
        canvas.style.cursor = 'url("pencil.png") 0 32, auto';
    } else{
        filling = true;
        mode.innerText = "Paint";
        canvas.style.cursor = 'url("fill.png") 0 32, auto';
        currentColor.innerText="🧺";
    }
}


function handleCM(event){
    event.preventDefault();
}

function handleSave(){
    const image = canvas.toDataURL();
    const link = document.createElement("a");
    link.href = image;
    link.download = "PaintJS IMG[🎨]";
    link.click();
}

function getLastStatus(){
    if(history.length === 1){
        return history[0];
    } else{
        return history.pop();
    }
}

function handleUndo(){
    if(history.length > 0){
        const prevStatus = getLastStatus();
        const prevImg = document.createElement("img");
        prevImg.src = prevStatus;
        prevImg.onload= function(){
            ctx.drawImage(prevImg,0, 0, CANVAS_SIZE, CANVAS_SIZE,0, 0, CANVAS_SIZE, CANVAS_SIZE);
        }
    }
    // while(history.length)
}

function handleClear(){
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = INITIAL_COLOR;
    ctx.fillStyle =  INITIAL_COLOR;
    ctx.lineWidth = "6.0";
}

handleClear();
history.push(canvas.toDataURL());

if (canvas){
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown",startPainting);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave",stopPainting);
    canvas.addEventListener("contextmenu", handleCM);
}

colors.forEach(function(color){
    color.addEventListener("click",changeColor);
});

if (rangeInput){
    rangeInput.addEventListener("change", handleRangeChange);

}

if(mode){
    mode.addEventListener("click", handleModeClick);
}

if(saveBtn){
    saveBtn.addEventListener("click", handleSave);
}

if(undo){
    undo.addEventListener("click", handleUndo);
}

if(clearBtn){
    clearBtn.addEventListener("click",handleClear);
}