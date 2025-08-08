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
    deleteTitle: "Delete Task",
    deleteMessage:
      "Are you sure you want to delete this task? This action cannot be undone.",
    viewDetails: "View Details",
    comments: "Comments",
    noComments: "No comments yet",
    noTasks: "No tasks yet",
    dragHint: "Drag tasks to move between columns",
    confirmDeleteMessage:
      "Are you sure you want to delete the task '{{title}}'? This action cannot be undone.",
  },
  comments: {
    title: "Comments",
    addComment: "Add comment",
    editComment: "Edit comment",
    deleteComment: "Delete comment",
    noComments: "No comments yet",
    placeholder: "Write a comment...",
  },
  shortcuts: {
    title: "Keyboard Shortcuts",
    hint: "Press ? for keyboard shortcuts",
    categories: {
      navigation: "Navigation",
      task: "Task Actions",
      board: "Board Actions",
      help: "Help",
    },
    navigation: {
      tab: "Select first task / Navigate to next task",
      previousTask: "Navigate to previous task",
      nextTask: "Navigate to next task",
      previousColumn: "Navigate to previous column",
      nextColumn: "Navigate to next column",
      clearSelection: "Clear selection",
    },
    task: {
      open: "Open selected task",
      delete: "Delete selected task",
      moveLeft: "Move task to previous column",
      moveRight: "Move task to next column",
      moveUp: "Move task up in column",
      moveDown: "Move task down in column",
    },
    board: {
      addColumn: "Add new column",
    },
    help: {
      show: "Show keyboard shortcuts",
    },
  },
}
