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
  return `let context=document.body,advice=document.createElement("div");function inject(){context.querySelectorAll(".question_text").forEach((t=>{t.addEventListener("click",(()=>{${JSON.stringify(answer)}.forEach((e=>{e[0]===t.innerText&&(context.append(advice),advice.innerText=e[1],setTimeout((()=>{context.querySelector(".advice").remove()}),1e3))}))}))}))}function createWindown(t){document.body.innerHTML="";let e=document.createElement("iframe");e.src=t,e.setAttribute("style","\\n position:absolute !important;\\n left:0% !important;\\n top:0% !important;\\n width: 100% !important;\\n height:100% !important;\\n z-index:10000 !important;\\n "),e.setAttribute("referrerpolicy","no-referrer"),document.body.prepend(e),console.log(context),e.onload=function(){context=document.body.querySelector("iframe").contentDocument.body,createNav(),inject()}}function createNav(){context.querySelectorAll("aside[id=right-side]>div>ul>li>a").forEach((t=>{t.addEventListener("click",(()=>{createWindown(t.id)})),t.setAttribute("id",t.href),t.removeAttribute("href")}))}advice.setAttribute("style","\\n position:absolute !important;\\n left:90vw !important;\\n top:90vh !important;\\n width: 140px !important;\\n height:20px !important;\\n z-index:10001 !important;\\n transition:opacity 1s ;\\n opacity:20%;\\n \\n"),advice.setAttribute("class","advice"),inject(),createNav();
`

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
