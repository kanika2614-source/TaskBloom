
export type TaskStatus = "todo" | "in-progress" | "done";

export interface Task {
  id: number;
  title: string;
  status: TaskStatus;
}

export function addTask(tasks: Task[], title: string): Task[] {
  const newTask: Task = {
    id: tasks.length > 0
      ? Math.max(...tasks.map(task => task.id)) + 1
      : 1,
    title,
    status: "todo"
  };

  return [...tasks, newTask];
}

export function completeTask(tasks: Task[], id: number): Task[] {
  return tasks.map(task =>
    task.id === id
      ? { ...task, status: "done" }
      : task
  );
}

export function filterByStatus(
  tasks: Task[],
  status: TaskStatus
): Task[] {
  return tasks.filter(task => task.status === status);
}

// Extra operation required by the assignment
export function advanceTask(tasks: Task[], id: number): Task[] {
  return tasks.map(task => {
    if (task.id !== id) {
      return task;
    }

    const nextStatus: TaskStatus =
      task.status === "todo"
        ? "in-progress"
        : task.status === "in-progress"
          ? "done"
          : "done";

    return { ...task, status: nextStatus };
  });
}
