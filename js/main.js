// Select The Start Game Button
let start = document.querySelector('.control-buttons');

// Select The Name Element
let name = document.querySelector('.name span');

start.onclick = function(){
// Prompt Window To Ask For Name
    let theName = prompt('What is Your Name');

// If Name Is Empty
    if(theName == null || theName == ''){
    // Set Name To Unknown
        name.innerHTML = 'Unknown';
    }else{
    // Name Is Not Empty
    // Set Name To Your Name
        name.innerHTML = theName;
    }

    document.getElementById('start').play();
    // Remove Splash Screen
    setTimeout(() =>{
        start.remove();
    },5000)
    }

// Effect Duration
let duration = 1000;

// Select Blocks Container
let blocksContainer = document.querySelector('.memory-game-blocks');

// Create Array From Game Blocks
let blocks = Array.from(blocksContainer.children);

// Create Range Of Keys
let orderRange = [...Array(blocks.length).keys()];

shuffle(orderRange);

// Add Order Css Property To Game Blocks
blocks.forEach((block, index) =>{
// Add CSS Order Property
    block.style.order = orderRange[index];

// Add Click Event
block.addEventListener('click', function(){
// Trigger The Flip Block Function
    flipBlock(block);
});
})

// Flip Block Function
function flipBlock(selectedBlock){
// Add Class is-flipped
    selectedBlock.classList.add('is-flipped');

// Collect All Flipped Cards
let allFlippedBlocks = blocks.filter(flippedBlock => flippedBlock.classList.contains('is-flipped'));

// If Theres Two Selected Blocks
if(allFlippedBlocks.length === 2){
// Stop Clicking Function
    stopClicking();

// Check Matched Block Function
    checkMatchedBlocks(allFlippedBlocks[0], allFlippedBlocks[1]);
}
}

// Stop Clicking Function
function stopClicking(){
// Add Class No Clicking on Main Container
    blocksContainer.classList.add('no-clicking');
    
// Wait Duration
    setTimeout(() =>{
// Remove Class No Clicking After The Duration
        blocksContainer.classList.remove('no-clicking');
    }, duration)
}

// Check Matched Block
function checkMatchedBlocks(firstBlock, secondBlock){
    if(firstBlock.dataset.technology === secondBlock.dataset.technology){
        firstBlock.classList.remove('is-flipped');
        secondBlock.classList.remove('is-flipped');

        firstBlock.classList.add('has-match');
        secondBlock.classList.add('has-match');

        document.getElementById('success').play();
    }else{
        let triesElement = document.querySelector('.tries span');

        triesElement.innerHTML = parseInt(triesElement.innerHTML) + 1;

        setTimeout(() => {    
        firstBlock.classList.remove('is-flipped');
        secondBlock.classList.remove('is-flipped');
        }, duration);
        
        document.getElementById('fail').play();
    }
}

// Shuffle Function
function shuffle(array){  
// Settings Vars
let current = array.length,
    temp,
    random;

    while(current > 0){
// Get Random Number
        random = Math.floor(Math.random() * current);

// Decrease Length By One
        current--;

// [1] Save Current Element in Stash
        temp = array[current];
// [2] Current Element = Random Element
        array[current] = array[random];
// [3] Random Element = Get Element From Stash
        array[random] = temp;
}
return array;
};
