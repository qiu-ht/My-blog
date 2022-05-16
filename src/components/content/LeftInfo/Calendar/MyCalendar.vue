<template>
  <div class="calendar">
      <div class="topDate">
        <div class="info">
          <i class="iconfont icon-zuojiantou"></i>
          <span>May 2022</span>
          <i class="iconfont icon-youjiantou"></i>
        </div>
      </div>
      <div class="mainInfo">
        <div class="week">
          <span>SUN</span>
          <span>MON</span>
          <span>TUE</span>
          <span>WED</span>
          <span>THU</span>
          <span>FRI</span>
          <span>SAT</span>
        </div>
        <div class="day">
          <div class="row">
            <div class="cell">24</div>
            <div class="cell">25</div>
            <div class="cell">26</div>
            <div class="cell">27</div>
            <div class="cell">28</div>
            <div class="cell">29</div>
            <div class="cell">30</div>
          </div>
          <div class="row">
            <div class="cell">1</div>
            <div class="cell">2</div>
            <div class="cell">3</div>
            <div class="cell">4</div>
            <div class="cell">5</div>
            <div class="cell">6</div>
            <div class="cell">7</div>
          </div>
          <div class="row">
            <div class="cell">8</div>
            <div class="cell">9</div>
            <div class="cell">10</div>
            <div class="cell">11</div>
            <div class="cell">12</div>
            <div class="cell">13</div>
            <div class="cell">14</div>
          </div>
          <div class="row">
            <div class="cell active">15</div>
            <div class="cell">16</div>
            <div class="cell">17</div>
            <div class="cell">18</div>
            <div class="cell">19</div>
            <div class="cell">20</div>
            <div class="cell">21</div>
          </div>
          <div class="row">
            <div class="cell">22</div>
            <div class="cell">23</div>
            <div class="cell">24</div>
            <div class="cell">25</div>
            <div class="cell">26</div>
            <div class="cell">27</div>
            <div class="cell">28</div>
          </div>
          <div class="row">
            <div class="cell">29</div>
            <div class="cell">30</div>
            <div class="cell">31</div>
            <div class="cell">1</div>
            <div class="cell">2</div>
            <div class="cell">3</div>
            <div class="cell">4</div>
          </div>
        </div>
      </div>
      
  </div>
</template>

<script>
export default {
  name:'Calendar',
  data() {
    return {
      
    }
  },
  mounted() {
    
  },
  methods:{ 
    getMonthDayCount(year,month){
      return new Date(year,month,0).getDate()
    }
  }
}
</script>

<style scoped lang="less">
  .calendar{
    width: 100%;
    height: 400px;
    background-color: #6ab8f9;
    box-shadow: 0 0 5px black;
    margin-bottom: 20px;
    overflow: hidden;
    .topDate{
      width: 100%;
      height: 80px;
      // background-color: red;
      position: relative;
      .info{
        position: absolute;
        // background-color: #bfa;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
        span{
          margin: 0 10px;
          color: aliceblue;
        }
        i{
          color: aliceblue;
          cursor: pointer;
        }
      }
    }
    .mainInfo{
      width: 100%;
      height: 310px;
      // background-color: blue;
      padding-top: 10px;
      background-color: aliceblue;
      .week{
        width: 100%;
        display: flex;
        // background-color: aliceblue;
        justify-content: space-evenly;
        font-size: 15px;
        color: #378ef8;
      }
      .day{
        margin-top: 20px;
        
        .row{
          display: flex;
          justify-content: space-evenly;
          line-height: 30px;
          margin-top: 10px;
          .cell{
            width: 30px;
            text-align: center;
            font-size: 12px;
            cursor: pointer;
            transition: 00.2s;
          }
          .cell:hover{
            background-color: #3da7ed;
          }
          .active{
            background-color: #3da7ed;
          }
        }
      }
    }
  }
</style>