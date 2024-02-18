import { Component, FunctionalComponent, SVGAttributes } from "vue";

export type Category = {
    name: string;
    icon: Component;
};

export type Icons = {
    [key: string]: FunctionalComponent<SVGAttributes>;
};

export type Products = {
    limit: number;
    products: Array<Product>;
    skip: number;
    total: number;
};

export type Product = {
    brand: string;
    category: Category["name"];
    description: string;
    id: number;
    price: number;
    images: Array<string>;
    thumbnail: string;
    title: string;
};
