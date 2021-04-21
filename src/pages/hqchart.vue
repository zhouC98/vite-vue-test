<template>
  <div>
    <div>
      <input v-model="Symbol" type="text" class="border border-gray-600"> 
      <button @click="changeSymbol" class="ml-1 border border-gray-600">切换股票</button>
    </div>
    <span class='mx-1' @click="CreateDrawPciture('线段')">线段</span>
    <span class='mx-1' @click="CreateDrawPciture('射线')">射线</span>
    <span class='mx-1' @click="CreateDrawPciture('水平线')">水平线</span>
    <span class='mx-1' @click="CreateDrawPciture('趋势线')">趋势线</span>
    <span class='mx-1' @click="CreateDrawPciture('矩形')">矩形</span>
    <span class='mx-1' @click="CreateDrawPciture('圆弧线')">圆弧线</span>
    <span class='mx-1' @click="CreateDrawPciture('M头W底')">M头W底</span>
    <span class='mx-1' @click="ClearChartDrawPicture()">删除</span>

    <div id="minute" ref="minute"></div>

  </div>
  <el-button class="focus:outline-none" :loading="true" @click="elClick">element-button</el-button>

  <button type="button" class="inline-flex items-center px-4 py-2 border border-transparent text-base leading-6 font-medium rounded-md text-white bg-red-600 hover:bg-red-500 focus:border-red-700 active:bg-red-700 transition ease-in-out duration-150 cursor-not-allowed" disabled>
    <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
    Processing
  </button>

  <el-dialog
    title="提示"
    v-model="dialogVisible"
    width="30%"
    :before-close="beforeDone">
    <span>这是一段信息</span>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="priClick">确 定</el-button>
      </span>
    </template>
  </el-dialog>

</template>

<script lang="ts">
import { defineComponent, onMounted, onUnmounted, reactive, ref } from "vue";
import HQChart from 'hqchart'
import { ElMessage } from 'element-plus'
function DefaultData() {}
DefaultData.GetMinuteOption = function() {
  var option = {
    Symbol: '',
    Type: '分钟走势图', //创建图形类型
    //窗口指标
    Windows: [
      { Index: 'MACD', Modify: true, Change: false },
    ],

    IsAutoUpdate: true, //是自动更新数据
    DayCount: 1, //1 最新交易日数据 >1 多日走势图
    IsShowCorssCursorInfo: true, //是否显示十字光标的刻度信息
    // IsShowRightMenu: true, //是否显示右键菜单
    // CorssCursorTouchEnd: false,
    MinuteLine: {
      IsDrawAreaPrice: true, //是否画价格面积图
    },
    

    //边框
    Border: {
      Left: 60, //左边间距
      Right: 60, //右边间距
      Top: 20,
      Bottom: 20,
    },

    //子框架设置
    Frame: [
      { SplitCount: 3,Height: 5, StringFormat: 0 },
      { SplitCount: 2,Height: 2, StringFormat: 0 },
      { SplitCount: 3,Height: 2, StringFormat: 0 },
    ],

    //扩展图形
    ExtendChart: [
      // {Name:'Tooltip' }  //手机端tooltip
    ],
    DrawTool: {
      StorageKey:'4E7EA133-D6C8-4776-9869-1DDDCC5FA745'
    },
  }
  return option
}

export default defineComponent({
  setup() {
    const dialogVisible = ref(false)
    const Symbol = ref('600519.sh')
    const minute = ref<HTMLElement>(null)
    const Minute = reactive({
      JSChart: null,
      Option: DefaultData.GetMinuteOption(),
    })
    
    onMounted(() => {
      console.log(import.meta.env)
      
      OnSize()
      window.onresize = () => {
        OnSize()
      } 
      CreateMinuteChart()
    })
    onUnmounted(() => {
      (Minute.JSChart as any).ChartDestory()
    })
    const changeSymbol = () => {
      (Minute.JSChart as any).ChangeSymbol(Symbol.value)
    }
    const OnSize = () => {
      var chartHeight = window.innerHeight - 30
      var chartWidth = window.innerWidth - 30
      minute.value.style.width = chartWidth - 500 + 'px'
      minute.value.style.height = chartHeight - 500 + 'px'

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
        callback:(event: any, data: any, obj: any)=>{ OnClickDrawPicture(event,data,obj); }
      })

      //完成图形事件
      chart.AddEventCallback( {
          event:HQChart.Chart.JSCHART_EVENT_ID.ON_FINISH_DRAWPICTURE, 
          callback:(event: any, data: any, obj: any)=>{ OnClickDrawPicture(event,data,obj); }
      });

      chart.AddEventCallback( {
          event:HQChart.Chart.JSCHART_EVENT_ID.ON_CLICK_INDEXTITLE, 
          callback:(event: any, data: any, obj: any)=> { OnClickDrawPicture(event,data,obj);}
      });
      console.log(HQChart.Chart.JSCHART_EVENT_ID)
      Minute.JSChart = chart
    }

    const OnClickDrawPicture = (event: any, data: any, obj: any) => {
      console.log('[KLineChart::OnClickDrawPicture] data', data, obj);
    }
    const CreateDrawPciture = (name: string) => {
       var drawOption = {
          LineColor:'#4169E1',    //线段颜色
          LineWidth:1,            //线段宽度
          PointColor:'rgb(255,130,71)'    //点颜色
      };
      (Minute.JSChart as any).CreateChartDrawPicture(name, drawOption)
    }
    const ClearChartDrawPicture = () => {
      (Minute.JSChart as any).ClearChartDrawPicture()
    }
    const elClick = () => {
      dialogVisible.value = true
    }
    const priClick = () => {
      ElMessage.warning('警告消息')
    }
    const beforeDone = (done) => {
      done()
    }
    return {
      CreateDrawPciture,
      ClearChartDrawPicture,
      Symbol,
      minute,
      changeSymbol,
      Minute,
      elClick,
      dialogVisible,
      priClick,
      beforeDone
    }
  }
})
</script>

