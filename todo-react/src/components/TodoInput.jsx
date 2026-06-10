import { useState } from "react";

function TodoInput({ inputValue, setInputValue, onAddTodo }) {
  const [isComposing, setIsComposing] = useState(false);

  return (
    <div className="mt-6 flex">
      <input
        type="text"
        value={inputValue}
        onChange={(event) => setInputValue(event.target.value)}
        onCompositionStart={() => setIsComposing(true)}
        onCompositionEnd={() => setIsComposing(false)}
        onKeyDown={(event) => {
          if (event.key === "Enter" && !isComposing) {
            onAddTodo();
          }
        }}
        placeholder="할 일을 입력하세요"
        className="
          flex-1
          rounded-l-[20px]
          border
          border-gray-200
          px-6
          py-4
          outline-none
          placeholder:text-gray-300
        "
      />

      <button
        onClick={onAddTodo}
        className="
          rounded-r-[20px]
          bg-gradient-to-b
          from-[#7c3aed]
          to-[#672be0]
          px-8
          font-bold
          text-white
          shadow-md
          transition
          hover:opacity-90
        "
      >
        추가
      </button>
    </div>
  );
}

export default TodoInput;
