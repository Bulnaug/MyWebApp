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
}));
