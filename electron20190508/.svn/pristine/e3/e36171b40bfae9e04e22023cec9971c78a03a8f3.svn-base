const setEndTime = (bidendtime, interval,returnType) => {
            if(bidendtime==null || bidendtime==undefined || bidendtime=='' || bidendtime=='00:00:00'){
                return '00:00:00'
            }else{
                var time = {
                    D:'',
                    h:'',
                    m:'',
                    s:''
                }
                
                var backtime = null;
                //interval = setInterval(function timestampToTime(){
                    var date = (new Date(bidendtime)) - (new Date()); //计算剩余的毫秒数
                    if(date <= 1000){
                        clearInterval(interval);
                        return "已过期";
                    }else{
                        time.D = parseInt(date / 1000 / 60 / 60 / 24 , 10);
                        time.h = parseInt(date / 1000 / 60 / 60 % 24 , 10);
                        if(time.h < 10){
                            time.h = "0" +　time.h
                        }
                        time.m = parseInt(date / 1000 / 60 % 60, 10);//计算剩余的分钟
                        if(time.m < 10){
                            time.m = "0" +　time.m
                        } 
                        time.s = parseInt(date / 1000 % 60, 10);//计算剩余的秒数 
                        if(time.s < 10){
                            time.s = "0" +　time.s
                        }
                        if(returnType == "hms"){
                            return (parseInt(date / 1000 / 60 / 60) + ':' + time.m + ":" + time.s);
                        }
                        backtime=time.D+"天"+time.h+"小时"+time.m+"分钟"+time.s+"秒";
                        return 	backtime;
                    }
                //},1000);
            }
        }
export {setEndTime};