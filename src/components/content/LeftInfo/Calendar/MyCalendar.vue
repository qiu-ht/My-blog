<template>
  <div class="calendar">
    <div class="topDate">
      <div class="info">
        <i class="iconfont icon-zuojiantou" @click="toggleMonth('last')"></i>
        <span>{{ monthList[month - 1] }} {{year}}</span>
        <i class="iconfont icon-youjiantou" @click="toggleMonth('next')"></i>
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
          <div class="cell">0</div>
          <div class="cell">0</div>
          <div class="cell">0</div>
          <div class="cell">0</div>
          <div class="cell">0</div>
          <div class="cell">0</div>
          <div class="cell">0</div>
        </div>
        <div class="row">
          <div class="cell">0</div>
          <div class="cell">0</div>
          <div class="cell">0</div>
          <div class="cell">0</div>
          <div class="cell">0</div>
          <div class="cell">0</div>
          <div class="cell">0</div>
        </div>
        <div class="row">
          <div class="cell">0</div>
          <div class="cell">0</div>
          <div class="cell">0</div>
          <div class="cell">0</div>
          <div class="cell">0</div>
          <div class="cell">0</div>
          <div class="cell">0</div>
        </div>
        <div class="row">
          <div class="cell">0</div>
          <div class="cell">0</div>
          <div class="cell">0</div>
          <div class="cell">0</div>
          <div class="cell">0</div>
          <div class="cell">0</div>
          <div class="cell">0</div>
        </div>
        <div class="row">
          <div class="cell">0</div>
          <div class="cell">0</div>
          <div class="cell">0</div>
          <div class="cell">0</div>
          <div class="cell">0</div>
          <div class="cell">0</div>
          <div class="cell">0</div>
        </div>
        <div class="row">
          <div class="cell">0</div>
          <div class="cell">0</div>
          <div class="cell">0</div>
          <div class="cell">0</div>
          <div class="cell">0</div>
          <div class="cell">0</div>
          <div class="cell">0</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Calendar",
  data() {
    return {
      lastmonthDays: 0,
      //上个月最后一天的号数
      lastmonthLastDay: 0,
      lastAndThisMonthDays: 0,
      nextmonthDays: 0,
      today: 0,
      year: 0,
      monthList: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
      month: 0,
    };
  },
  created() {
    this.initCalendarData();
  },
  mounted() {
    this.initCalendar();
  },
  methods: {
    getMonthDayCount(year, month) {
      return new Date(year, month, 0).getDate();
    },
    getLastMonthLastDayWeek(year, month) {
      return new Date(year, month - 1, 0).getDay();
    },
    getLastMonthLastDay(year, month) {
      return new Date(year, month - 1, 0).getDate();
    },
    getCalendarDays() {
      this.lastmonthLastDay = this.getLastMonthLastDay(this.year, this.month);
      //在日历页面出现的上个月的天数，上个月的最后一天是星期几，因为我是星期天在最前面，所以要加一
      this.lastmonthDays =
        this.getLastMonthLastDayWeek(this.year, this.month) + 1;
      //在日历页面出现的上个月和这个月的天数
      this.lastAndThisMonthDays =
        this.lastmonthDays + this.getMonthDayCount(this.year, this.month);
      //在日历页面出现的下个月的天数
      this.nextmonthDays = 42 - this.lastAndThisMonthDays;
    },
    initCalendarData() {
      let date = new Date();
      //几年
      this.year = date.getFullYear();
      //几月
      this.month = date.getMonth() + 1;
      //几日
      this.today = date.getDate();

      this.getCalendarDays();
    },

    initCalendar() {
      let cells = document.querySelectorAll(".cell");
      let cellsArr = Array.from(cells);

      let lastMonthCells = cellsArr.slice(0, this.lastmonthDays),
        ll = lastMonthCells.length;

      let thisMonthCells = cellsArr.slice(
          this.lastmonthDays,
          this.lastAndThisMonthDays
        ),
        tl = thisMonthCells.length;

      let nextMonthCells = cellsArr.slice(this.lastAndThisMonthDays, 42),
        nl = nextMonthCells.length;

      if (this.month === new Date().getMonth() + 1) {
        //给当天加上active
        cellsArr[this.today + this.lastmonthDays - 1].classList.add("active");
      }

      //填写当月日
      for (let i = 0; i < tl; i++) {
        thisMonthCells[i].innerHTML = i + 1;
      }

      //移除全部浅色样式
      for (let i = 0; i < 42; i++) {
        cellsArr[i].classList.remove("lastAndNextmonth");
      }

      //填写上月日和添加浅色样式
      for (let i = ll - 1; i >= 0; i--) {
        lastMonthCells[i].innerHTML = this.lastmonthLastDay;
        this.lastmonthLastDay--;
        lastMonthCells[i].classList.add("lastAndNextmonth");
      }

      //填写下月日和添加浅色样式
      for (let i = 0; i < nl; i++) {
        nextMonthCells[i].innerHTML = i + 1;
        nextMonthCells[i].classList.add("lastAndNextmonth");
      }
    },
    toggleMonth(command) {
      //移除选中样式
      let cells = document.querySelectorAll(".cell");
      let cellsArr = Array.from(cells);
      cellsArr[this.today + this.lastmonthDays - 1].classList.remove("active");

      //切换月
      if(command==='last'){
        if(this.month===1){
          this.year--
          this.month = 12
        }else{
          this.month--
        }
      }else{
        if(this.month === 12){
          this.year++
          this.month = 1
        }else{
          this.month++
        }
        
      }

      this.getCalendarDays();

      this.initCalendar();
    },
  },
};
</script>

<style scoped lang="less">
.calendar {
  width: 100%;
  height: 400px;
  background-color: #6ab8f9;
  box-shadow: 0 0 5px black;
  margin-bottom: 20px;
  overflow: hidden;
  .topDate {
    width: 100%;
    height: 80px;
    // background-color: red;
    position: relative;
    .info {
      position: absolute;
      // background-color: #bfa;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      span {
        margin: 0 10px;
        color: aliceblue;
      }
      i {
        color: aliceblue;
        cursor: pointer;
      }
    }
  }
  .mainInfo {
    width: 100%;
    height: 310px;
    // background-color: blue;
    padding-top: 10px;
    background-color: aliceblue;
    .week {
      width: 100%;
      display: flex;
      // background-color: aliceblue;
      justify-content: space-evenly;
      font-size: 15px;
      color: #378ef8;
    }
    .day {
      margin-top: 20px;

      .row {
        display: flex;
        justify-content: space-evenly;
        line-height: 30px;
        margin-top: 10px;
        .cell {
          width: 30px;
          text-align: center;
          font-size: 12px;
          cursor: pointer;
          transition: 00.2s;
        }
        .cell:hover {
          background-color: #3da7ed;
        }
        .active {
          background-color: #3da7ed;
        }
      }

      .lastAndNextmonth {
        color: #ccc;
      }
    }
  }
}
</style>
