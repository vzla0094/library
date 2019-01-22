let myLibrary = [];
let button = document.getElementById('new_book');
button.addEventListener('click', () => form.classList.add('displayForm'));
let form = document.querySelector("form");
form.addEventListener('submit', makeBook);

function nodeMaker(nodeType, parent, text){
    let newNode = document.createElement(nodeType);
    if (!undefined) newNode.textContent = text;
    parent.appendChild(newNode);
    return newNode;
}

function Book(author, title, numPages, state){
    this.Author = author;
    this.Title = title;
    this.Pages = numPages;
    this.Read = state;
}

Book.prototype = {
    constructor: Book,
    render(){
        this.cardContainer = document.createElement('div');
        this.cardContainer.setAttribute('data-title', `${this.Title}`);
        this.DOMTitle = nodeMaker('p', this.cardContainer, `Title: ${this.Title}`);
        this.DOMAuthor = nodeMaker('p', this.cardContainer, `Author: ${this.Author}`);
        this.DOMPages = nodeMaker('p', this.cardContainer, `Number of pages: ${this.Pages}`);
        this.DOMRead = nodeMaker('p', this.cardContainer, `Read: ${this.Read}`);
        nodeMaker('button', this.cardContainer, 'Delete')
            .setAttribute('data-action', 'delete');
    
        nodeMaker('button', this.cardContainer, 'Change read status')
            .setAttribute('data-action', 'state');
    
        this.cardContainer.querySelector('button[data-action="delete"]')
            .addEventListener('click', wipe);
    
        this.cardContainer.querySelector('button[data-action="state"]')
            .addEventListener('click', callChangeState);
    
        document.body.appendChild(this.cardContainer);
    },
    changeState (){
        if(this.Read === 'Yes'){
            this.Read = 'No';
        }else{
            this.Read = 'Yes';
        }
        this.DOMRead.textContent = `Read: ${this.Read}`;
    }

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

function wipe (){
    let obj = myLibrary.find(elem => {
        return elem.cardContainer === this.parentNode;
    }, this)
    myLibrary.splice(myLibrary.indexOf(obj),1);
    this.parentNode.remove();
}

function callChangeState(){
    let obj = myLibrary.find(elem => {
        return elem.cardContainer === this.parentNode;
    }, this)
    obj.changeState();
}