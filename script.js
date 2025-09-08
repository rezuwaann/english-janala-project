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
        <button href="" class="btn btn-soft btn-primary" onclick="loadLevelWord(${lesson.level_no})"><i class=" fa-solid
                            fa-book-open"></i>Lesson -${lesson.level_no}</button>

        `
        levelContainer.appendChild(btnDiv)
    };
}
loadLessons()

const loadLevelWord = (id) => {
    const url = `https://openapi.programming-hero.com/api/level/${id}`
    fetch(url)
        .then(res => res.json())
        .then(json => displayLevelWord(json.data))
}

const displayLevelWord = (words) => {
    const wordContainer = document.getElementById('word-container');
    wordContainer.innerHTML = '';

if (words.length===0) {
    
   wordContainer.innerHTML=`
   <div class="text-center col-span-full hind-shiliguri roundeed py-10 space-y-3">
<img src="./assets/alert-error.png" alt="" class="mx-auto">
            <h2 class="text-[14px] text-[#79716B]">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</h2>
            <h1 class=" text-3xl font-medium">নেক্সট Lesson এ যান</h1>
        </div>
   `
}

    words.forEach(word => {
        console.log(word)
        const wordCard = document.createElement('div');
        wordCard.innerHTML= `
        <div class="bg-white text-center rounded-xl shadow-sm py-10 px-5 space-y-4 h-full">
            <h2 class="font-bold text-2xl">${word.word?word.word:"শব্দ পাওয়া যায়নি"}</h2>
            <h3 class="font-medium text-lg ">Meaning /Pronounciation</h3>
            <h2 class="hind-shiliguri font-semibold text-2xl text-[#18181B]">"${word.meaning?word.meaning:"অর্থ পাওয়া যায়নি"} / ${word.pronunciation?word.pronunciation:"উচ্চারণ পাওয়া যায়নি"}"</h2>
            <div class="flex justify-between items-center">
                <button class="btn bg-[#1A91FF10] hover:bg-[#1A91FF80]"><i class="fa-solid fa-circle-info"></i></button>
                <button class="btn bg-[#1A91FF10] hover:bg-[#1A91FF80]"> <i class="fa-solid fa-volume-high"></i></button>
            </div>
        </div>
        `
        wordContainer.append(wordCard)

    })
}
