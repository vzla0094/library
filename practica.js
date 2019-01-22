let myLibrary = [];
let button = document.getElementById('new_book');
button.addEventListener('click', () => form.classList.add('displayForm'));
let form = document.querySelector("form");
form.addEventListener('submit', makeBook);

function nodeMaker(nodeType, parent, text){
    let newNode = document.createElement(nodeType);
    if (!undefined) newNode.textContent = text;
    parent.appendChild(newNode);
}

function Book(author, title, numPages, state){
    this.Author = author;
    this.Title = title;
    this['Number of Pages'] = numPages;
    this.Read = state;
}

Book.prototype.render = function(){
    let cardContainer = document.createElement('div');
    for (let key in this){
        if(this.hasOwnProperty(key)){
            nodeMaker('p', cardContainer, `${key}: ${this[key]}`);        
        }
    }
    nodeMaker('button', cardContainer, 'Delete');
    document.body.appendChild(cardContainer);
}


function makeBook(event){
    event.preventDefault();
    const author = form.elements.author.value;
    const title = form.elements.title.value;
    const numPages = form.elements.numPages.value;
    const state = form.elements.state.value;
    myLibrary.push(new Book(author, title, numPages, state));
    form.classList.remove('displayForm');
    myLibrary[myLibrary.length-1].render();
}