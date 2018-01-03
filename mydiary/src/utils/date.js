export function formatDate(time, fmt) {
    var date = new Date(time);
    
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
    }
    let o = {
        'M+': date.getMonth() + 1,
        'd+': date.getDate(),
        'h+': date.getHours(),
        'm+': date.getMinutes(),
        's+': date.getSeconds(),
        'w+':getWeek(date)
    };
    for (let k in o) {
        if (new RegExp(`(${k})`).test(fmt)) {
            let str = o[k] + '';
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
        }
    }
    return fmt;
};

function padLeftZero(str) {
    return ('00' + str).substr(str.length);
}
function getDay(time){
    return formatDate(time,"dd");
}

function getWeek(time){
    var weekName=['星期日','星期一','星期二','星期三','星期四','星期五','星期六']
    return weekName[time.getDay()];
}
function getTime(time){
    return formatDate("hh-mm-dd");
}