//天气预报ajax请求
const fetchWeather = function (callback, city = '武汉') {
    let c = city
    let url = `https://free-api.heweather.com/v5/forecast?city=${c}&key=7caf480d5fd8416c9f60e74658d70cfa`
    let request = {
        method: 'GET',
        url: url,
        callback: (data) => {
            data = JSON.parse(data)
            callback(data)
        }
    }
    ajax(request)
}

//看不懂
const formattedChart = function () {
    let element = e('#id-div-chart')
    let chart = echarts.init(element)
    return chart
}

//获取天气数据
const dailyForcast = function (weather) {
    let w = {
        date: [],
        max: [],
        min: [],
    }
    let forecast = weather.daily_forecast
    for (let i = 0; i < forecast.length; i++) {
        let f = forecast[i]
        let t = f.tmp
        w.max.push(t.max)
        w.min.push(t.min)
        w.date.push(f.date)
    }
    log('w', w)
    return w
}

//看不懂
const formattedWeather = function (weather) {
    let data = dailyForcast(weather)
    let city = e('.hot-key').dataset.hotcity
    log('city', city)
    let option = {
        title: {
            text: `${city} 的未来三天气温变化`,
        },
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            data: ['最高气温', '最低气温']
        },
        toolbox: {
            show: true,
            feature: {
                dataZoom: {
                    yAxisIndex: 'none'
                },
                dataView: { readOnly: false },
                magicType: { type: ['line', 'bar'] },
                restore: {},
                saveAsImage: {}
            }
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: data.date
        },
        yAxis: {
            type: 'value',
            axisLabel: {
                formatter: '{value} °C'
            }
        },
        series: [
            {
                name: '最高气温',
                type: 'line',
                data: data.max,
                markPoint: {
                    data: [
                        { type: 'max', name: '最大值' },
                        { type: 'min', name: '最小值' }
                    ]
                },
                markLine: {
                    data: [
                        { type: 'average', name: '平均值' }
                    ]
                }
            },
            {
                name: '最低气温',
                type: 'line',
                data: data.min,
                markPoint: {
                    data: [
                        { name: '周最低', value: -2, xAxis: 1, yAxis: -1.5 }
                    ]
                },
                markLine: {
                    data: [
                        { type: 'average', name: '平均值' },
                        [{
                            symbol: 'none',
                            x: '90%',
                            yAxis: 'max'
                        }, {
                            symbol: 'circle',
                            label: {
                                normal: {
                                    position: 'start',
                                    formatter: '最大值'
                                }
                            },
                            type: 'max',
                            name: '最高点'
                        }]
                    ]
                }
            }
        ]
    }
    return option
}


//
const renderChart = function (data) {
    log('data', data)
    let weather = data.HeWeather5[0]
    log('weather', weather)
    // init chart
    let chart = formattedChart()
    // format
    let w = formattedWeather(weather)

    chart.setOption(w)
}

const bindEvents = function () {
    bindAction()
}

//初始化默认城市
const initDefalutCity = function (city) {
    e('.hot-key').dataset.hotcity = city
}

//选择第一个城市为默认城市，武汉
const init = function (citys) {
    initDefalutCity(citys[0])
    initHtml(citys)
}

//默认城市模板html
const templateCity = function (city) {
    let c = city
    let t = `<a href="javascript:" data-city=${c} data-action='click_link'>${c}</a>`
    return t
}

//清空输入
const clearInput = function() {
    e('input').value = ''
}

//
const actions = {
    click_link(event) {
        let link = event.target
        let city = link.dataset.city
        log('link city', city)
        e('.hot-key').dataset.hotcity = city
        fetchWeather(renderChart, city)
    },
    search_city(event) {
        let city = e('input').value
        // log('search city', city)
        e('.hot-key').dataset.hotcity = city
        clearInput()
        fetchWeather(renderChart, city)
    },
}

//事件委托，绑定三个默认城市点击事件查询和搜索查询
const bindAction = () => {
    let body = e('body')
    bindEvent(body, 'click', event => {
        // log('target', event.target)
        let action = event.target.dataset.action
        log('action', action)
        actions[action] && actions[action](event)
    })
}

//初始化默认城市html
const initHtml = function (citys) {
    let html = ''
    for (let c of citys) {
        let t = templateCity(c)
        html += t
    }
    appendHtml(e('.hot-key'), html)
}

//主函数
const main = function () {
    let citys = ['武汉', '长沙', '上海']
    init(citys)

    fetchWeather(renderChart)
    bindEvents()
}

main()