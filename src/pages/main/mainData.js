import { API_URL } from '../../utils/consts'

let array = []

array.push({
    id: 1,
    title: "Электроинструмент и расходники",
    body: [
        'Дрели',
        'Перфораторы',
        'УШМ',
        'Шуруповёрты',
        'Сабельные пилы',
        'Лобзики',
    ],
    image: API_URL + "main/1_elektro_instrument.jpg",
    url: "akkumulyatornyy-instrument"
})
array.push({
    id: 2,
    title: "Строительная техника и оборудование",
    body: [
        'Бензорезы',
        'Виброплиты',
        'Затирочные машины',
        'Нарезчики швов',
        'Промышленные пылесосы',
        'Стенорезные машины',
    ],
    image: API_URL + "main/2_stroitelnaya_tehnika.jpg",
    url: "stroitelnoe-oborudovanie_too"
})
array.push({
    id: 3,
    title: "Алмазный инструмент и оснастка",
    body: [
        'Алмазные коронки и сверла',
        'Алмазные отрезные диски',
        'Алмазные шлифовальные круги',
        'Алмазные головки',
        'Бруски с алмазным слоем',
        'Шлифпорошки',
    ],
    image: API_URL + "main/3_almaznij_instrument.jpg",
    url: "almaznaya-osnastka"
})
array.push({
    id: 4,
    title: "Металлообработка",
    body: [
        'Магнитные сверлильные станки',
        'Кольцевые фрезы',
        'Инструменты для сверления',
        'Инструменты для нарезки резьбы',
        'Фаскосъёмные машины',
        'Пилы',
    ],
    image: API_URL + "main/4_metalloobrabotka.jpg",
    url: "sverlilnye"
})
array.push({
    id: 5,
    title: "Слесарный и сантехнический инструмент",
    body: [
        'Искробезопасный инструмент',
        'Наборы инструментов',
        'Динамометрический инструмент',
        'Кузнечный инструмент',
        'Измерительный инструмент',
        'Автомобильный инструмент',
    ],
    image: API_URL + "main/5_slesarnij_instrument.jpg",
    url: "santehnicheskiy-instrument"
})
array.push({
    id: 6,
    title: "Такелажное оборудование",
    body: [
        'Стяжные ремни',
        'Буксиры',
        'Лебёдки',
        'Домкраты',
        'Крюки',
        'Скобы',
    ],
    image: API_URL + "main/6_takelajnoe_oborudovanie.jpg",
    url: "takelazh-i-komplektuyuschie"
})
array.push({
    id: 7,
    title: "Тепловое оборудование",
    body: [
        'Тепловые пушки',
        'Инфракрасные нагреватели',
        'Осушители и вентиляторы',
        'Кондиционеры и охладители',
        'Электрические нагреватели',
        'Жидкотопливные горелки',
    ],
    image: API_URL + "main/7_teplovoe_oborudovanie.jpg",
    url: "obogrevateli-i-osushiteli"
})
array.push({
    id: 8,
    title: "Сварочное оборудование",
    body: [
        'Промышленное оборудование',
        'Профессиональное оборудование',
        'Комплектующие и аксессуары',
        'Средства защиты сварщика',
        'Расходные сварочные материалы',
        'Газосварочное оборудование',
    ],
    image: API_URL + "main/8_svarochnoe_oborudovanie.jpg",
    url: "svarochnoe-oborudovanie"
})
array.push({
    id: 9,
    title: "Крепёж",
    body: [
        'Распорные анкеры',
        'Химические анкеры',
        'Анкерные шурупы',
        'Дюбеля и дюбель-гвозди',
        'Электромонтажный крепёж',
        'Хомуты',
    ],
    image: API_URL + "main/9_krepej.jpg",
    url: "krepezh"
})
array.push({
    id: 10,
    title: "Кабель и кабельная арматура",
    body: [
        'Кабельные муфты',
        'Коннекторы',
        'Кабель монтажный',
        'Кабель силовой',
        'Провода заземления',
        'Противопожарные кабели',
    ],
    image: API_URL + "main/10_kabel.jpg",
    url: "elektrika_too"
})
array.push({
    id: 11,
    title: "Противопожарное оборудование и СИЗ",
    body: [
        'Огнетушители',
        'Противопожарный инвентарь',
        'Средства индивидуальной защиты',
        'Противогазы',
        'Шкафы пожарные',
        'Аптечки',
    ],
    image: API_URL + "main/11_protivopojarnoe_oborudovanie.jpg",
    url: "specodezhda-i-siz"
})
array.push({
    id: 12,
    title: "Техника прямого монтажа",
    body: [
        'Монтажные пистолеты',
        'Монтажные патроны',
        'Дюбель-гвозди и крепёж',
        'Патрон монтажный МПУ',
        'ЗИП к пистолетам',
        'Крепёж для утепления',
    ],
    image: API_URL + "main/12_tehnika_pryamogo_montaja.jpg",
    url: "gazovyy-instrument"
})
array.push({
    id: 13,
    title: "Гидравлическое оборудование",
    body: [
        'Гидравлические станции',
        'Гидравлический инструмент',
        'Пневматический инструмент',
        'Гидравлические погружные помпы',
        'Оборудование для подводно-технических работ',
        // 'Материалы для подводно-технических работ',
        'Расходные материалы',
    ],
    image: API_URL + "main/13_gidravlicheskoe_oborudovanie.jpg",
    url: "pnevmoinstrument"
})
array.push({
    id: 14,
    title: "Строительные и ремонтные смеси",
    body: [
        // 'Гидроизоляция',
        'Гидроизоляция проникающая',
        'Гидроизоляция обмазочная',
        'Гидроизоляция шовная',
        'Ремонтные составы',
        'Промышленые полы',
        'Инъекционные составы',
    ],
    image: API_URL + "main/14_stroitelnie_smesi.jpg",
    url: "stroitelnye-smesi"
})
array.push({
    id: 15,
    title: "Техника для сада",
    body: [
        'Культиваторы',
        'Воздуходувы',
        'Газонокосилки',
        'Кусторезы',
        'Садовые тракторы',
        'Генераторы',
        // 'Мотопомпы',
    ],
    image: API_URL + "main/15_tehnika_dlya_sada.jpg",
    url: "sadovyy-instrument"
})
array.push({
    id: 16,
    title: "Геодезическое оборудование",
    body: [
        'Тахеометры',
        'Нивелиры',
        'Теодолиты',
        'Георадары',
        'Беспилотные летательные аппараты',
        'Металлоискатели',
    ],
    image: API_URL + "main/16_geodezicheskoe_oborudovanie.jpg",
    url: "izmeritelnye-pribory"
})
array.push({
    id: 17,
    title: "Контрольно измерительные приборы",
    body: [
        'Тепловизоры',
        'Приборы неразрушающего контроля',
        'Электроизмерительные приборы',
        'Радиоизмерительные приборы',
        'Метрологическое оборудование',
        'Паяльные станции',
    ],
    image: API_URL + "main/17_izmeritelnie_pribori.jpg",
    url: "izmeritelnye-pribory"
})
array.push({
    id: 18,
    title: "Спецодежда",
    body: [
        'Летняя / зимняя спецодежда',
        'Защитная спецодежда',
        'Медицинская одежда',
        'Рабочая обувь',
        'Одежда для сферы услуг',
        'Одежда для охранных структур',
    ],
    image: API_URL + "main/18_specodejda.jpg",
    url: "specodezhda-i-siz"
})
array.push({
    id: 19,
    title: "Осветительные мачты",
    body: [
        'Стационарные мачты',
        'Подвижные мачты',
        'Дизельные мачты',
        'Бензиновые мачты',
    ],
    image: API_URL + "main/19_osvetitelnie_machti.jpg",
    url: ""
})
array.push({
    id: 20,
    title: "Генераторы и электростанции",
    body: [
        'Блоки ABP',
        'Газопоршневые установки',
        'Двигатели',
        'Дизель-генераторные установки',
    ],
    image: API_URL + "main/20_generatori.jpg",
    url: "generatory"
})
array.push({
    id: 21,
    title: "Станки",
    body: [
        // 'Плиткорезы',
        // 'Сверлильные установки',
        // 'Станки по дереву',
        // 'Станки по камню',
        // 'Станки по металлу',
        'Деревообрабатывающие',
        'Металлообрабатывающие',
        'Камнеобрабатывающие',
        'Для арматуры',
        'Фаскосниматели',
        'Сверлильные',
    ],
    image: API_URL + "main/21_stanki.jpg",
    url: "stanki"
})
array.push({
    id: 22,
    title: "Компрессоры",
    body: [
        'Винтовые компрессоры',
        'Дизельные компрессоры',
        'Поршневые компрессоры',
        'Дополнительное оборудование',
    ],
    image: API_URL + "main/22_kompressori.jpg",
    url: "kompressory"
})
array.push({
    id: 23,
    title: "Пневмоинструмент",
    body: [
        'Пневматические заклёпочники',
        'Пневматические нейлеры',
        'Пневматические отбойные молотки',
        'Пневматические пилы',
    ],
    image: API_URL + "main/23_pnevmoinstrument.jpg",
    url: "pnevmoinstrument"
})
array.push({
    id: 24,
    title: "Техника специального назначения",
    body: [
        'Автогудронаторы',
        'Бетоноукладчики',
        'Гидростанции',
        'Двигатели',
    ],
    image: API_URL + "main/24_tehnika_spec_naznacheniya.jpg",
    url: ""
})
array.push({
    id: 25,
    title: "Автосервис, гараж и СТО",
    body: [
        'Автоподъёмное оборудование',
        'Динамометрические ключи',
        'Оборудование для автомойки',
        'Прессы гидравлические',
    ],
    image: API_URL + "main/25_avtoservis.jpg",
    url: "oborudovanie-dlya-avtoservisa"
})
array.push({
    id: 26,
    title: "Клининговое оборудование",
    body: [
        'Мойки высокого давления',
        'Насосы',
        'Парогенераторы',
        'Подметальные машины',
    ],
    image: API_URL + "main/26_kliningovoe_oborudovanie.jpg",
    url: "moyki-vysokogo-davleniya"
})
// array.push({
//     id: 27,
//     title: "Пусто",
//     body: [
//         'Пусто',
//         'Пусто',
//         'Пусто',
//         'Пусто',
//         'Пусто',
//         'Пусто',
//     ],
//     image: API_URL + "main/pusto.jpg",
//     url: ""
// })



export default array