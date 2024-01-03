let total = document.querySelector(".bluecan .circle h1");
let catImg = document.querySelectorAll(".whitecan .left img");
let category = document.querySelectorAll(".whitecan .left h5");
let scores = document.querySelectorAll(".whitecan .right p b");
let jtest;
let sum = 0;

// console.log(total.innerHTML);
// console.log(category);

function incrementValue(currentValue, targetElement, targetValue, duration) {
    let increment = targetValue / (duration / 16);

    let interval = setInterval(function () {
        currentValue += increment;
        targetElement.innerHTML = Math.min(Math.round(currentValue), targetValue).toString();

        if (currentValue >= targetValue) {
            clearInterval(interval);
            targetElement.innerHTML = targetValue.toString();
        }
    }, 16);
}

fetch("data.json")
    .then(response => response.json())
    .then(json => {
        for (let i = 0; i < json.length; i++) {

            for (let i = 0; i < catImg.length; i++) {
                catImg[i].src = json[i].icon;
            }

            for (let i = 0; i < category.length; i++) {
                category[i].innerHTML = json[i].category;
            }

            for (let i = 0; i < scores.length; i++) {
                incrementValue(0, scores[i], json[i].score, 1000);
                scores[i].innerHTML = json[i].score;

                sum += (parseInt(scores[i].innerHTML, 10) || 0) / (scores.length * scores.length);
            }
        }

        incrementValue(0, total, Math.round(sum), 1000);
        total.innerHTML = Math.round(sum);
    });
