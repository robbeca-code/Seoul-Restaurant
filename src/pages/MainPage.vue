<template>
  <section class="main-container">
    <h1 class="screen-reader-only"></h1>
    <header class="main-header">
      <button type="button" class="logo-btn" v-on:click="clickLogoBtn">
        <h1>서울 <span class="text-color-green">채식</span> 음식점</h1>
      </button>
      <div class="store-search-container">
        <select v-model="filter" class="filter-btn">
          <option disabled value="" class="filter-info-text">
            자치구를 선택해주세요.
          </option>
          <option>구 선택</option>
          <option>강북구</option>
          <option>광진구</option>
          <option>노원구</option>
          <option>도봉구</option>
          <option>동대문구</option>
          <option>성동구</option>
          <option>성북구</option>
          <option>용산구</option>
          <option>은평구</option>
          <option>종로구</option>
          <option>중구</option>
          <option>중랑구</option>
        </select>
        <form class="search-form-container">
          <input
            type="text"
            v-model="keyword"
            placeholder="가게 이름을 입력하세요."
            class="search-form"
          />
          <button
            type="button"
            v-on:click="clickedSearchBtn"
            class="search-btn"
          >
            <span></span>
          </button>
        </form>
      </div>

      <div className="header-line"></div>
    </header>

    <ShowList
      :items="list"
      @storeInfo="getStoreInfo"
      @modalState="changeModalState"
    />

    <div class="map-container">
      <div id="map"></div>
      <div v-if="!showModal" class="show-modal-container">
        <PostDetail :items="storeInfo" @modalState="changeModalState" />
      </div>
      <div v-else></div>
    </div>
  </section>
</template>

<script>
import ShowList from "../components/ShowList.vue";
import PostDetail from "../components/PostDetail.vue";
import axios from "axios";

export default {
  name: "MainPage",

  components: {
    ShowList,
    PostDetail,
  },

  data: () => ({
    list: null,
    resetList: null,
    filter: "구 선택",
    keyword: "",
    showModal: true,
    storeInfo: null,
    map: null,
    mark: null,
  }),

  created() {
    this.getStoreList();
    this.loadScript();
  },

  watch: {
    storeInfo: "loadMap",
  },

  methods: {
    getStoreList() {
      axios
        .get(
          `http://openapi.seoul.go.kr:8088/${process.env.VUE_APP_STORE_KEY}/json/CrtfcUpsoInfo/1/300/`
        )
        .then((response) => {
          this.resetList = response.data.CrtfcUpsoInfo.row;
          this.list = this.resetList;
        })
        .catch((error) => {
          console.log(error);
        });
    },

    clickLogoBtn() {
      this.list = this.resetList;
    },

    clickedSearchBtn() {
      if (this.filter === "구 선택" && this.keyword === "") {
        this.list = this.resetList;
      }

      if (this.filter !== "구 선택" && this.keyword === "") {
        this.list = this.resetList.filter(
          (store) => store.CGG_CODE_NM === this.filter
        );
      }

      if (this.filter === "구 선택" && this.keyword !== "") {
        this.list = this.resetList.filter((store) =>
          store.UPSO_NM.includes(this.keyword)
        );
      }

      if (this.filter !== "구 선택" && this.keyword !== "") {
        this.list = this.resetList.filter((store) =>
          this.findStore(store, this.filter, this.keyword)
        );
      }
    },

    findStore(store, filter, keyword) {
      return (
        store.CGG_CODE_NM.includes(filter) && store.UPSO_NM.includes(keyword)
      );
    },

    // Create Naver Map API
    loadScript() {
      const api_Key = process.env.VUE_APP_NAVERMAP_KEY;
      const script = document.createElement("script");
      script.src = `https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${api_Key}&callback=initMap`;
      script.async = true;
      script.defer = true;
      document.head.appendChild(script);
    },

    loadMap() {
      this.map = new window.naver.maps.Map(document.getElementById("map"), {
        center: new window.naver.maps.LatLng(
          this.storeInfo.Y_DNTS,
          this.storeInfo.X_CNTS
        ),
        zoom: 15,
      });

      this.setMapMark();
    },

    setMapMark() {
      this.marks = new window.naver.maps.Marker({
        position: new window.naver.maps.LatLng(
          this.storeInfo.Y_DNTS,
          this.storeInfo.X_CNTS
        ),
        map: this.map,
      });
    },

    getStoreInfo(storeInfo) {
      this.storeInfo = storeInfo;
    },

    // Change Modal State
    changeModalState(state) {
      this.showModal = state;
      const mapStyle = document.getElementById("map");
      if (this.showModal) {
        mapStyle.style.display = "none";
      } else {
        mapStyle.style.display = "block";
      }
    },
  },
};
</script>

<style scoped>
.main-container {
  width: 774px;
  margin: 0 auto 100px;
  position: relative;
}

.main-header {
  margin: 40px 0 80px;
}

.logo-btn {
  width: 100%;
  height: auto;
  text-align: left;
  font-size: 1.3em;
}

.text-color-green {
  color: #0e8130;
}

.store-search-container {
  display: grid;
  grid-template-columns: 160px 1fr;
  height: 38px;
  column-gap: 8px;
  margin-top: 40px;
}

.filter-btn {
  width: 100%;
  height: 100%;
  font-size: 0.88em;
  border-radius: 3px;
  border-color: #d1d1d1;
  padding-left: 7px;
}

.filter-info-text {
  background-color: #f5f7f9;
}

.filter-btn > option:hover {
  color: #fff;
  background-color: #0e8130;
}

.search-form-container {
  height: 100%;
  width: 100%;
  display: flex;
}

.search-form {
  display: block;
  height: 100%;
  width: 91%;
  background-color: #ebebee;
  border-style: none;
  border-radius: 3px 0 0 3px;
  padding-left: 7px;
}

.search-btn {
  width: 9%;
  height: 100%;
  line-height: 100%;
  border: 1px solid #d1d1d1;
  background-color: #0e8130;
  border-radius: 0 3px 3px 0;
}

.search-btn > span::before {
  content: url("../assets/searchIconW.png");
}

/*  Modal Style  */
.hidden {
  display: none;
}

.map-container {
  position: fixed;
  top: -30px;
  left: 50%;
  transform: translateX(-50%);
  width: 380px;
  height: auto;
  border-radius: 15px;
}

#map {
  width: 340px;
  height: 162px;
  border-radius: 15px;
  z-index: 999;
  top: 215px;
  left: 50%;
  transform: translateX(-50%);
  display: none;
}

/* Max-Width: 700px */
@media screen and (max-width: 700px) {
  .main-container {
    width: 100%;
    margin: 0;
    position: relative;
  }

  .main-header {
    margin: 30px 0 16px;
  }

  .logo-btn {
    width: 100%;
    height: auto;
    text-align: left;
    font-size: 0.98em;
  }

  .text-color-green {
    color: #0e8130;
  }

  .store-search-container {
    display: grid;
    grid-template-columns: 117px 1fr;
    height: 37px;
    column-gap: 5px;
    margin-top: 50px;
  }

  .filter-btn {
    width: 100%;
    height: 100%;
    font-size: 0.81em;
    border-radius: 3px;
    border-color: #d1d1d1;
    padding-left: 3px;
  }

  .filter-info-text {
    background-color: #f5f7f9;
  }

  .filter-btn > option:hover {
    color: #fff;
    background-color: #0e8130;
  }

  .search-form-container {
    height: 100%;
    width: 100%;
    display: flex;
  }

  .search-form {
    display: block;
    height: 100%;
    width: 91%;
    background-color: #fff;
    border: 1px solid #d1d1d1;
    border-right: none;
    border-radius: 3px 0 0 3px;
    padding-left: 7px;
  }

  .search-btn {
    width: 9%;
    height: 100%;
    line-height: 100%;
    border: 1px solid #d1d1d1;
    border-left: none;
    background-color: #fff;
    border-radius: 0 3px 3px 0;
  }

  .search-btn > span::before {
    content: url("../assets/searchIcon.png");
  }

  .header-line {
    margin-top: 14px;
    border: 1px solid #111111;
  }
}

/* Max-Width: 450px */
@media screen and (max-width: 450px) {
  .logo-btn {
    width: 100%;
    height: auto;
    text-align: left;
    font-size: 0.8em;
  }

  .store-search-container {
    display: grid;
    grid-template-columns: 100px 1fr;
    height: 34px;
    column-gap: 5px;
    margin-top: 40px;
  }

  .filter-btn {
    width: 100%;
    height: 100%;
    font-size: 0.78em;
    border-radius: 3px;
    border-color: #d1d1d1;
    padding-left: 3px;
  }

  .filter-info-text {
    background-color: #f5f7f9;
  }

  .filter-btn > option:hover {
    color: #fff;
    background-color: var(--swiper-theme-color);
  }

  .search-form-container {
    height: 100%;
    width: 100%;
    display: flex;
  }

  .search-form {
    display: block;
    height: 100%;
    width: 85%;
    background-color: #fff;
    border: 1px solid #d1d1d1;
    border-right: none;
    border-radius: 3px 0 0 3px;
    padding-left: 7px;
    font-size: 0.82em;
  }

  .search-btn {
    width: 15%;
    height: 100%;
    line-height: 100%;
    border: 1px solid #d1d1d1;
    border-left: none;
    background-color: #fff;
    border-radius: 0 3px 3px 0;
  }

  .map-container {
    position: fixed;
    top: -30px;
    left: 50%;
    transform: translateX(-50%);
    width: 310px;
    height: auto;
    border-radius: 15px;
  }

  #map {
    width: 270px;
    height: 160px;
    border-radius: 15px;
    z-index: 999;
    top: 215px;
    left: 50%;
    transform: translateX(-50%);
    display: none;
  }
}
</style>
