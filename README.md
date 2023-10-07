# 서울 채식 음식점(Vue 프로젝트 + REST API)

### 사이트 주제

- 채식주의자가 많이 늘어나면서 **채식 음식점이 어디에 있는지** 쉽게 찾을 수 있도록 해주는 사이트입니다.
  </br>
  </br>

### 주요 기능

1. [가게 검색하기](#가게-검색하기)
2. [가게 상세정보 보기](#가게-상세정보-보기)
   </br>
   </br>

### #가게 검색하기

📌 자치구로 필터링하고 검색 키워드를 합쳐서 원하는 채식 음식점을 찾을 수 있습니다.
</br>
</br>

**주요 코드**
</br>

**1. 함수의 의미**

```js
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
```

#### 1. `clickedSearchBtn()`는 검색 버튼을 누르면 `filter(자치구 필터값이 담긴 변수)와 keyword(검색창에 입력된 값이 저장된 변수)`를 조합하여 조건에 알맞은 결과를 반환하는 함수입니다.

- this.resetList는 원본 API 데이터가 저장되어있는 변수이고, this.list는 조건에 맞는 결과가 저장되는 변수입니다.
- this.resetList에서 filter로 조건에 맞는 데이터만 반환해서 this.list에 저장합니다.
  </br>

#### 2. `findStore()`는 filter를 사용할 때 조건이 2개 이상이면 이렇게 따로 함수를 만들어 결과를 filter로 다시 반환해서 사용합니다. 이 역할을 해주는 함수입니다.

- filter와 keyword 값이 초기화 값과 다를 때 자치구와 가게명이 일치하는 결과를 반환해줍니다.

---

</br>
</br>

### #가게 상세정보 보기

📌 가게의 주소, 전화번호, 영업 시간 등과 지도로 위치를 확인할 수 있습니다.
</br>
</br>

**주요 코드**
</br>

**1. 함수와 매개변수 의미**

```js
// PostDetail.vue
clickLinkBtn(storeInfo) {
  this.storeInfoList = storeInfo;
  this.$emit("modalState", false);
  this.$emit("storeInfo", storeInfo);
  // 가게명, 음식 종류, 가게 주소명, 가게 종류, 채식 가능여부, 가게 전화번호, 위도, 경도
},

// MainPage.vue
changeModalState(state) {
  this.showModal = state;
  const mapStyle = document.getElementById("map");
  if (this.showModal) {
    mapStyle.style.display = "none";
  } else {
    mapStyle.style.display = "block";
  }
},
```

#### 1. `clickLinkBtn()`는 가게 리스트에서 가게명을 클릭하면 상세 정보를 보여주는 함수입니다.

- storeInfo는 클릭한 가게의 상세 정보가 저장되어있는 변수입니다.
- `this.$emit("modalState", false)`는 모달창의 닫기 버튼의 상태를 저장해주는데 이때는 아직 닫지 않았다는 의미로 false를 저장했습니다.
- `this.$emit("storeInfo", storeInfo)`는 클릭한 가게에 대한 상세 정보를 저장하는 메소드 입니다.
  </br>

#### 2. `ChangeModalState()`는 emit의 modalState 값에 따라 모달창 display에 스타일을 부여하는 함수입니다.

- this.showModal에 modalState 값을 저장해서 값에 따라 알맞은 조건을 실행시킵니다.
- true면 모달창이 닫혔다는 의미로 display에 none을 줘서 브라우저에 보이지 않게 만듭니다.
- false면 모달창을 아직 안 닫았다는 의미로 display에 block을 줘서 브라우저에 보이게끔 만듭니다.
