<template>
  <div class="container">
    <div class="div-tree">
      <div class="div-tree-title">
        <i class="el-icon-s-claim" />
      </div>
      <SelectTree @node-click="handleNodeClick" />
    </div>
    <!--    主界面播放选择控件-->
    <div class="div-play-layout">
      <!--      音频播放控件-->
      <div v-if="showAudioControl" class="div-audio-float">
        <el-button id="el-button-float" circle size="medium" @click="controlAudio">
          <svg-icon icon-class="music" />
        </el-button>
        <audio ref="audio" controls :style="{width:getAudioWidth}">
          <source :src="currentAudioSrc" type="audio/ogg">
          您的浏览器不支持 audio 元素。
        </audio>
      </div>
      <h1>课程信息</h1>
      <div class="play">
        <!--      播放控件-->
        <el-carousel ref="PlayElCarousel" :autoplay="false" direction="vertical" indicator-position="none">
          <el-carousel-item name="InfoPage">
            <div class="div-course-info-page">
              <img src="../../../assets/picture/blackboard4.png" width="100%" height="100%" alt="">
              <h2 style="position: absolute;top: 100px; left: 100px;font-size: 38px;  color: white;z-index:9999">东奔西跑课程</h2>
              <h2 style="position: absolute;top: 180px; left: 100px;font-size: 28px;  color: white;z-index:9999">教学音档&nbsp;&nbsp; {{ courseinfo.audioCount }}份</h2>
              <h2 style="position: absolute;top: 220px; left: 100px;font-size: 28px;  color: white;z-index:9999">辅助视频&nbsp;&nbsp; {{ courseinfo.videoCount }}份</h2>
              <h2 style="position: absolute;top: 260px; left: 100px;font-size: 28px;  color: white;z-index:9999">辅助照片&nbsp;&nbsp; {{ courseinfo.pictureCount }}份</h2>
              <h2 v-if="showTeachingVideo" style="position: absolute;top: 300px; left: 100px;font-size: 28px;  color: white;z-index:9999">教学视频&nbsp;&nbsp; {{ courseinfo.videoTeachingCount }}份</h2>
            </div>
          </el-carousel-item>
          <el-carousel-item name="VideoPage">
            <video ref="video" controls style="background-color: black">
              <source :src="currentVideoSrc" type="video/mp4">
              Your browser does not support the video tag.
            </video>
          </el-carousel-item>
          <el-carousel-item name="PicturePage">
            <el-carousel ref="PictureItemEl" :autoplay="false">
              <el-carousel-item v-for="item in pictureList" :key="item.url">
                <el-image :src="item.url" />
              </el-carousel-item>
            </el-carousel>
          </el-carousel-item>
        </el-carousel>
        <!--      选择控件-->
        <div class="select">
          <el-carousel v-if="showTeachingVideo" id="el-carousel-select-item" ref="SelectTeachingVideoElCarousel" :autoplay="false" indicator-position="none" arrow="never">
            <el-carousel-item>
              <el-button class="el-button-select" type="primary" @click="clickTeachingVideo">教学视频</el-button>
            </el-carousel-item>
            <el-carousel-item>
              <el-card class="box-card" shadow="always">
                <div slot="header" class="box-card-header clearfix">
                  <span>教学视频</span>
                  <el-button type="text" @click="goBack(4)">返回</el-button>
                </div>
                <ul class="list">
                  <li v-for="(item,index) in videoTeachingList" :class="{'video-teaching-li-active':item.active}" @click="clickTeachingVideoItem(index)">
                    <div class="list-item">
                      <span>视频{{ index }}</span>
                      <i class="el-icon-video-play" />
                    </div>
                  </li>
                </ul>
              </el-card>
            </el-carousel-item>
          </el-carousel>
          <!--        教学音档-->
          <el-carousel ref="SelectAudioElCarousel" :autoplay="false" indicator-position="none" arrow="never">
            <el-carousel-item>
              <el-button class="el-button-select" type="success" @click="clickAudio">教学音档</el-button>
            </el-carousel-item>
            <el-carousel-item>
              <el-card class="box-card" shadow="hover">
                <div slot="header" class="box-card-header clearfix">
                  <span>教学音频</span>
                  <el-button type="text" @click="goBack(0)">返回</el-button>
                </div>
                <ul class="list">
                  <li v-for="(item,index) in audioList" :class="{'audio-li-active':item.active}" @click="clickAudioItem(index)">
                    <div class="list-item">
                      <span>音频{{ index }}</span>
                      <i class="el-icon-video-play" />
                    </div>
                  </li>
                </ul>
              </el-card>
            </el-carousel-item>
          </el-carousel>
          <!--      辅助视频-->
          <el-carousel ref="SelectVideoElCarousel" class="SelectVideoElCarousel" :autoplay="false" indicator-position="none" arrow="never">
            <el-carousel-item>
              <el-button class="el-button-select" type="info" @click="clickVideo">辅助视频</el-button>
            </el-carousel-item>
            <el-carousel-item>
              <el-card class="box-card" shadow="always">
                <div slot="header" class="box-card-header clearfix">
                  <span>辅助视频</span>
                  <el-button type="text" @click="goBack(1)">返回</el-button>
                </div>
                <ul class="list">
                  <li v-for="(item,index) in videoList" :class="{'video-li-active':item.active}" @click="clickVideoItem(index)">
                    <div class="list-item">视频{{ index }}</div>
                  </li>
                </ul>
              </el-card>
            </el-carousel-item>
          </el-carousel>
          <!--        辅助照片-->
          <el-carousel ref="SelectPictureElCarousel" :autoplay="false" indicator-position="none" arrow="never">
            <el-carousel-item>
              <el-button class="el-button-select" type="warning" @click="clickPicture">辅助照片</el-button>
            </el-carousel-item>
            <el-carousel-item>
              <el-card class="box-card" shadow="always">
                <div slot="header" class="box-card-header clearfix">
                  <span>辅助照片</span>
                  <el-button type="text" @click="goBack(2)">返回</el-button>
                </div>
                <ul class="list">
                  <li v-for="(item,index) in pictureList" :class="{'picture-li-active':item.active}" @click="clickPictureItem(index)">
                    <div class="list-item">照片{{ index }}</div>
                  </li>
                </ul>
              </el-card>
            </el-carousel-item>
          </el-carousel>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import SelectTree from '@/components/Select/SelectTree'
export default {
  components: {
    SelectTree
  },
  data() {
    return {
      picurl: '../../../assets/picture/blackboard4.png',
      showTeachingVideo: false,
      courseinfo: {
        audioCount: 2,
        videoCount: 2,
        pictureCount: 4,
        videoTeachingCount: 8
      },
      showMenu: true,
      audioWidth: 0,
      showAudioControl: false,
      liActive: 'li-active',
      audioControlTimeOut: -1,
      currentAudioSrc: '',
      currentVideoSrc: '',
      audioList: [{
        active: false,
        url: 'https://music.163.com/song/media/outer/url?id=516497142.mp3'
      }, {
        active: false,
        url: 'https://music.163.com/song/media/outer/url?id=254574.mp3'
      }, {
        active: false,
        url: 'https://music.163.com/song/media/outer/url?id=5285415.mp3'

      }, {
        active: false,
        url: 'https://music.163.com/song/media/outer/url?id=212233.mp3'
      }, {
        active: false,
        url: 'https://music.163.com/song/media/outer/url?id=152392.mp3'
      }, {
        active: false,
        url: 'https://music.163.com/song/media/outer/url?id=153784.mp3'
      }, {
        active: false,
        url: 'https://music.163.com/song/media/outer/url?id=254574.mp3'
      }],
      videoList: [{
        active: false,
        url: 'https://stream7.iqilu.com/10339/upload_transcode/202002/18/20200218114723HDu3hhxqIT.mp4'
      }, {
        active: false,
        url: 'https://stream7.iqilu.com/10339/upload_transcode/202002/16/20200216050645YIMfjPq5Nw.mp4'
      }, {
        active: false,
        url: 'https://v-cdn.zjol.com.cn/276982.mp4'
      }, {
        active: false,
        url: 'https://v-cdn.zjol.com.cn/276987.mp4'
      }, {
        active: false,
        url: 'https://v-cdn.zjol.com.cn/276989.mp4'
      }, {
        active: false,
        url: 'https://v-cdn.zjol.com.cn/276994.mp4'
      }, {
        active: false,
        url: 'https://v-cdn.zjol.com.cn/277000.mp4'
      }, {
        active: false,
        url: 'https://v-cdn.zjol.com.cn/277004.mp4'
      }, {
        active: false,
        url: 'https://v-cdn.zjol.com.cn/276988.mp4'
      }, {
        active: false,
        url: 'https://v-cdn.zjol.com.cn/276994.mp4'
      }, {
        active: false,
        url: 'https://v-cdn.zjol.com.cn/277004.mp4'
      }, {
        active: false,
        url: 'https://v-cdn.zjol.com.cn/277003.mp4'
      }],
      videoTeachingList: [{
        active: false,
        url: 'https://stream7.iqilu.com/10339/upload_transcode/202002/18/20200218114723HDu3hhxqIT.mp4'
      }, {
        active: false,
        url: 'https://stream7.iqilu.com/10339/upload_transcode/202002/16/20200216050645YIMfjPq5Nw.mp4'
      }, {
        active: false,
        url: 'https://v-cdn.zjol.com.cn/276982.mp4'
      }, {
        active: false,
        url: 'https://v-cdn.zjol.com.cn/276987.mp4'
      }, {
        active: false,
        url: 'https://v-cdn.zjol.com.cn/276989.mp4'
      }, {
        active: false,
        url: 'https://v-cdn.zjol.com.cn/276994.mp4'
      }, {
        active: false,
        url: 'https://v-cdn.zjol.com.cn/277000.mp4'
      }, {
        active: false,
        url: 'https://v-cdn.zjol.com.cn/277004.mp4'
      }, {
        active: false,
        url: 'https://v-cdn.zjol.com.cn/276988.mp4'
      }, {
        active: false,
        url: 'https://v-cdn.zjol.com.cn/276994.mp4'
      }, {
        active: false,
        url: 'https://v-cdn.zjol.com.cn/277004.mp4'
      }, {
        active: false,
        url: 'https://v-cdn.zjol.com.cn/277003.mp4'
      }],
      pictureList: [{
        active: false, url: 'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg'
      }, {
        active: false, url: 'https://fuss10.elemecdn.com/1/34/19aa98b1fcb2781c4fba33d850549jpeg.jpeg'
      }, {
        active: false, url: 'https://fuss10.elemecdn.com/0/6f/e35ff375812e6b0020b6b4e8f9583jpeg.jpeg'
      }, {
        active: false, url: 'https://fuss10.elemecdn.com/9/bb/e27858e973f5d7d3904835f46abbdjpeg.jpeg'
      }, {
        active: false, url: 'https://fuss10.elemecdn.com/9/bb/e27858e973f5d7d3904835f46abbdjpeg.jpeg'
      }, {
        active: false, url: 'https://fuss10.elemecdn.com/d/e6/c4d93a3805b3ce3f323f7974e6f78jpeg.jpeg'
      }, {
        active: false, url: 'https://fuss10.elemecdn.com/3/28/bbf893f792f03a54408b3b7a7ebf0jpeg.jpeg'
      }, {
        active: false, url: 'https://fuss10.elemecdn.com/2/11/6535bcfb26e4c79b48ddde44f4b6fjpeg.jpeg'
      }],
      defaultProps: {
        children: 'children',
        label: 'label'
      }
    }
  },
  computed: {
    getAudioWidth: function() {
      return this.audioWidth + 'px'
    }
  },
  watch: {
    audioList: {
      handler(newValue) {
        newValue.forEach((item) => {
          if (item.active) {
            this.showAudioControl = true
            return
          }
        })
      },
      deep: true
    }
  },
  mounted() {
    if (this.$route.name === 'Prepare') {
      this.showTeachingVideo = true
      console.log('showTeachingVideo' + this.showTeachingVideo)
    }
  },
  methods: {
    controlAudio() {
      this.audioWidth = 300
      clearTimeout(this.audioControlTimeOut)
      this.audioControlTimeOut = setTimeout(() => {
        this.audioWidth = 0
      }, 6000)
    },
    handleNodeClick(data) {
      this.showMenu = false
    },
    goBack(index) {
      switch (index) {
        case 0: this.$refs.SelectAudioElCarousel.setActiveItem(0)
          break
        case 1: this.$refs.SelectVideoElCarousel.setActiveItem(0)
          break
        case 2: this.$refs.SelectPictureElCarousel.setActiveItem(0)
          break
        case 4: this.$refs.SelectTeachingVideoElCarousel.setActiveItem(0)
          break
      }
    },
    clickAudio() {
      this.$refs.SelectAudioElCarousel.setActiveItem(1)
      this.$refs.PlayElCarousel.setActiveItem(0)
      // 暂停播放视频
      this.$refs.SelectVideoElCarousel.setActiveItem(0)
      this.$refs.SelectTeachingVideoElCarousel.setActiveItem(0)
      this.$refs.video.pause()
    },
    clickVideo() {
      this.$refs.SelectVideoElCarousel.setActiveItem(1)
      this.$refs.PlayElCarousel.setActiveItem(1)
      // 关闭照片
      this.$refs.SelectPictureElCarousel.setActiveItem(0)
      // 暂停播放教学视频
      this.$refs.SelectTeachingVideoElCarousel.setActiveItem(0)
      // 暂停播放音乐
      this.$refs.SelectAudioElCarousel.setActiveItem(0)
      this.$refs.audio.pause()
    },
    clickTeachingVideo() {
      this.$refs.SelectTeachingVideoElCarousel.setActiveItem(1)
      this.$refs.PlayElCarousel.setActiveItem(1)
      // 关闭照片
      this.$refs.SelectPictureElCarousel.setActiveItem(0)
      // 暂停播放辅助视频
      this.$refs.SelectVideoElCarousel.setActiveItem(0)
      // 暂停播放音乐
      this.$refs.SelectAudioElCarousel.setActiveItem(0)
      this.$refs.audio.pause()
      this.$refs.audio.pause()
    },
    clickPicture() {
      this.$refs.SelectPictureElCarousel.setActiveItem(1)
      this.$refs.PlayElCarousel.setActiveItem(2)
      // 关闭辅助视频
      this.$refs.SelectVideoElCarousel.setActiveItem(0)
      // 关闭教学视频
      this.$refs.SelectTeachingVideoElCarousel.setActiveItem(0)
    },
    clickAudioItem(index) {
      this.audioList[index].active = true
      for (let i = 0; i < this.audioList.length; i++) {
        if (i !== index) {
          this.audioList[i].active = false
        }
      }
      this.currentAudioSrc = this.audioList[index].url
      // 关闭视频跑马切换(列表点击也需要切换)
      this.$refs.SelectVideoElCarousel.setActiveItem(0)
      this.$refs.audio.load()
      this.$refs.audio.play()
    },
    clickVideoItem(index) {
      this.videoList[index].active = true
      for (let i = 0; i < this.videoList.length; i++) {
        if (i !== index) {
          this.videoList[i].active = false
        }
      }
      this.currentVideoSrc = this.videoList[index].url
      console.log(this.currentVideoSrc)
      // 关闭音乐跑马切换
      this.$refs.SelectAudioElCarousel.setActiveItem(0)
      this.$refs.video.load()
      this.$refs.video.play()
    },
    clickTeachingVideoItem(index) {
      this.videoTeachingList[index].active = true
      for (let i = 0; i < this.videoTeachingList.length; i++) {
        if (i !== index) {
          this.videoTeachingList[i].active = false
        }
      }
      this.currentVideoSrc = this.videoTeachingList[index].url
      // 关闭音乐跑马切换
      this.$refs.SelectAudioElCarousel.setActiveItem(0)
      this.$refs.video.load()
      this.$refs.video.play()
    },
    clickPictureItem(index) {
      this.pictureList[index].active = true
      for (let i = 0; i < this.pictureList.length; i++) {
        if (i !== index) {
          this.pictureList[i].active = false
        }
      }
      this.$refs.PictureItemEl.setActiveItem(index)
    }

  }
}
</script>

<style lang="scss" scoped>
$audioColor:#67C23A;
$videoColor:#A4A7AB;
$pictureColor:#E6A23C;
$videoTeachingColor: #66B1FF;
.audio-li-active{
  background-color: $audioColor;
  color: white;
}
.video-li-active{
  background-color: $videoColor;
  color: white;
}
.picture-li-active{
  background-color: $pictureColor;
  color: white;
}
.video-teaching-li-active{
  background-color: $videoTeachingColor;
  color: white;
}

.container{
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding-top: 80px;
  background-color: #EEEEEE;
  //班级选择栏
  .div-tree{
    width: 15%;
    margin-right: 30px;
    margin-left: 25px;
    text-align: center;
    .div-tree-title{
      width: 60px;
      height: 60px;
      position: relative;
      top: 38px;
      left: 18px;
      color: white;
      border-radius: 3px;
      background-color: #4CAF50;
      i{
        font-size: 40px;
        line-height: 60px;
      }
    }
    .tree{
      width: 100%;
      height: 700px;
      border-radius: 10px;
      .tree-header{
        width: 100%;
        background-color: #F4F4F4;
        #tree-header-span{
          font-size: 19px;
          line-height: 45px;
          margin-left: 18px;
        }
      }
    }
  }

  .div-play-layout{
    width: 70%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .div-audio-float{
      display: flex;
      align-items: center;
      direction: rtl;
      position: fixed;
      top: 80px;
      right: 80px;
      &:active audio{
        width: 300px;
      }
      audio{
        width: 0;
        transition: all 1s;
      }
      #el-button-float{
        position: relative;
        left: -54px;
        width: 54px;
        height: 54px;
        font-size: 30px;
        animation: linear 3s animation-music infinite;
        text-align: center;
        @keyframes animation-music {
          from{
            transform: rotate(0);
          }
          to{
            transform: rotate(360deg);
          }

        }
      }
    }
    h1{
      width: 80%;
      padding: 15px;
      margin: 0;
      text-align: center;
      border-radius: 50px;
      background-color: #4CAF50;
      position: relative;
      top: 30px;
    }
    //播放控件
    .play{
      display: flex;
      flex-direction: row;
      width: 100%;
      height: 700px;
      background-color: #FFFFFF;
      border-radius: 15px;
      padding: 20px;
      padding-top: 50px;
      //background-color: #4D647D;
      ::v-deep .el-carousel{
        width: 80%;
        height: 100%;
        .el-carousel__container{
          width: 100%;
          height: 100%;
          .div-course-info-page{
            width: 100%;
            height: 100%;
            background-repeat: no-repeat;
            background-size: contain;
            //background-image:url("../../../assets/picture/blackboard4.png");
          }

          video{
            width: 100%;
            height: 100%;
          }
          .el-carousel{
            width: 100%;
            height: 100%;
            .el-image{
              width: 100%;
              height: 100%;
            }
          }
        }
      }
      .select{
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-around;
        width: 20%;
        height: 100%;
        .el-carousel{
          width: 90%;
          height: 100%;
          &:not(:nth-child(1)){
            margin-top: 10px;
          }
          .el-button-select {
            width: 100%;
            height: 100%;
            margin: 0;
            font-size: 20px;
          }
          ::v-deep .el-card{
            width:100%;
            height:100%;
            background-color: #ffffff;
            .el-card__header{
              height: 20%;
              padding: 8px 8px;
              font-size: 16px;
              .el-button--text{
                margin-left: 30%;
                margin-right: 8px;
                width: 20%;
                padding: 0;
              }
            }
            .el-card__body{
              padding: 0;
              height: 100%;
              ul{
                height: 80%;
                padding: 0;
                margin: 0;
                list-style: none;
                overflow-y: auto;
                li{
                  div{
                    width: 100%;
                    font-size: 14px;
                    padding: 8px 8px;
                    &:hover{
                      //border: 1px #4CAF50 solid;
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}

</style>
