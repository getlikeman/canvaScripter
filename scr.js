let path = require('path')
let fs = require('fs')

let data = fs.readFileSync('text.txt', 'utf8')
let target = data.split(/(\r\n)/).filter(s => s !== '\r\n')
let answer = []
for (let i = 0; i < target.length - 1; i++) {
    answer.push([target[i], target[i+=1]])
}
console.log(answer.toString())
fs.writeFileSync('min.index.js',`document.body.querySelectorAll(".table-question").forEach(e=>{e.querySelector("caption").addEventListener("click",()=>{${JSON.stringify(answer)}.forEach(t=>{t[0]===e.querySelector(\'div[ng-bind-html="question.questionText"]\').innerHTML&&e.querySelectorAll("tbody> tr").forEach(e=>{e.querySelector("div[ng-bind-html=\'variant.value\']").innerHTML===t[1]&&(e.querySelector("input").click(),e.style.cssText="font-style: italic")})})})});`,)
