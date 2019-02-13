/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/


const pageDiv = document.querySelector ( '.page' );
const list = document.querySelector ( 'ul' );
const studentList = list.children;
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

//create and append error message if no students found in search
const createNoResults = () => {
  let noResults = document.createElement ( 'h2' );
  noResults.className = 'no results';
  noResults.textContent = 'No Results';
  noResults.style.display = 'block';
  pageDiv.appendChild ( noResults );
};

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
    let results = false;
      for ( let i = 0; i < studentList.length; i += 1 ) {
        let name = studentList[i].querySelector('h3').innerHTML;
        let filter = input.value.toUpperCase();
          if ( name.toUpperCase().indexOf ( filter ) > -1 ) {
          studentList[i].style.display = 'block';
          results = true;
          } else {
            studentList[i].style.display = 'none';
            }
      }
      if ( results == false ) {
        createNoResults();
      }
  };


  button.addEventListener ( 'click', (e) => {
    e.preventDefault();
    searchFilter();
  });

  form.addEventListener ( 'keyup', (e) => {
    e.preventDefault();
    searchFilter();
  });
};


document.addEventListener ( 'DOMContentLoaded', () => {
  appendPageLinks ( studentList );

  //webpage loads and dislays Page 1 'active'
  showPage ( studentList, 1 )
  let startingPage = document.querySelector ( 'div.pagination ul li a' );
  startingPage.classList.add ( 'active' );

  searchBar ();
});
