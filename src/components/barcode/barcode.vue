<template>
  <div class="barcode">
    <h2>Barcode</h2>
    <svg
      id="barcode"
      ref="barcode"
      jsbarcode-format="upc"
      :jsbarcode-value="payload"
      jsbarcode-textmargin="0"
      jsbarcode-fontoptions="bold"
    />
  </div>
</template>

<script lang="ts">
  import { defineComponent, Ref, ref, onMounted } from 'vue';
  import JsBarcode from 'jsbarcode';

  export default defineComponent({
    name: 'Barcode',
    components: {},
    props: {},
    setup() {
      const payload = '123456789012';
      const barcodeDomElement: Ref<string | null> = ref('barcode');

      onMounted(() => {
        // JsBarcode(barcodeDomElement.value).init();
        JsBarcode('#barcode').init();
      });

      return {
        barcodeDomElement,
        payload,
      };
    },
  });
</script>

<style lang="postcss" scoped></style>
