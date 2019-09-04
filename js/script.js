/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/
   
// Study guide for this project - https://drive.google.com/file/d/1OD1diUsTMdpfMDv677TfL1xO2CEkykSz/view?usp=sharing


// Global variables for this project

const ulListChildren = document.querySelector('.student-list').children;
const itemsPerPage = 10;

// Function to show 10 items per page 

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

// Function to generate, append, and add functionality to the pagination buttons.

const appendPageLinks = (list) => {
   const mainDiv = document.querySelector('.page');
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
      const pageNumber = e.target.textContent;
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

// Function to add the search bar with submit button and the event listeners for them

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

// Function for compairing the search results from the user and the list

 function makeSearch(search,students) {
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
   noSearchResultMsg(arr);
   pageRestart(arr);
};

// Function for correcting the pageLinks and showing list items according to the arr passed in

function pageRestart (arr) {
   const page = document.querySelector('.page');
   const pageLinks = document.querySelector("div.pagination");
   page.removeChild(pageLinks);
   showPage(arr, 1);
   appendPageLinks(arr);
}

// Function for printing the not existing msg if there is no match for user's search
// NOT WORKING

function noSearchResultMsg (search) {
   const span = document.createElement('span');
   const ul = document.querySelector('.student-list');
   const li = ul.firstElementChild;
   span.innerHTML = 'Your search is not existing. Please try again !'
   ul.insertBefore(span,li);
   const searchInputClass = document.getElementsByClassName('student-search');
   const seaarchInputValue = searchInputClass.value;
      if (seaarchInputValue !== search) {
         return span;
      }   
};

showPage(ulListChildren,1);
appendPageLinks(ulListChildren);
addSearchBar();
