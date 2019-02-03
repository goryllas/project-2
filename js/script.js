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
    let firstPageItem = ( ( page * 10 ) - 10 );
    let lastPageItem = ( ( page * 10 ) - 1 );
    if ( i >= firstPageItem && i <= lastPageItem ) {
    list[i].style.display = 'block';
  } else {
    list[i].style.display = 'none';
  }
}
};

showPage ( list, 1 );

/*
const appendPageLinks = ( list ) => {

//total pages will change with student number variances.rounded up
  let totalPages = Math.ceil ( list.length/10 );

//im creating new elements here to use in this function scope
  let div = document.createElement ( 'div' );
  let ul = document.createElement ( 'ul' );

//appeneding elements to each other here
  div.className = 'pagination';
  pageDiv.appendChild ( div );
  div.appendChild ( ul );

//creates an li (the page number) appended to the ul.appends an a tag to li
  for ( let i = 0; i < totalPages; i += 1 ) {
    let li = document.createElement ( 'li' );
    let aTag = document.createElement ( 'a' );

    aTag.textContent = i + 1;
    li.className = 'pageNum';
    li.appendChild ( aTag );
    totalPages[i] = ul.appendChild ( li );


//each number clicked calls the showPage function. working on the active/not active class
    li.addEventListener ( 'click', (event) => {
      if ( event.target.className == 'pageNum' ) {
        aTag.className = 'active';
        } else {
          aTag.className = '';
          }
      return showPage ( list, i+1 );
    });
  }
};

appendPageLinks ( list );
*/
