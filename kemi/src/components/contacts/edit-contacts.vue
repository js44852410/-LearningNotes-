<template>
  <div class="wrapper">
    <ul class="list-content">
      <li>
        <div class="item-content">
          <text class="item-name">姓名</text>
          <input v-model="contactsInfo.fullName" class="item-edit-input" placeholder="请填写真实姓名"></input>
        </div>
      </li>
      <li>
        <div class="item-content">
          <text class="item-name">性别</text>
          <div class="video-box">
            <div class="radio man" :class="{ 'selected' : contactsInfo.gender!='女'}"
                 @click="changeSex('男')">
              <text class="radio-text" :class="{ 'selected-text' : contactsInfo.gender!='女'}">男</text>
            </div>
            <div class="radio women" :class="{ 'selected' : contactsInfo.gender=='女'}"
                 @click="changeSex('女')">
              <text class="radio-text" :class="{ 'selected-text' : contactsInfo.gender=='女'}">女</text>
            </div>
          </div>
        </div>
      </li>
      <li>
        <div class="item-content right-icon" @click="selectAge">
          <text class="item-name">年龄阶段</text>
          <text class="item-edit-input">{{contactsInfo.ageStage}}</text>
        </div>
      </li>
      <li>
        <div class="item-content right-icon" @click="changeIDType">
          <text class="item-name">证件类型</text>
          <text class="item-edit-input">{{contactsInfo.certificateType}}</text>
        </div>
      </li>
      <li>
        <div class="item-content">
          <text class="item-name">证件号码</text>
          <input maxlength="18" v-model="contactsInfo.certificateNumber" class="item-edit-input"
                 placeholder="请填写证件号码"></input>
        </div>
      </li>
      <li>
        <div class="item-content">
          <text class="item-name">手机号</text>
          <input type="tel" maxlength="11" v-model="contactsInfo.mobile" class="item-edit-input"
                 placeholder="请填写手机号码"></input>
        </div>
      </li>
      <li>
        <div class="item-content right-icon" @click="changeRelation">
          <text class="item-name">选择关系</text>
          <text class="item-edit-input">{{contactsInfo.relation}}</text>
        </div>
      </li>
      <li>
        <div class="item-content">
          <text class="item-name">备注</text>
          <input v-model="contactsInfo.remark" class="item-edit-input" placeholder="请添加备注信息"></input>
        </div>
      </li>
    </ul>

    <div class="edit-btn-group" v-show="id!=''">
      <div class="delete-btn-box" @click="delectInfo('contactsList')">
        <text class="delete-btn">删除</text>
      </div>
      <div class="save-btn-box" @click="editInfo('contactsList')">
        <text class="save-btn">完成</text>
      </div>
    </div>
    <div class="add-btn-box" v-show="id==''" @click="editInfo('contactsList')">
      <text class="add-btn">添加</text>
    </div>
    <div class="cover-select-box" :class="{ 'bottom-select-box-show': isShowBottomBox}">

    </div>
    <div class="bottom-select-box" ref="easein">
      <div class="bottom-select-option">
        <text class="select-submit-btn" @click="hiddenBottomBox">确定</text>
      </div>
      <ul class="list-content">
        <li class="list-item" v-for="(item, index) in items" @click="getBoxText(index,item.msg)" :key="item.id">
          <text class="select-option">{{item.msg}}</text>
        </li>
      </ul>
    </div>
    <div class="err-warning-bgcover" :class="{ 'err-warning-hidden': errTipShow}">
      <div class="err-warning">
        <div class="err-x" @click="closeErrTip">
          <text class="err-font">X</text>
        </div>
        <div class="err-message">
          <text class="err-title">添加失败</text>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .wrapper {
    background: #f5f4f9;
  }

  .list-content {
    background: #fff;
  }

  .item-content {
    height: 84px;
    border-bottom: 1px solid #f5f4f9;
    margin-left: 35px;
    margin-right: 35px;

    display: -webkit-box; /* 老版本语法: Safari, iOS, Android browser, older WebKit browsers. */
    display: -moz-box; /* 老版本语法: Firefox (buggy) */
    display: -ms-flexbox; /* 混合版本语法: IE 10 */
    display: -webkit-flex; /* 新版本语法: Chrome 21+ */
    display: flex; /* 新版本语法: Opera 12.1, Firefox 22+ */

    flex-direction: row;
    -moz-box-orient: horizontal;
    -webkit-box-orient: horizontal;
    box-orient: horizontal;
    -webkit-flex-direction: row;

    -webkit-box-pack: start;
    -moz-justify-content: flex-start;
    -webkit-justify-content: flex-start;
    justify-content: flex-start;

    -webkit-box-align: center;
    -moz-align-items: center;
    -webkit-align-items: center;
    align-items: center;
  }

  .item-name {
    /*flex: 1;*/
    font-size: 24px;
    width: 125px;
  }

  .item-edit-input {
    border: 0;
    font-size: 28px;
    color: #333;
    /*flex: auto;*/
  }

  .item-select {
    margin-left: -100px;
  }

  .video-box {
    display: -webkit-box; /* 老版本语法: Safari, iOS, Android browser, older WebKit browsers. */
    display: -moz-box; /* 老版本语法: Firefox (buggy) */
    display: -ms-flexbox; /* 混合版本语法: IE 10 */
    display: -webkit-flex; /* 新版本语法: Chrome 21+ */
    display: flex; /* 新版本语法: Opera 12.1, Firefox 22+ */

    flex-direction: row;
    -moz-box-orient: horizontal;
    -webkit-box-orient: horizontal;
    box-orient: horizontal;
    -webkit-flex-direction: row;

    -webkit-box-pack: start;
    -moz-justify-content: flex-start;
    -webkit-justify-content: flex-start;
    justify-content: flex-start;
  }

  .radio {
    height: 40px;
    width: 80px;
    border: 1px solid #b4b4b4;
    border-radius: 5px;
  }

  .radio-text {
    line-height: 40px;
    text-align: center;
    font-size: 25px;
    color: #b4b4b4;
  }

  .selected {
    border: 1px solid #ffcd40;
  }

  .selected-text {
    color: #ffcd40;
  }

  .man {
    /*margin-left: 20px;*/
  }

  .women {
    margin-left: 40px;
  }

  .mar-left-80 {
    margin-left: 80px;
  }

  .delete-btn-box, .add-btn-box, .save-btn-box {
    width: 666px;
    background: #fff;
    height: 90px;
    margin: 50px auto 0;
  }

  .save-btn-box {
    background: #ffbc01;
  }

  .delete-btn, .add-btn, .save-btn {
    text-align: center;
    line-height: 90px;
    font-size: 28px;
  }

  .save-btn {
    color: #fff;
  }

  .right-icon {
    background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAbCAMAAACUTyX1AAAAYFBMVEUAAADMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMw63dP0AAAAH3RSTlMAE9UZ0djMFw/cNPLGwp2DdWthIAf46eO0qI+BUEQojQ2LeQAAAHNJREFUGNOFzkkSgzAMRFFbHrAZAoHMAfr+t2SJWhu0e79UJbl2LE7PDb3XXiok6BAEddHBZ7x3HcqAV6vD44OOwxfdZs4+Vwo/YKbwB+4UJmCiMJuNkjBqZgi/XQMxacYLSnOyEcto6E+GZJkVXWS6oScedegGziDaqFUAAAAASUVORK5CYII=) 663px center no-repeat;
  }

  .cover-select-box {
    display: none;
    width: 750px;
    height: 1344px;
    background-color: #000;
    width: 750px;
    height: 1344px;
    background-color: rgba(0, 0, 0, 0.5);
    position: fixed;
    top: 0;
    left: 0;
  }

  .bottom-select-box {
    z-index: 100;
    position: fixed;
    left: 0px;
    bottom: -320px;
  }

  .bottom-select-box-show {
    display: block;
  }

  .select-submit-btn {
    width: 765px;
    height: 80px;
    line-height: 80px;
    font-size: 30px;
    color: #333333;
    padding-left: 650px;
    background-color: #fff;
  }

  .select-option {
    text-align: center;
    height: 80px;
    line-height: 80px;
    font-size: 30px;
    color: #666666;
    border-top: 1px solid #f4f4f4;
  }

  .err-warning-bgcover {
    display: none;
    width: 750px;
    height: 1344px;
    background-color: #000;
    width: 750px;
    height: 1344px;
    background-color: rgba(0, 0, 0, 0.5);
    position: fixed;
    top: 0;
    left: 0;
  }

  .err-warning {
    width: 288px;
    height: 288px;
    background-color: #fff;
    border: 1px solid #fff;
    border-radius: 18px;
    margin: 200px auto;

    display: -webkit-box; /* 老版本语法: Safari, iOS, Android browser, older WebKit browsers. */
    display: -moz-box; /* 老版本语法: Firefox (buggy) */
    display: -ms-flexbox; /* 混合版本语法: IE 10 */
    display: -webkit-flex; /* 新版本语法: Chrome 21+ */
    display: flex; /* 新版本语法: Opera 12.1, Firefox 22+ */

    -webkit-box-pack: center;
    -moz-justify-content: center;
    -webkit-justify-content: center;
    justify-content: center;

    -webkit-box-align: center;
    -moz-align-items: center;
    -webkit-align-items: center;
    align-items: center;

    z-index: 100;
    position: fixed;
    top: 10%;
    left: 50%;
    margin-left: -144px;
  }

  .err-warning-hidden {
    display: block;
  }

  .err-x {
    width: 120px;
    height: 120px;
    border: 2px solid #a0a0a0;
    border-radius: 50%;
    justify-content: center;
    align-items: center;
    margin-bottom: 30px;
  }

  .err-font {
    font-size: 1rem;
    color: #f94b11;
  }

  .err-title {
    color: #333333;
    font-size: 30px;
  }

  .list-item.chosen {
    background-color: #ffcd40;
  }

  .select-option.chosen {
    color: #fff;
  }
</style>

<script>
  import {mapGetters, mapActions} from 'vuex';
  const animation = weex.requireModule('animation');
  const stream = weex.requireModule('stream');
  const modal = weex.requireModule('modal');

  export default {
    data() {
      return {
        id: "",
        isShowBottomBox: false,
        errTipShow: false,
        remark: '',
        items: [],
        bottomBoxType: 0, //type是1代表的是年纪段，2代表的是证件类型，3代表的是亲子关系，默认的情况是0
        bottomBoxVal: '',
        ageRangeItem: [{msg: '成人(12岁以上)'}, {msg: '儿童(3～12岁)'}],
        idTypeItem: [{msg: '身份证'}, {msg: '护照'}],
        relationItem: [{msg: '家人'}, {msg: '朋友'}],
      };
    },

    computed: {
      ...mapGetters([
        'contactsInfo',
      ]),
    },

    methods: {
      ...mapActions(['deleteContacts']),
      validationRules() {
        const contacts = this.contactsInfo;

        if (!contacts.fullName || !contacts.ageStage || !contacts.certificateType || !contacts.certificateNumber || !contacts.mobile || !contacts.relation) {
          modal.toast({
            message: "请填写完整资料",
            duration: 1,
          });
        } else if (!/^1[345678]\d{9}$/.test(contacts.mobile)) {
          modal.toast({
            message: "请填写格式正确的手机号",
            duration: 1,
          });
        } else if (!/^[0-9X]+$/.test(contacts.certificateNumber)) {
          modal.toast({
            message: "请输入正确的身份证",
            duration: 1,
          });
        } else {
          return true;
        }

        return false;
      },

      changeSex(gender) {
        this.$set(this.contactsInfo, "gender", gender);
      },

      changeIDType(event) {
        this.bottomBoxType = 2;
        this.items = this.idTypeItem;
        this.moveIn();
        this.isShowBottomBox = true;
      },

      changeRelation(event) {
        this.bottomBoxType = 3;
        this.items = this.relationItem;
        this.moveIn();
        this.isShowBottomBox = true;
      },

      selectAge(event) {
        this.bottomBoxType = 1;
        this.items = this.ageRangeItem;
        this.moveIn();
        this.isShowBottomBox = true;
      },

      getBoxText(index, txt) {
        var items = document.getElementsByClassName('list-item');
        var options = document.getElementsByClassName('select-option');
        for (let i = 0; i < items.length; i++) {
          let obj_class = ' ' + items[i].className + ' ';
          obj_class = obj_class.replace(/(\s+)/gi, ' ');
          let removed = obj_class.replace(' ' + 'chosen' + ' ', ' ').replace(/(^\s+)|(\s+$)/g, '');
          items[i].className = removed;
        }
        for (let i = 0; i < options.length; i++) {
          let obj_class = ' ' + options[i].className + ' ';
          obj_class = obj_class.replace(/(\s+)/gi, ' ');
          let removed = obj_class.replace(' ' + 'chosen' + ' ', ' ').replace(/(^\s+)|(\s+$)/g, '');
          options[i].className = removed;
        }
        let obj_class = items[index].className;
        let blank = (obj_class !== '') ? ' ' : '';
        let added = obj_class + blank + 'chosen';
        items[index].className = added;
        this.bottomBoxVal = txt;
      },

      hiddenBottomBox() {
        this.items = [];
        this.isShowBottomBox = false;
        this.moveOut();
        if (this.bottomBoxType === 1) {
          this.contactsInfo.ageStage = this.bottomBoxVal;
        } else if (this.bottomBoxType === 2) {
          this.contactsInfo.certificateType = this.bottomBoxVal;
        } else {
          this.contactsInfo.relation = this.bottomBoxVal;
        }
        this.bottomBoxVal = '';
      },

      postDeleteInfo(repo, callback) {
        return stream.fetch({
          method: 'POST',
          type: 'json',
          url: `${__APIDIR}appapi/${repo}`,
          headers: {
            "Content-Type": "application/json;charset=utf-8",
            "token": __userToken,
          },
          body: '{"id": "' + this.id + '"}',
        }, callback);
      },

      postEditInfo(repo, callback) {
        return stream.fetch({
          method: 'POST',
          type: 'json',
          url: `${__APIDIR}appapi/${repo}`,
          headers: {
            "Content-Type": "application/json;charset=utf-8",
            "token": __userToken,
          },
          body: JSON.stringify(this.contactsInfo),
        }, callback);
      },

      delectInfo(name) {
        this.postDeleteInfo('user/topContacts/delete', res => {
          if (res.ok && res.data.code === "1") {
            this.deleteContacts(this.id);
            this.$router.push({
              name,
              query: {
                remarks: this.$route.query.remarks,
                check: this.$route.query.check,
                activityID: this.$route.query.activityID,
              },
            });
          }
        });
      },

      editInfo(name) {
        if (!this.validationRules()) {
          return false;
        }
        this.postEditInfo('user/topContacts', res => {
          if (res.ok && res.data.code === "1") {
            this.$router.replace({
              name,
              query: {
                remarks: this.$route.query.remarks,
                check: this.$route.query.check,
                activityID: this.$route.query.activityID,
              },
            });
          }
        });
      },

      closeErrTip() {
        this.errTipShow = false;
      },
      moveIn() {
        var easein = this.$refs.easein;
        animation.transition(easein, {
          styles: {
            bottom: '0px',
          },
          duration: 500, //ms
          timingFunction: 'ease-in',
          delay: 0, //ms
        });
      },

      moveOut() {
        var easein = this.$refs.easein;
        animation.transition(easein, {
          styles: {
            bottom: '-320px',
          },
          duration: 800, //ms
          timingFunction: 'ease-out',
          delay: 0, //ms
        });
      },
    },

    mounted() {
      this.id = this.$route.query.id || "";

      this.$store.dispatch("getContactsInfo", this.id);
    },
  };
</script>