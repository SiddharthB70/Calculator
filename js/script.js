const buttons = document.querySelectorAll(".button");
let buttondown = false;

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
    buttonDown = true;
    toggleButton(e.target);
}

function buttonUp(){
    if(buttonDown){
        buttonDown = false;
        toggleButton(document.querySelector(".click"));
    }
}

function toggleButton(button){
    button.classList.toggle("click");
}


