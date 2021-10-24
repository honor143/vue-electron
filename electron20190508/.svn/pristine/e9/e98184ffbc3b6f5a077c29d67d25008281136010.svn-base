import tkajax from './../ajax/tkajax.js';
// 日期，在原有日期基础上，增加days天数，默认增加1天
export function addDate(date, days) {
    if (days == undefined || days == '') {
        days = 1;
    }
    var date = new Date(date);
    date.setDate(date.getDate() + days);
    var month = date.getMonth() + 1;
    if (month.length < 2) {
        month = '0' + month;
    }
    var day = date.getDate();
    if (day.length < 2) {
        day = '0' + day;
    }
    return date.getFullYear() + '-' +month + '-' + day;
}
// iview中专用
//转化成千分位
export function toThounands(value){
    if(value!==null){
        return (value.toFixed(2)).replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g, '$&,');
    }
}
//还原千分位后的值
export function toNormal(value){
    return `${value}`.replace(/$s?|(,*)/g, '');
}


//查询公共函数
// export function getSectionInfo(url,obj){
//     tkajax.tkajaxGet(url)
//         .then((res) => {            
//             if(res.status===200 && res.data){
//                 obj=res.data;
//             }                
//         })
// }