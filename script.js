const wordEl=document.getElementById('word');
const wrongLettersEl=document.getElementById('wrong-letters');
const playAgainBtn=document.getElementById('play-button');
const popup =document.getElementById('popup-container');
const notification=document.getElementById('notification-container');
const finalMessage=document.getElementById('final-message');

const figureParts=document.querySelectorAll('.figure-part');

const words=['application','interface','programming','wizard'];

let selectedWord=words[Math.floor(Math.random()*words.length)];
console.log(selectedWord)

const correctLetters=[]
const wrongLetters=[]

const displayWord = ()=>{
    wordEl.innerHTML=
    selectedWord
    .split('')
    .map(
        letter =>
        `
        <span class='letter'>
        ${correctLetters.includes(letter) ? letter :''}
        </span>
        `
    )
    .join('')
    
    innerWord=wordEl.innerText.replace(/\n/g,'')
    console.log(wordEl.innerText,innerWord)

    if(innerWord===selectedWord){
        finalMessage.innerText='Congratulations you won!'
        popup.style.display='flex';
    }


}

// update the wrongLetters
const updateWrongLetters=()=>{
    console.log('update wrong')
    // display wrong letters
    wrongLettersEl.innerHTML=`
    ${wrongLetters.length > 0 ?'<p>wrong</p>':''}
    ${wrongLetters.map(letter=>`<span>${letter}</span>`).join(',') }
    `

    // display figure parts
    figureParts.forEach((part,index)=>{
        const errors = wrongLetters.length;

        if (index<errors){
            part.style.display = 'block';
        }
        else{
            part.style.display='none';
        }
    })

    //check if lost
    if (wrongLetters.length===figureParts.length){
        finalMessage.innerText = 'unfortunately you lost';
        popup.style.display='flex';
    }

}

// show notification

const showNotification = ()=>{
    notification.classList.add('show')
    setTimeout(()=>notification.classList.remove('show'),2000)
}

window.addEventListener('keydown',e=>{
    alphabets=['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z']
    if (alphabets.includes(e.key)){
        const letter =e.key
        if(selectedWord.includes(letter)){
            if(!correctLetters.includes(letter) ){
                correctLetters.push(letter)

                displayWord();
            }
            else{
                showNotification();
            }
        }
        else{
            if(!wrongLetters.includes(letter)){
            wrongLetters.push(letter)
            updateWrongLetters();
            }
            else{
                showNotification();
            }
        }

    }
 
});

playAgainBtn.addEventListener('click',()=>{
    correctLetters.splice(0);

    wrongLetters.splice(0);

    selectedWord=words[Math.floor(Math.random()*words.length)];

    displayWord();

    updateWrongLetters();

    popup.style.display='none'


})

displayWord();