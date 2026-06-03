// =========================
// 로컬스토리지 키
// =========================

const STORAGE_KEY = "todoItems";

// =========================
// 저장된 Todo 불러오기
// =========================

const todoItems = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];

// =========================
// 상태 관리
// =========================

let currentFilter = "all";

let selectedDate = new Date();

let currentWeekStartDate = getMonday(new Date());

// =========================
// DOM 선택
// =========================

const todoInput = document.getElementById("todoInput");

const addTodoButton = document.getElementById("addTodoButton");

const todoList = document.getElementById("todoList");

const messageText = document.getElementById("messageText");

const filterButtons = document.querySelectorAll(".filter-button");

const currentDateText = document.getElementById("currentDateText");

const weekCalendar = document.getElementById("weekCalendar");

const weekRangeText = document.getElementById("weekRangeText");

const previousWeekButton = document.getElementById("previousWeekButton");

const nextWeekButton = document.getElementById("nextWeekButton");

// =========================
// 로컬스토리지 저장
// =========================

function saveTodosToLocalStorage() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(todoItems));
}

// =========================
// 날짜 유틸
// =========================

function formatDate(date) {
  return date.toISOString().split("T")[0];
}

function getMonday(date) {
  const copiedDate = new Date(date);

  const day = copiedDate.getDay();

  const diff = copiedDate.getDate() - (day === 0 ? 6 : day - 1);

  copiedDate.setDate(diff);

  return copiedDate;
}

function updateDateDisplay() {
  currentDateText.textContent = formatDate(selectedDate);
}

// =========================
// 메시지
// =========================

function showMessage(message) {
  messageText.textContent = message;

  setTimeout(() => {
    messageText.textContent = "";
  }, 2000);
}

// =========================
// 주간 캘린더
// =========================

function renderWeekCalendar() {
  weekCalendar.innerHTML = "";

  const dayNames = ["월", "화", "수", "목", "금", "토", "일"];

  const weekDates = [];

  for (let i = 0; i < 7; i++) {
    const currentDate = new Date(currentWeekStartDate);

    currentDate.setDate(currentWeekStartDate.getDate() + i);

    weekDates.push(currentDate);
  }

  weekRangeText.textContent = `${formatDate(weekDates[0])} ~ ${formatDate(
    weekDates[6],
  )}`;

  weekDates.forEach((date, index) => {
    const dateString = formatDate(date);

    const todoCount = todoItems.filter(
      (todo) => todo.date === dateString,
    ).length;

    const dayCard = document.createElement("div");

    dayCard.classList.add("day-card");

    if (dateString === formatDate(selectedDate)) {
      dayCard.classList.add("selected");
    }

    if (dateString === formatDate(new Date())) {
      dayCard.classList.add("today");
    }

    dayCard.innerHTML = `
        <div class="day-name">
          ${dayNames[index]}
        </div>

        <div class="day-date">
          ${dateString.slice(5)}
        </div>

        <div class="todo-count">
          ${todoCount}개
        </div>
      `;

    dayCard.addEventListener("click", () => {
      selectedDate = new Date(date);

      updateDateDisplay();

      renderWeekCalendar();

      renderTodoList();
    });

    weekCalendar.appendChild(dayCard);
  });
}

// =========================
// 날짜별 Todo 조회
// =========================

function getTodosForSelectedDate() {
  const selectedDateString = formatDate(selectedDate);

  return todoItems.filter((todo) => todo.date === selectedDateString);
}

// =========================
// 필터 적용
// =========================

function getFilteredTodos() {
  const dateTodos = getTodosForSelectedDate();

  if (currentFilter === "active") {
    return dateTodos.filter((todo) => !todo.isCompleted);
  }

  if (currentFilter === "completed") {
    return dateTodos.filter((todo) => todo.isCompleted);
  }

  return dateTodos;
}

// =========================
// Todo 렌더링
// =========================

function renderTodoList() {
  todoList.innerHTML = "";

  const filteredTodos = getFilteredTodos();

  filteredTodos.forEach((todoItem) => {
    const originalIndex = todoItems.indexOf(todoItem);

    const todoElement = document.createElement("li");

    todoElement.classList.add("todo-item");

    todoElement.innerHTML = `
        <span class="todo-content ${todoItem.isCompleted ? "completed" : ""}">
          ${todoItem.text}
        </span>

        <div class="todo-button-group">

          <button
            class="todo-button complete-button"
            onclick="toggleTodoComplete(${originalIndex})"
          >
            완료
          </button>

          <button
            class="todo-button edit-button"
            onclick="editTodo(${originalIndex})"
          >
            수정
          </button>

          <button
            class="todo-button delete-button"
            onclick="deleteTodo(${originalIndex})"
          >
            삭제
          </button>

        </div>
      `;

    todoList.appendChild(todoElement);
  });
}

// =========================
// Todo 추가
// =========================

function addTodo() {
  const todoText = todoInput.value.trim();

  if (todoText === "") {
    showMessage("할 일을 입력해주세요.");
    return;
  }

  todoItems.push({
    text: todoText,
    isCompleted: false,
    date: formatDate(selectedDate),
  });

  saveTodosToLocalStorage();

  todoInput.value = "";

  renderWeekCalendar();

  renderTodoList();
}

// =========================
// 완료
// =========================

function toggleTodoComplete(index) {
  todoItems[index].isCompleted = !todoItems[index].isCompleted;

  saveTodosToLocalStorage();

  renderWeekCalendar();

  renderTodoList();
}

// =========================
// 수정
// =========================

function editTodo(index) {
  const updatedTodoText = prompt(
    "수정할 내용을 입력하세요.",
    todoItems[index].text,
  );

  if (updatedTodoText === null || updatedTodoText.trim() === "") {
    return;
  }

  todoItems[index].text = updatedTodoText.trim();

  saveTodosToLocalStorage();

  renderTodoList();
}

// =========================
// 삭제
// =========================

function deleteTodo(index) {
  todoItems.splice(index, 1);

  saveTodosToLocalStorage();

  renderWeekCalendar();

  renderTodoList();
}

// =========================
// 필터 버튼
// =========================

function updateActiveFilterButton(selectedButton) {
  filterButtons.forEach((button) => {
    button.classList.remove("active");
  });

  selectedButton.classList.add("active");
}

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    currentFilter = button.dataset.filter;

    updateActiveFilterButton(button);

    renderTodoList();
  });
});

// =========================
// 주 이동
// =========================

previousWeekButton.addEventListener("click", () => {
  currentWeekStartDate.setDate(currentWeekStartDate.getDate() - 7);

  renderWeekCalendar();
});

nextWeekButton.addEventListener("click", () => {
  currentWeekStartDate.setDate(currentWeekStartDate.getDate() + 7);

  renderWeekCalendar();
});

// =========================
// Todo 추가 이벤트
// =========================

addTodoButton.addEventListener("click", addTodo);

todoInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();

    addTodo();
  }
});

// =========================
// 최초 실행
// =========================

updateDateDisplay();

renderWeekCalendar();

renderTodoList();
