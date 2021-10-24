<template>
    <div class="role-tab-wrapper">
        <Tabs type="card" v-model="tabValue">
            <TabPane label="账户信息" name="AccountInfo">
                <!-- <AccountInfo v-if="tabValue === 'AccountInfo'" /> -->
                <AccountInfo/>
            </TabPane>
            <TabPane label="资产单元信息" name="AssetUnitInfo">
                <!-- <AssetUnitInfo v-if="tabValue === 'AssetUnitInfo'"/> -->
                <AssetUnitInfo/>
            </TabPane>
            <TabPane label="组合信息" name="CombiInfo">
                <!-- <CombiInfo v-if="tabValue === 'CombiInfo'"/> -->
                <CombiInfo/>
            </TabPane>
            <TabPane label="自定义分组" name="UserDefineGroup">
                <!-- <UserDefineGroup v-if="tabValue === 'UserDefineGroup'"/> -->
                <UserDefineGroup/>
            </TabPane>
             <!--<TabPane label="自定义分组组合">
                <UserDefineGroupCombi/>
            </TabPane> -->
        </Tabs>
    </div>
</template>
<script>
import AccountInfo from './CombiRightsec/AccountInfo.vue'
import AssetUnitInfo from './CombiRightsec/AssetUnitInfo.vue'
import CombiInfo from './CombiRightsec/CombiInfo.vue'
import UserDefineGroup from './CombiRightsec/UserDefineGroup.vue'
// import UserDefineGroupCombi from './CombiRightsec/UserDefineGroupCombi.vue'
export default {
    name:'page_16',
    data () {
        return {
            tabValue:"AccountInfo"
        }
    },
    methods: {
        // handleTabsAdd () {
        //     this.tabs ++;
        // },
        // handleSelectAll (status) {
        //     this.$refs.selection.selectAll(status);
        // }
    },
    components:{
        AccountInfo,
        AssetUnitInfo,
        CombiInfo,
        UserDefineGroup,
        // UserDefineGroupCombi
    }
}
</script>
<style scoped>

</style>


