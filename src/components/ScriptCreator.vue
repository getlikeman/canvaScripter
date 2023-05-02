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
  return`let context=document.body,advice=document.createElement("div");function inject(){context.querySelectorAll(".question_text").forEach(e=>{e.addEventListener("click",()=>{${JSON.stringify(answer)}.forEach(t=>{t[0]===e.innerText&&(context.querySelectorAll(".answer").forEach(e=>{e.querySelector(".answer_row").innerText.trim()===t[1]&&e.querySelector(".answer_row").click()}),context.append(advice),advice.innerText=t[1],setTimeout(()=>{context.querySelector(".advice").remove()},1e3))})})})}function createWindown(e){document.body.innerHTML="";let t=document.createElement("iframe");t.src=e,t.setAttribute("style",\`
        position:absolute !important;
        left:0% !important;
        top:0% !important;
        width: 100%  !important;
        height:100% !important;
        z-index:10000 !important;
        \`),t.setAttribute("referrerpolicy","no-referrer"),document.body.prepend(t),t.onload=function(){context=document.body.querySelector("iframe").contentDocument.body,createNav(),inject()}}function createNav(){context.querySelectorAll("aside[id=right-side]>div>ul>li>a").forEach(e=>{e.addEventListener("click",()=>{createWindown(e.id)}),e.setAttribute("id",e.href),e.removeAttribute("href")})}advice.setAttribute("style",\`
        position:fixed !important;
        left:90% !important;
        top:70% !important;
        width: 140px  !important;
        height:20px !important;
        z-index:10001 !important;
        opacity:20%;

\`),advice.setAttribute("class","advice"),inject(),createNav(),console.clear();`

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
