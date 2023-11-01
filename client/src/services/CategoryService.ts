import { ICategory } from "@/commons/interfaces";
import { api } from "@/lib/axios";


const findAll = () => {
    return api.get('/categories');
}

const save = (category: ICategory) => {
    return api.post('/categories', category);
}

const update = (category: ICategory) => {
    return api.post(`/categories/${category.id}`, category);
}

const findById = (id: number) => {
    return api.get(`/categories/${id}`);
}

const remove = (id: number) => { 
    return api.delete(`/categories/${id}`);
}

const CategoryService = {
    findAll,
    save,
    findById,
    remove,
    update
}

export default CategoryService;