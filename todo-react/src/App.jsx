import { useState, useEffect } from "react";
import TodoInput from "./components/TodoInput";
import TodoList from "./components/TodoList";
import FilterTabs from "./components/FilterTabs";
import WeekCalendar from "./components/WeekCalendar";
const STORAGE_KEY = "todoItems";

function App() {
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem(STORAGE_KEY);

    return savedTodos ? JSON.parse(savedTodos) : [];
  });
  const [inputValue, setInputValue] = useState("");
  const [message, setMessage] = useState("");
  const [filter, setFilter] = useState("all");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const formatDate = (date) => {
    return date.toISOString().split("T")[0];
  };
  const moveDate = (days) => {
    const newDate = new Date(selectedDate);

    newDate.setDate(newDate.getDate() + days);

    setSelectedDate(newDate);
  };

  const addTodo = () => {
    const trimmedText = inputValue.trim();

    if (!trimmedText) {
      setMessage("할 일을 입력해주세요.");

      setTimeout(() => {
        setMessage("");
      }, 2000);

      return;
    }

    const newTodo = {
      id: Date.now(),
      text: trimmedText,
      isCompleted: false,
      date: formatDate(selectedDate),
    };

    setTodos([...todos, newTodo]);

    setInputValue("");
  };

  const deleteTodo = (todoId) => {
    setTodos(todos.filter((todo) => todo.id !== todoId));
  };

  const toggleTodoComplete = (todoId) => {
    setTodos(
      todos.map((todo) =>
        todo.id === todoId
          ? {
              ...todo,
              isCompleted: !todo.isCompleted,
            }
          : todo,
      ),
    );
  };

  const editTodo = (todoId, updatedText) => {
    setTodos(
      todos.map((todo) =>
        todo.id === todoId ? { ...todo, text: updatedText } : todo,
      ),
    );
  };

  const dateTodos = todos.filter(
    (todo) => todo.date === formatDate(selectedDate),
  );

  const filteredTodos = dateTodos.filter((todo) => {
    if (filter === "active") {
      return !todo.isCompleted;
    }

    if (filter === "completed") {
      return todo.isCompleted;
    }

    return true;
  });

  const getMonday = (date) => {
    const copiedDate = new Date(date);

    const day = copiedDate.getDay();

    const diff = copiedDate.getDate() - (day === 0 ? 6 : day - 1);

    copiedDate.setDate(diff);

    return copiedDate;
  };
  const [weekStartDate, setWeekStartDate] = useState(() => {
    const savedWeek = localStorage.getItem("weekStartDate");

    return savedWeek ? new Date(savedWeek) : getMonday(new Date());
  });

  const moveWeek = (days) => {
    const newWeek = new Date(weekStartDate);

    newWeek.setDate(newWeek.getDate() + days);

    setWeekStartDate(newWeek);
  };

  const weekDates = [];

  for (let i = 0; i < 7; i++) {
    const currentDate = new Date(weekStartDate);

    currentDate.setDate(weekStartDate.getDate() + i);

    weekDates.push(currentDate);
  }

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);

  useEffect(() => {
    localStorage.setItem("weekStartDate", weekStartDate.toISOString());
  }, [weekStartDate]);

  return (
    <div className="min-h-screen bg-[#f5f2fa] p-16">
      <div className="mx-auto max-w-3xl rounded-[40px] bg-white p-12 shadow-[0_10px_40px_rgba(0,0,0,0.08)]">
        <h1 className="mb-10 text-center text-5xl font-black italic text-[#672be0]">
          Todo List
        </h1>
        <WeekCalendar
          weekDates={weekDates}
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
          moveWeek={moveWeek}
          todos={todos}
          formatDate={formatDate}
        />
        <TodoInput
          inputValue={inputValue}
          setInputValue={setInputValue}
          onAddTodo={addTodo}
        />

        {message && <p className="mt-2 text-sm text-red-500">{message}</p>}
        <FilterTabs filter={filter} setFilter={setFilter} />

        <TodoList
          todos={filteredTodos}
          onDelete={deleteTodo}
          onToggleComplete={toggleTodoComplete}
          onEdit={editTodo}
        />
      </div>
    </div>
  );
}

export default App;
