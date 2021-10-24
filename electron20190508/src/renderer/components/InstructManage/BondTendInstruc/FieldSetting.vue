<template>
  <div class="form-wrapper">
    <Row class-name="row-style" type="flex" align="middle">
      <Col span="20">
      <Table stripe highlight-row :height="450" @on-selection-change="selectChange" @on-current-change="currentChange" :columns="setColumns" :data="columnsList"></Table>
      </Col>
      <Col span="4" class-name="button-col">
      <Button @click="fieldUp" type="primary" icon="md-arrow-round-up"></Button>
      <Button @click="fieldDown" type="primary" icon="md-arrow-round-down"></Button>
      </Col>
    </Row>
    <Row>
      <Col offset="16" span="8" class-name="button-col">
      <Button @click="cancle" size="small" class="cancel-button">取消</Button>
      <Button @click="saveLinkOrder" size="small" type="primary">确定</Button>
      </Col>
    </Row>

  </div>
</template>
<script>
export default {
  data () {
    return {
      selectFields: [],
      columnsList: [],
      // 表格高亮行
      currentRowL: null,
      PId: this.pageId,
      TId: this.lTableId,
      setColumns: [
        {
          type: 'selection',
          width: 50,
          align: 'left'
        },
        {
          title: '表头字段',
          key: 'title',
          width: 200
        }
      ]

    }
  },

  props: {
    // columns:Array,
    pageId: Number,
    lTableId: Number,
    lIssueCnt: Number,
    vcCode: String,
    vcBidTarget:String

  },
  created () {
    this.selectLinkOrder();
  },
  methods: {
    // 请求表头字段信息
    selectLinkOrder () {
      if (this.pageId == 1421) {
        this.$httpPost('/link/selectInstructionLinkOrder', { lPageId: this.PId, lTableId: this.TId, vcBidTarget: this.vcBidTarget }).then((res) => {
          this.columnsList = res.data;
          // console.log(this.columnsList)
        }).catch(() => {

        })
      } else {
        this.$httpPost('/link/selectLinkOrder', { lPageId: this.PId, lTableId: this.TId, lIssueCnt: this.lIssueCnt, vcCode: this.vcCode }).then((res) => {
          this.columnsList = res.data;
          // console.log(this.columnsList)
        }).catch(() => {

        })
      }
    },
    // saveLinkOrder  保存页面表头修改
    saveLinkOrder () {
      var formData = {
        lPageId: this.PId,
        lTableId: this.TId,
        userLinks: this.columnsList
      }
      // this.$emit('nihaonihao');

      this.$httpPost('/link/saveLinkOrder', formData).then((res) => {
        if (res.data.data == '修改成功') {
          this.$emit('fieldsetsuc');
          this.$Message.success("保存修改成功！");
        }
        this.$Modal.remove();
      }).catch(() => {
        this.$Message.error("保存修改失败！");
        // this.$Modal.remove();
      })

    },
    cancle () {
      this.$emit('setcancel');
      // this.$Modal.remove();
    },
    // 表格高亮行发生改变
    currentChange (currentRow, oldCurrentRow) {
      this.currentRow = currentRow;
    },
    // 指令表表格多选框改变
    selectChange (selection) {
      this.columnsList.forEach(item => {
        item._checked = false;
        selection.forEach((select) => {
          if (select.title == item.title) {
            item._checked = true;
          }
        })
      })
      this.selectFields = selection;
    },

    // 单行上移
    fieldUp () {
      if (this.currentRow) {
        this.columnsList.forEach((columns, index) => {
          if (this.currentRow.title == columns.title && index != 0) {
            this.columnsList.splice(index, 1);
            this.columnsList.splice(index - 1, 0, columns);
            columns._highlight = true;
          }
        })
      } else {
        this.$Message.warning("请高亮某一行数据后继续！")
      }
    },
    // 单行下移
    fieldDown () {
      if (this.currentRow) {
        for (var index = this.columnsList.length - 1; index >= 0; index--) {
          if (this.columnsList[index].title == this.currentRow.title && index != (this.columnsList.length - 1)) {
            var item = this.columnsList.splice(index, 1)[0];
            item._highlight = true;
            this.columnsList.splice(index + 1, 0, item);
          }
        }
      } else {
        this.$Message.warning("请高亮某一行数据后继续！")
      }
    },




    // 多字段上移(暂时不用了)
    /* fieldUp(){
         this.selectFields.forEach((selectItem,sIndex) => {
             this.columnsList.forEach((columns,index) => {
                 if(selectItem.title == columns.title && index != 0 && !this.columnsList[index - 1]._checked){
                     this.columnsList.splice(index, 1);
                     this.columnsList.splice(index-1, 0, columns);
                 }
             })
         })
     },*/
    //多字段下移 必须从后往前遍历，否则会被挡住无法xiayi（暂时不用了）
    /*fieldDown(){
        // this.selectFields.forEach((selectItem) => {
            for ( var i=this.selectFields.length-1; i>=0; --i ){
                 for ( var j=this.columnsList.length-1; j>=0; --j ){
                    if(this.selectFields[i].title == this.columnsList[j].title && j < this.columnsList.length-1 && !this.columnsList[j + 1]._checked){
                        var item = this.columnsList.splice(j, 1)[0];
                        this.columnsList.splice(j+1, 0, item);
                    }    
                }
            }    
    },*/
  }

}
</script>
<style scoped>
.form-wrapper {
  max-height: 500px;
  overflow-y: auto;
}
.button-col {
  text-align: center;
  height: 100%;
}
</style>


