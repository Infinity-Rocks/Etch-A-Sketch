const header = document.createElement("div");
const title = document.createElement("h1");
const gridBtn = document.createElement("button");

let defaultSize = 16;

title.textContent = "This is an Etch-A-Sketch game"
gridBtn.textContent = "Change Grid Size";
header.classList.add("header");
gridBtn.classList.add("grid-button");

header.appendChild(title);
header.appendChild(gridBtn);

gridBtn.addEventListener("click", () => {
    defaultSize = parseInt(prompt("Enter the total squares in the grid between 1 and 64: "), 10);

    if (!isNaN(defaultSize) && defaultSize > 0 && defaultSize <= 64) {
        updateGrid(defaultSize);
    } else {
        alert("Please enter a valid positive number for the grid size.");
    }
});


document.addEventListener("DOMContentLoaded", function () {
    const container = createGrid(defaultSize);
    document.body.appendChild(header);
    document.body.appendChild(container);

    let inputs = document.querySelectorAll('.squares');
    for (let k = 0; k < inputs.length; k++) {
        inputs[k].onmouseover = rainbowColor;
    }
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

function getStyleRuleValue(selector, style) {
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
                    case selector_compare2: return myrules[j].style[style];
                }
            }
        }
    }
}

function getStyleRule(selector) {
    for (var i = 0; i < document.styleSheets.length; i++) {
        var mysheet = document.styleSheets[i];
        var myrules = mysheet.cssRules ? mysheet.cssRules : mysheet.rules;

        for (var j = 0; j < myrules.length; j++) {
            if (myrules[j].selectorText) {
                var check = myrules[j].selectorText.toLowerCase();
                switch (check) {
                    case selector: return myrules[j];
                }
            }
        }
    }
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function rainbowColor(e) {
    const rndCol = 'rgb(' + getRandomInt(255) + ',' + getRandomInt(255) + ',' + getRandomInt(255) + ')';
    e.target.style.backgroundColor = rndCol;
}