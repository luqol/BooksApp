{
  'use strict';

  const select = {
    templateOf: {
      book: '#template-book',
    },
    containerOf: {
      booksList: '.books-list',
      filters: '.filters',
    },
    book: {
      img: '.book__image',
      show: 'hidden',
      favorite: 'favorite',
      rating: '.book__rating__fill',
    }
  };

  const elem = {
    style: {
      low: 'linear-gradient(to bottom,  #fefcea 0%, #f1da36 100%);',
      mid: 'linear-gradient(to bottom, #b4df5b 0%,#b4df5b 100%);',
      high: 'linear-gradient(to bottom, #299a0b 0%, #299a0b 100%);',
      excellent: 'linear-gradient(to bottom, #ff0084 0%,#ff0084 100%);',
    }
  };

  const templates = {
    book: Handlebars.compile(document.querySelector(select.templateOf.book).innerHTML),
  };

  class BookList {
    constructor(){
      const thisBookList = this;
      thisBookList.favoriteBooks = [];
      thisBookList.filters = [];

      thisBookList.initData();
      thisBookList.getElements();
    }
    initData(){
      const thisBookList = this;
      thisBookList.data = dataSource.books;
    }
    getElements(){
      const thisBookList = this;

      thisBookList.dom = {};

      thisBookList.dom.booksList = document.querySelector(select.containerOf.booksList);
      thisBookList.dom.filters = document.querySelector(select.containerOf.filters);

    }
    init(){
      const thisBookList = this;

      thisBookList.renderBooks();
      thisBookList.initAction();
    }
    renderBooks(){
      const thisBookList = this;

      for(const book of thisBookList.data){
        book.ratingWidth = book.rating*10; 
        book.ratingBgc = thisBookList.checkRating(book.rating);
        const generatedHTML = templates.book(book);
        //console.log(generatedHTML);
    
        const generatedDom = utils.createDOMFromHTML(generatedHTML);
        //console.log(generatedDom);
        //generatedDom.querySelector(select.book.rating).setAttribute('style', 'background:' + checkRating(book.rating) + ' width: ' + book.ratingWidth+'%');
            
        thisBookList.dom.booksList.appendChild(generatedDom);
      }
    }
    checkRating(rating){
      if(rating <= 6){ 
        return elem.style.low;
      }
      if(rating > 6  && rating <= 8){
        return elem.style.mid;
      }
      if(rating > 8 && rating <= 9){
        return elem.style.high;
      }
      if(rating >9){
        return elem.style.excellent;
      }
    }
    initAction(){
      const thisBookList = this;
    
      thisBookList.dom.booksList.addEventListener('dblclick', function(event){
        event.preventDefault();
    
        if(event.target.offsetParent.classList.contains('book__image')){
          if(thisBookList.favoriteBooks.includes(event.target.offsetParent.getAttribute('data-id'))){
            const indexOfBook = thisBookList.favoriteBooks.indexOf(event.target.offsetParent.getAttribute('data-id'));
            thisBookList.favoriteBooks.splice(indexOfBook,1);
            event.target.offsetParent.classList.remove(select.book.favorite);
          }else {
            thisBookList.favoriteBooks.push(event.target.offsetParent.getAttribute('data-id'));
            event.target.offsetParent.classList.add(select.book.favorite);
          }
        }
    
        //console.log(favoriteBooks);
      });
           
      thisBookList.dom.filters.addEventListener('click', function(event){
        if(event.target.type == 'checkbox' && event.target.name == 'filter' && event.target.tagName == 'INPUT')
        {
          if(event.target.checked){
            thisBookList.filters.push(event.target.value);
                        
          }else{
            const indexofFilter = thisBookList.filters.indexOf(event.target.value);
            thisBookList.filters.splice(indexofFilter,1);
          }
          thisBookList.showBooks();
        }
                
      });
    }
    showBooks(){
      const thisBookList = this; 
      //console.log(filters);
    
      for(const book of thisBookList.data){
        document.querySelector('.book__image[data-id="' + book.id + '"]').classList.remove(select.book.show);
      }
    
      for(const filtr of thisBookList.filters){
        for(const book of thisBookList.data){              
          if(book.details[filtr]){
            //console.log(filtr, book.name ,book.details[filtr]);
            document.querySelector('.book__image[data-id="' + book.id + '"]').classList.add(select.book.show);
          }
        }         
      }
    }
  }

  const app = new BookList();

  app.init();

}