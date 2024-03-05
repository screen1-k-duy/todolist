const addTaskButton = document.getElementById("add-task");
const taskContainer = document.getElementById("task-container");
const completed = document.getElementById("completed");

let counter = 0;
let flat = true;

const createElement = (counter, flat, title, detail, date) => {
  console.log("counter", counter);
  const newTask = document.createElement("div");
  newTask.classList.add("new-tasks");
  newTask.setAttribute("id", `new-tasks-${counter}`);

  const checkRadio = document.createElement("div");
  checkRadio.classList.add("check-radio");
  const radioInput = document.createElement("input");
  radioInput.type = "checkbox";
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

  taskContainer.appendChild(newTask);

  radioInput.addEventListener("click", () => {
    const thisCheckBox = this.document.activeElement;
    if (thisCheckBox.checked) {
      const parentElement = thisCheckBox.closest(".new-tasks");
      parentElement.parentNode.removeChild(parentElement);

      const titleInput = parentElement.querySelector(
        ".add-content input[placeholder='Title']"
      );

      const detailInput = parentElement.querySelector(
        ".add-content input[placeholder='Detail']"
      );

      const dateInput = parentElement.querySelector(
        ".add-content input[type='date']"
      );
      console.log(titleInput.value);

      // create content
      const newTask = document.createElement("div");
      newTask.classList.add("new-tasks");
      newTask.setAttribute("id", `new-tasks-${counter}`);

      const checkRadio = document.createElement("div");
      checkRadio.classList.add("check-radio");
      const radioInput = document.createElement("input");
      radioInput.type = "checkbox";
      checkRadio.appendChild(radioInput);

      const addContent = document.createElement("div");
      addContent.classList.add("add-content");
      addContent.setAttribute("id", "add-content");

      const titleInput2 = document.createElement("input");
      titleInput2.type = "text";
      titleInput2.placeholder = "Title";

      const detailInput2 = document.createElement("input");
      detailInput2.type = "text";
      detailInput2.placeholder = "Detail";

      const dateInput2 = document.createElement("input");
      dateInput2.type = "date";

      addContent.appendChild(titleInput);
      addContent.appendChild(detailInput);
      addContent.appendChild(dateInput);

      newTask.appendChild(checkRadio);
      newTask.appendChild(addContent);

      completed.appendChild(newTask);

    } else {
      console.log("Checkbox is unchecked");
    }
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

  createElement(counter, flat);

  localStorage.setItem("counter", counter);

  //   newTask.addEventListener("click", () => {
  //     newTask.classList.toggle("hidden");
  //   });
});

window.addEventListener("load", (event) => {
  const getCounter = localStorage.getItem("counter");
  // const newTasks = document.getElementById("new-tasks-1");

  flat = false;

  for (let index = 1; index <= getCounter; index++) {
    let title = localStorage.getItem(`title-${index}`);
    let detail = localStorage.getItem(`detail-${index}`);
    let date = localStorage.getItem(`date-${index}`);

    if (title || detail || date) {
      createElement(index, flat, title, detail, date);
    }
  }
});
