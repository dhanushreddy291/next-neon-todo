'use client';
import { toggleTodo, deleteTodo } from '../actions';
import { Todo } from '@/app/db/schema';

export function TodoItem({ todo }: { todo: Todo }) {
    return (
        <li className="bg-gray-50 mb-2 flex items-center justify-between rounded p-3 dark:bg-gray-800">
            <div
                className="flex cursor-pointer items-center gap-2"
                onClick={() => toggleTodo(todo.id, todo.completed)}
            >
                <input type="checkbox" checked={todo.completed} readOnly className="cursor-pointer" />
                <span className={todo.completed ? 'text-gray-500 line-through' : ''}>{todo.text}</span>
            </div>
            <button onClick={() => deleteTodo(todo.id)} className="text-red-400 hover:text-red-600">
                Delete
            </button>
        </li>
    );
}