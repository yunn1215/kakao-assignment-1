function WeekCalendar({
  weekDates,
  selectedDate,
  setSelectedDate,
  moveWeek,
  todos,
  formatDate,
}) {
  const dayNames = ["월", "화", "수", "목", "금", "토", "일"];

  return (
    <>
      <div className="mb-8 flex items-center justify-between rounded-xl bg-purple-100 p-4">
        <button
          onClick={() => moveWeek(-7)}
          className="text-2xl text-[#672be0]"
        >
          ◀
        </button>

        <span className="font-semibold text-[#672be0]">
          {formatDate(weekDates[0])}
          {" ~ "}
          {formatDate(weekDates[6])}
        </span>

        <button onClick={() => moveWeek(7)} className="text-2xl text-[#672be0]">
          ▶
        </button>
      </div>

      <div className="mb-6 grid grid-cols-7 gap-2">
        {weekDates.map((date, index) => {
          const dateString = formatDate(date);

          const todoCount = todos.filter(
            (todo) => todo.date === dateString,
          ).length;

          const isSelected = dateString === formatDate(selectedDate);

          const isToday = dateString === formatDate(new Date());

          return (
            <div
              key={dateString}
              onClick={() => setSelectedDate(date)}
              className={`cursor-pointer rounded-xl border p-3 text-center
              ${isSelected ? "bg-[#9775ff] text-white" : "bg-white"}
              ${isToday ? "border-[#672be0]" : ""}`}
            >
              <div>{dayNames[index]}</div>

              <div className="font-bold">{dateString.slice(5)}</div>

              <div className="text-sm">{todoCount}개</div>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default WeekCalendar;
