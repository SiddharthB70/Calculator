const buttons = document.querySelectorAll(".button");
const lowerDisplay = document.getElementById("lower");

let buttondown = false; //flag

window.onload = ()=>{
    buttons.forEach(function(button){
        button.classList.add("noselect");
        button.addEventListener("mousedown",buttonDown)
        ;
        window.addEventListener("mouseup",buttonUp);
        /*If mouse is dragged during mousedown, mouseup 
        and click aren't triggered. To prevent that, 
        mouseup is instead used on window*/
    });
}

function buttonDown(e){
    buttondown = true;
    toggleButton(e.target);
    pushIntoDisplay(e.target.getAttribute("data-value"));
}

function buttonUp(){
    if(buttondown){
        buttondown = false;
        toggleButton(document.querySelector(".click"));
    }
}

function toggleButton(button){
    button.classList.toggle("click");
}

function pushIntoDisplay(value){
    lowerDisplay.textContent += value;
}
