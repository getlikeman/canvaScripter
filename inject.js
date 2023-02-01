document.body.querySelectorAll('.table-question').forEach(el => {
    el.querySelector('caption').addEventListener('click', () => {
        let mass =
            [['Какой тип власти активизирует использование руководителем своего образования, опыта, таланта, усилий и навыков', 'Экспертная'],
            ['Из предлагаемых выберите, что относится к управленческим навыкам:', 'личностные, профессиональные качества и навыки, модели поведения.'],
            ['При каком стиле руководитель не осуществляет жесткий контроль за подчиненными в процессе их работы, он осуществляет ее оценку, когда работа выполнена до конца', 'структуре и вниманию к подчинённым']]
            mass.forEach(item=>{
                if (item[0] === el.querySelector('div[ng-bind-html="question.questionText"]').innerHTML) {
                    el.querySelectorAll('tbody> tr').forEach(target => {
                        if (target.querySelector("div[ng-bind-html='variant.value']").innerHTML === item[1]) {
                            target.querySelector('input').click()
                            target.style.cssText='font-style: italic'
                        }
                    })
                }
            })
    })
})
