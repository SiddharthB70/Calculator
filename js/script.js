const buttons = document.querySelectorAll(".button");


//Button ClicK
buttons.forEach(function(button){
    button.addEventListener("click",buttonClick);
});

function buttonClick(e){
    let button = e.target;
    toggleButton(button);
    setTimeout(function(button){
        toggleButton(button);
    },200,button);
}

function toggleButton(button){
    button.classList.toggle("click");
}

