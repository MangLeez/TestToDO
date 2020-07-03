var addButton = document.getElementsByTagName("button")[0]; //first button
var incompleteTasks = document.getElementById("incompletetasks");
var completedTasks = document.getElementById("completedtasks");

//New Task List Item
var createNewTaskElement = function(taskString) {
    //Create List Item
    var listItem = document.createElement("li");
    var checkBox = document.createElement("input");
    var label = document.createElement("label");
    var deleteButton = document.createElement("button");

    checkBox.type = "checkbox";
    deleteButton.innerText = "Delete";
    deleteButton.className = "delete";

    label.innerText = taskString;

    //Each element needs appending
    listItem.appendChild(checkBox);
    listItem.appendChild(label);
    listItem.appendChild(deleteButton);

    return listItem;
}

//Add a new task
var addTask = function() {
    console.log("Add task...");
    var taskInput = document.getElementById("newtask");
    //Create a new list item with the text from #newtask:
    var listItem = createNewTaskElement(taskInput.value);
    if (taskInput.value === "") {
        window.alert("Your must write something!")
    } else {
        //Append listItem to incompleteTasks
        incompleteTasks.appendChild(listItem);
        bindTaskEvents(listItem, taskCompleted);
    }
}

//Set the click handler to the addTask function
addButton.addEventListener("click", addTask);


//Delete an existing task
var deleteTask = function() {
    console.log("Delete task...");
    var listItem = this.parentNode;
    var ul = listItem.parentNode;

    //Remove the parent list item from the ul
    ul.removeChild(listItem);
}

//Mark a task as complete
var taskCompleted = function() {
    console.log("Task complete...");
    //Append the task list item to the #completedtasks
    var listItem = this.parentNode;
    completedTasks.appendChild(listItem);
    bindTaskEvents(listItem, taskIncomplete);
}

//Mark a task as incomplete
var taskIncomplete = function() {
    console.log("Task incomplete...");
    //Append the task list item to the #incompletetasks
    var listItem = this.parentNode;
    incompleteTasks.appendChild(listItem);
    bindTaskEvents(listItem, taskCompleted);
}

var bindTaskEvents = function(taskListItem, checkBoxEventHandler) {
    console.log("Bind list item events");
    //select taskListItem's children
    var checkBox = taskListItem.querySelector("input[type=checkbox]");
    var deleteButton = taskListItem.querySelector("button.delete");

    //bind checkBoxEventHandler to checkbox
    checkBox.onchange = checkBoxEventHandler;

    //bind deleteTask to delete button
    deleteButton.onclick = deleteTask;
}


//cycle over incompleteTasks ul list items
for (var i = 0; i < incompleteTasks.children.length; i++) {
    //bind events to list item's children (taskCompleted)
    bindTaskEvents(incompleteTasks.children[i], taskCompleted);
}

//cycle over completedTasks ul list items
for (var i = 0; i < completedTasks.children.length; i++) {
    //bind events to list item's children (taskIncomplete)
    bindTaskEvents(completedTasks.children[i], taskIncomplete);
}