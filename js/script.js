/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/


const pageDiv = document.querySelector ( '.page' );
const list = document.querySelector ( 'ul' );
const studentList = list.children;
const input = document.createElement ( 'input' );

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

    li.addEventListener ( 'click', (event) => {
      let aTags = document.querySelectorAll ( 'a' );
      for ( let i = 0; i < aTags.length; i += 1 ) {
        if ( aTags[i] === event.target ) {
          event.target.classList.add ( 'active' );
          } else {
            aTags[i].classList.remove ( 'active' );
            }
        }
      return showPage ( studentList, i+1 );
    });
  }
};

document.addEventListener ( 'DOMContentLoaded', () => {
  appendPageLinks ( studentList );
  showPage ( studentList, 1 )
//if there is an easier way to do this (below). I'd like to know.
  let startingPage = document.querySelector ( 'div.pagination ul li a' );
  startingPage.classList.add ( 'active' );
});
