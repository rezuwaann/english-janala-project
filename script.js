const createElements = (arr) => {
    const arrElements = arr.map(el => `<span class="btn">${el}</span>`);

    return arrElements.join(' ');
}


const manageSpinner = (status) => {
    if (status) {
        document.getElementById('spinner').classList.remove('hidden');
        document.getElementById('word-container').classList.add('hidden');

    } else {
        document.getElementById('spinner').classList.add('hidden');
        document.getElementById('word-container').classList.remove('hidden');

    }
}

// 7 lessons
const loadLessons = () => {
    const url = 'https://openapi.programming-hero.com/api/levels/all';
    fetch(url)
        .then(res => res.json())
        .then(json => displayLessons(json.data))
}

const displayLessons = (lessons) => {

    const levelContainer = document.getElementById('level-container')


    for (let lesson of lessons) {
        const btnDiv = document.createElement('div')

        btnDiv.innerHTML = `
        <button id="lesson-btn-${lesson.level_no}" class="btn btn-soft btn-primary" onclick="loadLevelWord(${lesson.level_no})"><i class=" fa-solid
                            fa-book-open"></i>Lesson -${lesson.level_no}</button>

        `
        levelContainer.appendChild(btnDiv)
    };
}


// active class
const removeActive = () => {
    const lessonButtons = document.querySelectorAll('.active');
    lessonButtons.forEach(button => button.classList.remove('active')

    )
}


// modal
const loadWordDetail = async (id) => {

    const url = `https://openapi.programming-hero.com/api/word/${id}`;
    const res = await fetch(url);
    const details = await res.json();
    displayWordDetails(details.data)
}

const displayWordDetails = (word) => {
    const detailsContainer = document.getElementById('details-container')
    detailsContainer.innerHTML =
        `   <div>
    <h1 class="font-semibold text-4xl">${word.word} (<i class="fa-solid fa-microphone-lines"></i>:${word.pronunciation})</h1>
    </div>
    
    <div>
    <h1 class="mb-2 font-semibold text-2xl">Meaning</h1>
    <h2 class="hind-shiliguri font-medium text-2xl">${word.meaning}</h2>
    </div>
    
    <div>
    <h1 class="mb-2 font-semibold text-2xl">Example</h1>
    <h2 class="hind-shiliguri text-2xl">${word.sentence}</h2>
    </div>
    
    <div>
    <h2 class="mb-2 hind-shiliguri font-medium text-2xl">সমার্থক শব্দ গুলো</h2>
    
    <div>${createElements(word.synonyms)} </div>
    </div > `

    document.getElementById('my_modal_5').showModal();
}


// word cards
const loadLevelWord = (id) => {

    manageSpinner(true);

    const url = `https://openapi.programming-hero.com/api/level/${id}`
    fetch(url)
        .then(res => res.json())
        .then((json) => {
            removeActive(); //function for remove all active class
            const clickBtn = document.getElementById(`lesson-btn-${id}`)

            clickBtn.classList.add("active"); //adds active class

            displayLevelWord(json.data);
        }
        )
}

const displayLevelWord = (words) => {
    const wordContainer = document.getElementById('word-container');
    wordContainer.innerHTML = '';

    if (words.length === 0) {

        wordContainer.innerHTML = `
        <div class="text-center col-span-full hind-shiliguri roundeed py-10 space-y-3">
        <img src="./assets/alert-error.png" alt="" class="mx-auto">
        <h2 class="text-[14px] text-[#79716B]">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</h2>
        <h1 class=" text-3xl font-medium">নেক্সট Lesson এ যান</h1>
        </div>
        `
        manageSpinner(false)
        return;
    }

    words.forEach(word => {

        const wordCard = document.createElement('div');
        wordCard.innerHTML = `
        <div class="bg-white text-center rounded-xl shadow-sm py-10 px-5 space-y-4 h-full">
        <h2 class="font-bold text-2xl">${word.word ? word.word : "শব্দ পাওয়া যায়নি"}</h2>
        <h3 class="font-medium text-lg ">Meaning /Pronounciation</h3>
            <h2 class="hind-shiliguri font-semibold text-2xl text-[#18181B]">"${word.meaning ? word.meaning : "অর্থ পাওয়া যায়নি"} / ${word.pronunciation ? word.pronunciation : "উচ্চারণ পাওয়া যায়নি"}"</h2>
            <div class="flex justify-between items-center">
                <button class="btn bg-[#1A91FF10] hover:bg-[#1A91FF80]" onclick="loadWordDetail(${word.id})"><i class="fa-solid fa-circle-info"></i></button>
                <button class="btn bg-[#1A91FF10] hover:bg-[#1A91FF80]"> <i class="fa-solid fa-volume-high"></i></button>
                </div>
                </div>
                `
        wordContainer.append(wordCard)



    })

    manageSpinner(false);
}



loadLessons();


document.getElementById("btn-search").addEventListener("click", () => {
    const input = document.getElementById("input-search")
    const searchValue = input.value.trim().toLowerCase();
    console.log(searchValue);

    fetch('https://openapi.programming-hero.com/api/words/all')
        .then(res => res.json())
        .then(data => {

            const allWords = data.data;
         

            const filteredWords = allWords.filter((wordObject) =>
                 wordObject.word.toLowerCase().includes(searchValue)); 

           displayLevelWord(filteredWords)
        })
})

