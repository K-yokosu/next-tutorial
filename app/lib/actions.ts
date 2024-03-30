'use server';

import { z } from 'zod';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

const FormSchema = z.object({
  id: z.string(),
  customerId: z.string(),
  amount: z.coerce.number(),
  status: z.enum(['pending', 'paid']),
  date: z.string(),
});

const TodoFormSchema = z.object({
  id: z.string(),
  title: z.string(),
  content: z.string(),
  date: z.string(),
});
 
const CreateInvoice = FormSchema.omit({ id: true, date: true });

const UpdateInvoice = FormSchema.omit({ id: true, date: true });
// omitは対象のプロパティの入力を省略できる
const CreateTodo = TodoFormSchema.omit({ id: true, date: true });

export async function createInvoice(formData: FormData) {
    const { customerId, amount, status } = CreateInvoice.parse({
      customerId: formData.get('customerId'),
      amount: formData.get('amount'),
      status: formData.get('status'),
    });
   
    const amountInCents = amount * 100;
    const date = new Date().toISOString().split('T')[0];
   
    try {
      await sql`
        INSERT INTO invoices (customer_id, amount, status, date)
        VALUES (${customerId}, ${amountInCents}, ${status}, ${date})
      `;
    } catch (error) {
      return {
        message: 'Database Error: Failed to Create Invoice.',
      };
    }
   
    revalidatePath('/dashboard/invoices');
    redirect('/dashboard/invoices');
  }

  export async function updateInvoice(id: string, formData: FormData) {
    const { customerId, amount, status } = UpdateInvoice.parse({
      customerId: formData.get('customerId'),
      amount: formData.get('amount'),
      status: formData.get('status'),
    });
   
    const amountInCents = amount * 100;
   
    try {
      await sql`
          UPDATE invoices
          SET customer_id = ${customerId}, amount = ${amountInCents}, status = ${status}
          WHERE id = ${id}
        `;
    } catch (error) {
      return { message: 'Database Error: Failed to Update Invoice.' };
    }
   
    revalidatePath('/dashboard/invoices');
    redirect('/dashboard/invoices');
  }

  export async function deleteInvoice(id: string) {
    // throw new Error('Failed to Delete Invoice');
    try {
      await sql`DELETE FROM invoices WHERE id = ${id}`;
      revalidatePath('/dashboard/invoices');
      return { message: 'Deleted Invoice.' };
    } catch (error) {
      return { message: 'Database Error: Failed to Delete Invoice.' };
    }
  }

  export async function createTodo(formData: FormData) {
    console.log(formData);
    const { title, content } = CreateTodo.parse({
      title: formData.get('title'),
      content: formData.get('content'),
    });
   
    const date = new Date().toISOString().split('T')[0];
   
    try {
      await sql`
        INSERT INTO todos (title, content, date)
        VALUES (${title}, ${content}, ${date})
      `;
    } catch (error) {
      return {
        message: 'Database Error: Failed to Create Todo.',
      };
    }
   
    revalidatePath('/dashboard/todo');
    redirect('/dashboard/todo');
  }

  export async function deleteTodo(id: string) {
    // throw new Error('Failed to Delete Todo');
    try {
      await sql`DELETE FROM todos WHERE id = ${id}`;
      revalidatePath('/dashboard/todo');
      return { message: 'Deleted Todo.' };
    } catch (error) {
      return { message: 'Database Error: Failed to Delete Todo.' };
    }
  }