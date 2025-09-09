const createElements = (arr) => {
    const arrElements=arr.map(el => `<span class="btn">${el}</span>`);

    console.log(arrElements.join(' '));
}

const arr = ['hi', 'hello', 'hlw']
createElements(arr);