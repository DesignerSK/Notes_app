const boxHinz = document.querySelector(".add-box"),
      boxPopup = document.querySelector(".popup-box"),
      popupTitle = boxPopup.querySelector("header p"),
      closeIcon = boxPopup.querySelector("header i"),
      uberschriftTag = document.querySelector("input"),
      descTag = boxPopup.querySelector("textarea"), 
      btnHinz = boxPopup.querySelector("button");

const monate = ["Januar", "Februar", "Mart", "April", 
                "Maj", "Juni", "Juli", "Avgust", 
                "Septembar", "Oktobar", "Novembar", "Decembar"];

const notes = JSON.parse(localStorage.getItem("notiz") || "[]");
let isUpdate = false, updateId;       


      // na + otvorimo popup
boxHinz.addEventListener("click", () => {
    uberschriftTag.focus();
    boxPopup.classList.add("show");
});

     // na x zatvorimo popup
closeIcon.addEventListener("click", () => { 
    isUpdate = false;
    uberschriftTag.value = "";
    descTag.value = "";

    btnHinz.innerText = "Add Note";
    popupTitle.innerText = "Add a new Note";

    boxPopup.classList.remove("show");                           
});


function sieheNotizen () {   
    document.querySelectorAll(".note").forEach(note => note.remove());
    notes.forEach((note, index) => {
        let liTag = `
         <li class="note">
        <div class="details">
            <p>${note.title}</p>
            <span>${note.description}</span>
        </div>
        <div class="bottom-content">
            <span>${note.date}</span>
            <div class="settings">
                <i onclick="menuAnzeigen(this)" class='bx bx-dots-horizontal-rounded' ></i>
                <ul class="menu">
                    <li onclick="notizAktualisieren(${index}, '${note.title}', '${note.description}')"><i class='bx bx-pencil' ></i>Edit</li>
                    <li onclick="deleteNote(${index})"><i class='bx bx-trash' ></i>Delete</li>
                </ul>
            </div>
        </div>
    </li>`;

    boxHinz.insertAdjacentHTML("afterend", liTag);
    });
}
sieheNotizen ();

// dugme tri tacke ...
function menuAnzeigen(elem){
    elem.parentElement.classList.add("show");
    document.addEventListener("click", e => {
        if(e.target.tagName != "I" || e.target != elem ){
            elem.parentElement.classList.remove("show");               
        }
    });
}

// dugme delete              
function deleteNote (noteId){
    let confirmDel = confirm("Are you sure you wont to delete this note?");
    if(!confirmDel) return;
    notes.splice(noteId, 1); // uklanjamo selektovanu note

    // sacuvavamo sto je obrisano u local storage
    localStorage.setItem("notiz", JSON.stringify(notes));      
    sieheNotizen ();
}

// dugme edit
function notizAktualisieren(noteId, title, desc){    
    isUpdate = true;
    updateId = noteId;
    boxHinz.click();
    uberschriftTag.value = title;
    descTag.value = desc;

    btnHinz.innerText = "Aktualisieren";
    popupTitle.innerText = "Notiz Aktualisieren";
    console.log(noteId, title, desc);
}

    //ovo je add button u popupu 
btnHinz.addEventListener("click", e => {        
    e.preventDefault();
    let noteTitle = uberschriftTag.value,
        noteDesc = descTag.value;

        if(noteTitle || noteDesc) {
            let dateObj = new Date(),
            month = monate[dateObj.getMonth()],
            day = dateObj.getDate(),
            year = dateObj.getFullYear();

            let noteInfo = {
                title: noteTitle,
                description : noteDesc,
                date: `${month} ${day}, ${year}`
            }

            if(!isUpdate){
                notes.push(noteInfo); 
            } else {
                isUpdate = false;
                notes[updateId] = noteInfo;
            }

            // sacuvati u localstorage
            localStorage.setItem("notiz", JSON.stringify(notes));
            closeIcon.click();
            sieheNotizen ();
        }
});