<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>

  // document.onclick = function(e){
  //   if(event.shiftKey){
  //     console.log('5646464646464')
  //     e.preventDefault();
  //     return false;
  //   }
  // }
  export default {
    name: 'y'
  }
</script>

<style>
  /* CSS */
  #app{
    width: 100%;
    height: 100%;
    /*background:#bfa;*/
  }

/*定义滚动条高宽及背景 高宽分别对应横竖滚动条的尺寸*/ 
::-webkit-scrollbar 
{ 
    width: 12px; 
    height: 12px; 
    /* background-color: #000;  */
} 
   
/*定义滚动条轨道 内阴影+圆角*/ 
::-webkit-scrollbar-track 
{ 
    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3); 
    background-color: #292929; 
} 
   
/*定义滑块 内阴影+圆角*/ 
::-webkit-scrollbar-thumb 
{ 
    border-radius: 5px; 
    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3); 
    background-color: #454545; 

}
::-webkit-scrollbar-corner {
  background-color: #292929; 
}

</style>
