const input = document.querySelector('.input-box');
const addBtn = document.querySelector('.add-btn');
const listContainer = document.querySelector('.list-container');
const todo = [];
let editingIndex = null;

//addtask function.
function addTask(e){
    e.preventDefault();
    const inputTask = input.value;
    if(inputTask === '') return;

    if (editingIndex !== null) {
        todo[editingIndex] = inputTask;
        editingIndex = null;
        addBtn.textContent = 'Add';
    }

    else {
        todo.push(inputTask);
    }

    render();
    input.value = '';
}

function render(){
    listContainer.innerHTML = '';

    todo.forEach((task, index) =>{
        const taskLi = document.createElement("LI");
        const checkboxId = `task-${index}`;

        taskLi.innerHTML = `
            <input type="checkbox" id="${checkboxId}">
            <label for="${checkboxId}">${task}</label>
        `;

        const checkbox = taskLi.querySelector(`#${checkboxId}`);
        checkbox.addEventListener("change", ()=>{
            if (checkbox.checked) {
                taskLi.classList.add("active");
            }
            else {
                taskLi.classList.remove("active");
            }
        })

        //creating a container for icons
        const iconContainer = document.createElement("DIV");
        iconContainer.className = "icon-container"
        taskLi.appendChild(iconContainer);


        //creating the edit button
        const editBtn = document.createElement("I");
        editBtn.className = "fa-solid fa-pen-to-square";
        editBtn.id = "edit-btn";
        taskLi.appendChild(editBtn);
        editBtn.addEventListener("click", (e)=>{
            e.preventDefault();
            editTask(index);
        })

        //creating delele icon
        const deleteIcon = document.createElement("I");
        deleteIcon.className = "fa-solid fa-trash-arrow-up";

        //adding listener to deleteIcon
        deleteIcon.addEventListener("click", ()=>{
            deleteTask(index);
        });

        listContainer.appendChild(taskLi);
        taskLi.appendChild(deleteIcon);
        iconContainer.appendChild(editBtn);
        iconContainer.appendChild(deleteIcon);
    })
}

addBtn.addEventListener("click", addTask);
addBtn.addEventListener("keypress", (e)=>{
    if (e.key === "Enter") {
        addTask(e);
    }
})

//delete funtion
function deleteTask(index){
    todo.splice(index, 1);
    render();
}

function editTask(index){
    input.value = todo[index];
    input.focus();
    editingIndex = index;
    addBtn.textContent = "Update";
}