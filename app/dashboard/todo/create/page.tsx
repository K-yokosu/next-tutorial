import Form from '@/app/ui/todos/create-form';
import Breadcrumbs from '@/app/ui/invoices/breadcrumbs';
 
export default async function Page() {
 
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Todo', href: '/dashboard/todo' },
          {
            label: 'Create Todo',
            href: '/dashboard/todo/create',
            active: true,
          },
        ]}
      />
      <Form />
    </main>
  );
}