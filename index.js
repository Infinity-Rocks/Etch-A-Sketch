const header = document.createElement("div");
const title = document.createElement("h1");
const gridBtn = document.createElement("button");
const footer = document.createElement("div");

let defaultSize = 16;

title.textContent = "This is an Etch-A-Sketch game"
title.style.fontFamily = "Verdana";

gridBtn.textContent = "Change Grid Size";
gridBtn.style.display = "flex";
gridBtn.style.alignContent = "center";
gridBtn.style.backgroundColor = "dodgerblue";
gridBtn.style.fontSize = "22px";
gridBtn.style.border = "2px solid white";
gridBtn.style.borderRadius = "12px";
gridBtn.style.color = "white";

footer.textContent = "Developed by Dhairya Jadav";
footer.style.display = "flex";
footer.style.justifyContent = "center";
footer.style.alignItems = "center";
footer.style.height = "100px";
footer.style.width = "100%"
footer.style.backgroundColor = "lightsteelblue";
footer.style.fontFamily = "Georgia";
footer.style.fontSize = "24px";

header.classList.add("header");
gridBtn.classList.add("grid-button");
footer.classList.add("footer");

header.appendChild(title);
header.appendChild(gridBtn);

gridBtn.addEventListener("click", () => {
    defaultSize = parseInt(prompt("Enter the total squares in the grid between 1 and 64: "), 10);

    if (!isNaN(defaultSize) && defaultSize > 0 && defaultSize <= 64) {
        updateGrid(defaultSize);
        changeColor();
    } else {
        alert("Please enter a valid positive number for the grid size.");
    }
});


document.addEventListener("DOMContentLoaded", function () {
    const container = createGrid(defaultSize);
    document.body.appendChild(header);
    document.body.appendChild(container);
    document.body.appendChild(footer);
    changeColor();
});

function createGrid(defaultSize) {
    const container = document.createElement("div");
    container.classList.add("container");

    let containerSize = getStyleRuleValue('.container', 'width');
    containerSize = containerSize.slice(0, -2);
    containerSize = parseInt(containerSize);

    let newBoxSize = (containerSize / defaultSize);
    newBoxSize = newBoxSize.toString() + "px";

    for (let i = 0; i < defaultSize * defaultSize; i++) {
        const square = document.createElement("div");
        square.classList.add("squares");
        container.appendChild(square);
    }

    const squareCssRule = getStyleRule('.squares');

    squareCssRule.style['width'] = newBoxSize;
    squareCssRule.style['height'] = newBoxSize;

    return container;
}

function updateGrid(newSize) {
    const container = document.querySelector(".container");
    document.body.removeChild(container);

    const newContainer = createGrid(newSize);
    document.body.appendChild(newContainer);
}

function findStyleRule(selector, callback) {
    var selector_compare = selector.toLowerCase();
    var selector_compare2 = selector_compare.substr(0, 1) === '.' ? selector_compare.substr(1) : '.' + selector_compare;

    for (var i = 0; i < document.styleSheets.length; i++) {
        var mysheet = document.styleSheets[i];
        var myrules = mysheet.cssRules ? mysheet.cssRules : mysheet.rules;

        for (var j = 0; j < myrules.length; j++) {
            if (myrules[j].selectorText) {
                var check = myrules[j].selectorText.toLowerCase();
                switch (check) {
                    case selector_compare:
                    case selector_compare2:
                        return callback(myrules[j]);
                }
            }
        }
    }
}

function getStyleRuleValue(selector, style) {
    return findStyleRule(selector, function (rule) {
        return rule.style[style];
    });
}

function getStyleRule(selector) {
    return findStyleRule(selector, function (rule) {
        return rule;
    });
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function rainbowColor(e) {
    const rndCol = 'rgb(' + getRandomInt(255) + ',' + getRandomInt(255) + ',' + getRandomInt(255) + ')';
    e.target.style.backgroundColor = rndCol;
}

function changeColor() {
    let inputs = document.querySelectorAll('.squares');
    for (let k = 0; k < inputs.length; k++) {
        inputs[k].onmouseover = rainbowColor;
    }
}