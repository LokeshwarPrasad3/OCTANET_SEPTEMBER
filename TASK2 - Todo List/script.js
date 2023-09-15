

// Parent of all cards 
const showCards = document.querySelector(".show_list_section");


// show list when page loaded from localstorage
showTodoList();

// Method which show all todo list cards
function showTodoList() {
    // Getting Existing setted todolist from localstorage
    const todoList = JSON.parse(localStorage.getItem("todoList"));

    // if not created or empty then manage show
    if (todoList == null || todoList.length === 0) {
        showCards.innerHTML =
            `
                <p class="show_description">Nothing to show! Please add ToDo!</p>
                `;
        return;
    } else {
        // If localstorage have data of todolist cards

        // Initialized var for stored all content which is send innerHTML
        let cardHTML = "";

        // Show all cards data getted from localstorage store in cardHTML
        todoList.map((element, index) => {
            cardHTML +=
                `
                <div class="cards">
                    <div class="title_operations">
                        <p class="show_title">${element.title.toString().toUpperCase()}</p>
                        <div class="operations">
                            <span onclick="deleteList(${index})" id=${index} class="edit" >E</span>
                            <span onclick="deleteList(${index})" id=${index} class="delete" >D</span>
                        </div>
                    </div>
                    <p class="show_description">${element.description}</p>
                </div>
                `;

        })
        // Now show that
        showCards.innerHTML = cardHTML;
    }
}


// When clicked on add then add cards in localstorage and display that
const button = document.querySelector('#submit_todo');
button.addEventListener('click', function (e) {
    // page is not load when clicked
    e.preventDefault();

    // getting user filled details
    let title = document.querySelector('#input_title');
    let description = document.querySelector('#input_description');

    // check values is not empty and return
    if (!title.value || !description.value) {
        alert("Fill All Inputs");
        return;
    }

    // Getting if existing data present in localstorage
    let todoList = JSON.parse(localStorage.getItem("todoList"));

    // if not exist data then simply create and push to localstorage
    if (todoList == null)
        todoList = [];

    // Make new object to push in todoList array
    const newNotes = {
        title: title.value,
        description: description.value,
    }
    // after craeting object push to original array
    todoList.push(newNotes);
    // set originArray to localStoarge name of todoList
    localStorage.setItem("todoList", JSON.stringify(todoList));

    // After all done empty user inputs values
    title.value = "";
    description.value = "";

    // Show all updated cards of todolist
    showTodoList();

});


// Delete particular Todo List functionality
//getting parameter index from html onclick target tag
function deleteList(index) {
    // id is form of string
    console.log("Deleted list : " + index);

    // Getting existing data from localstorage
    let todoList = JSON.parse(localStorage.getItem("todoList"));

    // Filter with remove list which is targetted
    let latestList = todoList.filter((element, currIndex) => {
        return index !== currIndex;
    })

    // Not set Updated List in localstorage
    localStorage.setItem("todoList", JSON.stringify(latestList));
    // console latest list
    console.log(latestList);
    // Show all the updated List
    showTodoList();
}


