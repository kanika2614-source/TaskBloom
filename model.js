export function addTask(tasks, title) {
    const newTask = {
        id: tasks.length > 0
            ? Math.max(...tasks.map(task => task.id)) + 1
            : 1,
        title,
        status: "todo"
    };
    return [...tasks, newTask];
}
export function completeTask(tasks, id) {
    return tasks.map(task => task.id === id
        ? { ...task, status: "done" }
        : task);
}
export function filterByStatus(tasks, status) {
    return tasks.filter(task => task.status === status);
}
// Extra operation required by the assignment
export function advanceTask(tasks, id) {
    return tasks.map(task => {
        if (task.id !== id) {
            return task;
        }
        const nextStatus = task.status === "todo"
            ? "in-progress"
            : task.status === "in-progress"
                ? "done"
                : "done";
        return { ...task, status: nextStatus };
    });
}
//# sourceMappingURL=model.js.map