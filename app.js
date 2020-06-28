const canvas =  document.querySelector("#jsCanvas"),
    ctx = canvas.getContext("2d"),
    colors = document.querySelectorAll(".jsColor"),
    rangeInput = document.querySelector("#jsRange"),
    mode = document.querySelector("#jsMode"),
    saveBtn = document.querySelector("#jsSave");

const INITIAL_COLOR = "#2c2c2c",
    CANVAS_SIZE = 530;

canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

ctx.fillStyle = "white";
ctx.fillRect(0, 0, canvas.width, canvas.height);
ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle =  INITIAL_COLOR;
ctx.lineWidth = "6.0";

let painting = false,
    filling = false;

function stopPainting(){
    painting = false;
}

function startPainting(){
    if (filling){
        ctx.fillRect(0, 0, canvas.width, canvas.height);
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
    const color = event.target.style.backgroundColor;
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
}

function handleRangeChange(event){
    const penSize = rangeInput.value;
    ctx.lineWidth = penSize;
}

function handleModeClick(event){
    if (filling){
        filling = false;
        mode.innerText = "Fill";
        canvas.style.cursor = "auto";
    } else{
        filling = true;
        mode.innerText = "Paint";
        canvas.style.cursor = "pointer";
    }
}

function handleCanvasFill(){
    if(filling){
        ctx.fillRect(0, 0, canvas.width, canvas.height);
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