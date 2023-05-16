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
  //${JSON.stringify(answer)}
  return`let context=document.body,advice=document.createElement("div");function inject(){context.querySelectorAll(".question_text").forEach(t=>{t.addEventListener("click",e=>{e.preventDefault(),${JSON.stringify(answer)}.forEach(e=>{e[0].split(/\\s+/).join("").replace(/[^a-zа-яё\\s]/gi,"")===t.textContent.split(/\\s+/).join("").replace(/[^a-zа-яё\\s]/gi,"")&&(t.closest(".quiz_sortable").querySelectorAll(".answer").forEach(t=>{t.querySelector(".answer_row").innerText.trim().split(/\\s+/).join("").replace(/[^a-zа-яё\\s]/gi,"")===e[1].split(/\\s+/).join("").replace(/[^a-zа-яё\\s]/gi,"")&&t.querySelector(".answer_row").click()}),context.append(advice),advice.innerText=e[1],setTimeout(()=>{context.querySelector(".advice").remove()},1e3))})})})}function createWindown(t){document.body.innerHTML="";let e=document.createElement("iframe");e.src=t,e.setAttribute("style","position:absolute !important; left:0% !important; top:0% !important; width: 100%  !important; height:100% !important; z-index:10000 !important"),e.setAttribute("referrerpolicy","no-referrer"),document.body.prepend(e),e.onload=function(){context=document.body.querySelector("iframe").contentDocument.body,replaceBtn(),inject()}}function replaceBtn(){let t=context.querySelector(".next-question");t.addEventListener("click",t=>{createWindown(t.target.id)}),t.setAttribute("id",t.getAttribute("data-action")),t.removeAttribute("data-action")}advice.setAttribute("style","position:fixed !important; left:90% !important; top:70% !important; width: 140px  !important; height:20px !important; z-index:10001 !important; opacity:20%;"),advice.setAttribute("class","advice"),inject(),console.clear(),replaceBtn();`

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
