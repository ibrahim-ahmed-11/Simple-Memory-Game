

var numOfClicks = 0;
var shuffledImagesArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
var clicksCounter = 0;
var lastClickedIndex;
var numOfRemovedImages = 0;

var minutesLabel = document.getElementById("minutes");
var secondsLabel = document.getElementById("seconds");
var totalSeconds = 0;
var timer;

function setTime() {
    ++totalSeconds;
    secondsLabel.innerHTML = pad(totalSeconds % 60);
    minutesLabel.innerHTML = pad(parseInt(totalSeconds / 60));
}

function pad(val) {
    var valString = val + "";
    if (valString.length < 2) {
        return "0" + valString;
    } else {
        return valString;
    }
}


function generateRandomArray(array) {
    var tmp, current, top = array.length;

    if (top) while (--top) {
        current = Math.floor(Math.random() * (top + 1));
        tmp = array[current];
        array[current] = array[top];
        array[top] = tmp;
    }
    return array;
}

function spreadCards() {

    shuffledImagesArray = generateRandomArray(shuffledImagesArray);

    timer = setInterval(setTime, 1000);

    for (let i = 0; i < shuffledImagesArray.length; i++) {
        document.images[i].onclick = function () { flipImage(this, i) };
    }

}

function flipImage(clickedImage, index) {

    if (numOfClicks == 0) {
        numOfClicks++;
        clicksCounter++;
        lastClickedIndex = index;
        clickedImage.src = "img/" + shuffledImagesArray[index] + ".gif";
    }
    else if (numOfClicks == 1) {

        if (lastClickedIndex != index) {
            clicksCounter++;
            numOfClicks = 0;
            clickedImage.src = "img/" + shuffledImagesArray[index] + ".gif";

            //to remove if same
            if (shuffledImagesArray[lastClickedIndex] - 6 == shuffledImagesArray[index] || shuffledImagesArray[lastClickedIndex] == shuffledImagesArray[index] - 6) {
                removeImageIndex(index, lastClickedIndex);
            }
            else {
                setTimeout(resetImages, 500);
            }

        }
        else {
            //Do nothing, same pic clicked again
        }

    }

    document.getElementById("clicksCounterSpan").innerText = clicksCounter;

}

function resetImages() {
    for (let i = 0; i < shuffledImagesArray.length; i++) {
        if (shuffledImagesArray[i] != 0)
            document.images[i].src = "img/moon.gif";
    }
}

function removeImageIndex(index1, index2) {

    shuffledImagesArray[index1] = 0;
    shuffledImagesArray[index2] = 0;

    numOfRemovedImages++;

    if (numOfRemovedImages == 6) {
        setTimeout(wonMessage, 500);
    }

}

function wonMessage() {

    var minutes = pad(parseInt(totalSeconds / 60));
    var seconds = pad(totalSeconds % 60);
    clearInterval(timer);

    if (confirm("CONGRATULATIONS, YOU WON !\nNumber of clicks : " + clicksCounter + "\nTime: " + minutes + " minutes " + seconds + " seconds\nPLAY AGAIN ?!")) {
        resetGame();
    }

}

function resetGame() {

    numOfClicks = 0;
    shuffledImagesArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
    clicksCounter = 0;
    lastClickedIndex = undefined;
    numOfRemovedImages = 0;
    totalSeconds = 0;

    spreadCards();
    resetImages();

}