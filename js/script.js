/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/


const pageDiv = document.querySelector ( '.page' );
const pageUl = pageDiv.querySelector ( 'ul' );
const list = pageUl.children;

//function displays only 10 students at a time per page
const showPage = ( list, page ) => {
  for ( let i = 0; i < list.length; i += 1 ) {
    const firstPageItem = ( ( page * 10 ) - 10 );
    const lastPageItem = ( ( page * 10 ) - 1 );
    if ( list[i] >= firstPageItem && list[i] <= lastPageItem ) {
    list.style.display = 'block';
  } else {
    list.style.display = 'none';
  }
}
};

const appendPageLinks = ( list ) => {
//total pages will change with student number variances.rounded up
  let totalPages = Math.ceil ( list.length/10 );
//im creating new elements here to use in this function scope
  let div = document.createElement ( 'div' );
  let ul = document.createElement ( 'ul' );
  let li = document.createElement ( 'li' );
  let aTag = document.createElement ( 'a' );
//appeneding elements to each other here
  div.className = 'pagination';
  pageDiv.appendChild ( div );
  div.appendChild ( ul );

//looping thru the number of pages and every loop gets a li with an a tag appended to the ul
  for ( let i = 0; i < totalPages.length; i += 1 ) {
    totalPages[i] = ul.appendChild ( li );
    li.appendChild ( aTag );
    aTag.textContent = totalPages[i];
//each number clicked calls the showPage function. working on the active/not active class
    aTag.addEventListener ( 'click', (e) => {
      showPage ( list, totalPages[i] );
      if ( event.target.tagName == totalPages[i] ) {
        aTag.className = 'active';
      } else {
        aTag.className = '';
      }
    });
  }
};

appendPageLinks (list);
