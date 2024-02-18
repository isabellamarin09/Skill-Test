<script setup lang="ts">
  import IcOutlineClose from '~icons/ic/outline-close';
  import { Product } from '../types';

  const props = defineProps({
    product: {
      type: Object as PropType<Product>,
      default: () => ({}),
      required: true
    }
  });

  const visible = defineModel({ default: false });
  const url = ref('');

  watch(
    () => props.product,
    (newVal) => {
      if (Object.keys(newVal).length) {
        url.value = `https://reach.dog/search?q=${newVal.title}&tab=products&match_all_keywords=true`;
      }
    }
  );

  async function copyContent() {
    try {
      await navigator.clipboard.writeText(url.value);
      alert('¡Texto copiado satisfactoriamente!');
    } catch (err) {
      console.error('Falló el copiado: ', err);
    }
  }
</script>

<template>
  <Dialog
    :style="{ maxWidth: '40rem', margin: '20px' }"
    v-model:visible="visible"
    modal
    :pt="{
      mask: {
        class: 'modal bg-secondary bg-opacity-50'
      },
      root: {
        class: 'modal-content w-12 sm:w-9 md:w-6 '
      },
      header: {
        class: 'd-flex justify-content-end p-2'
      },
      content: {
        class: 'd-flex'
      },
      closeButton: {
        class: 'btn bg-white'
      },
      icons: {
        class: ''
      },
      closeButtonIcon: {
        class: 'd-none'
      }
    }"
  >
    <template #closeicon>
      <IcOutlineClose />
    </template>

    <template #default>
      <div class="container">
        <div class="d-flex flex-column align-items-center gap-2 pb-3">
          <span class="fs-3 font-bold">Share this product</span>
          <div
            class="d-flex align-items-center border border-light-subtle rounded-pill p-2 gap-2"
          >
            <span
              class="d-inline-block text-truncate text-body-tertiary fs-6"
              style="max-width: 200px"
              >{{ url }}</span
            >

            <Button
              @click="copyContent"
              type="button"
              class="btn btn-primary text-white rounded-pill btn-lg"
              >Copy link</Button
            >
          </div>
        </div>
      </div>
    </template>
  </Dialog>
</template>
