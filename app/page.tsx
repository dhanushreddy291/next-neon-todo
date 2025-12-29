import { neonAuth } from '@neondatabase/neon-js/auth/next/server';
import { getTodos, addTodo } from '@/app/actions';
import { TodoItem } from '@/app/components/TodoItem';
import { redirect } from 'next/navigation';

export default async function Home() {
  const { session } = await neonAuth();

  // If not logged in, redirect to sign-in page
  if (!session) { redirect('/auth/signin'); }

  // Fetch data on the server
  const todos = await getTodos();

  return (
    <main className="dark:bg-gray-900 mx-auto mt-10 max-w-md rounded-lg bg-white p-6 shadow">
      <h2 className="mb-6 text-2xl font-bold">My Tasks</h2>

      <form action={addTodo} className="mb-6 flex gap-2">
        <input
          name="text"
          type="text"
          placeholder="Add a new task..."
          className="flex-1 rounded border p-2"
          required
        />
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 rounded px-4 py-2 text-white"
        >
          Add
        </button>
      </form>

      <ul>
        {todos.map((todo) => (
          <TodoItem key={todo.id} todo={todo} />
        ))}
        {todos.length === 0 && <p className="text-gray-500 text-center">No tasks yet.</p>}
      </ul>
    </main>
  );
}