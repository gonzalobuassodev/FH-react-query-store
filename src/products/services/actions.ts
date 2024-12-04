// import { sleep } from "../../helpers/sleep";
import { productsApi } from "../api/products.api"
import { Product, ProductLite } from "../interfaces/product.interface";


interface GetProductsOptions {
    filterKey?: string;
}

export const getProducts = async ({ filterKey }: GetProductsOptions): Promise<Product[]> => {

    // await sleep(2000);

    const category = filterKey ? `category=${filterKey}` : ``;

    const { data } = await productsApi.get<Product[]>(`/products?${category}`);

    return data;

}

export const getProductById = async (id: number): Promise<Product> => {

    // await sleep(2000);
    const { data } = await productsApi.get<Product>(`/products/${id}`)

    return data;
}



export const createProduct = async (product: ProductLite): Promise<Product> => {
    // await sleep(5);

    // throw new Error('Error al crear el producto');

    const { data } = await productsApi.post<Product>(`/products`, product)

    return data
}