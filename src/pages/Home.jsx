import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTodo, switchTodo } from "../redux/modules/todos";

function Home() {
    const todos = useSelector((state) => state.todos);
    console.log(todos);
    const dispatch = useDispatch();

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    const onChangeHandler = (event) => {
        event.preventDefault();
        const { name, value } = event.target;
        if (name === "title") {
            setTitle(value);
        } else if (name === "content") {
            setContent(value);
        }
    };

    const onSubmitHandler = (event) => {
        event.preventDefault();
        const newTodo = {
            id: todos.length + 1,
            title,
            content,
            isDone: false,
        };
        dispatch(addTodo(newTodo));
        setTitle("");
        setContent("");
    };

    const onChangeDoneStatusHandler = (id) => {
        const todo = todos.find((item) => item.id === id);
        if (todo) {
            dispatch(switchTodo({ id, isDone: !todo.isDone }));
        }
    };

    return (
        <div>
            <form className="add-form" onSubmit={onSubmitHandler}>
                <div className="title">
                    <label>할 일:</label>
                    <input
                        name="title"
                        value={title}
                        onChange={onChangeHandler}
                    />
                </div>
                <div className="content">
                    <label>내용:</label>
                    <input
                        name="content"
                        value={content}
                        onChange={onChangeHandler}
                    />
                </div>
                <div className="button">
                    <button type="submit">등록하기</button>
                </div>
            </form>
            <div className="todo-list">
                <h2>In Progress</h2>
                {todos
                    .filter((item) => item.isDone === false) // Filter for incomplete todos
                    .map((item) => (
                        <div className="single-card" key={item.id}>
                            <h3>{item.title}</h3>
                            <span>{item.content}</span>
                            <button
                                onClick={() =>
                                    onChangeDoneStatusHandler(item.id)
                                }
                            >
                                완료
                            </button>
                            <button>삭제</button>
                        </div>
                    ))}
            </div>
            <div className="done-list">
                <h2>Done List</h2>
                {todos
                    .filter((item) => item.isDone === true)
                    .map((item) => (
                        <div className="single-card" key={item.id}>
                            <h3>{item.title}</h3>
                            <span>{item.content}</span>
                            <button
                                onClick={() =>
                                    onChangeDoneStatusHandler(item.id)
                                }
                            >
                                취소
                            </button>
                            <button>삭제</button>
                        </div>
                    ))}
            </div>
        </div>
    );
}

export default Home;
