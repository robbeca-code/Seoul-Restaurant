<template>
  <div class="main-container">
    <div v-if="items.length > 0" class="store-table-container">
      <table>
        <thead class="store-table-header">
          <tr>
            <th class="store-unique-code-title">식품인증번호</th>
            <th class="store-name-title">가게명 / 업태명</th>
            <th class="store-address-title">주소명</th>
            <th class="store-vegetable-title">채식 가능</th>
          </tr>
        </thead>
        <tbody class="store-table-data">
          <tr
            v-for="store in items
              .slice(this.startPage, this.endPage)
              .filter((store) => store !== null)"
            :key="store.CRTFC_UPSO_MGT_SNO"
          >
            <td class="store-unique-code-data">
              <span>
                {{ store.CRTFC_UPSO_MGT_SNO }}
              </span>
            </td>
            <td class="store-name-data">
              <button type="button" class="link" @click="clickLinkBtn(store)">
                {{
                  store.UPSO_NM.length > 12
                    ? store.UPSO_NM.slice(0, 13).concat("...")
                    : store.UPSO_NM
                }}
                <span class="store-kind">{{ store.BIZCND_CODE_NM }}</span>
              </button>
            </td>
            <td class="store-address-data">
              <span>
                {{
                  store.RDN_CODE_NM.length > 20
                    ? store.RDN_CODE_NM.slice(0, 20).concat("...")
                    : store.RDN_CODE_NM
                }}
              </span>
            </td>
            <td class="store-vegetable-data">
              <span>
                {{ store.CRTFC_GBN_NM }}
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-else class="alert-container">
      <div class="img-container">
        <img alt="No result search" src="../assets/no_result_search.png" />
      </div>
      <h3>일치하는 가게가 없습니다.</h3>
    </div>

    <ul class="pagination-container">
      <li
        v-for="n in paginationaUnits"
        :key="n"
        :class="[n === currentPage ? 'select-page' : '', 'page-btn']"
        @click="changeCurrentPage(n - 1)"
      >
        <button type="button" class="page-text">{{ n }}</button>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "ShowList",

  data: () => ({
    startPage: 0,
    endPage: 20,
    paginationaUnits: 15,
    currentPage: 1,
    storeInfoList: null,
  }),

  props: {
    items: [],
  },

  emits: ["storeInfo", "modalState"],

  watch: {
    items: "resetpaginationInfo",
  },

  created() {
    this.resetpaginationInfo();
  },

  methods: {
    resetpaginationInfo() {
      this.paginationaUnits = Math.ceil(this.items.length / 20);
      this.startPage = 0;
      this.items.length > 20
        ? (this.endPage = 20)
        : (this.endPage = this.items.length);
      this.currentPage = 1;
    },

    changeCurrentPage(pageNum) {
      this.startPage = pageNum * 20;
      this.endPage = pageNum * 20 + 20;
      this.currentPage = pageNum + 1;
    },

    clickLinkBtn(storeInfo) {
      this.storeInfoList = storeInfo;
      this.$emit("modalState", false);
      this.$emit("storeInfo", storeInfo);
      // 가게명, 음식 종류, 가게 주소명, 가게 종류, 채식 가능여부, 가게 전화번호, 위도, 경도
    },
  },
};
</script>

<style scoped>
.main-container {
  position: relative;
}

.link {
  font-size: 1em;
  color: #333;
  text-decoration: none;
}

.link:hover {
  color: #0e8130;
}

.store-table-container {
  width: 100%;
}

.store-table-container > table {
  width: 100%;
  border-collapse: collapse;
}

/*  Table Header Style  */
.store-table-header {
  background-color: #0e8130;
}

.store-table-header > tr > * {
  color: #fff;
  font-size: 0.95em;
  font-weight: normal;
  padding: 10px;
}

.store-unique-code-title {
  width: 129px;
}

.store-name-title {
  width: 240px;
}

.store-address-title {
  width: 286px;
}

.store-vegetable-title {
  width: 119px;
}

/*  Table Body Style  */
.store-table-data > tr {
  border-bottom: 1px solid #e9e9e9;
}

.store-table-data > tr > * {
  padding: 8px 0;
  font-size: 0.95em;
  border-collapse: collapse;
}

.store-unique-code-data {
  text-align: center;
}

.store-name-data {
  padding-left: 10px;
  text-align: left;
}

.store-address-data {
  padding-left: 10px;
  text-align: left;
}

.store-kind {
  font-size: 0.88em;
  color: #666666;
}

.store-vegetable-data {
  text-align: center;
}

.store-vegetable-data > * {
  color: #00a2e8;
}

/*  Pagination Style  */
.pagination-container {
  display: flex;
  justify-content: center;
  list-style: none;
  margin-top: 35px;
}

.page-btn {
  width: 23px;
  height: 23px;
}

.page-btn > button {
  width: 100%;
  height: 100%;
  background-color: #fff;
  border: 1px solid #ddd;
}

.select-page > button {
  width: 100%;
  height: 100%;
  background-color: #0e8130;
  border-style: none;
  color: #fff;
}

/*  Alert Page Style  */
.alert-container {
  width: 250px;
  height: 350px;
  font-size: 0.95em;
  margin: 0 auto;
}

.img-container {
  width: 100%;
  height: auto;
}

.img-container > img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.alert-container > h3 {
  text-align: center;
}
</style>
