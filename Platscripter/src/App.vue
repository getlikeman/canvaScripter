<script setup>
import Filecheker from "./components/Filecheker.vue";
import ScriptCreator from "./components/ScriptCreator.vue";
import {ref} from "vue";
let text=ref()
</script>

<template>
  <div class="flex flex-col justify-center justify-self-center items-center">
    <h1 class="text-7xl my-5">
    TestScriptGenerator
  </h1>
  <p class="text-2xl">Данный сайт позволяет создать специальный скрипт с помощью которого проходить тесты не составит труда</p>
    <p class="text-1xl">перед тем как закинуть файл убедитесь что он правильно оформлен.файл должен быть оформлен следующим образом: </p>
    <ol class="list-decimal text-2xl">
      <li>Записывать надо в формате одна строчка вопрос, следующая строчка правильный ответ</li>
      <li>Надо записывать вопросы и ответы без лишних символов как и в оригинале</li>
      <li>Скрипт работает следующим образом.При нажатии на вопрос он выбирает нужный вариант  </li>
    </ol>

    <div class="rounded-lg border-4 border-blue-800 my-10 w-1/2 h-1/2  ">
    <Filecheker @load="text=$event"/>
    <ScriptCreator :input="text"/>
  </div>

</div>
</template>

<style scoped>

</style>
