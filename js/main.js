// Select The Start Page
let startPage = document.querySelector('.control-buttons');
// Select The Start Game Button
let startBtn = document.querySelector('.control-buttons span');
// Select The Player Name Element
let userName = document.querySelector('.name span');

// Select The Sounds
let startSound = document.getElementById('start');
let successSound = document.getElementById('success');
let failSound = document.getElementById('fail');

// Start Game Function
startBtn.onclick = function(){
    // Prompt Window To Ask For Name
    let yourName = prompt('What is Your Name');
    
    // If The Name is Empty or Null
    if(yourName == null || yourName == ''){
        userName.innerHTML = 'Unknown';
    }else{
        // Set The Player Name
        userName.innerHTML = yourName;
    }

    startSound.play();
    startBtn.remove();

    // Change The Background Color before the game starts
    startPage.style.background = 'rgba(255, 0, 0, 0.5)';

    setTimeout(() => {
    // Remove Splash Screen
        startPage.remove();
    }, 5000);
}

// the main duration
let duration = 1000;

// Select Blocks Container
let blocksContainer = document.querySelector('.memory-game-blocks');

// Create Array From Game Blocks
let blocks = Array.from(blocksContainer.children);

// Create Array From Game Blocks
let orderRange = [...Array(blocks.length).keys()];

// Run the shuffle function
shuffle(orderRange);

blocks.forEach((block, index) =>{
    // Add Order Css Property
    block.style.order = orderRange[index];

    block.addEventListener('click', function(){
    // Trigger The Flip Block Function
        flipblock(block)
    })
})

// Flip Block Function
function flipblock(selectedBlock){

    // Add Class "is-flipped"
    selectedBlock.classList.add('is-flipped');

    // Collect All Flipped Cards
    let allFlippedBlocks = blocks.filter(flippedBlock => flippedBlock.classList.contains('is-flipped'));
    
    // If Theres Two Selected Blocks
    if(allFlippedBlocks.length === 2){
        // Run Stop Clicking Function
        stopClicking();
        
        // Run Check Matched Blocks Function
        checkMatchedBlocks(allFlippedBlocks[0], allFlippedBlocks[1]);        
    }
}

// Stop Clicking Function
function stopClicking(){
    // Add Class "no-clicking" on Main Container
    blocksContainer.classList.add('no-clicking');

    setTimeout(() => {
    // Remove Class "no-clicking" on Main Container After The Duration
    blocksContainer.classList.remove('no-clicking');
    }, duration);
}

// Check Matched Blocks Function
function checkMatchedBlocks(firstBlock, SecondBlock){
    // If the choice is correct
    if(firstBlock.dataset.technology === SecondBlock.dataset.technology){
        // Remove Class "is-flipped"
        firstBlock.classList.remove('is-flipped');
        SecondBlock.classList.remove('is-flipped');
        
        // Add Class "has-match"
        firstBlock.classList.add('has-match');
        SecondBlock.classList.add('has-match');

        // Turn On The Success Sound
        successSound.play();
    }else{
        // Select The Tries Element
        let triesElement = document.querySelector('.tries span');

        // Increase the number of errors dynamically
        triesElement.innerHTML = parseInt(triesElement.innerHTML) +1;
        // Turn On The Wrong Sound
        failSound.play();

        // wait The duration
        setTimeout(() => {
        // Remove Class "is-flipped" After The duration
            firstBlock.classList.remove('is-flipped');
            SecondBlock.classList.remove('is-flipped');
        }, duration);
    }
}

// shuffle Function
function shuffle(array){
    // Settings Vars
    let current = array.length,
        temp,
        random;
    
    while(current > 0){   
        // Get Random Number
        random = Math.floor(Math.random() * current);
        
        // Decrease Length By One
        current --;

        // Save Current Element in Stash
        temp = array[current];
        // Current Element = Random Element
        array[current] = array[random];
        // Random Element = Get Element From Stash
        array[random] = temp;
    }
    return array;
}