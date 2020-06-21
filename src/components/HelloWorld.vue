<template>
  <div class="hello">
      <little-page>
            <little-page-item color="#d49898">
                <span>page1</span>
            </little-page-item>
            <little-page-item color="#aaf7f4">
                <span>page2</span>
            </little-page-item>
      </little-page>
  </div>
</template>
<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.hello{
  height: 100%;
  position: relative;
}
</style>
