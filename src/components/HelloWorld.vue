<template>
  <div class="demo">
    <p>第一步：运行npm install --save-dev webpack-spritesmith</p>
    <p>第二步：先去看build/webpack.base.conf.js文件下关于SpritesmithPlugin配置</p>
    <p>第三步：index.js文件引入</p>
    <p>第四步：组件引入，如下：</p>
    <i class="icon icon-youtube"></i>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data() {
    return {
      msg: 'Welcome to Your Vue.js App',
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.icon {
  display: inline-block;
}
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
