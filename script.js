const books = [
{
title:"Atomic Habits",
author:"James Clear",
price:"₹499",
image:"https://picsum.photos/300/400?1"
},
{
title:"The Alchemist",
author:"Paulo Coelho",
price:"₹399",
image:"https://picsum.photos/300/400?2"
},
{
title:"Deep Work",
author:"Cal Newport",
price:"₹599",
image:"https://picsum.photos/300/400?3"
}
];
const container = document.getElementById("bookContainer");

function renderBooks(list){

    container.innerHTML = "";

    if(list.length === 0){
        container.innerHTML = `
            <p class="empty-state">No books found in the collection.</p>
        `;
        return;
    }

    list.forEach(book=>{
        const card = document.createElement("div");
        card.className = "book";

        card.innerHTML = `
            <img src="${book.image}" alt="${book.title}">
            <h3>${book.title}</h3>
            <p>${book.author}</p>
            <p>${book.price}</p>
        `;

        container.appendChild(card);
    });
}
const searchInput = document.getElementById("searchInput");

searchInput.addEventListener("input", (e)=>{
    const value = e.target.value.toLowerCase();

    const filtered = books.filter(book =>
        book.title.toLowerCase().includes(value) ||
        book.author.toLowerCase().includes(value)
    );

    renderBooks(filtered);
});

renderBooks(books);

function scrollToBooks(){

document.getElementById("books").scrollIntoView({
behavior:"smooth"
});

}

function sanitize(text){

return text
.replace(/</g,"&lt;")
.replace(/>/g,"&gt;");

}

const form=document.getElementById("newsletterForm");

form.addEventListener("submit",(e)=>{

e.preventDefault();

const name=document.getElementById("name");

const email=document.getElementById("email");

name.classList.remove("error");
email.classList.remove("error");

let valid=true;

if(name.value.trim()===""){
name.classList.add("error");
valid=false;
}

const emailRegex=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;

if(!emailRegex.test(email.value)){
email.classList.add("error");
valid=false;
}

if(!valid) return;

const safeName=sanitize(name.value);

document.getElementById("loading").textContent="Subscribing...";

setTimeout(()=>{

document.getElementById("loading").textContent="";

document.getElementById("message").textContent=
`Thank you for subscribing, ${safeName}!`;

console.log("[Analytics] User interacted with Static Landing Page");

form.reset();

},1500);

});