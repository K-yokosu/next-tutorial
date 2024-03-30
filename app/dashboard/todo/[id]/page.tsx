import Form from '@/app/ui/todos/edit-form';
import Breadcrumbs from '@/app/ui/invoices/breadcrumbs';
import { fetchTodoById } from '@/app/lib/data';
import { notFound } from 'next/navigation';
 
export default async function Page({ params }: { params: { id: string } }) {
    const id = params.id;
    const [data] = await Promise.all([
        fetchTodoById(id),
    ]);
    
      if (!data) {
        notFound();
      }
      
    return (
        <main>
            <Breadcrumbs
                breadcrumbs={[
                    { label: 'Todo', href: '/dashboard/todo' },
                    {
                        label: 'Edit Todo',
                        href: `/dashboard/todo/${id}`,
                        active: true,
                    },
                ]}
            />
            <Form todo={data} />
        </main>
    );
}