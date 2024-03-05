const addTaskButton = document.getElementById("add-task");
const taskContainer = document.getElementById("task-container");

let counter = 0;

addTaskButton.addEventListener("click", () => {
  counter++;

  const newTask = document.createElement("div");
  newTask.classList.add("new-tasks");
  newTask.setAttribute("id", `new-tasks-${counter}`);

  const checkRadio = document.createElement("div");
  checkRadio.classList.add("check-radio");
  const radioInput = document.createElement("input");
  radioInput.type = "radio";
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

  let dataList = [];

  titleInput?.addEventListener("input", (e) => {
    console.log(titleInput.value);
    titleInput.textContent = titleInput.value;
    localStorage.setItem(`title-${counter}`, titleInput.value);
  });

  detailInput?.addEventListener("input", (e) => {
    console.log(detailInput.value, "detailInput.value");
    detailInput.textContent = detailInput.value;
    localStorage.setItem("dsadas", "detailInput.value");
    // localStorage.setItem(`detail-${counter}`, detailInput.value);
  });

  dateInput?.addEventListener("input", (e) => {
    dateInput.dataset.value = dateInput.value;
    localStorage.setItem(`date-${counter}`, dateInput.value);
  });

  console.log("dataList", dataList);

  //   newTask.addEventListener("click", () => {
  //     newTask.classList.toggle("hidden");
  //   });
});
