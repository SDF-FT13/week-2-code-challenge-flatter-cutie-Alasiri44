// Your code here
const characterBar = document.getElementById('character-bar');
const characterName = document.getElementById('name');
const changingImage = document.querySelector('.characterInfo img');
const totalVotes = document.querySelector('#vote-count');
const form = document.getElementById('votes-form');
const input = document.getElementById('votes');
let myData = 0;
fetch('http://localhost:3000/characters')
.then(res => res.json())
.then(data => {
    myData = data;
    addNames(data);
    addEventListener(data);  
});

function addNames(newData){
    for(let element of newData){
        const newCharacter = document.createElement('div');
        newCharacter.classList.add('names-of-images')
        newCharacter.style.width = '50px';
        
        newCharacter.style.padding = '22px 8px'
        newCharacter.style.border = '1px solid white'
        newCharacter.style.borderRadius = '60px';
        newCharacter.textContent = element.name;
        
        //newImage.alt = element.name;     
        characterBar.appendChild(newCharacter);

    }
}

function addEventListener(newData){
    characterBar.addEventListener('click',function (e) {
        if(e.target.classList.contains('names-of-images')){
            const finder = newData.find(a => a.name === e.target.textContent);
            characterName.textContent = finder.name;         
            changingImage.src = finder.image;
            changingImage.alt = finder.name;
            totalVotes.textContent = finder.votes;

            addVotes(finder);
        }      
    })
}

function addVotes(finder){
    form.addEventListener('submit', function(e){
        e.preventDefault();

       if (parseInt(input.value, 10) > 0) {
         finder.votes +=   parseInt(input.value, 10);
         console.log(typeof(parseInt(input.value, 10)));
         
         totalVotes.textContent = finder.votes;

         fetch('http://localhost:3000/characters', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
         })
         .then(res => res.json())
         .then(data => console.log(data)
         )
       }
    })
}

