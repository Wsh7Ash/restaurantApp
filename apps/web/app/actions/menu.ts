'use server';

import { db } from '@repo/database';
import { revalidatePath } from 'next/cache';

export async function addMenuItem(formData: FormData) {
    const name = formData.get('name') as string;
    const price = parseFloat(formData.get('price') as string);
    const description = formData.get('description') as string;
    const categoryId = parseInt(formData.get('categoryId') as string);
    const imageUrl = formData.get('imageUrl') as string;

    await db.menuItem.create({
        data: {
            name,
            price,
            description,
            categoryId,
            imageUrl,
        },
    });

    revalidatePath('/menu');
    revalidatePath('/admin/items');
}

export async function updateMenuItem(id: number, formData: FormData) {
    const name = formData.get('name') as string;
    const price = parseFloat(formData.get('price') as string);
    const description = formData.get('description') as string;
    const categoryId = parseInt(formData.get('categoryId') as string);
    const imageUrl = formData.get('imageUrl') as string;

    await db.menuItem.update({
        where: { id },
        data: {
            name,
            price,
            description,
            categoryId,
            imageUrl,
        },
    });

    revalidatePath('/menu');
    revalidatePath('/admin/items');
}

export async function deleteMenuItem(id: number) {
    await db.menuItem.delete({
        where: { id },
    });

    revalidatePath('/menu');
    revalidatePath('/admin/items');
}

export async function getCategories() {
    return await db.category.findMany();
}

export async function getMenuItems() {
    return await db.menuItem.findMany({
        include: { category: true }
    });
}
