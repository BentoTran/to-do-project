// 1) The "box" to hold all the tasks.
let todos = [];

// 2) Get the thingies in html that we need
let form = document.querySelector("#todo-form");
let input = document.querySelector("#todo-input");
let list = document.querySelector("#todo-list");
let countEl = document.querySelector("#count");
let emptyState = document.querySelector("#empty-state");

// 3) This will hopefully update what we see on the screen
function doTodos() {
  // Clear the list area first (so we can re-build it)
  list.innerHTML = "";

  // Show or hide the empty message
  if (todos.length === 0) {
    emptyState.style.display = "block";
  } else {
    emptyState.style.display = "none";
  }

  // Update the task count
  if (todos.length === 1) {
    countEl.textContent = "1 task";
  } else {
    countEl.textContent = todos.length + " tasks";
  }

  // Go through every todo and create HTML for it
  for (let i = 0; i < todos.length; i++) {
    let todo = todos[i];

    // Create the lists for this task
    let li = document.createElement("li");
    li.className = "todo";

    // If completed is true, add the "completed" class
    if (todo.completed === true) {
      li.className = "todo completed";
    }

    // Create the text paragraph
    let p = document.createElement("p");
    p.className = "todo-text";
    p.textContent = todo.text;

    // When you click the text, toggles completed and crosses it out.
    p.addEventListener("click", function () {
      // Toggle true/false
      if (todos[i].completed === true) {
        todos[i].completed = false;
      } else {
        todos[i].completed = true;
      }

      doTodos();
    });

    // This is the remove button
    let removeBtn = document.createElement("button");
    removeBtn.className = "remove-btn";
    removeBtn.textContent = "Remove";

    // When you click remove, delete this todo
    removeBtn.addEventListener("click", function () {
      // Remove 1 item at position i
      todos.splice(i, 1);
      doTodos();
    });

    // Put the text and button inside the <li>
    li.appendChild(p);
    li.appendChild(removeBtn);

    // Put the <li> inside the list
    list.appendChild(li);
  }
}

// 4) When the form is submitted, add a new task
form.addEventListener("submit", function (event) {
  event.preventDefault(); // stop the page from refreshing

  let text = input.value.trim(); // remove extra spaces

  // Don't add empty tasks
  if (text === "") {
    return;
  }

  // Add to the array
  todos.push({
    text: text,
    completed: false
  });

  // Clear the input
  input.value = "";

  doTodos();
});

doTodos();
