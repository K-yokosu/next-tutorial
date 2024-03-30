'use client';

import { TodoForm } from '@/app/lib/definitions';
import Link from 'next/link';
import { Button } from '@/app/ui/button';
import { updateTodo } from '@/app/lib/actions';

export default function EditTodoForm({
  todo,
}: {
  todo: TodoForm;
}) {
  const updateTodoWithId = updateTodo.bind(null, todo.id);

  return (
    <form action={updateTodoWithId}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
            {/* Todo title */}
            <div className="mb-4">
                <label htmlFor="title" className="mb-2 block text-sm font-medium">
                    title
                </label>
                <div className="relative mt-2 rounded-md">
                    <div className="relative">
                    <input
                        id="title"
                        name="title"
                        type="text"
                        defaultValue={todo.title}
                        placeholder="Enter title"
                        className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                    />
                    </div>
                </div>
            </div>

            {/* Todo content */}
            <div className="mb-4">
                <label htmlFor="content" className="mb-2 block text-sm font-medium">
                    content
                </label>
                <div className="relative mt-2 rounded-md">
                    <div className="relative">
                        <textarea
                            id='content'
                            name='content'
                            defaultValue={todo.content}
                            placeholder='Enter content'
                            className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                        />                
                    </div>
                </div>
            </div>
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/dashboard/todo"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button type="submit">Edit Todo</Button>
      </div>
    </form>
  );
}
