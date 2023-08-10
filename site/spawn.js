const scissorsSrc = 'scissors.png';
const rockSrc = 'rock.png';
const paperSrc = 'paper.png';

const imageClass = 'animated-image';

const imageContainer = document.getElementById('imageContainer');

function createImages(numImages) {
    const types = ['rock', 'paper', 'scissors'];
    const imagesByType = {};

    for (let i = 0; i < types.length; i++) {
        imagesByType[types[i]] = [];
    }

    for (let i = 0; i < numImages; i++) {
        for (let j = 0; j < types.length; j++) {
            const type = types[j];
            const img = document.createElement('img');
            img.id = type + i;
            img.className = imageClass;
            if(type === 'scissors'){
                img.src = scissorsSrc;
            } else if(type === 'rock'){
                img.src = rockSrc;
            } else if(type === 'paper'){
                img.src = paperSrc;
            }
            img.alt = type;
            imageContainer.appendChild(img);

            imagesByType[type].push(img);
        }
    }

    return imagesByType;
}

function add(){
    createImages(6);
}
function reset(){
    location.reload();
}

const generatedImages = createImages(6);

moveAll();

const rockImages = generatedImages.rock;
const paperImages = generatedImages.paper;
const scissorsImages = generatedImages.scissors;
console.log(scissorsImages);

function getItemPos(item) {
    let rect = item.getBoundingClientRect();
    let position = { x: rect.left, y: rect.top };
    return position;
}

function get(items) {
    let positions = [];

    items.forEach(function(element) {
        let rect = element.getBoundingClientRect();
        let position = { x: rect.left, y: rect.top };
        positions.push(position);
    });
    return positions;
}

function attack(){
    let scissorsPositions = get(scissorsImages);
    let paperPositions = get(paperImages);
    let rockPositions = get(rockImages);

    for (let sPos of scissorsPositions) {
        for (let pPos of paperPositions) {
            if (overlap(sPos, pPos)) {
                let element = paperImages[paperPositions.indexOf(pPos)];
                let removedId = element.id;
                let removedElement = document.getElementById(removedId);
                if (removedElement) {
                    /*let img = document.createElement('img');
                    img.id = element.type + 1;
                    img.className = element.className;
                    img.src = scissorsSrc;
                    img.alt = 'scissors';
                    img.style.transform = `translate(${element.x}px, ${element.y}px)`;
                    scissorsImages.push(img);*/

                    removedElement.remove();

                    //imageContainer.appendChild(img);
                }
            }
        }

        for (let rPos of rockPositions) {
            if (overlap(sPos, rPos)) {
                let element = scissorsImages[scissorsPositions.indexOf(sPos)];
                let removedId = element.id;
                let removedElement = document.getElementById(removedId);
                if (removedElement) {
                    removedElement.remove();
                }
            }
        }
    }

    for (let pPos of paperPositions) {
        for (let rPos of rockPositions) {
            if (overlap(pPos, rPos)) {
                let element = rockImages[rockPositions.indexOf(rPos)];
                let removedId = element.id;
                let removedElement = document.getElementById(removedId);
                if (removedElement) {
                    removedElement.remove();
                }
            }
        }
    }
}

function overlap(pos1, pos2) {
    let tolerance = 60;
   let dx = Math.abs(pos1.x - pos2.x);
   let dy = Math.abs(pos1.y - pos2.y);

   return dx < tolerance && dy < tolerance;
}

setInterval(attack, 10);
