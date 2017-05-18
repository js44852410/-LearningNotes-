<template>
  <div>
    <a class="close_btn" @click="confirmEnd">
      <image class="close_icon"
             src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADsAAAA7CAYAAADFJfKzAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyhpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKE1hY2ludG9zaCkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6RDQ1NUJEREMxNzREMTFFNzhBQTU4QUZFODUwODlBODgiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6RDQ1NUJEREQxNzREMTFFNzhBQTU4QUZFODUwODlBODgiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpENDU1QkREQTE3NEQxMUU3OEFBNThBRkU4NTA4OUE4OCIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpENDU1QkREQjE3NEQxMUU3OEFBNThBRkU4NTA4OUE4OCIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PqbHL5IAAATZSURBVHja3JvbSxRRHMfHNM1bBt1eBLtrpRX0kj7Yle5FFBQU9hBhJdUGCfVY1B9QWkJBL0UPBRISlV0fCrKXhKKytDRIqKhIrTRL2r6/+g4M4+66O3POzKwHPqyzNef8PjszZ841JRwOG5rSTLAAzAWFYBIYB8aANDAAusBn8Ba8Ak/AI9CiI6AUxbKloAKsA/n87hd4TT6B7+AnGAVywHgwjaTznE5wFVwATcqiE1mXZIJ9oC38P/WBqyAE5oC0OPNJ4/8P8fxe5tfG/LPcxurm5HRwEHxkUE2gEuQp+AEN5lPJfMMs5yDL9VR2CWhhEPfAYkWC0ZD877I8KXepF7IZoJaFvgXrNUvakfI6WH4t49EiOwU8ZkGn+KwaPpDJ8iU1g6mqZeeB9+Ar2OSTpJ2NjOc941MiWw66QScoDoioSTHj6macrmTngi5WCgUBEzWRuF4yzphXOFajQl7yD0E/GwudRnBTPhsfGaCMDZhBaUSUk7NAPVs0qwMuara4VjPeesYfdwvqDGu7jQG9dWNVWn8Yf1zP7HKK1iSZqEkN418x1DMrjfPnvL1ng14j+ZLcws/49yx2OiI+s/vAFBBKUlGDcUv8k8HeaF28TPYrpU+53Ej+dJN9aZHus1/ZSjABHDGGRzoKJtJrUG3cxu6Uk0qhDJwDOYormxzmW+bwfPFptdfGpazBtjvMVLpcA+CBQuEc5jfgtEsHKuhVapWtAz9cBrpFobBVdLOLfLLpVWeVfQeuKLgaKoRViZpcod8/2UJe6l2Kbj83wqpFhd30K5KDHTyYrbBicSKsQ9Sgl6QdcnASfAcjFNekiQjrEhVS+dyekINGDm/oaKfGI6xT1ET8Gg12fOs1NsxjCXshatCvRVpQYzkNoStdAts4AHCDswAGP2/w+63gssYYxG+0yOaBb5qbbnbhiR6KGvTLlQmmkWZD2QNhSRdBK8j2SNSgX65c2d/s8XiRroE2uaX4ed2jcsXvm8h2i7UHBZrP6HRwkp/WZ1hnyjVlv3DO1AtR8xk9wM9Sj4SlXurR/Z4d6vWyWUNvKeZ7VlcLKt73qG7hVPqdsLaNS3wQ9UK4xNo2LuLBfp9EdQuHrL0eg5NDDT6K6hRuoN+gkYrsAIwwqBSOOFJhjkFVBGAoRaVwxDGoFJejizp6LyqEm+g1aK6nmr+Ck2HLKk3dNFO4ysG55t1aHUlWluJ8AbccZDwKzNDUIJjB/BM97yZ98qLN4h3mr7EuSWfwTNbS49BQs3gv+HfxcJ/Fk3/Yw8mg40k6x3OM8e+xisaaeT/NGew1SXb7rmHcdYmslslgT6FLQ5tZFyWMtzlahRZrtcxUrkBJttUyEuubRFbLGDxhJXv5t0FBQEUlrjuMc1U00XjXGy8EPQFf4dbDOJWsXZwPPnCt4IaAiG5gPB8Yn9JVqbL686ll+aufq1JrWes+1bEq1USWrp+lcIcPLS0pr53ln020S+q00KWcI5J0x4OV5ItYTpjlLvNjj0C1bY/ATsV7BHba9ghU+7FHwH5rW3d/9HIoJMQXfWoCo4AlPK/BsvvjNcfHXO/+0LGvZzvfz5P4XX+EfT39bADY9/Vk8BxZfNYIzqvc16Na1ppkWWA510AWUiaPgqP/jdD/F+/mD/GK6ybvg3YdAf0VYAD4d1XdVBGTSAAAAABJRU5ErkJggg=="></image>
    </a>
  </div>
</template>
<style scoped>
  .close_btn {
    position: absolute;
    right: 50px;
    top: 50px;
    z-index: 999;
  }

  .close_icon {
    width: 60px;
    height: 60px;
  }
</style>
<script>
  const modal = weex.requireModule('modal');
  export default {
    data() {
      return {};
    },

    methods: {
      confirmEnd() {
        modal.confirm({
          message: "您确定要结束测评么？",
          okTitle: "确定",
          cancelTitle: "取消",
        }, res => {
          if (res === "确定") {
            this.$router.replace({
              name: "home",
            });
          }
        });
      },
    },
  };
</script>