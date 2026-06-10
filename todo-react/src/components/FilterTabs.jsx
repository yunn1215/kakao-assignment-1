function FilterTabs({ filter, setFilter }) {
  return (
    <div className="mt-5 flex gap-2">
      <button
        onClick={() => setFilter("all")}
        className={`flex-1 rounded-lg py-2 ${
          filter === "all" ? "bg-[#672be0] text-white" : "bg-gray-100"
        }`}
      >
        전체
      </button>

      <button
        onClick={() => setFilter("active")}
        className={`flex-1 rounded-lg py-2 ${
          filter === "active" ? "bg-[#672be0] text-white" : "bg-gray-100"
        }`}
      >
        진행 중
      </button>

      <button
        onClick={() => setFilter("completed")}
        className={`flex-1 rounded-lg py-2 ${
          filter === "completed" ? "bg-[#672be0] text-white" : "bg-gray-100"
        }`}
      >
        완료
      </button>
    </div>
  );
}

export default FilterTabs;
