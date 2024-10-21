var todoArray = [];

function onClickOfSaveBtn() {
    var todo = document.getElementById("title").value;
    todoArray.push(todo);
    localStorage.setItem("todo", todoArray.toString());
    document.getElementById("title").value = "";
    fetchAllTodos();
}

function fetchAllTodos() {
    var str = localStorage.getItem("todo");
    todoArray = str.split(",");
    var htmlString = `
    <tr>
        <th> Sr.No. </th>
        <th> Todo </th>
        <th> Actions </th>
    </tr>
    `;

    var counter = 0;
    todoArray.forEach(ele => {
        counter++;
        htmlString += `
        <tr>
            <td> ${counter} </td>
            <td> ${ele} </td>
            <td> 
                <button class="btn btn-outline-warning" onclick="editTodos(${counter-1})"> 
                Edit </button>
                <button class="btn btn-outline-danger" onclick="deleteTodos(${counter-1})"> 
                Delete </button>
            </td>
        </tr>
        `;
    })

    document.getElementById("todo-table").innerHTML = htmlString;
}

function editTodos(index) {
    var newValue = prompt("Do you want to edit?", todoArray[index]);
    if(newValue != "" && newValue != null) {
        todoArray[index] = newValue;
        localStorage.setItem("todo", todoArray.toString());
        fetchAllTodos();
    }
}

function deleteTodos(index) {
    if(confirm(`Do you want delete ${todoArray[index]} ?`)) {
        todoArray.splice(index, 1);
        localStorage.setItem("todo", todoArray.toString());
        fetchAllTodos();
    }
}

function removeAllTodos() {
    todoArray = [];
    localStorage.setItem("todo", todoArray.toString());
    document.getElementById("todo-table").innerHTML = "";
}
