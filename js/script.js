/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/


const pageDiv = document.querySelector ( '.page' );
const list = document.querySelector ( 'ul' );
const studentList = document.querySelectorAll ( '.student-item.cf' );
const studentDetails = document.querySelector ( '.student-details' );
const studentName = studentDetails.querySelector ( 'h3' );

//only 10 students will show per page. hide the rest
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

//creates the page links, appends them to the DOM, places functionality on them
const appendPageLinks = ( list ) => {
  let totalPages = Math.ceil ( studentList.length/10 );
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
      return showPage ( studentList, i+1 );
    });
  }
};

//removes pagination links
const removePageLinks = () => {
  let div = document.querySelector ( '.pagination' );
  pageDiv.removeChild( div );
}

const startingPage = () => {
  let start = document.querySelector ( 'div.pagination ul li a' );
  start.classList.add ( 'active' );
}

//creates a search field to filter thru the student list
const searchBar = () => {
  let div = document.querySelector ( '.page-header.cf' );
  let form = document.createElement ( 'form' );
  let input = document.createElement ( 'input' );
  let button = document.createElement ( 'button' );

  form.id = 'search field';
  form.className = 'student-search';
  input.className = 'student-search';
  input.placeHolder = 'Search for students...';
  input.type = 'text';
  button.className = 'student-search';
  button.textContent = 'Search';

  div.appendChild ( form );
  div.appendChild ( button );
  form.appendChild ( input );


  const searchFilter = () => {
    let searchList = [];

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

    showPage ( searchList, 1);
    appendPageLinks ( searchList );

    if ( searchList.length <= 0 ) {
      let noResultsDiv = document.querySelector ( '.noResults' );
      noResultsDiv.style.display = '';
    }

  };


  button.addEventListener ( 'click', (e) => {
    e.preventDefault();
    removePageLinks();
    hideNoResults();
    searchFilter();
  });

  form.addEventListener ( 'keyup', (e) => {
    e.preventDefault();
    removePageLinks();
    hideNoResults();
    searchFilter();
  });
};

//creates a hidden message in case of no results in search
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

document.addEventListener ( 'DOMContentLoaded', () => {
  showPage ( studentList, 1 );
  appendPageLinks ( studentList );
  startingPage ();
  searchBar ();
  createNoResults();



});
