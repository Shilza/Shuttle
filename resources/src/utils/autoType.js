
export const autoType = (elementClass, typingSpeed) => {
    let typed = document.getElementsByClassName(elementClass)[0];

    typed.style.position = "absolute";
    typed.style.display = "inline-block";
    typed.style.color = "white";
    typed.style.fontSize = "1.5em";
    typed.style.top = "15px";
    typed.style.left = "20px";

    let newChild = document.createElement('div');
    newChild.innerHTML = '<div class="cursor" style="right: initial; left:0;"></div>';
    typed.appendChild(newChild);

    let text = typed.textContent.trim().split('');
    let amntOfChars = text.length;
    let newString = "";
    typed.textContent = "|";
    setTimeout(() => {
        typed.style.opacity = 1;
        typed.textContent = "";
        for (let i = 0; i < amntOfChars; i++) {
            (function (i, char) {
                setTimeout(function () {
                    newString += char;
                    typed.textContent = newString;
                }, i * typingSpeed);
            })(i + 1, text[i]);
        }
    }, 1200);
};
