// Import stylesheets
import './style.css';

// - ✅ As  a user, when I open a new tab, I should see an Add Note button 
// - ✅ As a user, when I click on the Add Note button, I should see a TinyNote tile with default title and empty content
// - ✅ As a user, after I type the title and content, I should be able to save the TinyNote
// - ✅ As a user, when I refresh the page, I should be able to see saved note
// - ✅ As a user, I should be able to edit a saved TinyNote
          // - Create Edit button on card(saved readonly li)
          // - Create click event listener
          // - Should replace card(readonly li) to form(editable li)
// - As a user, I should be able to delete a saved TinyNote
// - As a user, I should be able to create and view multiple notes
// - As a user, I should be able to use this without feeling like I’m using Windows 95


function getTileForm(title="", content=""){
  const tileForm = document.createElement('li');
  tileForm.className = 'tiny-note-tile'
  tileForm.innerHTML = 
      `<form class="tiny-note-tile-form" id="tiny-note-tile-form">
        <div class="tiny-note-tile-form-group">
          <label for="tiny-note-tile-title">Title</label>
          <input type="text" 
                id="tiny-note-tile-title" 
                value="${title}"
                name="tiny-note-tile-title"
                placeholder="Get milk" 
                required 
                minlength="5" 
                maxlength="20"
          />
        </div>
        <div class="tiny-note-tile-form-group">
          <label for="tiny-note-tile-content">content</label>
          <textarea id="tiny-note-tile-content"
                    name="tiny-note-tile-content"
                    rows="5"
                    placeholder="Milk items"
                    required
                    minlength="20"
                    maxlength="60">${content}</textarea>
        </div>
        <div class="tiny-note-tile-form-group">
          <input type="submit" value="Save"/>
        </div>
      </form>`;

  return tileForm;
  
}

function getTileView(title, content){
  const tileView = document.createElement('li');
  tileView.className = 'tiny-note-tile'
  tileView.innerHTML = `<h3>${title}</h3>
      <h4>${content}</h4>
      <button id="card-edit-button" type="button">Edit</button>`;
      //replace from this view to form view
      const editButton = tileView.querySelector('#card-edit-button');
      editButton.addEventListener('click', function(){
        const listItem = tileView;
        const newItem = getTileForm(title, content);
        //console.log(content);
        listItem.parentNode.replaceChild(newItem, listItem);
      }, false);
  return tileView;
}

const addNoteBtn = document.querySelector('#add-note');//Selection
//Manipulation
addNoteBtn.addEventListener('click', function(){
  //ul -> tileArea
  //each form 
  const tileArea = document.querySelector('ul#tiny-note-tiles'); //Selection
  const tileFormNew = getTileForm();
  tileArea.appendChild(tileFormNew);//Manipulation
  const tileForm = document.querySelector('#tiny-note-tile-form');//Selection
  //Manipulation
  tileForm.addEventListener('submit', function(e){ 
    //stops page refresh by passing event, e, SubmitEvent
    //check callbacks
    //what is e, why is e passed here
    e.preventDefault();
    //console.log(tileForm.elements);
    const title = tileForm.elements[0].value;
    const content = tileForm.elements[1].value;  
    localStorage.setItem('title', title);
    localStorage.setItem('content', content);
    // console.log(tileForm.parentElement);
    // console.log(getTileView('a', 'b'));
    const listItem = tileForm.parentNode;
    const newItem = getTileView(title, content);

    listItem.parentNode.replaceChild(newItem, listItem);
    
  }, false);
}, false);

function myOnloadFunction(){
  const title = localStorage.getItem('title');
  const content = localStorage.getItem('content');
  const tileView = getTileView(title, content);
  // console.log(tileView)
  const tileArea = document.querySelector('ul#tiny-note-tiles'); //Selection
  //Manipulation
  tileArea.appendChild(tileView);
  // selecting ul and manipulating it to add the dangling(DocumentFragment) li
  // check Add button for example
  
}
// place returned value of getTileView into DOM
// myOnloadFunction is called after loading the page
window.onload = myOnloadFunction;


