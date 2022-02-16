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
    });
    
    exp = mainExp;
}

function Expression(){
    this.value1 = "";
    this.operator = "";
    this.value2 = "";
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
    if(value === "AC"){
        allClear();
        return;
    }
    else if(value == ".")
        return;
    else if(/[0-9]/.test(value)){
        inputDigit(value);
    }
    else if(/[*+-/]/.test(value)){
        inputOperator(value);
    }
    else if(/[()]/.test(value)){
        inputBrackets(value);
    }
    console.log(mainExp);
    lowerDisplay.textContent = "";
    display(mainExp);
}

function allClear(){
    exps = [];
    mainExp = new Expression();
    exp = mainExp;
    lowerDisplay.textContent = "0";
}

function inputDigit(digit){
    if(!exp.operator)
        exp.value1 = exp.value1 + digit;
    else    
        exp.value2 = exp.value2 + digit;
}

function inputOperator(operator){
    if(exp.operator){
        if(!exp.value2)
            return;
        else
            operate();
    }
    exp.operator = operator;
}

function inputBrackets(bracket){
    if(bracket == "("){
        exps.push(exp);
        exp.expInputed = true;
        let newExp = new Expression();
        if(!exp.value1)
            exp.value1 = newExp;
        else
            exp.value2 = newExp;
        exp = newExp;   
    }
    else{
        if(!exp.expInputed)
            return
        operate();
        let prevExp = exps.pop();
        if(typeof prevExp === "undefined")
            return;
        if(!prevExp.value1)
            prevExp.value1 = exp.value1;
        else
            prevExp.value2 = exp.value1;   
        
        exp = prevExp;

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
    // console.log(exp.value1);
    if(!Number.isInteger(exp.value1))
        exp.value1 = exp.value1.toFixed(3);
    exp.value1 = exp.value1.toString();
    exp.value2 = "";
}

function display(expTerm){
    if(typeof expTerm == "object"){
        lowerDisplay.textContent += "(";
        display(expTerm.value1);
        display(expTerm.operator);
        display(expTerm.value2);
    }
    else
        lowerDisplay.textContent += expTerm;
}


