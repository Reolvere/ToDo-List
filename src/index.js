import "./styles.css"
import { TodoClass } from "./todoObj"
import { todoArr } from "./todoArr"
import { saveToLocalStorage } from "./saveToLocalStorage"
import { getLocalStorage } from "./getLocalStorage"

const openPopupBtns = document.querySelectorAll('[data-modal-target]')
const closePopupBtns = document.querySelectorAll('[data-close-button]') 
const addTaskBtnPopUp = document.querySelector(".addTaskBtnPopUp") //add task btn
const inputTaskName = document.querySelector(".inputTaskName")
const inputDescription = document.querySelector(".inputDescription")

//open popup
openPopupBtns.forEach(button => {
    button.addEventListener('click', () => {
        const popup = document.querySelector(button.dataset.modalTarget)
        openPopup(popup)
    })
})

//close popup
closePopupBtns.forEach(button => {
    button.addEventListener('click', () => {
        const popup = button.closest('.popup')
        closePopup(popup)
    })
})

function openPopup(popup){
    if(popup == null) return
    popup.classList.add('active')
} 

function closePopup(popup){
    if(popup == null) return
    popup.classList.remove('active')
} 

// get data from local storage
getLocalStorage()

//add event listener to the add button to add tasks
addTaskBtnPopUp.addEventListener("click", () => {
    todoArr.push(new TodoClass(inputTaskName.value, inputDescription.value)) //Add task name and the description to todoArr array
    const mainField = document.querySelector(".mainField") //get the mainfield

    //remove all elements to regenerate them from the beginning
    mainField.innerHTML = ''
    //go through the array
    todoArr.forEach((todo, index) => {

        //save the todo element in the local storage 
        saveToLocalStorage(todo)

        const todoFieldContainer = document.createElement("div") //create the container for todo
        todoFieldContainer.classList.add("todoFieldContainer")
        mainField.appendChild(todoFieldContainer)

        //create a div for the input and the task name elements 
        const taskNameContainer  = document.createElement("div")
        taskNameContainer.classList.add("taskNameContainer")
        todoFieldContainer.appendChild(taskNameContainer)


        //create input element checkbox
        const todoTaskNameCheckbox = document.createElement("input")
        todoTaskNameCheckbox.setAttribute('type', 'checkbox')
        todoTaskNameCheckbox.classList.add('todoTaskNameCheckbox')
        taskNameContainer.appendChild(todoTaskNameCheckbox)

        //create taskName element 
        const todoTaskName = document.createElement("h3");
        todoTaskName.classList.add("todoTaskName");
        todoTaskName.innerHTML = `${todo.taskName}`; // Add the task name 
        taskNameContainer.appendChild(todoTaskName);

        //create description element 
        const todoDescription = document.createElement("p")
        todoDescription.classList.add("todoDescription")
        todoDescription.innerHTML = `${todo.description}`
        todoFieldContainer.appendChild(todoDescription)

        //create remove btn 
        const removeBtn = document.createElement("button")
        removeBtn.classList.add("removeBtn")
        removeBtn.innerHTML = 'X'
        taskNameContainer.appendChild(removeBtn)

        //add event listener to the input checkbox
        todoTaskNameCheckbox.addEventListener("change", () => {

            // if the box is checked add grey color to the task name and to the description
            if(todoTaskNameCheckbox.checked){
                todoTaskName.classList.add("checkedTask")
                todoDescription.classList.add("checkedTask")
            }
        })

        //add a data-attribute for the index of the todo in todoArr array
        todoFieldContainer.setAttribute("data-index", index)

        // Add event listener to remove the todo when button is clicked
        removeBtn.addEventListener("click", () => {
            // Get the index from the data-attribute
            const todoIndex = todoFieldContainer.getAttribute("data-index")

            // Remove the corresponding todo from the DOM
            todoFieldContainer.remove()

            // Remove the corresponding todo from the library array
            todoArr.splice(todoIndex, 1)
        })
    })
})
