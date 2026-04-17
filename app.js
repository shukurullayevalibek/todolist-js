let addInp = document.querySelector(".addInp")
let addBtn = document.querySelector(".addBtn")
let taskList = document.querySelector(".taskList")

let editModal = document.querySelector("#editModal")
let editInp = document.querySelector(".editInp")
let saveEditBtn = document.querySelector(".saveEditBtn")
let closeEditBtn = document.querySelector(".closeEditBtn")

let currentEditIndex = null


let tasks = JSON.parse(localStorage.getItem("tasks")) || []


function render() {

    localStorage.setItem('tasks', JSON.stringify(tasks))

    taskList.innerHTML = tasks.map(
        (task, index) =>
            `<li class="${task.completed ? "completed" : ""}">
        <div class = "text-time">
            <i class="fa-regular ${task.completed ? "fa-square-check" : "fa-square"} check-icon" onclick=toggleTask(${index})></i>
            <small>${task.time}</small>
        </div>
        
        <span class="taskText">${task.text}</span>

        <div>
            <i class="fa-solid fa-pen-to-square edit" onclick=openModal(${index})></i>
            <i class="fa-solid fa-trash-can delete "onclick=deleteTask(${index})></i>
        </div>
        </li>`,
    )
        .join("")
}


function openModal(index) {
    currentEditIndex = index
    editInp.value = tasks[index].text
    editModal.classList.remove("hidden")
}

function closeModal() {
    currentEditIndex = null
    editModal.classList.add("hidden")
}
closeEditBtn.addEventListener('click', closeModal)

saveEditBtn.addEventListener('click', () => {
    let newValue = editInp.value.trim()

    if (newValue !== "") {
        tasks[currentEditIndex].text = newValue
        render()
        closeModal()
    }
})

editInp.addEventListener('keydown', (e) => {
    if (e.key === "Enter") {
        let newValue = editInp.value.trim()

        if (newValue !== "") {
            tasks[currentEditIndex].text = newValue
            render()
            closeModal()
        }
    }
})

addBtn.addEventListener('click', () => {
    let value = addInp.value.trim()

    if (value !== "") {
        tasks.push({ text: value, completed: false, time: getTime() })
        console.log(tasks);
        render()
    }
    addInp.value = ""

})

document.addEventListener('keydown', (e) => {
    if (e.key === "Enter") {
        let value = addInp.value.trim();

        if (value !== "") {
            tasks.push({ text: value, completed: false, time: getTime() })
            console.log(tasks);
            render()
        }
        addInp.value = ""
    }
})

function deleteTask(index) {
    tasks.splice(index, 1)
    render()
    console.log(tasks);

}

function toggleTask(index) {
    tasks[index].completed = !tasks[index].completed
    render()
}

function getTime() {
    let date = new Date()

    let day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate()

    let month = (date.getMonth() + 1) < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1

    let year = date.getFullYear()

    let hours = date.getHours() < 10 ? "0" + date.getHours() : date.getHours()

    let minutes = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()

    return `${day}.${month}.${year},${hours}:${minutes}`
}


render()