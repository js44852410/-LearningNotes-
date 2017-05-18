<template>
  <div class="wrapper">
    <div class="btn-box">
      <a class="add-btn" @click="goEdit()">添加联系人</a>
    </div>
    <div class="contacts-content">
      <div class="contacts-item" v-for="item in contactsList">
        <div v-if="check" @click="checkIt(item)">
          <image v-if="item.isSelected" class="check-box"
                 src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACcAAAAnCAMAAAC7faEHAAAAflBMVEXipwMAAADoqwLkqAPipwPipwPvsALipwPipwPipwPvsQL/vADwsQL////5uAH//fj/wA7/7bv/56L/2nL/01j/vgf/+/H/+uv/+OP/89L/66//0Er/zD3/yTL/xyj/xSD/wxj/9tv/8Mf/45L/3oL/12b/9dr/8cj/34f/0E24LM7JAAAAC3RSTlOAAO/cPxb6dP1z+tvfJLcAAADtSURBVDjL1ZTZDoIwFEQrqwpjy76ogAIu//+DQiREhdL7YqLz2JyHzp3JsFUnw2Zy2UaPdJypa5Yrl6XpZs+Z652zrN3a7Di9w1SgvmKG5qilGWxjEThrw5hL4Fz251wQkTgfHoGLcvBQzQkPfK/+nzgjPkx93D+wKkNynPr1Ebxh5QlpMXOXAGhfsCLFpZy9XwOE4/sxQVZJ7lyP7pxDjLOQ5uGDP/3tOTyxkFuOuHcYcuTRUr6Rh6RwWsBX9EBckd6AWtkXkQFoCL2qTghI/SvDn+j91zjivtjUvSLuH3VPh33eunJth32m7f0DUbw/SO+HoXkAAAAASUVORK5CYII="></image>
          <image v-else class="check-box"
                 src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACcAAAAnBAMAAAB+jUwGAAAAJFBMVEUAAAC7tra7tra7tra7tra7trb///+7trbu7OzQzMze3NzPzMy3Zd4VAAAABnRSTlMA876WVRsoqLAKAAAAVklEQVQoz2NgYFEsRwaFKgwMDKyWbWkooNuUgYF5WRoaWMzA4J2GDjIdGDQwBDMUGMTSMIAAQxmmYMGo4KggfkGsaQl7qvPEkj6xpmTMNN9pyoA1dwAAnFAyCN1shYwAAAAASUVORK5CYII="></image>
        </div>
        <div class="contacts-contant" :href="item.url" @click="goEdit(item.id)">
          <div class="item-top">
            <text class="item-contant-name">{{item.fullName}}</text>
            <text class="item-relation">{{item.relation}}</text>
          </div>
          <div class="item-bottom">
            <text class="card-id">{{item.certificateType}} {{item.certificateNumber}}</text>
          </div>
        </div>
      </div>
    </div>
    <div v-if="check" class="complete-btn" @click="affiliatedPerson">
      <text class="complete-word">确定</text>
    </div>
  </div>
</template>

<style scoped>
  .wrapper {
    background: #f5f4f9;
  }

  .btn-box {
    height: 94px;
    margin: 26px 0;
    background: #fff;
  }

  .add-btn {
    text-align: center;
    line-height: 94px;
    font-size: 24px;
    background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAgCAMAAAAynjhNAAAAbFBMVEUAAAD5ugf5ugf5ugf5ugf5ugf5ugf5ugf5ugf5ugf5ugf5ugf5ugf5ugf5ugf5ugf5ugf5ugf5ugf5ugf5ugf5ugf5ugf5ugf5ugf5ugf5ugf5ugf5ugf5ugf5ugf5ugf5ugf5ugf5ugf5ugcX2gZ1AAAAI3RSTlMAiAb54nhwrXct1WtUStnSkygZ8/JbQw8KyWdQNMC3pklgJ39XNosAAAD4SURBVCjPhZHZboMwEEWHsWPXZt8CBLK09///sYlUythK4LyYqyPdwWP6h7O7Vq2/Z0xvmAv8UcwUwwngTc1cGw8kcUECla7flxZJaDOo85bOCllQrZHKnELL+h5eRmKPXkQLQwEGViSNOtQ1tEgKHGqGEqmL9RjoIi53ovzw13qU4cVK9Adr2V/q4ZNIuAK8+eHRmRKomGIyjRVDb5g3b13e5XJL1bQQ526gwV1uSp1OcnxTQol5zUJSNxqFI4nUY4lpoI+6gpf28fXkhuvreBAtUEFzi42OyEY7ypMnV0yvI6cGqhEynp3C0o62+N7TBdwHvcO6818lDBXCiDse1AAAAABJRU5ErkJggg==) 260px center no-repeat;
    color: #ffbc01;
  }

  .contacts-item {
    display: -webkit-box; /* 老版本语法: Safari, iOS, Android browser, older WebKit browsers. */
    display: -moz-box; /* 老版本语法: Firefox (buggy) */
    display: -ms-flexbox; /* 混合版本语法: IE 10 */
    display: -webkit-flex; /* 新版本语法: Chrome 21+ */
    display: flex; /* 新版本语法: Opera 12.1, Firefox 22+ */

    -moz-box-orient: horizontal;
    -webkit-box-orient: horizontal;
    box-orient: horizontal;
    -webkit-flex-direction: row;
    flex-direction: row;

    -webkit-box-align: center;
    -moz-align-items: center;
    -webkit-align-items: center;
    align-items: center;

    height: 140px;
    border-bottom: 1px solid #f5f4f9;
  }

  .contacts-content {
    background: #fff;
    margin-bottom: 100px;
  }

  .contacts-item {
    padding-left: 58px;
  }

  .item-top {
    display: -webkit-box; /* 老版本语法: Safari, iOS, Android browser, older WebKit browsers. */
    display: -moz-box; /* 老版本语法: Firefox (buggy) */
    display: -ms-flexbox; /* 混合版本语法: IE 10 */
    display: -webkit-flex; /* 新版本语法: Chrome 21+ */
    display: flex; /* 新版本语法: Opera 12.1, Firefox 22+ */

    -moz-box-orient: horizontal;
    -webkit-box-orient: horizontal;
    box-orient: horizontal;
    -webkit-flex-direction: row;
    flex-direction: row;

    -webkit-box-pack: start;
    -moz-justify-content: flex-start;
    -webkit-justify-content: flex-start;
    justify-content: flex-start;

    -webkit-box-align: center;
    -moz-align-items: center;
    -webkit-align-items: center;
    align-items: center;
    margin: 0px 0 20px;
  }

  .item-contant-name {
    font-size: 28px;
  }

  .item-relation {
    padding-left: 40px;
    font-size: 24px;
    color: #646464;
  }

  .card-id {
    font-size: 20px;
  }

  .check-box {
    width: 40px;
    height: 40px;
    margin-right: 20px;
  }

  .contacts-contant {
    /*-webkit-box-flex: auto; !* OLD - iOS 6-, Safari 3.1-6 *!*/
    /*-moz-box-flex: auto; !* OLD - Firefox 19- *!*/
    /*width: 20%; !* For old syntax, otherwise collapses. *! */
    -webkit-flex: auto; /* Chrome */
    -ms-flex: auto; /* IE 10 */
    flex: auto;
  }

  .complete-btn {
    height: 100px;
    width: 750px;
    background: #fff;

    position: fixed;
    left: 0;
    bottom: 0;
  }

  .complete-word {
    text-align: center;
    line-height: 100px;
    color: #FFF;
    height: 100px;
    background-color: #FFBC01;
    font-size: 32px;
  }
</style>

<script>
  import {mapGetters} from 'vuex';
  const stream = weex.requireModule('stream');

  module.exports = {
    data() {
      return {
        check: false,
        remarks: '',
      };
    },

    computed: {
      ...mapGetters([
        'contactsList',
        'selectedList',
      ]),
    },

    methods: {
      goEdit(id) {
        this.$router.replace({
          name: "editContacts",
          query: {
            id,
            remarks: this.$route.query.remarks,
            check: this.check,
            activityID: this.$route.query.activityID,
          },
        });
      },

      checkIt(item) {
        let id = Number(item.id);

        if (this.selectedList.indexOf(id) === -1) {
          this.selectedList.push(id);
        } else {
          this.selectedList.splice(this.selectedList.indexOf(id), 1);
        }

        this.$store.dispatch('changeSelectedList', this.selectedList);
        //this.$set(item, "isSelected", !item.isSelected);
      },

      affiliatedPerson() {
        this.$router.push({
          name: 'confirmOrder',
          query: {
            remarks: this.$route.query.remarks,
            activityID: this.$route.query.activityID,
          },
        });
      },

      postAffiliatedPerson(repo, callback) {
        return stream.fetch({
          method: 'post',
          type: 'json',
          url: `${__APIDIR}appapi/${repo}`,
          headers: {
            "Content-Type": "application/json;charset=utf-8",
            "token": __userToken,
          },
          body: '{"idList": [' + this.selectedList + ']}',
        }, callback);
      },
    },

    mounted() {
      this.check = this.$route.query.check;

      this.$store.dispatch('getContactsList', this.selectedList);
    },
  };
</script>