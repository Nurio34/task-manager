
const form = document.querySelector("form")
const searchInp = document.querySelector("#searchInp")
let tasksArr = []

// event listeners

    window.addEventListener("DOMContentLoaded", ()=>{

         getTasks(displayTasks)
    })

    form.addEventListener("submit",(e)=>{

            e.preventDefault()

        const task = document.querySelector("#taskInp")
        let taskValue = task.value

            axios
            .post("/api/v1/tasks",{
                task : taskValue,
            })
            .then(()=> {
                getTasks(displayTasks)
                task.value = ""
            })
            .catch(err=>console.error(err))
    })

    searchInp.addEventListener("input",searchTask)



//  functions
function getTasks(func) {
    axios.get(`/api/v1/tasks`)
    .then(res => {
        tasksArr = res.data
        func(tasksArr)
    })
}

function displayTasks(arr) {
    const listEl = document.querySelector(".list")

    let result = ""

        arr.map((task,i) => {

            if(task.complated) {
                result += `
                <li class="task-group" data-id="${i+1}">
                    <p class="task complated">${task.task}</p>
                    <i class="fa-solid fa-pen-to-square"></i>
                    <i class="fa-solid fa-trash"></i>
                </li>
                `
            } else {
                result += `
                <li class="task-group" data-id="${i+1}">
                    <p class="task">${task.task}</p>
                    <i class="fa-solid fa-pen-to-square"></i>
                    <i class="fa-solid fa-trash"></i>
                </li>
                `
            }

        listEl.innerHTML = result
    })

    const editBtns = [...document.querySelectorAll(".fa-pen-to-square")]

        editBtns.forEach(btn=>{
            btn.addEventListener("click",(e)=>{
                editPop(e,tasksArr)
            })
        })

    const deleteBtns = [...document.querySelectorAll(".fa-trash")]

        deleteBtns.forEach(btn=>{
            btn.addEventListener("click",(e)=>{
                deleteTask(e,tasksArr)
            })
        })
}

function editPop(e,arr) {
    
    const editPopEl = document.querySelector(".editPop")
    const taskId = e.target.parentElement.dataset.id

        editPopEl.classList.add("visible")

    const updateTime = arr[taskId-1].uptadedAt ? arr[taskId-1].uptadedAt : "not uptaded yet"

        editPopEl.innerHTML = `
            <button type="button" id="saveBtn">X</button>
            <h2>Task</h2>
            <p class="taskId">Task ID : ${arr[taskId-1]._id}</p>
            <div class="task-group">
                <p class="task">Task</p>
                <input name="task" id="taskArea" value="${arr[taskId-1].task}">
            </div>
            <p class="complated">Complated <input type="checkbox" name="complated" id="complatedInp"></p>
            <p class="createdAt">Created at : ${arr[taskId-1].createdAt}</p>
            <p class="createdAt">Uptaded at : ${updateTime}</p>
            `
    const complatedInp = document.querySelector("#complatedInp")
        
        complatedInp.checked =  arr[taskId-1].complated === true ? true : false

    const saveBtn = document.querySelector("#saveBtn")

        saveBtn.addEventListener("click", ()=> {
            editTask(arr[taskId-1]._id,editPopEl)
        })
}

function editTask(id,editPopEl) {
    const taskInp = document.querySelector("#taskArea")
    const complatedInp = document.querySelector("#complatedInp")

        axios.patch(`/api/v1/tasks/${id}`,{
            task : `${taskInp.value}`,
            complated: complatedInp.checked,
            uptadedAt : new Date()
        })
        .then(() => {
            getTasks(displayTasks)
            editPopEl.classList.remove("visible")
        })
        .catch(err => console.error(err))

}

function deleteTask(e,arr) {
    const taskElID = e.target.parentElement.dataset.id
    const taskId = arr[taskElID-1]._id
        
    const isConfirmed = confirm(`=> " Are you sure to DELETE this task ? "`)
        
        if(isConfirmed) {
            axios.delete(`/api/v1/tasks/${taskId}`)
            .then(()=>getTasks(displayTasks))
            .catch(err=>console.error(err))
        }
}

function searchTask() {
    const task = searchInp.value

        axios.get(`/api/v1/tasks/${task}`)
        .then(res=>{
            tasksArr = res.data
            console.log(tasksArr);
            displayTasks(tasksArr)
        })
        .catch(err=>console.error(err))
}