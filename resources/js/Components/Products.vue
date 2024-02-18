<script setup lang="ts">
import CiUndo from "~icons/ci/undo";
import Fa6SolidShareNodes from "~icons/fa6-solid/share-nodes";

import { Category, Product } from "./../types";

const props = defineProps({
    categories: {
        type: Array<Category>,
        required: true,
        default: () => [],
    },
});

defineEmits<{
    (e: "openProductDetails", product: Product): void;
    (e: "goToStore"): void;
    (e: "shareProduct", product: Product): void;
}>();

const { getCategoryProducts } = useApi();
const router = useRouter();

const active = ref(0);
const products = ref<Array<Product>>([]);

watch(
    [() => props.categories, active],
    async ([newCategories, newTabIndex], [, oldTabIndex]) => {
        if (newCategories.length) {
            if (newTabIndex !== oldTabIndex) products.value = [];
            simulateLazyLoading(newCategories[newTabIndex]);
        }
    },
    { immediate: true },
);

async function simulateLazyLoading({ name }: Category) {
    const data = await getCategoryProducts(name);

    products.value = [...products.value, ...data.products];
}

function doRoute() {
    router.replace(`/search?q=${props.categories[active.value].name}`);
}
</script>

<template>
    <TabView
        v-model:activeIndex="active"
        scrollable
        :pt="{
            nav: {
                class: 'nav nav-justified',
            },
            inkbar: {
                class: 'd-none',
            },
        }"
        @tab-change="doRoute"
    >
        <TabPanel
            v-for="({ name, icon }, index) in categories"
            :key="name"
            :pt="{
                root: {
                    class: 'nav-item',
                },
                content: {
                    class: 'mt-4',
                },
            }"
        >
            <template #header>
                <div
                    class="d-flex flex-column justify-content-center align-items-center cursor-pointer py-1"
                    :class="{
                        'bg-primary bg-opacity-25 rounded-4 border border-primary':
                            active == index,
                    }"
                >
                    <component
                        class="my-1"
                        :is="icon"
                        :color="active == index ? '#0ac252' : 'inherit'"
                    />
                    <span
                        class="text-capitalize font-sm"
                        :class="
                            active == index
                                ? 'text-primary font-bold'
                                : 'text-body-primary'
                        "
                        >{{ name }}</span
                    >
                </div>
            </template>
            <p class="text-capitalize fs-1 font-bolder">{{ name }}</p>

            <div class="container">
                <div
                    class="d-flex justify-content-center row gap-3 row-cols-auto"
                >
                    <div
                        class="product-card rounded-4 col"
                        v-for="product of products"
                        @click="$emit('openProductDetails', product)"
                    >
                        <Card
                            :pt="{
                                root: {
                                    class: 'card overflow-auto rounded-4 border-0 cursor-pointer',
                                },
                                header: {
                                    class: 'card-img-top pt-2',
                                },
                            }"
                        >
                            <template #header>
                                <img
                                    class="object-fit-cover rounded-4"
                                    width="200"
                                    height="200"
                                    :src="product.thumbnail"
                                />
                                <div
                                    class="rounded-circle share-button cursor-pointer"
                                    @click.stop="$emit('shareProduct', product)"
                                >
                                    <Fa6SolidShareNodes
                                        font-size="12"
                                        color="rgb(113, 121, 143)"
                                    />
                                </div>
                            </template>
                            <template #footer>
                                <div class="py-2 product-actions text-reset">
                                    <span class="line-clamp-1 product-title">{{
                                        product.title
                                    }}</span>
                                    <p class="font-xs mb-0 text-body-tertiary">
                                        ${{ product.price }}.00
                                    </p>
                                    <div
                                        class="d-flex gap-1 align-items-center"
                                        @click.stop="$emit('goToStore')"
                                    >
                                        <img
                                            width="15"
                                            height="15"
                                            src="./../../assets/inspired_logo.jpg"
                                        />
                                        <p
                                            class="font-xs mb-0 text-body-tertiary store-link"
                                        >
                                            Art Supplies Store
                                        </p>
                                    </div>
                                </div>
                            </template>
                        </Card>
                    </div>
                </div>
            </div>
        </TabPanel>
    </TabView>

    <div class="d-flex justify-content-center pt-4">
        <Button
            @click="simulateLazyLoading(categories[active])"
            type="button"
            class="btn btn-white text-primary rounded-pill btn-lg border border-tertiary"
        >
            <div class="d-flex align-items-center gap-2">
                <CiUndo />
                <span>Load More</span>
            </div>
        </Button>
    </div>
</template>
../types
