<script setup lang="ts">
import { Head } from "@inertiajs/vue3";
import Fa6RegularFaceGrinWide from "~icons/fa6-regular/face-grin-wide";
import Fa6SolidLaptop from "~icons/fa6-solid/laptop";
import Fa6SolidMobileScreenButton from "~icons/fa6-solid/mobile-screen-button";
import Fa6SolidStore from "~icons/fa6-solid/store";
import GameIconsDelicatePerfume from "~icons/game-icons/delicate-perfume";

import { Category, Icons, Product } from "./../types";

const { getCategories } = useApi();

const categories = ref<Array<Category>>([]);
const productDetails = ref<Product>();
const productToShare = ref<Product>();

const modalProductDetails = ref(false);
const modalSharingProduct = ref(false);

onMounted(async () => {
    const data = await getCategories();
    categories.value = setCategories(data);
});

function setCategories(categories: Array<string>) {
    const icons: Icons = {
        smartphones: Fa6SolidMobileScreenButton,
        laptops: Fa6SolidLaptop,
        fragrances: GameIconsDelicatePerfume,
        skincare: Fa6RegularFaceGrinWide,
        groceries: Fa6SolidStore,
    };

    return categories.map((category) => ({
        name: category,
        icon: shallowRef(icons[category]),
    }));
}

function openModalProductDetails(arg: Product) {
    productDetails.value = arg;
    modalProductDetails.value = true;
}

function goToStore() {
    window.open(
        "https://reach.dog/search?q=Art+Supplies+Store&tab=products&match_all_keywords=true",
        "_blank",
    );
}

function sharingProductLink(arg: Product) {
    productToShare.value = arg;
    modalSharingProduct.value = true;
}
</script>

<template>
    <main class="container pt-2">
        <Head title="Home" />

        <Navbar />

        <div class="row align-items-center" style="min-height: 90%">
            <div class="col d-flex flex-column gap-3 ps-5 font-bold">
                <span class="fs-4 fw-semibold">Discover</span>
                <span class="fs-1 fw-bolder">Art Supplies</span>
                <span class="fs-4 fw-semibold">On Reach Dog</span>
            </div>
            <div class="col">
                <img
                    class="art-supplier"
                    src="./../../assets/art-supplier.png"
                />
            </div>
        </div>

        <Products
            :categories="categories"
            @open-product-details="openModalProductDetails"
            @go-to-store="goToStore"
            @share-product="sharingProductLink"
        />

        <ProductDetails
            v-model.visible="modalProductDetails"
            :product="productDetails"
            @go-to-store="goToStore"
        />

        <ShareDialog
            v-model.visible="modalSharingProduct"
            :product="productToShare"
        />
    </main>
</template>

<style scoped>
.art-supplier {
    width: 100%;
    min-width: 300px;
}
</style>
./types
