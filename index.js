const button = document.querySelector("form");
const input = document.getElementById("txt");

const completed_List = document.querySelector(".completed_List");
const list = document.querySelector(".container");

const pagination = document.querySelector(".pagination");
const pageBtn = document.getElementById("pageBtn");

const pageList = document.querySelector(".pagination_list");

let activeTodos = [];
let completedTodos = [];
let totalItemCount = 0;
let pageIndex = 0; // Current page
const maximumPerPage = 10;
const maximumIndexButtonPerPage = 5;
let buttonPageIndex = 0;

const backToPreviousPage = () => {
  if (
    pageIndex * maximumPerPage >= activeTodos.length &&
    activeTodos.length > 0
  ) {
    pageIndex--;
    if (
      Math.floor(
        (activeTodos.length - 1) / (maximumIndexButtonPerPage * maximumPerPage)
      ) < Math.floor(buttonPageIndex / maximumIndexButtonPerPage)
    ) {
      buttonPageIndex -= maximumIndexButtonPerPage;
    }
  }
};

const render = () => {
  backToPreviousPage();
  list.innerHTML = "";
  for (
    let i = pageIndex * maximumPerPage;
    i < 10 + pageIndex * maximumPerPage;
    i++
  ) {
    if (!activeTodos[i]) break;
    const newElement = createNewElement(activeTodos[i], i, false);
    list.appendChild(newElement);
  }
  completed_List.innerHTML = "";
  completedTodos.forEach((item, index) => {
    const newElement = createNewElement(item, index, true);
    completed_List.appendChild(newElement);
  });
  createPaginationButtons();
};

const getPageButtonCount = () => {
  const buttonCount =
    Math.ceil(
      (activeTodos.length - buttonPageIndex * maximumPerPage) / maximumPerPage
    ) + buttonPageIndex;
  return buttonCount - buttonPageIndex > maximumIndexButtonPerPage
    ? maximumIndexButtonPerPage + buttonPageIndex
    : buttonCount;
};

const createPaginationButtons = () => {
  pageList.innerHTML = "";
  for (let i = buttonPageIndex; i < getPageButtonCount(); i++) {
    const button = document.createElement("button");
    button.type = "button";
    button.innerHTML = i + 1;
    button.addEventListener("click", (e) => {
      const pressedIndexPage = e.target.textContent - 1;
      pageIndex = pressedIndexPage;
      render();
    });
    pageList.appendChild(button);
  }

  if (
    maximumIndexButtonPerPage <
      Math.ceil(activeTodos.length / maximumPerPage) &&
    activeTodos.length - buttonPageIndex * 10 > 50
  ) {
    const btn_next = document.createElement("button");
    btn_next.type = "button";
    btn_next.innerHTML = "next";
    btn_next.addEventListener("click", () => {
      buttonPageIndex += maximumIndexButtonPerPage;
      pageIndex = buttonPageIndex;
      render();
    });
    pageList.appendChild(btn_next);
  }

  if (buttonPageIndex) {
    const btn_prev = document.createElement("button");
    btn_prev.type = "button";
    btn_prev.innerHTML = "prev";
    btn_prev.addEventListener("click", () => {
      pageIndex = buttonPageIndex - 1;
      buttonPageIndex -= maximumIndexButtonPerPage;
      render();
    });
    pageList.insertAdjacentElement("afterbegin", btn_prev);
  }
};

button.addEventListener("submit", (e) => {
  e.preventDefault();
  activeTodos.push(input.value);
  input.value = "";
  totalItemCount++;
  pageBtn.innerHTML = totalItemCount;
  render();
});

const createNewElement = (data, index, isCompleted) => {
  const li = document.createElement("div");
  const inputLi = document.createElement("div");
  const buttonLi = document.createElement("div");
  const containerForLi = document.createElement("input");
  const complete = document.createElement("input");
  const remove = document.createElement("button");

  li.dataset.id = index;
  li.classList.add("todo-item");
  inputLi.classList.add("inputLi");
  buttonLi.classList.add("buttonLi");

  containerForLi.value = data;
  containerForLi.disabled = true;
  containerForLi.classList.add("inputValue");

  complete.type = "checkbox";
  complete.checked = isCompleted;

  remove.type = "button";
  remove.innerHTML = "Remove";
  remove.classList.add("removeBtn");

  complete.addEventListener("click", () => {
    if (complete.checked) {
      completedTodos.push(activeTodos.splice(index, 1)[0]);
      totalItemCount--;
    } else {
      activeTodos.push(completedTodos.splice(index, 1)[0]);
      totalItemCount++;
    }
    pageBtn.innerHTML = totalItemCount;
    render();
  });

  remove.addEventListener("click", (e) => {
    if (isCompleted) {
      completedTodos.splice(index, 1);
    } else {
      activeTodos.splice(index, 1);
      totalItemCount--;
    }
    pageBtn.innerHTML = totalItemCount;
    render();
  });

  inputLi.appendChild(complete);
  inputLi.appendChild(containerForLi);

  buttonLi.appendChild(remove);

  if (!isCompleted) {
    const edit = document.createElement("button");
    edit.type = "button";
    edit.innerHTML = "Edit";

    edit.addEventListener("click", () => {
      if (edit.innerHTML === "Edit") {
        edit.innerText = "Save";
        containerForLi.disabled = false;
      } else {
        activeTodos[index] = containerForLi.value;
        edit.innerText = "Edit";
        containerForLi.disabled = true;
      }
    });

    buttonLi.appendChild(edit);
  }

  li.appendChild(inputLi);
  li.appendChild(buttonLi);

  return li;
};

render();
