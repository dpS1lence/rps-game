
function count(){
    const divElement = document.getElementById('imageContainer');
    const numberOfChildElements = divElement.childElementCount;
    const text = document.getElementById('count');
    text.textContent = `Count = ${numberOfChildElements}`;
}

setInterval(count, 200);