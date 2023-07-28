<template>
  <section class="modal-container">
    <h1 class="hidden">Restaurant Information Modal</h1>
    <header class="modal-header">
      <h3>가게 정보</h3>
      <button type="button" class="close-btn" @click="clickCloseBtn">
        <img src="../assets/closeBtn.png" alt="The close button" />
      </button>
    </header>
    <div id="blank-container"></div>
    <article class="modal-content">
      <h1 class="hidden">Restaurant Information Items</h1>
      <div class="modal-store-title">
        <h4>{{ items.UPSO_NM }}</h4>
        <span>{{ items.BIZCND_CODE_NM }}</span>
      </div>
      <ul class="modal-store-info-list">
        <li class="modal-store-info-item">
          <div class="icon-container">
            <img src="../assets/location.png" alt="location icon" />
          </div>
          <span role="region" aria-label="The store's name">{{
            items.RDN_CODE_NM
          }}</span>
        </li>
        <li class="modal-store-info-item">
          <div class="icon-container">
            <img src="../assets/restaurant.png" alt="restaurant icon" />
          </div>
          <div class="store_kind_container">
            <span role="region" aria-label="The store's kind">{{
              items.COB_CODE_NM
            }}</span>
            <span
              role="region"
              aria-label="The availability of vegetables in the store"
              class="text-color-blue"
              >{{ items.CRTFC_GBN_NM }}</span
            >
          </div>
        </li>
        <li class="modal-store-info-item">
          <div class="icon-container">
            <img src="../assets/telephone.png" alt="telephone icon" />
          </div>
          <span role="region" aria-label="The store's telephone number">{{
            items.TEL_NO
          }}</span>
        </li>
      </ul>
    </article>
  </section>
</template>

<script>
export default {
  props: {
    items: [],
  },

  data: () => ({
    map: null,
    marks: null,
  }),

  emits: ["modalState"],

  methods: {
    clickCloseBtn() {
      this.$emit("modalState", true);
    },
  },
};
</script>

<style scoped>
.hidden {
  display: none;
}

/*  Modal Container  */
#blank-container {
  width: 100%;
  height: 162px;
}

.modal-container {
  width: 100%;
  height: 100%;
  padding: 12px 20px;
  box-shadow: 0 0 0 100vw rgba(0, 0, 0, 0.2);
  background-color: #fff;
  border-radius: 15px;
}

/*  Modal Header  */
.modal-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 12px;
}

.modal-header > h3 {
  font-weight: normal;
}

.close-btn {
  width: 30px;
  height: 30px;
}

.close-btn > img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

/*  Modal Content  */
.modal-content {
  margin-top: 20px;
}

.modal-store-title {
  font-size: 1.1em;
  display: flex;
  line-height: 100%;
  margin-bottom: 12px;
}

.modal-store-title > h4 {
  margin-right: 7px;
  font-weight: normal;
}

.modal-store-title > span {
  font-size: 0.85em;
  color: #5f6368;
}

/*  Modal Store Info  */
.modal-store-info-list {
  list-style: none;
}

.modal-store-info-item {
  display: flex;
  font-size: 0.95em;
  line-height: 120%;
  margin-bottom: 7px;
}

.icon-container {
  margin-right: 7px;
}

.text-color-blue {
  color: #00a2e8;
  padding-left: 4px;
}
</style>
