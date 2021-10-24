<template>
    <div class="role-tab-wrapper">
        <Tabs type="card" v-model="tabValue">
            <TabPane label="用户-组合" name="UserRight">
                <!-- <UserRight v-if="tabValue === 'UserRight'" /> -->
                <UserRight/>
            </TabPane>
            <TabPane label="岗位-组合" name="InvesMgeRight">
                <!-- <InvesMgeRight v-if="tabValue === 'InvesMgeRight'" /> -->
                <InvesMgeRight/>
            </TabPane>
            <TabPane label="部门-组合" name="BranchRight">
                <!-- <BranchRight v-if="tabValue === 'BranchRight'" /> -->
                <BranchRight/>
            </TabPane>
            <TabPane label="用户-恒生O3用户" name="UserToO3user">
                <!-- <UserToO3user v-if="tabValue === 'UserToO3user'"/> -->
                <UserToO3user/>
            </TabPane>
            <TabPane label="系统组合-GP3组合" name="SysCombiToGP3Combi">
                <!-- <SysCombiToGP3Combi v-if="tabValue === 'SysCombiToGP3Combi'"/> -->
                <SysCombiToGP3Combi/>
            </TabPane>
            <!--<TabPane label="测试tree" name="treeTest">
                <treeTest v-if="tabValue === 'treeTest'"/>
            </TabPane>-->
        </Tabs>
    </div>
</template>
<script>
import UserRight from './BusiRightsec/UserRight.vue'
import InvesMgeRight from './BusiRightsec/InvesMgeRight.vue'
import BranchRight from './BusiRightsec/BranchRight.vue'
import UserToO3user from './BusiRightsec/UserToO3user.vue'
import SysCombiToGP3Combi from './BusiRightsec/SysCombiToGP3Combi.vue'
// import treeTest from './BusiRightsec/treeTest.vue'

export default {
    name:'page_15',
    data () {
        return {
            userInfos:[],
            tabValue:"UserRight"
        }
    },
    methods: {
    },
    components:{
        UserRight,
        InvesMgeRight,
        BranchRight,
        UserToO3user,
        SysCombiToGP3Combi
    }
}
</script>
<style scoped>

</style>


