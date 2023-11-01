import { IProduct } from "@/commons/interfaces";
import { api } from "@/lib/axios";

const save = (product: IProduct) => {
  return api.post("/products", product);
};

const findAll = () => {
  return api.get("/products");
};

const findById = (id: number) => {
  return api.get(`/products/${id}`);
};

const remove = (id: number) => {
  return api.delete(`/products/${id}`);
};

const ProductService = {
  save,
  findAll,
  findById,
  remove,
};

export default ProductService;