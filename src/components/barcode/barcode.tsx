import { defineComponent, Ref, ref, onMounted } from 'vue';
import JsBarcode from 'jsbarcode';

export default defineComponent({
  name: 'Barcode',
  components: {},
  props: {},
  setup() {
    const payload = '123456789012';
    const barcode: Ref<SVGElement | null> = ref(null);

    onMounted(() => {
      if (barcode.value === null) {
        throw new Error('barcode dom element is missing');
      }

      JsBarcode(barcode.value).init();
    });

    return () => (
      <div class="barcode">
        <h2>Barcode</h2>
        <svg
          ref={barcode}
          jsbarcode-value={payload}
          jsbarcode-format="upc"
          jsbarcode-textmargin="0"
          jsbarcode-fontoptions="bold"
        />
      </div>
    );
  },
});
