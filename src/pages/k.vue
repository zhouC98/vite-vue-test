<template>
  <div id="app2">
    <div>
      <input v-model="Symbol" type="text" class="border border-gray-600" />
      <button @click="changeSymbol" class="ml-1 border border-gray-600">
        切换股票
      </button>
    </div>
    <span class="mx-1" @click="CreateDrawPciture('线段')">线段</span>
    <span class="mx-1" @click="CreateDrawPciture('射线')">射线</span>
    <span class="mx-1" @click="CreateDrawPciture('水平线')">水平线</span>
    <span class="mx-1" @click="CreateDrawPciture('趋势线')">趋势线</span>
    <span class="mx-1" @click="CreateDrawPciture('矩形')">矩形</span>
    <span class="mx-1" @click="CreateDrawPciture('圆弧线')">圆弧线</span>
    <span class="mx-1" @click="CreateDrawPciture('M头W底')">M头W底</span>
    <span class="mx-1" @click="ClearChartDrawPicture()">删除</span>

    <div id="minute" ref="minute"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, onUnmounted, reactive, ref } from 'vue'
import type { Ref } from 'vue'
import HQChart from 'hqchart'
import logoImg from '../assets/logo.png'
function DefaultData() {}
DefaultData.GetMinuteOption = function () {
  const option = {
    Type: '历史K线图', //创建图形类型

    //窗口指标
    Windows: [
      // { Index: 'MA', Modify: false, Change: false },
      {
        Script:
          'B1:=WEEK==N;\n\
          S1:=WEEK==N2;\n\
          MA10:MA(C,10);\n\
          MA20:MA(C,20);\n\
          DRAWICON(B1,L*0.97,13);\n\
          DRAWICON(S1,H*1.03,14);',
        Args: [
          { Name: 'N', Value: 10 },
          { Name: 'N2', Value: 20 },
        ],
        Name: '我的指标',
        Modify: true,
        Change: false,
      },
      { Index: 'VOL', Modify: false, Change: false },
      { Index: 'RSI', Modify: false, Change: false },
    ],

    Symbol: '600000.sh',
    IsAutoUpdate: true, //是自动更新数据
    // TradeIndex: {Index:'交易系统-BIAS'},    //交易系统

    // IsShowRightMenu: true, //右键菜单
    IsShowCorssCursorInfo: true, //是否显示十字光标的刻度信息

    //K线设置
    KLine: {
      DragMode: 1, //拖拽模式 0 禁止拖拽 1 数据拖拽 2 区间选择
      Right: 1, //复权 0 不复权 1 前复权 2 后复权
      Period: 0, //周期 0 日线 1 周线 2 月线 3 年线
      MaxReqeustDataCount: 1000, //数据个数
      PageSize: 50, //一屏显示多少数据
      // Info:["互动易","大宗交易",'龙虎榜',"调研","业绩预告","公告"],       //信息地雷
      IsShowTooltip: false, //是否显示K线提示信息
    },

    //标题设置
    KLineTitle: {
      IsShowName: true, //不显示股票名称
      IsShowSettingInfo: true, //不显示周期/复权
    },

    //边框
    Border: {
      Left: 1, //左边间距
      Right: 60, //右边间距
      Bottom: 25, //底部间距
      Top: 25, //顶部间距
    },

    //子框架设置
    Frame: [
      { SplitCount: 3, StringFormat: 0, IsShowLeftText: false },
      { SplitCount: 2, StringFormat: 0, IsShowLeftText: false },
      { SplitCount: 2, StringFormat: 0, IsShowLeftText: false },
    ],
  }
  return option
}

export default defineComponent({
  setup() {
    const Symbol = ref('600519.sh')
    const minute: Ref<any> = ref(null)
    const Minute = reactive({
      JSChart: null,
      Option: DefaultData.GetMinuteOption(),
    })

    onMounted(() => {
      console.log(import.meta.env)
      const img = new Image()
      img.src = logoImg
      img.onload = () => {
        console.log(img);
      }
      OnSize()
      window.onresize = () => {
        OnSize()
      }
      CreateMinuteChart()
      
    })
    onUnmounted(() => {
      ;(Minute.JSChart as any).ChartDestory()
    })
    const changeSymbol = () => {
      ;(Minute.JSChart as any).ChangeSymbol(Symbol.value)
    }
    const OnSize = () => {
      var chartHeight = window.innerHeight - 30
      var chartWidth = window.innerWidth - 30
      minute.value.style.width = chartWidth - 200 + 'px'
      minute.value.style.height = chartHeight - 200 + 'px'

      if (Minute.JSChart) (Minute.JSChart as any).OnSize()
    }

    const CreateMinuteChart = () => {
      if (Minute.JSChart) return
      Minute.Option.Symbol = Symbol.value

      let chart = HQChart.Chart.JSChart.Init(minute.value)
      chart.SetOption(Minute.Option)

      //选中图形事件
      chart.AddEventCallback({
        event: HQChart.Chart.JSCHART_EVENT_ID.ON_CLICK_DRAWPICTURE,
        callback: (event: any, data: any, obj: any) => {
          OnClickDrawPicture(event, data, obj)
        },
      })

      //完成图形事件
      chart.AddEventCallback({
        event: HQChart.Chart.JSCHART_EVENT_ID.ON_FINISH_DRAWPICTURE,
        callback: (event: any, data: any, obj: any) => {
          OnClickDrawPicture(event, data, obj)
        },
      })

      chart.AddEventCallback({
        event: HQChart.Chart.JSCHART_EVENT_ID.ON_CLICK_INDEXTITLE,
        callback: (event: any, data: any, obj: any) => {
          OnClickDrawPicture(event, data, obj)
        },
      })
      
      
      Minute.JSChart = chart
    }

    const OnClickDrawPicture = (event: any, data: any, obj: any) => {
      console.log('[KLineChart::OnClickDrawPicture] data', data, obj)
    }
    const CreateDrawPciture = (name: string) => {
      var drawOption = {
        LineColor: '#4169E1', //线段颜色
        LineWidth: 1, //线段宽度
        PointColor: 'rgb(255,130,71)', //点颜色
      }
      ;(Minute.JSChart as any).CreateChartDrawPicture(name, drawOption)
    }
    const ClearChartDrawPicture = () => {
      ;(Minute.JSChart as any).ClearChartDrawPicture()
    }
    return {
      CreateDrawPciture,
      ClearChartDrawPicture,
      Symbol,
      minute,
      changeSymbol,
      Minute,
    }
  },
})
</script>
