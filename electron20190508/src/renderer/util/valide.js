export function validateNum(rule, value, callback) {
    console.log(rule)
    console.log(value)
    var reg = /^[+]{0,1}(\d+)$|^[+]{0,1}(\d+\.\d+)$/;
    if (value === '' || value == null) {
        return callback(new Error('输入内容不能为空！'));
    }else{
            if(!reg.test(Number(value))){
            callback(new Error('请输入数字类型！'));
        }else{
            callback();
        }
    }
};
// 验证百分比标位
export function validatePercent(rule, value, callback){
    var re = /^[0-9]+.?[0-9]*$/;
    if (value === '') {
        callback(new Error('标位不能为空！'));
    } else if(value <=0 ) {
        callback(new Error('标位必须大于0'));
    }else if(!re.test(value)){
        callback('请输入数字类型');
    }else{
        callback()
    }
};
// 验证价格标位
export function validateYuan(rule, value, callback){
    var re = /^[0-9]+.?[0-9]*$/;
    if (value === '') {
        callback(new Error('标位不能为空！'));
    } else if(value <=0 || value > 100) {
        callback(new Error('标位必须大于0小于100'));
    }else if(!re.test(value)){
        callback('请输入数字类型');
    }else{
        callback();
    }
};    

/* export default {
    validateNum:validateNum,
    validatePercent:validatePercent,
    validateYuan:validateYuan
}; */