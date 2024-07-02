const button = document.querySelector("form");
const input = document.getElementById("txt");

const completed_List = document.querySelector(".completed_List");
const list = document.querySelector(".container");

const pagination = document.querySelector("pagination");
const pageBtn = document.getElementById("pageBtn");

const pageList = document.querySelector(".pagination_list");

let totalItemCount = 0;
let pageIndex = 0; // Current page
const maximumPerPage = 10;
const maximumIndexButtonPerPage = 5;
let buttonPageIndex = 0;

const tenPerPage = [];

const backToPreviousPage = () => {
  if (
    pageIndex * maximumPerPage >= tenPerPage.length &&
    tenPerPage.length > 0
  ) {
    pageIndex--;
    if (
      Math.floor(
        (tenPerPage.length - 1) / (maximumIndexButtonPerPage * maximumPerPage)
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
    if (!tenPerPage[i]) break;
    const newElement = createNewElement(tenPerPage[i], i);
    list.appendChild(newElement);
  }
  createPaginationButtons();
};

const getPageButtonCount = () => {
  const buttonCount =
    Math.ceil(
      (tenPerPage.length - buttonPageIndex * maximumPerPage) / maximumPerPage
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
    maximumIndexButtonPerPage < Math.ceil(tenPerPage.length / maximumPerPage) &&
    tenPerPage.length - buttonPageIndex * 10 > 50
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
  tenPerPage.push(input.value);
  input.value = "";
  totalItemCount++;
  pageBtn.innerHTML = totalItemCount;
  render();
});

const createNewElement = (data, index) => {
  const li = document.createElement("div");
  const containerForLi = document.createElement("div");
  const complete = document.createElement("input");
  const remove = document.createElement("button");
  const edit = document.createElement("button");
  const label = document.createElement("input");

  li.dataset.id = index;
  li.classList.add("todo-item");
  containerForLi.textContent = data;
  label.value = data;
  label.style.display = "none";

  complete.type = "checkbox";
  complete.checked = false;
  remove.type = "button";
  remove.innerHTML = "Remove";

  edit.type = "button";
  edit.innerHTML = "Edit";

  complete.addEventListener("click", () => {
    if (complete.checked) {
      completed_List.appendChild(li);
      totalItemCount--;
      pageBtn.innerHTML = totalItemCount;
    } else {
      list.appendChild(li);
      totalItemCount++;
      pageBtn.innerHTML = totalItemCount;
    }
  });

  remove.addEventListener("click", (e) => {
    if (totalItemCount > 0) {
      totalItemCount--;
      pageBtn.innerHTML = totalItemCount;
    }
    const index = e.target.parentElement.dataset.id;
    tenPerPage.splice(index, 1);
    render();
  });

  edit.addEventListener("click", () => {
    if (edit.innerHTML === "Edit") {
      edit.innerText = "Save";
      label.style.display = "block";
    } else {
      containerForLi.textContent = label.value;
      edit.innerText = "Edit";
      label.style.display = "none";
    }
  });

  li.appendChild(containerForLi);
  li.appendChild(label);
  li.appendChild(remove);
  li.appendChild(edit);
  li.appendChild(complete);

  return li;
};

render();
