<script setup>
import {ref} from "vue";


  let stateCopy=ref(false)

let props=defineProps({
  input:String,

})
function createScript(data){
  let target = data.split(/(\r\n)/).filter(s => s !== '\r\n')
  let answer = []
  for (let i = 0; i < target.length - 1; i++) {
    answer.push([target[i], target[i+=1]])
  }
  return `document.body.querySelectorAll(".question_text").forEach(e=>{e.addEventListener("click",()=>{${JSON.stringify(answer)}.forEach(r=>{r[0]===e.innerText&&document.body.querySelectorAll(".answer").forEach(e=>{e.querySelector(".answer_row").innerText.trim()===r[1]&&(e.querySelector(".answer_row").click(),e.style.cssText="font-style: italic")})})})});`

}

function copy(){
  stateCopy.value=true
  let copyText = document.querySelector(`textarea`);
  copyText.select();
  copyText.setSelectionRange(0, 99999);
  navigator.clipboard.writeText(copyText.value);

}
</script>
<template>
<textarea v-if="input!==undefined" class="w-full h-60 resize-none bg-gray-200">
  {{createScript(input)}}
</textarea>
  <div v-show="input!==undefined">
    <button v-if="!stateCopy" class="bg-green-600 shadow-lg shadow-green-500-50 border-0 hover:bg-amber-400 rounded-full p-1" @click='copy'>скопировать</button>
    <button v-else class="bg-red-600 shadow-lg shadow-green-500-50 border-0  rounded-full p-1 " disabled @click='copy'>скопировано</button>
  </div>
</template>
