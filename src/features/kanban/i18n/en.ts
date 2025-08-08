export const kanbanTranslations = {
  navigation: {
    section: "Kanban",
    board: "Board",
  },
  board: {
    title: "Kanban Board",
    addColumn: "Add Column",
    addTask: "Add Task",
  },
  column: {
    name: "Column name",
    defaultNames: {
      todo: "To Do",
      inProgress: "In Progress",
      done: "Done",
    },
    addTask: "Add task",
    editColumn: "Edit column",
    deleteColumn: "Delete column",
    emptyColumn: "No tasks in this column",
    confirmDelete: "Delete Column",
    confirmDeleteMessage:
      "Are you sure you want to delete this column? All tasks in this column will be moved to 'To Do'.",
  },
  task: {
    title: "Title",
    description: "Description",
    addTask: "Add Task",
    editTask: "Edit Task",
    deleteTask: "Delete Task",
    viewDetails: "View Details",
    noTasks: "No tasks yet",
    dragHint: "Drag tasks to move between columns",
    confirmDeleteMessage:
      "Are you sure you want to delete this task? This action cannot be undone.",
  },
  comments: {
    title: "Comments",
    addComment: "Add comment",
    editComment: "Edit comment",
    deleteComment: "Delete comment",
    noComments: "No comments yet",
    placeholder: "Write a comment...",
  },
}
