const buttons = document.querySelectorAll(".button");
const lowerDisplay = document.getElementById("lower");

let buttondown = false;//flag for clicking buttons on calculator
let exp;
let exps = [];
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
        document.body.addEventListener("keydown",keyDownEvent);     
    });
    
    exp = mainExp;
}

function Expression(){
    this.value1 = "";   //(!value1), (value1) -- used to check if expression has been entered has been filled yet
    this.operator = "";
    this.value2 = "";
    this.pointEntered = false;
}

function buttonDown(e){
    buttondown = true;
    toggleButton(e.target);
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

function storeValue(value){
    if(value === "AC" || value === "Escape"){
        allClear();
        return;
    }
    else if(value == ".")
        point();
    else if(value.toLowerCase() == "backspace")
        backSpace();
    else if(/[0-9]/.test(value)){
        inputDigit(value);
    }
    else if(/[*+-/]/.test(value)){
        inputOperator(value);
    }
    else if(/[()]/.test(value)){
        inputBrackets(value);
    }
    else if(value == "="){
        inputEqual();
    }
    console.log(mainExp);
    lowerDisplay.textContent = "";
    display(mainExp);
    if(!lowerDisplay.textContent)
        lowerDisplay.textContent = "0";
}

function allClear(){
    exps = [];
    mainExp = new Expression();
    exp = mainExp;
    lowerDisplay.textContent = "0";

}

function inputDigit(digit){
    if(!exp.operator)
        exp.value1 += digit;
    else    
        exp.value2 += digit;
}

function inputOperator(operator){
    if(exp.operator){
        if(!exp.value2)
            return;
        else
            operate();
    }
    if(!exp.value1)
        exp.value1 = "0";
    if(exp.pointEntered)
        exp.pointEntered = false;
    exp.operator = operator;
}

function inputBrackets(bracket){
    if(bracket == "("){
        if((exp.value1 && !exp.operator) || exp.value2)
            return;
        else{
            exps.push(exp);
            let newExp = new Expression();
            if(!exp.value1)
                exp.value1 = newExp;
            else
                exp.value2 = newExp;
            exp = newExp;
        }    
    }
    else{
        if(!exp.value2 && exp.operator)
            return;
        else{
            let prevExp = exps.pop();
            if(typeof prevExp === "undefined"){
                if(!exp.value1)
                    exp.operator = "";
                return;
            }
            operate();   
            if(!prevExp.value1)
                prevExp.value1 = exp.value1;
            else
                prevExp.value2 = exp.value1;   
            
            exp = prevExp;

        }
    }
}

function point(){
    if(exp.pointEntered)
        return;
    if(!exp.operator){
        if(!exp.value1)
            exp.value1 = "0"
        exp.value1 += ".";
    }   
    else {
        if(!exp.value2)
            exp.value2 = "0"
        exp.value2 += ".";
    }   
    exp.pointEntered = true;
}

function inputEqual(){
    if(exps.length == 0 && exp.value1 && exp.value2){
        operate();
        exp.operator = "";
    }
        
}

function operate(){
    exp.value1 = Number(exp.value1);
    exp.value2 = Number(exp.value2);
    switch(exp.operator){
        case "+":   exp.value1 += exp.value2;
                    break;
        case "-":   exp.value1 -= exp.value2;
                    break;
        case "*":   exp.value1 *= exp.value2;
                    break;
        case "/":   exp.value1 /= exp.value2;
                    break;      
    }
    if(!Number.isInteger(exp.value1))
        exp.value1 = exp.value1.toFixed(3);
    exp.value1 = exp.value1.toString();
    exp.value2 = "";
}

function display(expTerm){
    if(typeof expTerm == "object"){
        if(expTerm != mainExp)
            lowerDisplay.textContent += "(";
        display(expTerm.value1);
        display(expTerm.operator);
        display(expTerm.value2);
    }
    else{
        if(expTerm == "/")
            expTerm = "\u00F7";
        else if(expTerm == "*")
            expTerm = "\u00D7";
        lowerDisplay.textContent += expTerm;
    }
        
}

function backSpace(){
    let digit;
    if(exp.value2){
        digit = exp.value2.slice(-1);
        exp.value2 = exp.value2.slice(0,-1);
    }
    else if(exp.operator)
        exp.operator = "";
    else if(exp.value1){
        digit = exp.value1.slice(-1);
        exp.value1 = exp.value1.slice(0,-1);
    }
    if(digit === ".")
        exp.pointEntered = false; 
    if(!exp.value1)
        exp.value1 = "";     
}

function keyDownEvent(e){
    storeValue(e.key);
    console.log(e.key);
}

