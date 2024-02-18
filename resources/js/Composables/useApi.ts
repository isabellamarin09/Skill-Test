import axios, { AxiosResponse } from "axios";
import { Products } from "../types";

export const useApi = () => {
    async function getCategories() {
        const { data } = (await axios.get(
            "https://dummyjson.com/products/categories",
        )) as AxiosResponse<Array<string>>;

        return data.slice(0, 5);
    }

    async function getCategoryProducts(
        category: string,
        limit: number = 10,
        skip: number = 0,
    ) {
        const { data } = (await axios.get(
            `https://dummyjson.com/products/category/${category}?limit=${limit}&skip=${skip}`,
        )) as AxiosResponse<Products>;

        return data;
    }

    return { getCategories, getCategoryProducts };
};
