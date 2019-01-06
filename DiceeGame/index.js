
document.querySelector(".play").onclick = function(){
    var randomNumber1 = Math.floor(Math.random() * 6 + 1);
    var sourceRandomNumber1 = "/images/dice" + randomNumber1 + ".png";
    document.querySelector(".img1").setAttribute("src", sourceRandomNumber1);

    var randomNumber2 = Math.floor(Math.random() * 6 + 1);
    var sourceRandomNumber2 = "/images/dice" + randomNumber2 + ".png";
    document.querySelector(".img2").setAttribute("src", sourceRandomNumber2);

    if (randomNumber1 > randomNumber2) {
        document.querySelector("h1").innerHTML = "🥊 Player 1 wins";
    } else if (randomNumber1 < randomNumber2) {
        document.querySelector("h1").innerHTML = "Player 2 wins 🥊";
    } else {
        document.querySelector("h1").innerHTML = " 🤦 Drawwww!!! 🤦";
    }
}
