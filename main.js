const addTaskButton = document.getElementById("add-task");
const taskContainer = document.getElementById("task-container");
const completed = document.getElementById("completed");
const spanElement = completed.querySelector("span");

let counter = 0;
let flat = true;
let checked = true;
let countComplete = 0;
let listComplete = [];

const createElement = (listTask, counter, flat, title, detail, date, checked) => {
  const newTask = document.createElement("div");
  newTask.classList.add("new-tasks");
  newTask.setAttribute("id", `new-tasks-${counter}`);

  const checkRadio = document.createElement("div");
  checkRadio.classList.add("check-radio");
  const radioInput = document.createElement("input");
  radioInput.type = "checkbox";
  if (checked) {
    radioInput.checked = true;
    countComplete++;
    spanElement.innerHTML = countComplete;
  }
  checkRadio.appendChild(radioInput);

  const addContent = document.createElement("div");
  addContent.classList.add("add-content");
  addContent.setAttribute("id", "add-content");

  const titleInput = document.createElement("input");
  titleInput.type = "text";
  titleInput.placeholder = "Title";

  const detailInput = document.createElement("input");
  detailInput.type = "text";
  detailInput.placeholder = "Detail";

  const dateInput = document.createElement("input");
  dateInput.type = "date";

  addContent.appendChild(titleInput);
  addContent.appendChild(detailInput);
  addContent.appendChild(dateInput);

  newTask.appendChild(checkRadio);
  newTask.appendChild(addContent);

  listTask.appendChild(newTask);

  radioInput.addEventListener("click", () => {
    const thisCheckBox = this.document.activeElement;
    if (thisCheckBox.checked) {
      countComplete++;
      const parentElement = thisCheckBox.closest(".new-tasks");
      parentElement.parentNode.removeChild(parentElement);

      listComplete.push(counter);

      completed.appendChild(newTask);

      console.log("countComplete", countComplete);
      spanElement.innerHTML = countComplete;
    } else {
      countComplete--;
      listComplete.splice(counter,1);
      spanElement.innerHTML = countComplete;
      taskContainer.appendChild(newTask);
    }

    console.log("listComplete", listComplete);
    localStorage.setItem("list_complete", JSON.stringify(listComplete));
  });

  if (flat) {
    setLocalStore(counter, titleInput, detailInput, dateInput);
  } else {
    getLocalStore(titleInput, detailInput, dateInput, title, detail, date);
  }
};

const setLocalStore = (counter, titleInput, detailInput, dateInput) => {
  titleInput?.addEventListener("input", (e) => {
    console.log(titleInput.value);
    titleInput.textContent = titleInput.value;
    localStorage.setItem(`title-${counter}`, titleInput.value);
  });

  detailInput?.addEventListener("input", (e) => {
    console.log(detailInput.value, "detailInput.value");
    detailInput.textContent = detailInput.value;
    localStorage.setItem(`detail-${counter}`, detailInput.value);
  });

  dateInput?.addEventListener("input", (e) => {
    dateInput.dataset.value = dateInput.value;
    localStorage.setItem(`date-${counter}`, dateInput.value);
  });
};

const getLocalStore = (
  titleInput,
  detailInput,
  dateInput,
  title,
  detail,
  date
) => {
  titleInput.value = title;
  titleInput.textContent = titleInput.value;

  detailInput.value = detail;
  detailInput.textContent = detailInput.value;

  dateInput.value = date;
  dateInput.dataset.value = dateInput.value;
};

addTaskButton.addEventListener("click", () => {
  // localStorage.clear();
  counter = localStorage.getItem("counter");
  counter++;
  flat = true;

  createElement(taskContainer, counter, flat);

  localStorage.setItem("counter", counter);

  //   newTask.addEventListener("click", () => {
  //     newTask.classList.toggle("hidden");
  //   });
});

window.addEventListener("load", (event) => {
  const getCounter = localStorage.getItem("counter");
  // const newTasks = document.getElementById("new-tasks-1");
  const getListComplete = JSON.parse(localStorage.getItem("list_complete"));

  console.log('getting list complete',typeof getListComplete, getListComplete?.length);

  flat = false;

  for (let index = 1; index <= getCounter; index++) {
    let title = localStorage.getItem(`title-${index}`);
    let detail = localStorage.getItem(`detail-${index}`);
    let date = localStorage.getItem(`date-${index}`);

    const foundElement = getListComplete?.find((element) => element === index);
    if (foundElement) {
      checked = true;
      createElement(completed, index, flat, title, detail, date, checked);
    }else{
      checked = false;
       if (title || detail || date) {
         createElement(
           taskContainer,
           index,
           flat,
           title,
           detail,
           date,
           checked
         );
       }
    }
  }

});
