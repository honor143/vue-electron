<template>
    <div class="refresh" @click="refresh">
        <!--<Icon size="20" color="yellow" type="ios-refresh-circle-outline" />-->
        <i class="iconfont icon-shuaxin"/>
    </div>
</template>

<script>
    export default {
        data(){
            return{

            }
        },
        methods:{
            refresh(){
                this.$emit('refresh')
            }
        }
    }

</script>


<style>
    .refresh{
        position:fixed;
        top:5px;
        right: 50px;
        cursor: pointer;
    }

</style>
