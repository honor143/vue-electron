<template>
  <div id="instruc-info">
    <div class="bondOrders" style="margin-top:5px">
      <div style="position:absolute;z-index:22;top:0px;right:15px;min-width:844px;">
        <label for="">账户类型</label>
        <Select clearable size="small" v-model="dicFund" style="width:80px;" @on-change="selectFund">
          <Option v-for="item in dicFundList" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
        <label for="">投资经理</label>
        <Select clearable size="small" v-model="dicManager" style="width:80px;" @on-change="selectManager">
          <Option v-for="item in dicManagerList" :value="item.vcName" :key="item.vcName">{{ item.vcName }}</Option>
        </Select>
        <label for="">证券名称</label>
        <Select clearable size="small" v-model="dicName" style="width:80px;" @on-change="selectName">
          <Option v-for="item in dicNameList" :value="item.vcName" :key="item.vcName">{{ item.vcName }}</Option>
        </Select>
        <label for="">流程状态</label>
        <Select clearable size="small" v-model="dicState" style="width:80px;" @on-change="selectState">
          <Option v-for="item in dicStateList" :value="item.vcName" :key="item.vcName">{{ item.vcName }}</Option>
        </Select>
        <label for="">创建日期</label>
        <DatePicker clearable :editable="false" type="date" @on-change="selectEstablishDate" :value="establishDate" placeholder="选择日期" format="yyyy-MM-dd" style="width: 110px" size="small"></DatePicker>
        <Button size="small" type="primary" @click="queryData">查询</Button>
        <Button size="small" type="primary" v-if="userButtonRoles.saveLinkOrder_7_23" @click="filedSettingModel = true">定制列</Button>
        <Button size="small" type="primary" @click="exportData(listType)">导出</Button>
      </div>
      <Tabs :animated="true" class="rule-tab" type="card" @on-click="switchTabs">
        <TabPane label="债券投标">
          <div class="table-wrapper" ref="tableWrap">
            <Table stripe highlight-row :loading="tenderLoading" :height="returnTableHeight" :columns="tenderColumns" :data="tenderData" @on-row-click="clickRowRule($event,$event,0)" @on-current-change='insRowChange($event,$event,0)'></Table>
            <Page size="small" :total="totalSizeTender" :current="pageNumTender" @on-page-size-change="pageSizeChange($event,0)" @on-change="pageNumChange($event,0)" :page-size="pageSizeTender" :page-size-opts="pageOpts" transfer show-total show-elevator show-sizer>
            </Page>
          </div>
        </TabPane>
        <TabPane label="债券分销">
          <div class="table-wrapper">
            <Table stripe highlight-row :loading="distributionLoading" :height="returnTableHeight" :columns="distributionColumns" :data="distributionData" @on-row-click="clickRowRule($event,$event,1)" @on-current-change='insRowChange($event,$event,1)'></Table>
            <Page size="small" :total="totalSizeDisb" :current="pageNumDisb" @on-page-size-change="pageSizeChange($event,1)" @on-change="pageNumChange($event,1)" :page-size="pageSizeDisb" :page-size-opts="pageOpts" transfer show-total show-elevator show-sizer>
            </Page>
          </div>
        </TabPane>
        <TabPane label="债券买卖">
          <div class="table-wrapper">
            <Table stripe highlight-row :loading="businessLoading" :height="returnTableHeight" :columns="businessColumns" :data="businessData" @on-row-click="clickRowRule($event,$event,2)" @on-current-change='insRowChange($event,$event,2)'></Table>
            <Page size="small" :total="totalSizeBusiness" :current="pageNumBusiness" @on-page-size-change="pageSizeChange($event,2)" @on-change="pageNumChange($event,2)" :page-size="pageSizeBusiness" :page-size-opts="pageOpts" transfer show-total show-elevator show-sizer>
            </Page>
          </div>
        </TabPane>
      </Tabs>
      <Modal v-model="filedSettingModel" width="333" footer-hide scrollable title="字段设置">
        <FieldSetting ref="setField" @fieldsetsuc="filedModelRes" @setcancel="setCancel" v-if="filedSettingModel" :vcBidTarget="vcBidTarget" :pageId="pageId" :lTableId="lTableId">
        </FieldSetting>
      </Modal>
    </div>
    <div class="ordersInfo">
      <div class="content-mid" style="margin-top:5px;">
        <Row :gutter="5" type="flex" class="middle-wrapper" ref="middleWrapper">
          <Col span="9">
          <div class="sec-header">
            <h3>修改记录</h3>
          </div>
          <div>
            <Table height="263" class="table-height" stripe highlight-row :loading="recordLoading" :columns="recordColumns" :data="recordData">
            </Table>
          </div>
          <Modal width="700" title="查看明细" v-model="detailModel" :mask-closable="true" footer-hide>
            <Table :highlight-row="true" size="small" class="warn-table" height="400" stripe :columns="editDetailColumns" :data="editDetailData"></Table>
          </Modal>
          </Col>
          <Col span="7">
          <div class="sec-header">
            <h3>流程状态</h3>
          </div>
          <div class="marbot5">
            <Table height="263" class="table-height" stripe highlight-row :loading="processTableLoading" :columns="processColumns" :data="processData">
            </Table>
          </div>
          </Col>
          <Col span="5">
          <div class="sec-header">
            <h3>指令明细</h3>
          </div>
          <div class="marbot5">
            <Row class="bond-detail card-bg" style="height:263px;padding:10px;">
              <Col class="marBottom" span="12"><span>指令序号</span><label class="elipse wid80" :title="bondDetail.id">{{bondDetail.id}}</label></Col>
              <Col class="marBottom" span="12"><span>证券代码</span><label class="elipse wid80" :title="bondDetail.vcCode">{{bondDetail.vcCode}}</label></Col>
              <Col class="marBottom" span="12"><span>中标价格</span><label class="elipse wid80" :title="bondDetail.enLotPrice">{{bondDetail.enLotPrice}}</label></Col>
              <Col class="marBottom" span="12"><span>债券类型</span><label class="elipse wid80" :title="bondDetail.vcBondTypeName">{{bondDetail.vcBondTypeName}}</label></Col>
              <Col class="marBottom" span="12"><span>首轮中标量</span><label class="elipse wid80" :title="bondDetail.enLotAmountModify">{{bondDetail.enLotAmountModify}}</label></Col>
              <Col class="marBottom" span="12"><span>外部评级</span><label class="elipse wid80" :title="bondDetail.vcCreditRating">{{bondDetail.vcCreditRating}}</label></Col>
              <Col class="marBottom" span="12"><span>追加中标量</span><label class="elipse wid80" :title="bondDetail.lAddLotAllot">{{bondDetail.lAddLotAllot}}</label></Col>
              <Col class="marBottom" span="12"><span>内部评级</span><label class="elipse wid80" :title="bondDetail.vcCreditRatingTk">{{bondDetail.vcCreditRatingTk}}</label></Col>
              <Col class="marBottom" span="12"><span>中标金额</span><label class="elipse wid80" :title="bondDetail.lotAmount">{{bondDetail.lotAmount}}</label></Col>
              <Col class="marBottom" span="12"><span>投标截止日</span><label class="elipse wid80" :title="bondDetail.bidDeadline">{{bondDetail.bidDeadline}}</label></Col>
              <Col class="marBottom" span="12"><span>交易员反馈</span><label class="elipse wid80" :title="bondDetail.vcRemarks">{{bondDetail.vcRemarks}}</label></Col>
              <Col class="marBottom" span="12"><span>实际发行规模</span><label class="elipse wid80" :title="bondDetail.enIssueAmountAct">{{bondDetail.enIssueAmountAct}}</label></Col>
            </Row>
          </div>
          </Col>
          <Col span="3">
          <div class="sec-header">
            <h3>标位明细</h3>
          </div>
          <div class="marbot5">
            <Table height="263" class="table-height" stripe highlight-row :loading="detailLoading" :columns="detailedColumns" :data="detailedData">
            </Table>
          </div>
          </Col>

        </Row>
      </div>
    </div>

    <!--刷新页面数据的组件-->
    <Refresh @refresh="refresh"></Refresh>
  </div>
</template>
<script>
import moment from 'moment'
import FieldSetting from './BondTendInstruc/FieldSetting'
import Refresh from '../Refresh.vue'
import { selectUserAuth } from '../../Api/common.js'
import { baseURL } from '../../ajax/config'
const { ipcRenderer } = require('electron')

const RenderIsLock = (h, params) => {
  const row = params.row;
  return h('i', {
    'class': {
      iconfont: true,
      'icon-suo': row.cIsLocked == 3,
      'icon-suo1': row.cIsLocked != 3
    },
    style: {
      color: row.cIsLocked == 3 ? '#EE8400' : 'green',
      fontSize: '16px'
    }

  });
}
const RenderWarnLevel = (h, params) => {
  const row = params.row;
  const color = row.cWarnLevel == 1 ? '#19be6b' : '#ed4014';
  const type = row.cWarnLevel == 1 ? 'ios-checkmark-circle' : 'ios-warning'
  if (!row.cWarnLevel) {
    return h('span', {}, "未合规");
  } else {
    return h('Icon', {

      props: {
        type: type,
        color: color,
        size: 18
      }
    });
  }

}
export default {
  name: 'page_1421',
  components: {
    FieldSetting,
    Refresh
  },
  data () {
    return {
      baseURL: baseURL,
      listType: 0,//当前列表type
      //账户类型
      dicFund: '',
      dicFundList: [],
      // 投资经理
      dicManager: '',
      dicManagerList: [],
      // 流程状态
      dicState: '',
      dicStateList: [],
      // 证券名称
      dicName: '',
      dicNameList: [],
      establishDate: '',  //创建日期
      userButtonRoles: {
        saveLinkOrder_7_23: true//布局设置按钮
      },
      filedSettingModel: false, // 定制列弹出框
      lIssueCnt: '3',
      selectTag: '190403',// 选中的债券
      pageId: null,// 页面Id
      vcBidTarget: '1', //标位类型
      marketList: [],// 市场list
      lAddCount: 0,//选中债券的轮数
      tenderLoading: false, //指令表-投标loading
      distributionLoading: false, //指令表-分销loading
      businessLoading: false, //指令表-买卖loading
      highlightList: [],  //
      currentRow: null,  //高亮行
      editAddForm: {
        lMarket: '',
        lAmountLimit: '',
        enPriceFloor: '',
        enAddAmount: ''
      },
      selectInstruc: [], //指令表表格多选选中的状态
      bitData: [],
      lTableId: 3,
      autoAssignLoading: true,
      instrucId: null,
      tenderData: [], //列表data-投标
      distributionData: [], //列表data-分销
      businessData: [], //列表data-买卖
      bondDetail: {},  //指令明细
      //分页数据
      pageSizeTender: 30,
      totalSizeTender: 0,
      pageNumTender: 1,
      pageSizeDisb: 30,
      totalSizeDisb: 0,
      pageNumDisb: 1,
      pageSizeBusiness: 30,
      totalSizeBusiness: 0,
      pageNumBusiness: 1,
      pageOpts: [30, 40, 50],
      processTableLoading: false,//流程loading
      recordLoading: false,//修改记录loading
      detailLoading: false,//指令明细loading
      tableHeight: 370,  //table默认高度
      detailModel: false, //是否显示查看明细弹窗
      editDetailData: [], //查看明细弹窗
      //指令列表列头--投标
      tenderColumns: [
        //   多选框
        // {
        //   type: 'selection',
        //   width: 40,
        //   align: 'left',
        //   fixed: 'left'
        // }
      ],
      //指令列表列头--分销
      distributionColumns: [],
      //指令列表列头--买卖
      businessColumns: [],
      //流程状态表头字段
      processColumns: [
        {
          title: '流程节点',
          key: 'actName',
          // width: 100,
          tooltip: true,
        },
        {
          title: '人员',
          key: 'vcDisplayname',
          // width: 75,
          tooltip: true
        },
        {
          title: '状态',
          key: 'lStart',
          tooltip: true,
          // width: 110,
          render: (h, params) => {
            // console.log(params)
            const row = params.row;
            // const color = '#ed4014';
            // const type= 'md-close-circle'
            if (row.lStart == 2) {
              return h('span', row.vcStartName, {
                style: {
                  color: '#ed4014'
                }
              });
            } else {
              return h('span', row.vcStartName,
                {
                  style: {
                    color: 'green'
                  }
                });
            }
          }
        },
        {
          title: '时间',
          key: 'startTime',
          // width: 110,
          tooltip: true,
        },
      ],
      editDetailColumns: [
        {
          title: '主键Id',
          key: 'id',
          width: 70
        },
        {
          title: '改后字段名',
          key: 'postValue',
          tooltip: true,
          width: 100
        },
        {
          title: '改前字段名',
          key: 'preValue',
          tooltip: true,
          width: 100
        },
        {
          title: '修改时间',
          key: 'tsCreateTime',
          tooltip: true,
          width: 120
        },
        {
          title: '数据库账户',
          key: 'vcDbAccount',
          tooltip: true,
          width: 100
        },
        {
          title: '字段名',
          key: 'vcField',
          tooltip: true,
          width: 90
        },
        {
          title: '序列号',
          key: 'vcSeriaId',
          tooltip: true,
          width: 70
        },
        {
          title: '表名',
          key: 'vcTable',
          tooltip: true,
          width: 90
        },
        {
          title: '指令Id',
          key: 'vcTargetId',
          tooltip: true,
          width: 70
        },
      ], //查看明细弹窗列表
      // 修改记录表头
      recordColumns: [
        // {
        //   title: '序号',
        //   key: 'Index',
        //   width: 45
        // },
        {
          title: '修改人',
          key: 'vcUserName',
          tooltip: true,
          // width: 70
        },
        {
          title: '修改属性',
          key: 'vcFieldChinese',
          tooltip: true,
          // width: 100
        },
        {
          title: '改前',
          key: 'preValue',
          tooltip: true,
          // width: 120
        },
        {
          title: '改后',
          key: 'postValue',
          tooltip: true,
          // width: 120
        },
        {
          title: '修改时间',
          key: 'tsCreateTime',
          tooltip: true,
          // width: 104
        },
        // {
        //   title: '查看明细',
        //   key: 'detail',
        //   width: 100,
        //   render: (h, params) => {
        //     return h('div', [
        //       h('Button', {
        //         props: {
        //           type: 'primary',
        //           size: 'small'
        //         },
        //         style: {
        //           marginRight: '5px',
        //         },
        //         on: {
        //           click: () => {
        //             this.showModal(params.row.vcSeriaId)
        //           }
        //         }
        //       }, '查看')
        //     ]);
        //   }
        // }
      ],
      //指令明细列表表头
      detailedColumns: [
        {
          title: '标位',
          key: 'enBidPrice',
          // width: 82
        },
        {
          title: '标位数量',
          key: 'enBidAmountModify',
          // width: 82
        }
      ],
      processData: [], // 流程状态数据
      recordData: [], // 修改记录数据
      detailedData: [], // 指令明细列表数据
      flowFilterData: [
        {
          label: '未开始',
          value: '未开始'
        },
        {
          label: '投资决议编辑',
          value: '投资决议编辑'
        }
      ],//流程状态筛选数组
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      // 在路由跳转之前获取pageId
      // vm.pageId = to.query.pageId;
      var SelectUserAuth = selectUserAuth.bind(vm);
      SelectUserAuth();

    })
  },
  created () {
    this.pageId = this.$route.meta.id;
    // this.selectdicFundList();
    // if (this.$route.query.vcCode) {
    //   this.selectTagVccode = this.$route.query.vcCode;
    //   this.selectLIssueCnt = this.$route.query.lIssueCnt;
    // } else {
    //   this.selectTagVccode = '';
    // }
    // this.selectIssueInfo();

    this.refresh();
  },
  computed: {
    //返回table的动态高度
    returnTableHeight () {
      return this.tableHeight;
    },
    //计算tableId
    // returnTableId () {
    //   this.lTableId = this.lAddCount <= 0 ? 1 : 2;
    //   return this.lAddCount <= 0 ? 1 : 2
    // },
  },
  methods: {
    rowClassName (row, index) {
      // console.log("my-highlight-row")
      console.log(row)
      if (row._highlight) {
        return 'my-highlight-row';
      } else {
        return '';
      }
      // console.log(row)
    },
    clickRow (row, index) {
      // console.log(event)
      if (window.event.ctrlKey) {
        row._highlight = true;
        console.log(this.tenderData)
        this.tenderData.forEach((item) => {
          if (item.lCombiId == row.lCombiId) {
            console.log(item)
            item._highlight = true;
            // console.log(item._highlight)
            // console.log(item._highlight ? false : true)
          }
        })
        this.highlightList = new Set(this.highlightList);
        console.log(index);
      } else if (window.event.shiftKey) {
        // event.preventDefault();
        // console.log(index + "shift")
      }
    },
    autiAssignErr () {
      this.autoAssignLoading = false;
      this.$nextTick(() => {
        this.autoAssignLoading = true;
      })
    },









    // ------------------------------------------------
    // 刷新
    refresh () {
      this.initTable();
      this.clearSelect(); //清空查询条件clearSelect
      this.selectdicFundList(); //账户类型
      this.selectdicManagerList(); //投资经理
      this.selectdicNameList();//证券名称
      this.selectdicStateList();//流程状态
      selectUserAuth.bind(this)();
    },
    //查询账户类型
    selectdicFundList () {
      this.$httpGet(`/bondBid/selecDicFundType`)
        .then((res) => {
          if (res.status === 200 && res.data) {
            this.dicFundList = [];
            for (let i = 0; i < res.data.length; i++) {
              let obj = {};
              obj.label = res.data[i];
              obj.value = res.data[i];
              this.dicFundList.push(obj);
            }
          }
        })
    },
    //查询投资经理
    selectdicManagerList () {
      this.$httpGet(`/bondInstruction/selectManager`)
        .then((res) => {
          if (res.status === 200 && res.data) {
            this.dicManagerList = res.data;
          }
        })
    },
    //查询证券名称
    selectdicNameList () {
      this.$httpGet(`/bondInstruction/selectBondSname`)
        .then((res) => {
          if (res.status === 200 && res.data) {
            this.dicNameList = res.data;
          }
        }).catch((err) => {
          console.log(err)
        })
    },
    //查询流程状态
    selectdicStateList () {
      this.$httpGet(`/bondInstruction/selectInstructionStatus`)
        .then((res) => {
          if (res.status === 200 && res.data) {
            this.dicStateList = res.data;
          }
        })
    },
    // 切换账户类型
    selectFund (val) {
      this.dicFund = val;
      console.log(val);
    },
    // 切换投资经理
    selectManager (val) {
      this.dicManager = val;
    },
    // 切换证券名称
    selectName (val) {
      this.dicName = val;
    },
    // 切换流程状态
    selectState (val) {
      this.dicState = val;
    },
    //选择创建日期
    selectEstablishDate (val, date) {
      this.establishDate = val;
    },
    // 点击查询
    queryData () {
      for (let i = 0; i < 3; i++) {
        this.selectInstructionList(i); // 查询指令信息列表
      }
    },
    //清空查询条件
    clearSelect () {
      this.dicFund = '';
      this.dicManager = '';
      this.dicName = '';
      this.dicState = '';
      this.establishDate = '';
    },
    //清空列表相关
    clearListRelevant (type) {
      switch (type) {
        case 0:
          this.tenderLoading = false;
          this.tenderData = [];
          this.totalSizeTender = 0;
          break;
        case 1:
          this.distributionLoading = false;
          this.distributionData = [];
          this.totalSizeDisb = 0;
          break;
        case 2:
          this.businessLoading = false;
          this.businessData = [];
          this.totalSizeBusiness = 0;
          break;
      }
    },
    //清空底部三块数据
    clearFooterData () {
      this.processData = []; // 流程状态数据
      this.recordData = []; // 修改记录数据
      this.detailedData = []; // 指令明细列表数据
      this.bondDetail = {};  //指令明细字段
      this.currentRow = null;
      this.instrucId = '';
    },
    // 点击字段修改弹框确定
    fieldsSave () {
      this.$refs.setField.saveLinkOrder();
    },
    // 定制列 字段设置成功后执行
    filedModelRes () {
      this.filedSettingModel = false;
      this.initTable();
      for (let i = 0; i < 3; i++) {
        this.selectInstructionList(i); // 查询指令信息列表
      }
    },
    // 定制列弹窗关闭
    setCancel () {
      this.filedSettingModel = false;
    },
    // 查询市场List
    selectStoketMaket () {
      this.$httpGet(`/inst/selectStoketMaket?vcCode='${this.selectTag}'`).then((res) => {
        this.marketList = res.data;
      })
    },
    // 请求动态表头
    initTable () {
      var postData = {
        lPageId: this.pageId,
        lTableId: this.lTableId,
        vcBidTarget: 1,
        // vcCode: this.selectTag
      }
      this.$httpPost('/link/selectInstructionLinkInfo', postData).then((res) => {
        res.data.forEach((tableHeader) => {
          if (tableHeader.key == "cIsLocked") {
            tableHeader.render = RenderIsLock;
          } else if (tableHeader.key == "cWarnLevel") {
            tableHeader.render = RenderWarnLevel;
          } else if (tableHeader.key == 'lAmountLimit' || tableHeader.key == 'enPriceFloor' || tableHeader.key == 'enBidAmountModify') {
            //   对投标量上限，价格下限，投标总量排序
            tableHeader.sortable = true
          }
          // else if (tableHeader.key == 'vcTaskName') {
          //   // 对流程状态筛选
          //   tableHeader.filters = this.flowFilterData;
          //   tableHeader.filterMethod = this.filterMethod
          // }
        })
        this.tenderColumns.length = 0;
        this.tenderColumns = res.data;
        // this.tenderColumns = this.tenderColumns.concat(res.data); //拼接数组表头-投标
        this.businessColumns = Array.from(this.tenderColumns);//复制表头-买卖
        this.distributionColumns = [...this.tenderColumns]//复制表头-分销
        for (let i = 0; i < 3; i++) {
          this.selectInstructionList(i); // 查询指令信息列表
        }
      }).catch(() => {
        this.$Message.error('请求表头失败！');
        this.tenderColumns = [];
      })
    },
    // 查询指令信息列表
    selectInstructionList (type) {
      this.clearFooterData();
      let [pageNum, pageSize] = [1, 30];
      //根据类型判断 loading 显示状态及页码
      switch (type) {
        case 0:
          this.tenderLoading = true;
          pageNum = this.pageNumTender;
          pageSize = this.pageSizeTender;
          break;
        case 1:
          this.distributionLoading = true;
          pageNum = this.pageNumDisb;
          pageSize = this.pageSizeDisb;
          break;
        case 2:
          this.businessLoading = true;
          pageNum = this.pageNumBusiness;
          pageSize = this.pageSizeBusiness;
          break;
      }
      // 判断查询条件是否为undefined,是置为空
      if (typeof (this.dicFund) == "undefined") {
        this.dicFund = '';
      } else if (typeof (this.dicManager) == "undefined") {
        this.dicManager = '';
      } else if (typeof (this.dicState) == "undefined") {
        this.dicState = '';
      } else if (typeof (this.dicName) == "undefined") {
        this.dicName = '';
      } else if (typeof (this.establishDate) == "undefined") {
        this.establishDate = '';
      }
      this.$httpGet(`/bondInstruction/selectInstructionInfo?pageNum=${pageNum}&pageSize=${pageSize}&vcFundType=${this.dicFund}&vcManager=${this.dicManager}&vcSname=${this.dicName}&vcTaskName=${this.dicState}&lCreateTime=${this.establishDate}&flag=${type}`).then((res) => {
        if (res.status === 200 && res.data.list) {
          //根据类型判断 loading 显示状态
          switch (type) {
            case 0:
              this.tenderLoading = false;
              this.tenderData = res.data.list;
              this.totalSizeTender = res.data.total;
              break;
            case 1:
              this.distributionLoading = false;
              this.distributionData = res.data.list;
              this.totalSizeDisb = res.data.total;
              break;
            case 2:
              this.businessLoading = false;
              this.businessData = res.data.list;
              this.totalSizeBusiness = res.data.total;
              break;
          }
          this.currentRow = null;
          this.selectInstruc.length = 0;
          if (res.data.list.length > 0) {
            // 高亮第一行
            // this.tenderData[0]._highlight = true
            // this.currentRow = this.tenderData[0];
            // this.instrucId = this.tenderData[0].id;
            if (this.instrucId) {
              this.selectProcessHisList();
              this.selectRecordList();
              this.selectDetailList();
            }
          }
        }
      }).catch(() => {
        this.$Message.error('请求指令列表失败！');
        this.clearListRelevant(type);
      })
    },
    //单击指令行
    clickRowRule (currentRow, index, type) {
      if (this.currentRow == null && this.instrucId == '') {
        this.insRowChange(currentRow, null, type)
      }
    },
    // 列表的高亮行改变时触发
    insRowChange (currentRow, oldCurrentRow, type) {
      // 这里手动控制高亮行，在iview中修改表格数据会使得高亮行消失
      var arr = []
      switch (type) {
        case 0:
          arr = this.tenderData;
          break;
        case 1:
          arr = this.distributionData;
          break;
        case 2:
          arr = this.businessData;
          break;
      }
      arr.forEach((item) => {
        if (item.lCombiId == currentRow.lCombiId) {
          item._highlight = true;
        }
        if (oldCurrentRow && item.lCombiId == oldCurrentRow.lCombiId) {
          item._highlight = false;
        }
      })
      this.currentRow = currentRow;
      this.instrucId = currentRow.id;
      console.log(this.instrucId)
      if (currentRow.id) {
        this.selectProcessHisList();
        this.selectRecordList();
        this.selectDetailList();
      } else {
        // 选中行没有id时将标位表格清空
        this.bitData = [];
        this.clearFooterData(); //清空底部数据
      }
    },
    //过滤流程状态
    filterMethod (value, row) {
      return row.vcTaskName.indexOf(value) > -1;
    },
    //切换tabs
    switchTabs (name) {
      //name 当前切换到的tabs
      this.listType = name;
      this.clearFooterData(); //清空底部数据
    },
    //导出
    exportData (type) {
      let [pageNum, pageSize] = [1, 30];
      switch (type) {
        case 0:
          pageNum = this.pageNumTender;
          pageSize = this.pageSizeTender;
          break;
        case 1:
          pageNum = this.pageNumDisb;
          pageSize = this.pageSizeDisb;
          break;
        case 2:
          pageNum = this.pageNumBusiness;
          pageSize = this.pageSizeBusiness;
          break;
      }
      let data = {
        pageNum,
        pageSize,
        vcFundType: this.dicFund,
        vcManager: this.dicManager,
        vcSname: this.dicName,
        vcTaskName: this.dicState,
        lCreateTime: this.establishDate,
        flag: type
      }
      this.$httpGet(`/bondInstruction/exportInstruction`, data, null, {
        responseType: 'blob'
      }).then((res) => {
        if (res.status === 200) {
          this.$Message.success('导出成功！');
          let url = window.URL.createObjectURL(new Blob([res.data]));  // new Blob([data])用来创建URL的file对象或者blob对象
          let link = document.createElement('a');
          let nowTime = moment().format('YYYYMMDDHHmmss');//当前时间
          link.style.display = 'none';
          link.href = url;
          link.download = `指令信息导出${nowTime}.xlsx`;
          document.body.appendChild(link);
          link.click();
        }
      }).catch(() => {
        this.$Message.error('导出失败！');
      })
    },
    //页码改变时的回调
    pageNumChange (page, type) {
      switch (type) {
        case 0:
          this.pageNumTender = page;
          break;
        case 1:
          this.pageNumDisb = page;
          break;
        case 2:
          this.pageNumBusiness = page;
          break;
      }
      this.selectInstructionList(type);
    },
    //每页数据条数改变时的回调
    pageSizeChange (pageSize, type) {
      switch (type) {
        case 0:
          this.pageSizeTender = pageSize;
          break;
        case 1:
          this.pageSizeDisb = pageSize;
          break;
        case 2:
          this.pageSizeBusiness = pageSize;
          break;
      }
      this.selectInstructionList(type);
    },
    // // 指令表表格多选框改变
    // selectChange (selection) {
    //   this.selectInstruc = selection;
    // },
    // // 多选时,取消选中某一行
    // onSelectCancel (selection, row) {
    //   // row._checked = false;
    //   console.log(row)
    //   this.tenderData.forEach((item) => {
    //     if (item.lCombiId == row.lCombiId) {
    //       item._checked = false;
    //     }
    //   })
    //   // this.$set(row,'_checked',false)  

    // },
    // 请求流程状态
    selectProcessHisList () {
      this.processTableLoading = true;
      this.$httpGet(`/process/selectProcessHisList?id=${this.instrucId}&processDefinitionKey=Process_Decision_Bond_Bid`).then((res) => {
        this.processData = res.data
        this.processTableLoading = false
      }).catch(() => {
        this.$Message.error('请求流程列表失败！');
        this.processData = [];
        this.processTableLoading = false
      })
    },
    // 请求修改记录
    selectRecordList () {
      this.recordLoading = true;
      this.$httpGet(`/bondInstruction/selectInstructionUpdateRecord?stockId=${this.instrucId}&pageNum=1&pageSize=20`).then((res) => {
        this.recordData = res.data.list
        // this.recordData = [{ name: '1111' }]
        this.recordData.forEach((item, index) => {
          item.Index = index + 1
        })
        this.recordLoading = false
      }).catch(() => {
        this.$Message.error('请求修改记录失败！');
        this.recordData = [];
        this.recordLoading = false
      })
    },
    // 请求指令明细
    selectDetailList () {
      this.detailLoading = true;
      this.$httpGet(`/bondInstruction/selectInstructionDetail?stockId=${this.instrucId}`).then((res) => {
        this.bondDetail = res.data;
        this.detailedData = res.data.bidPrice;
        this.detailLoading = false;
      }).catch(() => {
        this.$Message.error('请求指令明细失败！');
        this.detailedData = [];
        this.bondDetail = {};
        this.detailLoading = false
      })
    },
    //修改记录明细弹窗
    showModal (index) {
      // 用系列号调用修改明细接口
      this.$httpGet(`/bondInstruction/selectUpdateRecordById?seriaId=${index}`).then((res) => {
        if (res.status === 200 && res.data) {
          this.editDetailData = res.data
        }
      }).catch(() => {
        this.$Message.error('查看明细失败！');
        this.editDetailData = [];
      })
      this.detailModel = true;
    },
  },
  mounted () {
    this.$nextTick(() => {
      this.tableHeight = this.$refs.tableWrap != undefined ? this.$refs.tableWrap.getBoundingClientRect().height : this.tableHeight;
      this.tableHeight = document.body.clientHeight - 433;
    })
    window.addEventListener('resize', () => {//动态调整高度
      // this.tableHeight = this.$refs.tableWrap != undefined ? this.$refs.tableWrap.getBoundingClientRect().height : this.tableHeight;
      this.tableHeight = document.body.clientHeight - 433;
    })
    this.$route.meta.keepAlive = true;
  }
}
</script>

<style scoped>
#instruc-info {
  width: 100%;
  /* min-width: 1054px;
  overflow-y: hidden;
  overflow-x: auto; */
  /* height: 100%; */
}
#instruc-info .ivu-layout-sider-children {
  overflow-y: auto;
}
.ivu-table-wrapper {
  height: 100%;
}
.sider {
  overflow: auto;
}
.content {
  position: relative;
  padding-right: 8px;
}
/* 切换右侧栏的箭头 */
.show-hide-side-bt {
  cursor: pointer;
  display: inline-block;
  width: 8px;
  height: 80px;
  border-radius: 0 4px 4px 0;
  background: #666;
  position: absolute;
  right: 0;
  top: calc(50% - 50px);
  text-align: center;
  /*vertical-align: middle: ;*/
  line-height: 75px;
}
.my-highlight-row {
  background: #bfa !important;
}
.marginL {
  margin-left: 50px;
}
.table-height >>> .ivu-table-body {
  height: calc(100% - 40px) !important;
}
#instruc-info >>> .ivu-layout-sider {
  background-color: rgba(38, 39, 41, 0.4);
}
#instruc-info >>> .process-table-wrapper {
  height: calc(100% - 30px) !important;
}
#instruc-info >>> .show-content {
  height: 100%;
}
#instruc-info >>> .bond-layout {
  height: calc(100vh - 88px) !important;
}

/* ------------------ */
.content-mid {
  height: 295px;
}

.content-mid >>> .middle-wrapper {
  height: 100%;
}
#instruc-info >>> .show-content {
  height: calc(100% - 20px);
}
/*指令明细样式*/
.bond-detail {
  color: #ffec8b;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}
.bond-detail span {
  display: inline-block;
  line-height: 26px;
  text-align: right;
  padding-right: 3px;
  color: #fff;
}

.bond-detail >>> .align-center {
  width: 100px;
}
.bond-detail >>> .marBottom{
  margin-bottom: 6px
}
</style>
