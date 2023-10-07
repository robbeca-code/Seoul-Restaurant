<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "App",
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Noto+Sans+KR&display=swap");

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

h1,
h2,
h3,
h4,
h5,
h6 {
  font-family: "Noto Sans KR", sans-serif;
  color: #333;
}

span,
p,
strong,
input,
button,
option,
li,
th,
td {
  font-family: "Noto Sans KR", sans-serif;
  color: #333;
}

button {
  background-color: transparent;
  border-style: none;
  cursor: pointer;
}

#app {
  width: 1024px;
  margin: 50px auto;
}

@media screen and (max-width: 700px) {
  #app {
    width: 100%;
    padding: 0 20px 80px;
    margin: 0;
  }
}
</style>
