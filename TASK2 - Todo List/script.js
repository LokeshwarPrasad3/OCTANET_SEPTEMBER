

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
        // <i onclick="deleteList(${index})" id=${index} class="fa-regular fa-circle-check delete"></i>
        // <i onclick="deleteList(${index})" id=${index} class="fa-regular fa-pen-to-square edit"></i>
        todoList.map((element, index) => {
            cardHTML +=
                `
                <div class="cards">
                    <div class="title_operations">
                        <p class="show_title">${index + 1} . ${element.title.toString().toUpperCase()}</p>
                        <span class="show_priority">${element.priority}</span>
                        <div class="operations">
                             <button ${element.isCompleted ? 'disabled' : ''} onclick="disabledButton(event)" data-task-id=${index} class="completed_button">Completed</button>
                            <i onclick="deleteList(${index})" id=${index} class="fa-regular fa-trash-can delete"></i>
                        </div>
                    </div>
                        <p class="show_description">${element.description}</p>
                        <p class="show_deadline">Label : <span>${element.label.toString().toUpperCase()}</span></p>
                        <p class="show_deadline">
                        Deadline: 
                        <span class="bold">${element.date}</span> | Time :  <span class="bold">${element.time}</span></p>
                </div>
                `;

        })
        // Now show that
        showCards.innerHTML = cardHTML;
    }
}

// Add new list when clicked method implementation
function addNewList(e) {
    // page is not load when clicked
    e.preventDefault();

    // getting user filled details
    let title = document.querySelector('#input_title');
    let description = document.querySelector('#input_description');
    // getting time and date
    let date = document.querySelector("#input_date");
    let time = document.querySelector("#input_time");
    let priority = document.querySelector("#get_priority");
    let label = document.querySelector("#input_label");
    // completed or not
    let isCompleted = false;

    // check values is not empty and return
    if (!title.value || !description.value || !time.value || !date.value
        //  || !priority.value || !label.value
    ) {
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
        priority: priority.value,
        label: label.value,
        date: date.value,
        time: time.value,
        isCompleted: isCompleted,
    }
    // if priority is high then unshift to first no
    if (newNotes.priority === 'HIGH')
        todoList.unshift(newNotes);
    else
        // after craeting object push to original array
        todoList.push(newNotes);
    // set originArray to localStoarge name of todoList
    localStorage.setItem("todoList", JSON.stringify(todoList));

    // After all done empty user inputs values
    title.value = "";
    description.value = "";
    label.value = "";
    priority.value = "";
    date.value = "";
    time.value = "";

    // Show all updated cards of todolist
    showTodoList();
}

// When clicked on add then add cards in localstorage and display that
const button = document.querySelector('#submit_todo');
button.addEventListener('click', addNewList);


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
    // Show all the updated List
    showTodoList();
}

// IF clicked on completed button then disabled now change in localstorage
function disabledButton(e) {
    // Disable the button
    e.target.disabled = true;

    // Get the task index from the data-task-id attribute
    const taskIndex = e.target.getAttribute('data-task-id');

    // Update the task in local storage by setting isCompleted to true
    let todoList = JSON.parse(localStorage.getItem("todoList")) || [];

    if (taskIndex >= 0 && taskIndex < todoList.length) {
        todoList[taskIndex].isCompleted = true;
        localStorage.setItem("todoList", JSON.stringify(todoList));
    }

    // Update the display
    showTodoList();
}
