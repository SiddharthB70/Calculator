const buttons = document.querySelectorAll(".button");
const lowerDisplay = document.getElementById("lower");

let buttondown = false;//flag
let displayDefault = true; 
let lowerDisplayValues = [];
let operatorEncountered = false;
let mainExp = new Expression();

window.onload = ()=>{
    lowerDisplay.textContent = 0;
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

function Expression(){
    this.value1 = "";
    this.operator = "";
    this.value2 = "";
    this.opInputed = false;
    this.expInputed = false;
}

function buttonDown(e){
    buttondown = true;
    toggleButton(e.target);
    // getValue(e.target.getAttribute("data-value"));
    storeValue(e.target.getAttribute("data-value"));
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

function getValue(value){
    if(value === "AC"){
        displayDefault = true;
        lowerDisplay.textContent = 0;
        operatorEncountered = false
        return;
    }
    else if(/[0-9]/.test(value)){
        if(displayDefault)
            lowerDisplay.textContent = "";
        lowerDisplay.textContent += value;
        operatorEncountered = false;
        
    }
    else if(/[*+-/]/.test(value)){
        if(operatorEncountered)
            return;
        lowerDisplay.textContent += value;
        operatorEncountered = true;

    }
    displayDefault = false;
}

function storeValue(value){
    if(value === "AC"){
        allClear();
        return;
    }
    else if(/[0-9]/.test(value)){
        inputDigit(value);
    }
    else if(/[*+-/]/.test(value)){
        inputOperator(value);
    }
    console.log(mainExp);
    lowerDisplay.textContent = mainExp.value1 + mainExp.operator + mainExp.value2;
}

function allClear(){
    mainExp.value1 = "";
    mainExp.operator = "";
    mainExp.value2 = "";
    mainExp.opInputed = false;
    mainExp.expInputed = false;
    lowerDisplay.textContent = "0";
}

function inputDigit(digit){
    if(!mainExp.opInputed)
        mainExp.value1 = ((mainExp.value1*10) + Number(digit));
    else    
        {mainExp.value2 = ((mainExp.value2*10) + Number(digit));
            mainExp.expInputed = true;
        }
    if(mainExp.opInput)
        mainExp.opInputed = false;
}

function inputOperator(operator){
    if(mainExp.opInputed){
        if(!mainExp.expInputed)
            return;
        else
            operate();
    }
    mainExp.operator = operator;
    mainExp.opInputed = true;
}

function operate(){
    switch(mainExp.operator){
        case "+":   mainExp.value1 += mainExp.value2;
                    break;
        case "-":   mainExp.value1 -= mainExp.value2;
                    break;
        case "*":   mainExp.value1 *= mainExp.value2;
                    break;
        case "/":   mainExp.value1 /= mainExp.value2;
                    break;      
    }
    mainExp.value2 = "";
}
