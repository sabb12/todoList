const button = document.querySelector('form');
const input = document.getElementById('txt');

const completed_List = document.querySelector('.completed_List');
const list = document.querySelector('.container');

const pagination = document.querySelector('pagination');
const pageBtn = document.getElementById('pageBtn');

const pageList = document.querySelector('.pagination_list');
// const prev = document.getElementById('prev');
// const next = document.getElementById('next');

let totalItemCount = 0;
let pageIndex = 0;
const maximumPerPage = 10;
const maximumIndexButtonPerPage = 5;

const tenPerPage = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61]

const render = () => {
  console.log('array', tenPerPage)
  console.log("hello", pageIndex, maximumPerPage, maximumPerPage * pageIndex)
  list.innerHTML='';
  for(let i = pageIndex * maximumPerPage; i < 10 + pageIndex * maximumPerPage; i ++) {
    // console.log("ten i; " ,i,  tenPerPage[i])
    if(!tenPerPage[i]) break;
    const newElement = createNewElement(tenPerPage[i]);
    console.log(newElement);
    list.appendChild(newElement);
  }
  createPaginationButtons();
  
}

const createPaginationButtons = () => {
  pageList.innerHTML='';
  const currentPageIndexCount = Math.ceil(tenPerPage.length/maximumPerPage);

  for(let i = 0; i < currentPageIndexCount; i++ ) {
    const button = document.createElement('button');
    button.type = 'button';
    button.innerHTML = i + 1;
    // 페이지 인덱스 버튼 최대치 넘으면  뒤에 .... 으로 대처
    // 그리고 이전 다음 버튼으로 인덱스 버튼 묶음을 넘김 예)  1~5 페이지 인덱스 있는데 옆에 다음 버튼 누르면 6~10 띄우게끔 나오기.
    // 최대 페이지 인덱스가 5일때 가정하고 만들때....
    // 1. 페이지 인덱스 버튼이 5개 초과하면 ... 이랑 다음 버튼 만들기....
    // 2. 다음 버튼 누르면 그다음 묶음(6~10)으로 이동 및 이전 버튼 만들기...
    // 2-1 다음 묶음으로 가면서 현재 리스트도 맞게 변경...
    // 3. 마지막 묶음 혹은 처음 묶음이면 이전/다음 버튼 없애기.

    // button에 eventlisteng을 달아서 맞는 pageIndex 바꿔준다
  button.addEventListener('click', (e) => {
      // 버튼 누르면 위에 i 를 바꿔줌.
      const pressedIndexPage = e.target.textContent - 1;
      pageIndex = pressedIndexPage;

      render();
    })

    pageList.appendChild(button);
    
  }
  if(maximumIndexButtonPerPage < currentPageIndexCount) {
    const btn_next = document.createElement('button')
    btn_next.type = 'button';
    btn_next.innerHTML = 'next';
    btn_next.style.visibility = 'visible';
    pageList.insertAdjacentElement('beforeend', btn_next);
  }
  // if(pageIndex == 1){
  //     next.style.visibility = 'hidden';
  // } else {
  //   next.style.visibility = 'visible';
  // }

}

button.addEventListener('submit', (e) => {
    e.preventDefault();
    // const text = createNewElement(input.value);
    // 입력 하고 enter 칠때 text 차이 비어 주는것
    tenPerPage.push(input.value)
    input.value = '';
    totalItemCount ++;
    
    pageBtn.innerHTML = totalItemCount;
  
    render();
});

const createNewElement = data => {
  const li = document.createElement('div');
  const containerForLi = document.createElement('div');
  const complete = document.createElement('input');
  const remove = document.createElement('button');
  const edit = document.createElement('button');
  const label = document.createElement('input');
  // const savebtn = document.createElement('button');
  
  containerForLi.textContent = data;
  label.value = data;
  label.style.display = "none";

  complete.type = 'checkbox';
  complete.checked = false;
  remove.type = 'button';
  remove.innerHTML = 'Remove';

  edit.type = 'button';
  edit.innerHTML = 'Edit';

  // savebtn.type = 'button';
  // savebtn.innerHTML = 'Save';

  complete.addEventListener('click', () =>{
    if(complete.checked) {
       completed_List.appendChild(li);
       totalItemCount --;
       pageBtn.innerHTML = totalItemCount;
    
    } else {
      list.appendChild(li);
      totalItemCount ++;

      pageBtn.innerHTML = totalItemCount;
    }
  });

  remove.addEventListener('click', () => {
    if(totalItemCount > 0){
      totalItemCount -= 1
      pageBtn.innerHTML = totalItemCount;
    }
    li.remove();
  });

  edit.addEventListener('click', () => {
    if(edit.innerHTML === "Edit") {
      edit.innerText = "Save"
      label.style.display = "block";
    }else{
      containerForLi.textContent = label.value;
      edit.innerText = "Edit"
      label.style.display = "none";
    }
  });

  // savebtn.addEventListener('click', () => {
  //     console.log('savebtn  :', li.childNodes[0])
  //     console.log('label.value  :', label.value)
  //     containerForLi.textContent = label.value;
  //     label.style.display = "none";
  // });

  li.appendChild(containerForLi);
  li.appendChild(label);
  li.appendChild(remove);
  li.appendChild(edit);
  // li.appendChild(savebtn);
  li.appendChild(complete);
  
  return li;
};

render();