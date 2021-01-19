const log = console.log.bind(console)

//单个选择器
const e = (selector) => document.querySelector(selector)

// 多个选择器
const es = selector => document.querySelectorAll(selector)

// 用原生写的ajax请求函数
const ajax = function(request) {
    /*
    request 是一个 object，有如下属性
        method，请求的方法，string
        url，请求的路径，string
        data，请求发送的数据，如果是 GET 方法则没有这个值，string
        callback，响应回调，function
    */
    let r = new XMLHttpRequest()
    r.open(request.method, request.url, true)
    if (request.contentType != undefined) {
        r.setRequestHeader('Content-Type', request.contentType)
    }
    r.onreadystatechange = function() {
        if (r.readyState == 4) {
            request.callback(r.response)
        }
    }
    if (request.method == 'GET') {
        r.send()
    } else {
        r.send(request.data)
    }
}

//查找
const find = (element, selector) => {
    return element.querySelector(selector)
}

//查找所有
const findAll = (element, selector) => {
    return element.querySelectorAll(selector)
}

// 插入html
const appendHtml = (element, html) => {
    element.insertAdjacentHTML('beforeend', html)
}

//事件对象
const EventType = {
    click: 'click',
    mouseover: 'mouseover',
    mouseout: 'mouseout',
}

//绑定事件
const bindEvent = (element, eventName, callback) => {
    element.addEventListener(eventName, callback)
}

// 给所有的元素绑定事件
const bindAll = (elements, eventName, callback) => {
    for (let v of elements) {
        let element = v
        bindEvent(element, eventName, callback)
    }
}

//事件开关，用于完成与未完成的切换
const toggleClass = (element, className) => {
    if (element.classList.contains(className)) {
        element.classList.remove(className)
    } else {
        element.classList.add(className)
    }
}

////删除html
const removeClassAll = (className) => {
    let selector = '.' + className
    let elements = document.querySelectorAll(selector)
    for (let v of elements) {
        let element = v
        element.classList.remove(className)
    }
}

//向下取整
const floor = num => Math.floor(num)

  // 生成 1 到 number 之间的随机整数
const random = num => Math.ceil(Math.random() * num)