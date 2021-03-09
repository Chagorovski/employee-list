/******************************************
 *  List, Filter and Pagination
******************************************/
const ul = document.getElementById('student-list');
const url = 'https://randomuser.me/api/?results=50';
const mainDiv = document.querySelector('.page');
const ulListChildren = document.querySelector('#student-list').children;
const itemsPerPage = 10;

// Helpers
function createNode(element) {
  return document.createElement(element);
}

function append(parent, el) {
  return parent.appendChild(el);
}

function createLiItem(author) {
  return author.map(function(author) {
    let li = createNode('li');
    let liFirstChild = createNode('div');
    let img = createNode('img');
    let h3Item = createNode('h3');
    let span = createNode('span');
    let liSecondChild = createNode('div');
    let secondDivSpan = createNode('span');
    li.className= 'student-item cf';
    liFirstChild.className = 'student-details';
    liSecondChild.className = 'joined-details';
    img.className = 'avatar';
    span.className = 'email';
    secondDivSpan.className = 'date';
    secondDivSpan.innerHTML = new Date(author.registered.date).toLocaleDateString("en-US");
    span.innerHTML = `${author.email}`
    h3Item.innerHTML = `${author.name.first} ${author.name.last}`
    img.src = `${author.picture.thumbnail}`;
  
    append(li, liFirstChild);
    append(li, liSecondChild);
    append(liFirstChild, img);
    append(liFirstChild, h3Item);
    append(liFirstChild, span);
    append(liSecondChild, secondDivSpan);
    append(ul, li);
  });
};

// Fetch random-people generator API
fetch(url)
.then((resp) => resp.json())
.then(function(data) {
  let author = data.results;
  createLiItem(author);
})
.catch(function(error) {
  console.log(error);
});

// Creating the not existing span and adding text with innerHTML
const noResultDiv = document.createElement('div');
mainDiv.appendChild(noResultDiv);

// Show 10 items per page 
const showPage = (list,page) => {
   const startIndex = (page * itemsPerPage) - itemsPerPage;
   const endIndex = (page * itemsPerPage) - 1;
   for (let i = 0; i < list.length; i ++){
      if (i >= startIndex && i <= endIndex ) {
         list[i].style.display = 'block'
      }else {
         list[i].style.display = 'none';
      }
   }
};

// Generate, append pagination buttons.
const appendPageLinks = (list) => {
   const paginationDiv = document.createElement('div');
   paginationDiv.className = 'pagination';
   mainDiv.appendChild(paginationDiv);
   const ul = document.createElement('ul');
   const li = ul.children;
   paginationDiv.appendChild(ul);

   for (let i = 0; i < list.length / itemsPerPage; i ++) {
      const li = document.createElement('li');
      const a = document.createElement('a');
      if (i === 0) {
         a.className = 'active';
      }
      ul.appendChild(li);
      li.appendChild(a);
      a.href = '#';
      a.textContent = i + 1;
      aNumText = a.textContent; 
   } 

   ul.addEventListener('click', (e) => {  
      for (let i = 0; i < ul.children.length; i++) {
         const a = li[i].firstElementChild;  
         if (a.className = true) {
            a.className = null;
         }      
      }
      showPage(list,e.target.textContent);
      e.target.className = 'active';
   }); 
};

// Add the search bar
function addSearchBar () {
   const pageHeader = document.querySelector('.page-header');
   const searchHeaderDiv = document.createElement('div');
   const search = document.createElement('input');
   const button = document.createElement('button');

   searchHeaderDiv.className = 'student-search';
   search.placeholder = 'Student Search';
   button.textContent = 'Search';

   pageHeader.appendChild(searchHeaderDiv);
   searchHeaderDiv.appendChild(search);
   searchHeaderDiv.appendChild(button);

   button.addEventListener ('click' , (event) => {
      event.preventDefault();
      makeSearch(search,ulListChildren);
   });
   search.addEventListener('keyup', () => {
      makeSearch(search,ulListChildren);
   });
};

// Compairing the search results from the user and the list
function makeSearch(search,students) {
   noResultDiv.innerHTML = ''; 
   const filter = search.value.toLowerCase();
   const arr = []; 
   if (!search.value){  
      return pageRestart(ulListChildren);
   }
   for (let i = 0; i < students.length; i++) {
      const listItemName = students[i].querySelector('h3').textContent;
      students[i].style.display = 'none';
      if (listItemName.toLowerCase().includes(filter)) {
         students[i].style.display = '';
         arr.push(students[i]);
      }  
   }
   if(arr.length === 0){
      noResultDiv.innerHTML = 'Your search is not existing. Please try again !'
      mainDiv.appendChild(noResultDiv);
   };
   pageRestart(arr);
};

// Correcting the pageLinks and showing list items according to the arr passed in
function pageRestart (arr) {
   const page = document.querySelector('.page');
   const pageLinks = document.querySelector("div.pagination");
   page.removeChild(pageLinks);
   showPage(arr, 1);
   appendPageLinks(arr);
}

showPage(ulListChildren,1);
appendPageLinks(ulListChildren);
addSearchBar();