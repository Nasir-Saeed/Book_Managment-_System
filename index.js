// console.log("This is Book Management System Project....!");
class Book {
  constructor(bookNo, name, author, type) {
    this.bookNo = bookNo;
    this.name = name;
    this.author = author;
    this.type = type;
  }
}

// ADD DISPLAY FUNCTION
class Display {

  clear() {
    let addForm = document.getElementById("addForm");
    addForm.reset();
  }

  addBook(book) {
    console.log("book");
    let tab = document.getElementById('tab');
    let str = `<tr>
                           <td>${book.bookNo}</td>
                           <td>${book.name}</td>
                           <td>${book.author}</td>
                           <td>${book.type}</td>
                       </tr>`;

    tab.innerHTML += str;
  }

  validationA(book) {
    if (book.name.length < 2 || book.author.length < 2) {
      return false;
    }
    else {
      return true;
    }
  }

  show(type, displayMessage) {
    let result = document.getElementById("result");
    let bold;

    if (type === 'success') {
      bold = 'success';
    }
    else {
      bold = 'Error';
    }

    result.innerHTML = `<div class="alert alert-${type} alert-dismissible fade show" role="alert">
            <strong>${bold}:</strong> ${displayMessage}
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
          </div>`;

    setTimeout(() => {
      result.innerHTML = ""
    }, 3000)
  }

  saveDataLocal(book) {
    let bookNo = book.bookNo;
    let name = book.name;
    let author = book.author;
    let type = book.type;
    // console.log(name,author,type)

    // SET LOCAL STORAGE
    let getNo = localStorage.getItem("getNo");
    let getName = localStorage.getItem("getName");
    let getAuthor = localStorage.getItem("getAuthor");
    let getType = localStorage.getItem("getType");


    let noteNo;
    let noteName;
    let noteAuthor;
    let noteType;
    if (getNo == null && getName == null && getAuthor == null && getType == null) {
      noteNo = [];
      noteName = [];
      noteAuthor = [];
      noteType = [];
    }
    else {
      noteNo = JSON.parse(getNo);
      noteName = JSON.parse(getName);
      noteAuthor = JSON.parse(getAuthor);
      noteType = JSON.parse(getType);
    }

    noteNo.push(bookNo);
    noteName.push(name);
    noteAuthor.push(author);
    noteType.push(type);

    localStorage.setItem("getNo", JSON.stringify(noteNo));
    localStorage.setItem("getName", JSON.stringify(noteName));
    localStorage.setItem("getAuthor", JSON.stringify(noteAuthor));
    localStorage.setItem("getType", JSON.stringify(noteType));
  }
}

//  Add book in Local Storage
function audiences() {
  let getNo = localStorage.getItem("getNo");
  let getName = localStorage.getItem("getName");
  let getAuthor = localStorage.getItem("getAuthor");
  let getType = localStorage.getItem("getType");

  let noteNo;
  let noteName;
  let noteAuthor;
  let noteType;
  if (getName == null && getAuthor == null && getType == null) {
    noteNo = [];
    noteName = [];
    noteAuthor = [];
    noteType = [];
  }
  else {
    noteNo = JSON.parse(getNo);
    noteName = JSON.parse(getName);
    noteAuthor = JSON.parse(getAuthor);
    noteType = JSON.parse(getType);
  }


  let html = '';
  for (let i = 0; i < noteName.length; i++) {
    html += `<tr>
          <td>${noteNo[i]}</td>
          <td>${noteName[i]}</td>
          <td>${noteAuthor[i]}</td>
          <td>${noteType[i]}</td>
          <td><button type = "submit" id = "${i}"  onclick="editsBook(this.id)" class="btn btn-primary">Edit</button>
          <button type = "submit" id = "${i}"  onclick="deleteBook(this.id)" class="btn btn-danger">Delete</button></td>
          </tr>`;
  }

  let tab = document.getElementById('tab');
  if (noteNo.length != 0 && noteName.length != 0 && noteAuthor.length != 0 && noteType.length != 0) {
    tab.innerHTML = html;


  } else {
    tab.innerHTML = `<p style="color: black; font-weight: bolder;">Nothing to show! Use "Add a Book" section above to add books.</p>`;
  }
}
// Delete book from Local Storage
function deleteBook(index) {
  let getNo = localStorage.getItem("getNo");
  let getName = localStorage.getItem("getName");
  let getAuthor = localStorage.getItem("getAuthor");
  let getType = localStorage.getItem("getType");

  let noteNo;
  let noteName;
  let noteAuthor;
  let noteType;
  if (getName == null && getAuthor == null && getType == null) {
    noteNo = [];
    noteName = [];
    noteAuthor = [];
    noteType = [];
  }
  else {
    noteNo = JSON.parse(getNo);
    noteName = JSON.parse(getName);
    noteAuthor = JSON.parse(getAuthor);
    noteType = JSON.parse(getType);
  }

  noteNo.splice(index, 1);
  noteName.splice(index, 1);
  noteAuthor.splice(index, 1);
  noteType.splice(index, 1);


  localStorage.setItem("getNo", JSON.stringify(noteNo));
  localStorage.setItem("getName", JSON.stringify(noteName));
  localStorage.setItem("getAuthor", JSON.stringify(noteAuthor));
  localStorage.setItem("getType", JSON.stringify(noteType));

  console.log("index: ", index);

  audiences();
}

// Edit book and save it in local Storage
function editsBook(index) {

  let getNo = localStorage.getItem("getNo");
  let getName = localStorage.getItem("getName");
  let getAuthor = localStorage.getItem("getAuthor");
  let getType = localStorage.getItem("getType");

  noteNo = JSON.parse(getNo);
  noteName = JSON.parse(getName);
  noteAuthor = JSON.parse(getAuthor);
  noteType = JSON.parse(getType);

  let bookNo = noteNo.splice(index, 1)[0];
  let name = noteName.splice(index, 1)[0];
  let author = noteAuthor.splice(index, 1)[0];
  let type = noteType.splice(index, 1)[0];

  document.getElementById('tab').innerHTML = `    

  <div  >
    <td><input type="number" id="bookNo2" placeholder="Enter Book No" value="${bookNo}"></input></td>
    <td><input type="text" id="name2" placeholder="Enter Book Name" value="${name}"></td>
    <td><input type="text" id="author2" placeholder="Enter Author Name" value="${author}"></input></td>
    <br>
    <ul class="list-group">
       <li class="list-group-item">
          <input class="form-check-input me-1" type="checkbox" value="Comic Book" id = "comicBook2" > 
          <label class="form-check-label" for="comicBook2" style="font-weight: bolder;" >
          Comic Book
        </li>
       <li class="list-group-item">
          <input class="form-check-input me-1" type="checkbox" value="Fantasy" id = "fantasy2"> 
          <label class="form-check-label" for="fantasy2" style="font-weight: bolder;" > 
          Fantasy
       </li>
       <li class="list-group-item">
          <input class="form-check-input me-1" type="checkbox" value="Historical Fiction" id = "historicalFiction2"> 
          <label class="form-check-label" for="historicalFiction2" style="font-weight: bolder;" >
           Historical Fiction
       </li>
       <li class="list-group-item">
         <input class="form-check-input me-1" type="checkbox" value="Graphical Novel" id = "graphicalNovel2"> 
         <label class="form-check-label" for="graphicalNovel2" style="font-weight: bolder;" >
         Graphical Novel
       </li>
       <li class="list-group-item">
          <input class="form-check-input me-1" type="checkbox" value="Adventures" id = "adventures2"> 
          <label class="form-check-label" for="Adventures" style="font-weight: bolder;" >
          Adventures
       </li>
     </ul>
      <br>
      <button onclick="updateBook(this.id)" type="submit" class="btn btn-success" id = "${index}">Update</button>
  </div>
  
    `
}

// Update a book from Local Storage
function updateBook(index) {
  let bookNo = document.getElementById('bookNo2').value;
  let name = document.getElementById('name2').value;
  let author = document.getElementById('author2').value;

  let type;
  let comicBook = document.getElementById('comicBook2');
  let fantasy = document.getElementById('fantasy2');
  let historicalFiction = document.getElementById('historicalFiction2');
  let graphicalNovel = document.getElementById('graphicalNovel2');
  let adventures = document.getElementById('adventures2');

  if (comicBook.checked) {
    type = comicBook.value;
  }
  else if (fantasy.checked) {
    type = fantasy.value;
  }
  else if (historicalFiction.checked) {
    type = historicalFiction.value;
  }
  else if (graphicalNovel.checked) {
    type = graphicalNovel.value;
  }
  else if (adventures.checked) {
    type = adventures.value;
  }
  else {
    console.log("Error update")
  }

  // SET LOCAL STORAGE
  let getNo = localStorage.getItem("getNo");
  let getName = localStorage.getItem("getName");
  let getAuthor = localStorage.getItem("getAuthor");
  let getType = localStorage.getItem("getType");

  let noteName;
  let noteAuthor;
  let noteType;
  if (getNo == null && getName == null && getAuthor == null && getType == null) {
    noteNo = [];
    noteName = [];
    noteAuthor = [];
    noteType = [];
  }
  else {
    noteNo = JSON.parse(getNo);
    noteName = JSON.parse(getName);
    noteAuthor = JSON.parse(getAuthor);
    noteType = JSON.parse(getType);
  }
  noteNo.splice(index, 1, bookNo);
  noteName.splice(index, 1, name);
  noteAuthor.splice(index, 1, author);
  noteType.splice(index, 1, type);

  localStorage.setItem("getNo", JSON.stringify(noteNo));
  localStorage.setItem("getName", JSON.stringify(noteName));
  localStorage.setItem("getAuthor", JSON.stringify(noteAuthor));
  localStorage.setItem("getType", JSON.stringify(noteType));
  show()
  audiences();
}

// Show Status after edited Book
function show() {
  let result2 = document.getElementById("result2");
  result2.innerHTML = `<div class="alert alert-success alert-dismissible fade show" role="alert">
          <strong>Your Book Has Been Updated Successfully </strong> 
          <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>`;

  setTimeout(() => {
    result2.innerHTML = ""
  }, 3000)
}
// ADD SUBMIT FORM
let addForm = document.getElementById("addForm");
addForm.addEventListener('submit', formSubmit);

function formSubmit(e) {

  let bookNo = document.getElementById('bookNo').value;
  let name = document.getElementById('bookName').value;
  let author = document.getElementById('author').value;



  let type;
  let comicBook = document.getElementById('comicBook');
  let fantasy = document.getElementById('fantasy');
  let historicalFiction = document.getElementById('historicalFiction');
  let graphicalNovel = document.getElementById('graphicalNovel');
  let adventures = document.getElementById('adventures');

  if (comicBook.checked) {
    type = comicBook.value;
  }
  else if (fantasy.checked) {
    type = fantasy.value;
  }
  else if (historicalFiction.checked) {
    type = historicalFiction.value;
  }
  else if (graphicalNovel.checked) {
    type = graphicalNovel.value;
  }
  else if (adventures.checked) {
    type = adventures.value;
  }
  else {
    console.log("Error")
  }

  let book = new Book(bookNo, name, author, type);
  let display = new Display();

  if (display.validationA(book)) {
    display.clear();
    display.addBook(book);
    display.saveDataLocal(book);
    audiences();
    display.show('success', 'Your book has been successfully added');
  }
  else {
    display.show('danger', 'Sorry you cannot add book');
  }

  // saveDataLocal(book);
  e.preventDefault();

}
audiences();
