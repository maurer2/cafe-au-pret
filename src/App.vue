<template>
  <div>
    <img alt="Vue logo" src="./assets/logo.png" class="" />
    <AppHeader />

    <QRCode />
    <ListDaily />
    <ListTotal />
    <Offers />
    <Order />
    <AppFooter />
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import AppFooter from './components/app-footer/app-footer';
  import AppHeader from './components/app-header/app-header.vue';
  // import Barcode from './components/barcode/barcode';
  import QRCode from './components/qrcode/qrcode';
  import ListDaily from './components/list-daily/list-daily.vue';
  import ListTotal from './components/list-total/list-total.vue';
  import Offers from './components/offers/offers.vue';
  import Order from './components/order/order.vue';

  export default defineComponent({
    name: 'App',
    components: {
      AppFooter,
      AppHeader,
      // Barcode,
      ListDaily,
      ListTotal,
      Offers,
      Order,
      QRCode,
    },
  });
</script>

<style>
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
</style>

<style lang="postcss" scoped>
  .test {
    background: red;
  }
</style>
