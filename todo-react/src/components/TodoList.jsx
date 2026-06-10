import TodoItem from "./TodoItem";

function TodoList({ todos, onDelete, onToggleComplete, onEdit }) {
  if (todos.length === 0) {
    return (
      <p className="mt-10 text-center text-gray-400">
        할 일이 없습니다. 추가해보세요!
      </p>
    );
  }
  return (
    <ul className="mt-6 space-y-3">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onDelete={onDelete}
          onToggleComplete={onToggleComplete}
          onEdit={onEdit}
        />
      ))}
    </ul>
  );
}

export default TodoList;
