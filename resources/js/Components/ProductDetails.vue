<script setup lang="ts">
import IcOutlineClose from "~icons/ic/outline-close";
import { Product } from "../types";
defineProps({
    product: {
        type: Object as PropType<Product>,
        default: () => ({}),
        required: true,
    },
});

defineEmits<{
    (e: "goToStore"): void;
}>();

const visible = defineModel({ default: false });

function goToVendorSite(product: Product) {
    window.open(
        `https://reach.dog/search?q=${product.title}&tab=products&match_all_keywords=true`,
        "_blank",
    );
}
</script>

<template>
    <Dialog
        :style="{ maxWidth: '40rem', margin: '20px' }"
        v-model:visible="visible"
        modal
        :pt="{
            mask: {
                class: 'modal bg-secondary bg-opacity-50',
            },
            root: {
                class: 'modal-content w-12 sm:w-9 md:w-6 ',
            },
            header: {
                class: 'd-flex justify-content-end p-2',
            },
            content: {
                class: 'd-flex',
            },
            closeButton: {
                class: 'btn bg-white',
            },
            icons: {
                class: '',
            },
            closeButtonIcon: {
                class: 'd-none',
            },
        }"
    >
        <template #closeicon>
            <IcOutlineClose />
        </template>

        <template #default>
            <div class="container">
                <div
                    class="row d-flex justify-content-center align-items-center"
                >
                    <div
                        class="col-md-6 col-12 d-flex justify-content-center align-items-center"
                    >
                        <Galleria
                            :value="product?.images"
                            :numVisible="product?.images.length"
                            :showThumbnails="false"
                            :showIndicators="true"
                            :pt="{
                                indicator: {
                                    class: 'text-primary',
                                    style: 'line-height: 40px',
                                },
                                indicators: {
                                    class: 'd-flex justify-content-center',
                                },
                                indicatorButton: {
                                    class: 'd-flex justify-content-center align-items-center btn btn-small',
                                },
                                itemContainer: {
                                    class: 'd-flex justify-content-center align-items-center rounded-4',
                                    style: 'min-height: 150px',
                                },
                                item: {
                                    style: 'width: 250px',
                                },
                            }"
                        >
                            <template #item="{ item }">
                                <img
                                    width="100%"
                                    class="object-fit-contain rounded-4"
                                    :src="item"
                                />
                            </template>
                        </Galleria>
                    </div>
                    <div class="col-12 col-md-6 pe-md-5 product-description">
                        <p class="fs-1 font-bolder lh-sm">
                            {{ product?.title }}
                        </p>
                        <p class="text-body-tertiary font-sm">
                            ${{ product?.price }}.00
                        </p>
                        <p class="fs-5 line-clamp-2">
                            {{ product?.description }}
                        </p>
                        <div
                            class="d-flex gap-1 align-items-center cursor-pointer"
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
                        <div class="d-grid my-3">
                            <Button
                                @click="goToVendorSite(product)"
                                type="button"
                                class="btn btn-primary rounded-pill btn-lg text-white"
                                >Shop now</Button
                            >
                        </div>
                    </div>
                </div>
            </div>
        </template>
    </Dialog>
</template>
../types
