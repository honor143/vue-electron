import { authBaseURL } from "../ajax/config";

/* 调用请求页面中按钮权限的通用方法 */
const selectUserAuth = function(){
     //this.$httpGet(`/selectUserAuth?id=${this.pageId}`).then((res) => {
     this.$httpGet(`/selectUserAuth`,{id:this.pageId},authBaseURL).then((res) => {
        if(res.data.length > 0){
            res.data.forEach(item => {
                if(this.userButtonRoles.hasOwnProperty(item.vcElementkey)){
                    this.userButtonRoles[item.vcElementkey] = true;
                }
            });
        }
    })
}
export {selectUserAuth};