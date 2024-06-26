'use server';
// tableを作る ok
// seederを流す ok
// 流したデータを取得する ok
// 取得したデータを表示する ok
// データを作成する ok
// 編集する ok
// 削除する ok
// スケルトン
// clientからのリクエスト ローディング
// ...

// import { fetchTodo } from '@/app/lib/data';
import TodosTable from '@/app/ui/todos/table';
import { CreateTodo } from '@/app/ui/todos/buttons';
import { Suspense } from 'react';
import { TodoTableSkeleton } from '@/app/ui/skeletons';

const TodoPage = async () => {
    // const todos = await fetchTodo();
    // console.log(todos);
    return(
        <>
            <div>todo</div>
            <CreateTodo />
            <Suspense 
            // key={query + currentPage} 
            fallback={<TodoTableSkeleton />}>
                <TodosTable />
            </Suspense>
        </>
    )
}
export default TodoPage;
