<template>
    <div class="role-tab-wrapper">
        <Tabs type="card" value="userInfo" @on-click="tabClick">
            <TabPane label="用户信息" name="userInfo">
                <!-- <UserInfo v-if="tabValue === 'userInfo'"/> -->
                <UserInfo/>
            </TabPane>
            <TabPane label="角色信息" name="RoleInfo">
                <!-- <RoleInfo v-if="tabValue === 'RoleInfo'"/> -->
                <RoleInfo/>
            </TabPane>
            <TabPane label="页面功能信息" name="PageFun">
                <!-- <PageFun v-if="tabValue === 'PageFun'"/> -->
                <PageFun/>
            </TabPane>
            <TabPane label="部门信息" name="BranchInfo">
                <!-- <BranchInfo v-if="tabValue === 'BranchInfo'"/> -->
                <BranchInfo/>
            </TabPane>
            <TabPane label="用户-角色" name="UserRole">
                <!-- <UserRole v-if="(tabValue === 'UserRole')"/> -->
                <UserRole/>
            </TabPane>
            <TabPane label="角色-页面-功能" name="RolePageFunc">
                <!-- <RolePageFunc v-if="(tabValue === 'RolePageFunc')"/> -->
                <RolePageFunc/>
            </TabPane>
            <TabPane label="用户-部门" name="UserBranch">
                <!-- <UserBranch v-if="(tabValue === 'UserBranch')"/> -->
                <UserBranch/>
            </TabPane>
        </Tabs>
    </div>
</template>
<script>
import UserInfo from './MenuRightsec/UserInfo.vue'
import RoleInfo from './MenuRightsec/RoleInfo.vue'
import PageFun from './MenuRightsec/PageFun.vue'
import BranchInfo from './MenuRightsec/BranchInfo.vue'
import UserRole from './MenuRightsec/UserRole.vue'
import RolePageFunc from './MenuRightsec/RolePageFunc.vue'
import UserBranch from './MenuRightsec/UserBranch.vue'
export default {
    name:'page_14',
    data () {
        return {
            tabValue:"userInfo"
        }
    },
    methods: {
        // 点击tab时修改tabValue的值，从而控制tab内容的显示隐藏并每次切换冲新加载
        tabClick(name){
            console.log(name)
            this.tabValue = name;
        }
      
    },
    
    components:{
        UserInfo,
        RoleInfo,
        PageFun,
        BranchInfo,
        UserRole,
        RolePageFunc,
        UserBranch
    }
}
</script>
<style scoped>

</style>


