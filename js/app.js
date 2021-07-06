const input = document.querySelector('#input');
const searchBtn = document.querySelector('#search')
const notFound = document.querySelector('.not_found')
let defBox = document.querySelector('.def')
let audioBox = document.querySelector('.audio')
let loading = document.querySelector('.loading')


let keyApi = '78c5c05e-b941-47eb-b90d-288c55ed29fc'



searchBtn.addEventListener('click', function(e)
{
    e.preventDefault()
   //clear data
   audioBox.innerHTML = '';
   notFound.innerText = '';
   defBox.innerText = '';



    //get input data

    let word = input.value;
    //call API get data

    if(word === ''){
        // alert('Word is required');
        return;
    }
    getData(word);
})

async function getData(word){
    //Ajax call api:dictionary.api
    loading.style.display = 'block'
    const response = await fetch(`https://dictionaryapi.com/api/v3/references/learners/json/${word}?key=${keyApi}`);

    const data = await response.json();

    //if empty result
    if(!data.length){
        loading.style.display = 'none';
        notFound.innerText  = 'No Result Found'
        return;

    }
    //if result is suggetions
     
    if(typeof data[0] === 'string'){
        loading.style.display = 'none';
        let heading = document.createElement('h3');
        heading.innerText = 'Did you mean?'
        notFound.appendChild(heading)
        data.forEach(element => {
            let suggetion = document.createElement('span')
            suggetion.classList.add('suggested')
            suggetion.innerText = element
            notFound.appendChild(suggetion)
            
        });
        return
    }

    // result found
    loading.style.display = 'none';
    let defination = data[0].shortdef[0];
    defBox.innerText = defination
    console.log(data);


    //get sound

    const soundName = data[0].hwi.prs[0].sound.audio
    // console.log(soundName);
    if (soundName) {
        renderSound(soundName);
        
    }
    console.log(data);


}
// function renderSound(soundName){
//     // https://media.merriam-website.com/soundc11
//     let subfolder = soundName.charAt(0)
//     let soundSrc = `https://media.merriam-website.com/soundc11/${subfolder}/${soundName}.wav?key=${keyApi}?`;
//     // let aud = document.createElement('audio');

//     aud.scr = soundSrc
//     aud.controls = true
//     audioBox.appendChild(aud);

// }


