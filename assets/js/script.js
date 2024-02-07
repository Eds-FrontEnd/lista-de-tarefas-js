const input = document.querySelector("input");
const btnTask = document.querySelector(".btn");
const resultTasks = document.querySelector(".result");
const tasks = [];

const createTask = (nameTask) => {
  let task = {
    name: nameTask,
  };

  tasks.push(task);
  updateTasks();
};

const updateTasks = () => {
  resultTasks.innerHTML = "";

  tasks.forEach((item, index) => {
    resultTasks.innerHTML += `
     <div class="task" data-key="${index}">
        <span class="name">${item.name}</span>
        <input class="upTask" type="text" data-key="${index}" />
        <div class="buttons">
          <button class="edit">Editar</button>
          <button class="delete">Excluir</button>
          <button class="save" style="display: none;">Salvar</button>
        </div>
      </div>
   `;
  });
};

const goTask = () => {
    try{

        let nameTask = input.value.trim();
    
        if (nameTask !== "") {
        createTask(nameTask);
        cleanInput();
        } else {
        alert("Ops, digite novamente...");
        }
    }catch(e){
        console.error(`Ops, deu ruim agora... ${e}`);
    }
};

const cleanInput = () => {
  input.value = "";
};

const upTasks = (index, nameTask) => {
  tasks[index].name = nameTask;
  updateTasks();
};

document.addEventListener("click", (e) => {
try{
        const taskElement = e.target.closest(".task");
        if (taskElement) {
        let index = taskElement.getAttribute("data-key");
        if (e.target.classList.contains("delete")) {
            tasks.splice(index, 1);
            updateTasks();
        }
        if (e.target.classList.contains("edit")) {
            let upTask = taskElement.querySelector(".upTask");
            let saveBtn = taskElement.querySelector(".save");
    
            upTask.value = tasks[index].name;
    
            upTask.classList.add("active");
            saveBtn.style.display = "inline";
            e.target.style.display = "none";
        }
        if (e.target.classList.contains("save")) {
            let upTask = taskElement.querySelector(".upTask");
            let editBtn = taskElement.querySelector(".edit");
    
            upTasks(index, upTask.value);
    
            upTask.classList.remove("active");
            editBtn.style.display = "inline";
            e.target.style.display = "none";
        }
        }
    }catch(err){
        console.error(`Ops, deu ruim... ${err}`);
    }finally{
        console.info(`End`);
    }
});

updateTasks();

btnTask.addEventListener("click", goTask);
input.addEventListener("change", goTask);
