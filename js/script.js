/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/


const pageDiv = document.querySelector ( '.page' );
const pageUl = pageDiv.querySelector ( 'ul' );
const list = pageUl.children;

//Function displays only 10 students per page. The rest are 'hidden'.
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

const appendPageLinks = ( list ) => {

/*Total pages will change according to the student number in the list.
All rounded up.
*/
  let totalPages = Math.ceil ( list.length/10 );
/*Created new ul required to store the page links in li form. Looped thru
each page required, appended it as an li with 'a' tags. Listener runs on
every page.
*/
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

/*
Listen and handle the main functionality of the page links.
First, get ALL 'a' tags. Then, loop thru the tags. If the tag was 'clicked',
add the 'active' class to it. Otherwise, remove the 'active' class.
showPage function is called at the end of the loop.
*/
    li.addEventListener ( 'click', (event) => {
      let aTags = document.querySelectorAll ( 'a' );

      for ( let i = 0; i < aTags.length; i += 1 ) {
        if ( aTags[i] === event.target ) {
          event.target.classList.add ( 'active' );
        } else {
          aTags[i].classList.remove ( 'active' );
        }
      }
      return showPage ( list, i+1 );
    });
  }
};

//only way i've comeup with to start the page with the list hidden.Correct method?
document.onLoad = showPage ( list, 0 ), appendPageLinks ( list );
