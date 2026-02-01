'use server';

import { db } from '@/app/db';
import { todos } from '@/app/db/schema';
import { auth } from '@/lib/auth/server';
import { eq, desc, and } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';

async function getAuthUser() {
    const { data } = await auth.getSession();
    if (!data?.user) throw new Error('Unauthorized');
    return data.user;
}

export async function getTodos() {
    const user = await getAuthUser();
    return db.select().from(todos).where(eq(todos.userId, user.id)).orderBy(desc(todos.createdAt));
}

export async function addTodo(formData: FormData) {
    const user = await getAuthUser();
    const text = formData.get('text') as string;
    if (!text) return;

    await db.insert(todos).values({ text, userId: user.id });

    revalidatePath('/');
}

export async function toggleTodo(id: number, currentStatus: boolean) {
    const user = await getAuthUser();

    await db
        .update(todos)
        .set({ completed: !currentStatus })
        .where(and(eq(todos.id, id), eq(todos.userId, user.id)));

    revalidatePath('/');
}

export async function deleteTodo(id: number) {
    const user = await getAuthUser();

    await db.delete(todos).where(and(eq(todos.id, id), eq(todos.userId, user.id)));

    revalidatePath('/');
}