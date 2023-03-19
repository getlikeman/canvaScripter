<script setup>
let emit=defineEmits(['load'])
function getText(e){
    let file = e.target.files[0];
    console.log(file)
    let reader=new FileReader()
  reader.onload = e => emit("load", e.target.result);
  reader.readAsText(file);
}
</script>
<template>
<div class="flex flex-col justify-center justify-self-center items-center">
  <label for="text" class="text-3xl">выберите файл или перетащите его сюда:</label>
  <input type="file" class="file:bg-green-600 file:shadow-lg file:shadow-green-500-50 file:border-0 hover:file:bg-amber-400 file:rounded-full" name="text"  @change="getText" accept=".txt">
</div>
</template>



<style scoped>

</style>

