import { sleep } from "../../helpers/sleep";
import { productsApi } from "../api/products.api"
import { Product } from "../interfaces/product.interface";


interface GetProductsOptions {
    filterKey?: string;
}

export const getProducts = async ({ filterKey }: GetProductsOptions): Promise<Product[]> => {

    await sleep(2000);

    const category = filterKey ? `category=${filterKey}` : ``;
    console.log(category)

    const { data } = await productsApi.get<Product[]>(`/products?${category}`);

    return data;

}

export const getProductById = async (id: number): Promise<Product> => {

    await sleep(2000);
    const { data } = await productsApi.get<Product>(`/products/${id}`)

    return data;
}