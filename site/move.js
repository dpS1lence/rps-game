const animatedImages = document.getElementsByClassName("animated-image");

function getPosition(){
    const x = Math.random() * 1000;
    const y = Math.random() * 500;

    return { x, y };
}

function moveImage(image){
    let pos = getPosition();
    image.style.transform = `translate(${pos.x}px, ${pos.y}px)`;
}

function moveAll(){
    for (let i = 0; i < animatedImages.length; i++) {
        moveImage(animatedImages[i]);
    }
}

setInterval(moveAll, 2000);