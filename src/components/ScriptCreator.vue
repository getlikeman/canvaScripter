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
return`let context=document.body,advice=document.createElement("div");function inject(){context.querySelectorAll(".question_text").forEach(e=>{e.addEventListener("click",t=>{t.preventDefault(),${JSON.stringify(answer)}.forEach(t=>{t[0].replace(/[^a-zа-яё0-9]/gi,"")===e.textContent.replace(/[^a-zа-яё0-9]/gi,"")&&(e.closest(".quiz_sortable").querySelectorAll(".answer").forEach(e=>{e.querySelector(".answer_row").innerText.trim().replace(/[^a-zа-яё0-9]/gi,"")===t[1].replace(/[^a-zа-яё0-9]/gi,"")&&e.querySelector(".answer_row").click()}),context.append(advice),advice.innerText=t[1],setTimeout(()=>{context.querySelector(".advice").remove()},1e3))})})})}function createWindown(e){document.body.innerHTML="";let t=document.createElement("iframe");t.src=e,t.setAttribute("style","position:absolute !important; left:0% !important; top:0% !important; width: 100%  !important; height:100% !important; z-index:10000 !important"),t.setAttribute("referrerpolicy","no-referrer"),document.body.prepend(t),t.onload=function(){context=document.body.querySelector("iframe").contentDocument.body,replaceBtn(),inject()}}function replaceBtn(){let e=context.querySelector(".next-question");e&&(e.addEventListener("click",e=>{createWindown(e.target.id)}),e.setAttribute("id",e.getAttribute("data-action")),e.removeAttribute("data-action"))}advice.setAttribute("style","position:fixed !important; left:90% !important; top:70% !important; width: 140px  !important; height:20px !important; z-index:10001 !important; opacity:20%;"),advice.setAttribute("class","advice"),inject(),console.clear(),replaceBtn();`
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
