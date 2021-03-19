var calendarevents = {
    jan: { 1: "Сайхан амарна" },
    feb: { 1: "Сагсны тэмцээнтэй", 3: "Шагнал гардуулна даа", 17: "Жавхлан багшийн лаб 2-ыг хийнэ" },
    mar: { 2: "Энэ лабынхаа хугацааг сунгах уу яах вэ гэдэгээ шийднэ", 6: "Энд юу бичье дээ байз", 8: "Эмэгтэйчүүддээ баяр хүргэнэ дээ" },
    apr: { 1: "Бүгдээрээ худлаа ярьцаагаагаарай" },
    may: { 10: "Энэ сард ч ёстой юу ч болдоггүй сар даа" },
    jun: { 6: "Жавхлан багшийн төрсөн өдөр" },
    jul: { 4: "Хичээл амарсаан ураа" },
    aug: { 1: "Хөдөө явдаг цаг даа", 25: "Хичээл сонголт эхэллээ" },
    sep: { 1: "9-н сарын нэгэн боллоо ерөөсөө бидний баяр даа" },
    oct: { 13: "Сур сур бас дахин сур" },
    nov: { 2: "Сурсаар л бай" },
    dec: { 20: "Өвлийн семистер хаагдах нь дээ", 30: "Дүн гаргаж дууслаа баярлалаа баяртай" }
};


function searchmon() {
    let val = document.getElementById('value').value;
    if (val == "") {
        document.getElementById('demo').textContent = "";
    }
    let text = calendarevents[val];
    let str = JSON.stringify(text);
    document.getElementById('demo').textContent = "Search by month: " + str.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '-');
}

function searchval() {
    let val = document.getElementById('value2').value;
    if (val == "") {
        document.getElementById('demo2').textContent = "";
    } else {
        for (i = 0; i < Object.values(calendarevents).length; i++) {
            let str = JSON.stringify(Object.values(calendarevents)[i]);
            let n = str.search(val);
            if (n != -1) {
                document.getElementById('demo2').textContent = "Search by value: " + str.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '-');
                break;
            }
        }
    }
}






var Calendar = function () {
    return function (t) {
        this.start = function () {
            document.querySelector(obj.selector).innerHTML = '\n <div class="calendar-header">\n <button type="button" class="calendar-btn" data-calendar-toggle="previous"><svg height="24" version="1.1" viewbox="0 0 24 24" width="24" ><path d="M20,11V13H8L13.5,18.5L12.08,19.92L4.16,12L12.08,4.08L13.5,5.5L8,11H20Z"></path></svg></button>\n <div class="calendar-header__label" data-calendar-label="month"></div>\n <button type="button" class="calendar-btn" data-calendar-toggle="next"><svg height="24" version="1.1" viewbox="0 0 24 24" width="24"><path d="M4,11V13H16L10.5,18.5L11.92,19.92L19.84,12L11.92,4.08L10.5,5.5L16,11H4Z"></path></svg></button>\n </div>\n <div class="calendar-week"></div>\n <div class="calendar-body" data-calendar-area="month"></div>\n',
                obj.button_prev = document.querySelector(obj.selector + " [data-calendar-toggle=previous]"),
                obj.button_next = document.querySelector(obj.selector + " [data-calendar-toggle=next]"),
                obj.month = document.querySelector(obj.selector + " [data-calendar-area=month]"),
                obj.month_label = document.querySelector(obj.selector + " [data-calendar-label=month]"),
                obj.date.setDate(1), s(),
                document.querySelector(`${obj.selector} .calendar-week`).innerHTML = `\n <span>${obj.shortWeekday[0]}</span>\n <span>${obj.shortWeekday[1]}</span>\n <span>${obj.shortWeekday[2]}</span>\n <span>${obj.shortWeekday[3]}</span>\n <span>${obj.shortWeekday[4]}</span>\n <span>${obj.shortWeekday[5]}</span>\n <span>${obj.shortWeekday[6]}</span>\n`,
                e(obj.button_prev, "click", i),
                e(obj.button_next, "click", c)
        }
        function e(t, e, a)
        {
            t && (t.attachEvent ? t.attachEvent("on" + e, a) : t.addEventListener(e, a))
        }
        function a(t, e, a)
        {
            t && (t.detachEvent ? t.detachEvent("on" + e, a) : t.removeEventListener(e, a))
        }
        var obj = {
            selector: null,
            datesFilter: !1,
            pastDates: !0,
            availableWeekDays: [],
            availableDates: [],
            date: new Date,
            todaysDate: new Date,
            button_prev: null,
            button_next: null,
            month: null,
            month_label: null,
            onSelect: (t, e) => { },
            months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
            shortWeekday: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
        };
        for (let e in t) obj.hasOwnProperty(e) && (obj[e] = t[e]);
        let l = document.querySelector(obj.selector);
        if (!l) return;
        const d = function (t)
        {
            let e = document.createElement("div"),
                a = document.createElement("span");
            a.innerHTML = t.getDate(),
                e.className = "calendar-date",
                e.setAttribute("data-calendar-date", t);
            let l = obj.availableWeekDays.filter(e => e.day === t.getDay() || e.day === function (t)
            { return ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"][t] }(t.getDay())), d = obj.availableDates.filter(e => e.date === t.getFullYear() + "-" + String(t.getMonth() + 1).padStart("2", 0) + "-" + String(t.getDate()).padStart("2", 0)); 1 === t.getDate() && (e.style.marginLeft = 14.28 * t.getDay() + "%"),
                obj.date.getTime() <= obj.todaysDate.getTime() - 1 && !obj.pastDates ? e.classList.add("calendar-date--disabled") : obj.datesFilter ? l.length ? (e.classList.add("calendar-date--active"),
                    e.setAttribute("data-calendar-data", JSON.stringify(l[0])),
                    e.setAttribute("data-calendar-status", "active")) : d.length ? (e.classList.add("calendar-date--active"),
                        e.setAttribute("data-calendar-data", JSON.stringify(d[0])),
                        e.setAttribute("data-calendar-status", "active")) : e.classList.add("calendar-date--disabled") : (e.classList.add("calendar-date--active"),
                        e.setAttribute("data-calendar-status", "active")),
                t.toString() === obj.todaysDate.toString() && e.classList.add("calendar-date--today"),
                e.appendChild(a),
                obj.month.appendChild(e)
        }, r = function ()
            {
            l.querySelectorAll("[data-calendar-status=active]").forEach(t => {
                t.addEventListener("click", function ()
                {
                    document.querySelectorAll(".calendar-date--selected").forEach(t => { t.classList.remove("calendar-date--selected") });
                    let t = this.dataset,
                        e = {};
                    t.calendarDate && (e.date = t.calendarDate),
                        t.calendarData && (e.data = JSON.parse(t.calendarData)),
                        obj.onSelect(e, this),
                        this.classList.add("calendar-date--selected")
                })
            })
            }, s = function () {
                o();
                let t = obj.date.getMonth();
                for (; obj.date.getMonth() === t;)d(obj.date),
                    obj.date.setDate(obj.date.getDate() + 1);
                obj.date.setDate(1),
                    obj.date.setMonth(obj.date.getMonth() - 1),
                    obj.month_label.innerHTML = obj.months[obj.date.getMonth()] + " " + obj.date.getFullYear(), r()
            }, i = function () { obj.date.setMonth(obj.date.getMonth() - 1), s() },
            c = function () { obj.date.setMonth(obj.date.getMonth() + 1), s() },
            o = function () { obj.month.innerHTML = "" };
        
        this.start();
    }
}();
window.Calendar = Calendar;
