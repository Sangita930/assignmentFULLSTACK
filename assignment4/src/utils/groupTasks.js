export default function groupTasks(tasks) {
  const today = [];
  const upcoming = [];
  const overdue = [];
  const noDate = [];

  const currentDate = new Date().toISOString().split("T")[0];

  tasks.forEach((task) => {
    if (!task.dueDate) {
      noDate.push(task);
    } else if (task.dueDate < currentDate) {
      overdue.push(task);
    } else if (task.dueDate === currentDate) {
      today.push(task);
    } else {
      upcoming.push(task);
    }
  });

  return {
    overdue,
    today,
    upcoming,
    noDate,
  };
}