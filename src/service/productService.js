//productService.js
import { fakeStoreServer } from "./serverSetting";

export const fetchCategories = async () => {
    try {
        const url = fakeStoreServer + "/products/categories";
        const res = await fetch(url);
        const data = await res.json();
        return data;
    } catch (error) {
        throw new Error("Can't find categories.");
    }
};

export const fetchProductListByCategory = async (productCategory) => {
    try {
        const categoryName = productCategory.toLowerCase().replaceAll(" ", "%20")
        const url = fakeStoreServer + `/products/category/${categoryName}`;
        const res = await fetch(url);
        const data = await res.json();
        return data;
    } catch (error) {
        throw new Error("Can't find product list.");
    }
};

export const fetchProductByID = async (id) => {
    try {
        const url = fakeStoreServer + `/products/${id}`;
        const res = await fetch(url);
        return res.json();
    } catch (error) {
        throw new Error("Can't find product.");
    }
};


