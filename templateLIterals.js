const button = document.querySelector('form');
const input = document.getElementById('txt');
const container = document.querySelector('.container');

button.addEventListener('click', (e) => {
    e.preventDefault();
    const text = input.value;
    input.value = '';

    const moved = completedList()

    container.insertAdjacentHTML('beforeend', 
             `<div><input type="checkbox">
                ${text}${moved}
              <button onclick="completedList()" type="button" id="deleteBtn">Delete</button>
             </div>
             `);
             
});
function completedList() {
    const completed_List = document.querySelector('.completed_List');
    completed_List.appendChild();
    console.log('completed_List :', completed_List)
        
}