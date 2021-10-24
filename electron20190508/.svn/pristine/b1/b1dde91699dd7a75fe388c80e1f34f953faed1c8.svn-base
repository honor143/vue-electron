<template>
    <Row :gutter="6">
        <Col span="18" class="table-wrapper-height">
            <div class="func-wrapper">
                <span class="section-title">角色信息</span>
                <label for="">&nbsp;筛选:&nbsp;</label><Input class="section-search" size="small" v-model="userName" :placeholder="placeholder" clearable/>
            </div>
            <div class="table-wrapper">
                <Table border ref="selection" :columns="tableColumns" :data="tableData"></Table>
            </div>
        </Col>
        <Col span="6" class="table-wrapper-height">
            <div class="func-wrapper">
                <span class="section-title">角色对应页面、功能关系表</span>
                <Button type="primary" size="small">保存</Button>
            </div>
            <div class="table-wrapper tree-wrapper">
                <Tree :data="treeData" show-checkbox multiple></Tree>
            </div>
        </Col>
    </Row>
</template>
<script>
export default {
    data () {
        return {
            userName:'',
            placeholder:'请输入角色名称',
            tableColumns: [
                {
                    type: 'selection',
                    width: 50,
                    align: 'left'
                },
                {
                    title: 'Name',
                    key: 'name'
                },
                {
                    title: 'Age',
                    key: 'age'
                },
                {
                    title: 'Address',
                    key: 'address'
                }
            ],
            tableData: [
                {
                    name: 'John Brown',
                    age: 18,
                    address: 'New York No. 1 Lake Park',
                    date: '2016-10-03'
                },
                {
                    name: 'Jim Green',
                    age: 24,
                    address: 'London No. 1 Lake Park',
                    date: '2016-10-01'
                },
                {
                    name: 'Joe Black',
                    age: 30,
                    address: 'Sydney No. 1 Lake Park',
                    date: '2016-10-02'
                },
                {
                    name: 'Jon Snow',
                    age: 26,
                    address: 'Ottawa No. 2 Lake Park',
                    date: '2016-10-04'
                }
            ],
            treeData: [
                {
                    title: 'parent 1',
                    expand: true,
                    selected: true,
                    children: [
                        {
                            title: 'parent 1-1',
                            expand: true,
                            children: [
                                {
                                    title: 'leaf 1-1-1',
                                    disabled: true
                                },
                                {
                                    title: 'leaf 1-1-2'
                                }
                            ]
                        },
                        {
                            title: 'parent 1-2',
                            expand: true,
                            children: [
                                {
                                    title: 'leaf 1-2-1',
                                    checked: true
                                },
                                {
                                    title: 'leaf 1-2-1'
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    },
    mounted(){
        //this.selectUserInfo();
    },
    methods: {
        // selectUserInfo(){
        //     this.$http.get(`${this.$store.state.HttpServer.HTTP_SERVER}user/selectUsers`).then((res) => {
        //         console.log("用户信息"+res.data);
                
        //         // if(res.data.actionResult != null && res.data.actionResult == 0){//登录失败提醒
        //         //     this.$Message.error(res.data.data);                                
        //         // }else{//登录成功存储用户信息并进行跳转
        //         //     this.$Message.success('登录成功!');
        //         //     this.$store.dispatch('Login', res.data);
        //         //     //console.log(this.$store.state.User.userInfo);
        //         //     this.$router.push({ path: '/layout/warn' })
        //         // }
                
        //     })
        // }
    }
}
</script>
<style scoped>


</style>


