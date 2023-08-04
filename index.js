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
let pageIndex = 0; // 현제 페이지
const maximumPerPage = 10;
const maximumIndexButtonPerPage = 5;
let buttonPageIndex = 0;

const tenPerPage = [
  // 1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,
  // 18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,
  // 39,40,41,42,43,44,45,46,47,48,49,50,51
]

//  // 1~5
//  1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,
//  18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,
//  39,40,41,42,43,44,45,46,47,48,49,50,
//  // 6~10
//  51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72
//  ,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96,97,98,99,100,
//  // 11
//  101

// const isEmptyPage = () => {
//   return pageIndex * maximumPerPage >= tenPerPage.length && tenPerPage.length > 0
// }

const backToPreviousPage = () => {
  if(pageIndex * maximumPerPage >= tenPerPage.length && tenPerPage.length > 0) {
    pageIndex --;
    if(Math.floor((tenPerPage.length -1) / (maximumIndexButtonPerPage * maximumPerPage)) < Math.floor(buttonPageIndex / (maximumIndexButtonPerPage ))) {
      
      buttonPageIndex -= maximumIndexButtonPerPage;

    }
  }
}


const render = () => {
  backToPreviousPage();
  // console.log('array', tenPerPage)
  // console.log("hello", pageIndex, maximumPerPage, maximumPerPage * pageIndex)
  list.innerHTML=''; 
  for(let i = pageIndex * maximumPerPage; i < 10 + pageIndex * maximumPerPage; i ++) {
    // console.log("ten i; " ,i,  tenPerPage[i])
    if(!tenPerPage[i]) break;
    const newElement = createNewElement(tenPerPage[i], i);

    list.appendChild(newElement);
  }

  // for (int i = 0; i<9; i++ ) {
  //   tenPerPage[i + pageIndex * 10]
  // }

  createPaginationButtons();


}

const getPageButtonCount = () => {
  const buttonCount = Math.ceil((tenPerPage.length - buttonPageIndex * maximumPerPage) / maximumPerPage) + buttonPageIndex;
console.log("return buttonCount :",  buttonCount - buttonPageIndex > maximumIndexButtonPerPage ? maximumIndexButtonPerPage + buttonPageIndex : buttonCount )
  return buttonCount - buttonPageIndex > maximumIndexButtonPerPage ? maximumIndexButtonPerPage + buttonPageIndex : buttonCount ; 
}

const createPaginationButtons = () => {
  pageList.innerHTML='';
  // const currentPageIndexCount = Math.ceil(tenPerPage.length/maximumPerPage);
  for(let i = buttonPageIndex; i < getPageButtonCount(); i++ ) {
    
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
      // console.log("clcked", pageIndex)
      render();
    })

    pageList.appendChild(button);
    
  }

//   let totalItemCount = 0;
// let pageIndex = 0; // 현제 페이지
// const maximumPerPage = 10;
// const maximumIndexButtonPerPage = 5;
// let buttonPageIndex = 0;

  // 5 < currentPageIndexCount = Math.ceil(tenPerPage.length/maximumPerPage)
  // && tenPerPage.length - buttonPageIndex * 10 > 50 ? true : false
  /**
    (maximumIndexButtonPerPage < Math.ceil(tenPerPage.length/maximumPerPage)
  */
 console.log("we :",maximumIndexButtonPerPage < Math.ceil(tenPerPage.length/maximumPerPage) && tenPerPage.length - buttonPageIndex * 10 > 50 ? true : false)
  if(maximumIndexButtonPerPage < Math.ceil(tenPerPage.length/maximumPerPage) && tenPerPage.length - buttonPageIndex * 10 > 50 ? true : false) {
 
    const btn_next = document.createElement('button')
    btn_next.type = 'button';
    btn_next.innerHTML = 'next';
    btn_next.addEventListener('click', () => {
                               
      buttonPageIndex += maximumIndexButtonPerPage;
      console.log("buttonPageIndex :", buttonPageIndex)
     
      pageIndex = buttonPageIndex;

      render();
    })
    pageList.appendChild(btn_next);
  }

  if(buttonPageIndex) {
    const btn_prev = document.createElement('button')
    btn_prev.type = 'button';
    btn_prev.innerHTML = 'prev';
    btn_prev.addEventListener('click', () => {
      pageIndex = buttonPageIndex -1;
      buttonPageIndex -= maximumIndexButtonPerPage;
      console.log("buttonPageIndex :", buttonPageIndex)
      render();
    })
    pageList.insertAdjacentElement("afterbegin", btn_prev);
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

// const calculateLastPagination = () => {
//   // console.log(tenPerPage.length - buttonPageIndex * 10)
//   return tenPerPage.length - buttonPageIndex * 10 > 50 ? true : false;
// }

const createNewElement = (data, index) => {
  const li = document.createElement('div');
  const containerForLi = document.createElement('div');
  const complete = document.createElement('input');
  const remove = document.createElement('button');
  const edit = document.createElement('button');
  const label = document.createElement('input');
  // const savebtn = document.createElement('button');
  li.dataset.id = index;
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

  remove.addEventListener('click', (e) => {
    if(totalItemCount > 0){
      totalItemCount -= 1
      pageBtn.innerHTML = totalItemCount;
    }
    const index = e.target.parentElement.dataset.id;
    tenPerPage.splice(index, 1);
    render();
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