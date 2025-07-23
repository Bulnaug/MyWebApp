import { create } from 'zustand';

export const useBoardStore = create((set) => ({
  boards: [
    {
      id: '1',
      title: 'Marketing',
      lists: [
        {
          id: 'todo',
          title: 'To Do',
          tasks: [
            { id: 't1', title: 'Social-Media-Plan erstellen' },
          ],
        },
        {
          id: 'done',
          title: 'Done',
          tasks: [],
        },
      ],
    },
  ],

  getBoardById: (id) =>
    useBoardStore.getState().boards.find((b) => b.id === id),

  addTask: (boardId, listId, taskTitle) =>
    set((state) => ({
      boards: state.boards.map((board) =>
        board.id === boardId
          ? {
              ...board,
              lists: board.lists.map((list) =>
                list.id === listId
                  ? {
                      ...list,
                      tasks: [
                        ...list.tasks,
                        {
                          id: Date.now().toString(),
                          title: taskTitle,
                        },
                      ],
                    }
                  : list
              ),
            }
          : board
      ),
    })),
    moveTask: (boardId, fromListId, toListId, taskId) =>
  set((state) => {
    const board = state.boards.find((b) => b.id === boardId);
    if (!board) return state;

    const fromList = board.lists.find((l) => l.id === fromListId);
    const toList = board.lists.find((l) => l.id === toListId);
    if (!fromList || !toList) return state;

    const taskIndex = fromList.tasks.findIndex((t) => t.id === taskId);
    if (taskIndex === -1) return state;

    const [movedTask] = fromList.tasks.splice(taskIndex, 1);
    toList.tasks.push(movedTask);

    return {
      boards: [...state.boards],
    };
  }),

}));