const initialState = [
    {
        id: 0,
        title: "",
        content: "",
        isDone: false,
    },
];

const ADD_TODO = "todos/ADD_TODO";
const DELETE_TODO = "todos/DELETE_TODO";
const SWITCH_TODO = "todos/SWITCH_TODO";

export const addTodo = (payload) => {
    return { type: ADD_TODO, payload };
};

export const deleteTodo = (payload) => {
    return { type: DELETE_TODO, payload };
};

export const switchTodo = (payload) => {
    return { type: SWITCH_TODO, payload };
};

const todos = (state = initialState, action) => {
    switch (action.type) {
        case ADD_TODO:
            const newTodo = action.payload;
            return [newTodo, ...state];

        case DELETE_TODO:
            const todoId = action.payload;
            return state.filter((item) => item.id !== todoId);

        case SWITCH_TODO:
            const { id, isDone } = action.payload;
            return state.map((item) => {
                if (item.id === id) {
                    return { ...item, isDone: isDone };
                }
                return item;
            });

        default:
            return state;
    }
};

export default todos;
