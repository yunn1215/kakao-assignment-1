import { useState } from "react";

function TodoItem({ todo, onDelete, onToggleComplete, onEdit }) {
  const [isEditing, setIsEditing] = useState(false);

  const [editText, setEditText] = useState(todo.text);

  const saveEdit = () => {
    const trimmedText = editText.trim();

    if (!trimmedText) return;

    onEdit(todo.id, trimmedText);

    setIsEditing(false);
  };

  return (
    <li className="flex items-center justify-between rounded-xl border border-gray-200 p-4">
      {isEditing ? (
        <input
          value={editText}
          onChange={(event) => setEditText(event.target.value)}
          className="mr-3 flex-1 rounded border px-3 py-2"
        />
      ) : (
        <span
          className={`flex-1 ${
            todo.isCompleted ? "text-gray-400 line-through" : ""
          }`}
        >
          {todo.text}
        </span>
      )}

      <div className="flex gap-2">
        <button
          onClick={() => onToggleComplete(todo.id)}
          className="rounded bg-[#8cc99a] px-3 py-2 text-white"
        >
          완료
        </button>

        {isEditing ? (
          <button
            onClick={saveEdit}
            className="rounded bg-[#ffa94d] px-3 py-2 text-white"
          >
            저장
          </button>
        ) : (
          <button
            onClick={() => setIsEditing(true)}
            className="rounded bg-[#ffc078] px-3 py-2 text-white"
          >
            수정
          </button>
        )}

        <button
          onClick={() => onDelete(todo.id)}
          className="rounded bg-[#ff8787] px-3 py-2 text-white"
        >
          삭제
        </button>
      </div>
    </li>
  );
}

export default TodoItem;
