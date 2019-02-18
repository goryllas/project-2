/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/

//declared variables to be used through the code
const pageDiv = document.querySelector ( '.page' );
const studentList = document.querySelectorAll ( '.student-item.cf' );
const studentDetails = document.querySelector ( '.student-details' );
const studentName = studentDetails.querySelector ( 'h3' );

//shows 10 students max per page. hides the rest
const showPage = ( studentList, page ) => {
  for ( let i = 0; i < studentList.length; i += 1 ) {
    let firstPageItem = ( ( page * 10 ) - 10 );
    let lastPageItem = ( ( page * 10 ) - 1 );
    if ( i >= firstPageItem && i <= lastPageItem ) {
    studentList[i].style.display = 'block';
  } else {
    studentList[i].style.display = 'none';
    }
  }
};

//creates page links required based on list length, appends, and adds function
const appendPageLinks = ( list ) => {
  let totalPages = Math.ceil ( list.length/10 );
  let div = document.createElement ( 'div' );
  let ul = document.createElement ( 'ul' );

  div.className = 'pagination';
  pageDiv.appendChild ( div );
  div.appendChild ( ul );

  for ( let i = 0; i < totalPages; i += 1 ) {
    let li = document.createElement ( 'li' );
    let a = document.createElement ( 'a' );
    a.textContent = i + 1;
    li.appendChild ( a );
    totalPages[i] = ul.appendChild ( li );
//page links will show 'active' after click
    li.addEventListener ( 'click', (e) => {
      e.preventDefault();
      let aTags = document.querySelectorAll ( 'a' );
      for ( let i = 0; i < aTags.length; i += 1 ) {
        if ( aTags[i] === e.target ) {
          e.target.classList.add ( 'active' );
        } else {
          aTags[i].classList.remove ( 'active' );
          }
        }
      return showPage ( list, i+1 );
    });
  }
};

//removes pagination links
const removePageLinks = () => {
  let div = document.querySelector ( '.pagination' );
  pageDiv.removeChild( div );
}

//takes the first page link available and gives it the 'active' class
const firstActivePage = () => {
  let div = document.querySelector ( '.pagination' );
  let a = div. querySelector ( 'a' );
  a.classList.add ( 'active' );
};

//iterates over list and compares user input to filter out names
const searchFilter = () => {
  removePageLinks();
  let searchList = [];
  let input = document.querySelector ( 'input.student-search' );

  for ( let i = 0; i < studentList.length; i += 1 ) {
    let name = studentList[i].querySelector('h3').innerHTML;
    let filter = input.value.toUpperCase();
    if ( name.toUpperCase().indexOf ( filter ) > -1 ) {
      studentList[i].style.display = 'block';
      searchList.push(studentList[i]);
    } else {
      studentList[i].style.display = 'none';
      }
  }
  showPage ( searchList, 1 );
  appendPageLinks ( searchList );
//adjusts the 'active' page to the student list displayed
  if ( searchList.length > 0 ) {
    firstActivePage();
  }
//displays the hidden 'No Results' message if list meets required length
  if ( searchList.length <= 0 ) {
    let noResultsDiv = document.querySelector ( '.noResults' );
    noResultsDiv.style.display = '';
  }
};

//creates the search field, buttons, and functionality to filter thru students
const searchBar = () => {
  let pageHeadDiv = document.querySelector ( '.page-header.cf' );
  let div = document.createElement ( 'div' );
  let input = document.createElement ( 'input' );
  let button = document.createElement ( 'button' );

  div.id = 'search field';
  div.className = 'student-search';
  input.className = 'student-search';
  input.placeHolder = 'Search for students...';
  input.type = 'text';
  button.className = 'student-search';
  button.textContent = 'Search';

  pageHeadDiv.appendChild ( div );
  div.appendChild ( button );
  div.appendChild ( input );


  button.addEventListener ( 'click', (e) => {
    e.preventDefault();
    hideNoResults();
    searchFilter();
  });

  div.addEventListener ( 'keyup', (e) => {
    e.preventDefault();
    hideNoResults();
    searchFilter();
  });

};

//creates a hidden 'error' message in case of no results in search
const createNoResults = () => {
  let div = document.createElement ( 'div' );
  let h2 = document.createElement ( 'h2' );
  div.className = 'noResults';
  h2.textContent = 'No Results';
  div.appendChild ( h2 );
  pageDiv.appendChild ( div );
  div.style.display = 'none';
};

//hides the 'No Results' message if displayed
const hideNoResults = () => {
  let noResultsDiv = document.querySelector ( '.noResults' );
  noResultsDiv.style.display = 'none';
}

//functions called on JS load
document.addEventListener ( 'DOMContentLoaded', () => {
  showPage ( studentList, 1 );
  appendPageLinks ( studentList );
  firstActivePage ();
  searchBar ();
  createNoResults();
});
