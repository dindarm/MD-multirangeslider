<template>
  <div class="content">
    <div ref="mdSlider" class="slider">
      <div class="slider-touch-left" ref="mdSliderTLeft" @mousedown="onStart('l', $event)"
        @touchstart="onStart('l', $event)">
        <span class="sliderLeftSpan" :style="{backgroundColor: thumbColor, borderColor: thumbBorderColor}"></span>
      </div>
      <div class="slider-touch-right" ref="mdSliderTRight" @mousedown="onStart('r', $event)"
        @touchstart="onStart('r', $event)">
        <span class="sliderRightSpan" :style="{backgroundColor: thumbColor, borderColor: thumbBorderColor}"></span>
      </div>
      <div class="slider-line" ref="mdSliderLineTrack" :style="{backgroundColor: trackColor}">
        <span ref="mdSliderLineSpan" :style="{backgroundColor: rangeColor}"></span>
      </div>
    </div>
  </div>

  <div>

  </div>
</template>

<script lang="ts">
import { defineComponent,
  nextTick,
  onMounted,
  ref } from 'vue'

export default defineComponent({
  name: 'MdMultiRangeSelector',
  props: {
    minThreshold: {
      type: Number,
      default: -100
    },
    maxThreshold: {
      type: Number,
      default: 100
    },
    step: {
      type: Number,
      default: 1
    },
    min: {
      type: Number,
      required: true
    },
    max: {
      type: Number,
      required: true
    },
    thumbColor: {
      type: String,
      default: '#1E88E5'
    },
    thumbBorderColor: {
      type: String,
      default: '#1E88E5'
    },
    trackColor: {
      type: String,
      default: '#F5F5F5'
    },
    rangeColor: {
      type: String,
      default: '#1E88E5'
    }
  },
  emits: ['update:min', 'update:max'],
  setup (options, { emit }) {
    const mdSlider = ref(document.getElementById('ali'))
    const mdSliderTLeft = ref(document.getElementById('ali'))
    const mdSliderTRight = ref(document.getElementById('ali'))
    const mdSliderLineSpan = ref(document.getElementById('ali'))
    const mdSliderLineTrack = ref(document.getElementById('ali'))

    const bodyRect = document.body.getBoundingClientRect()

    let clickedMovingSlider: string | null = null

    let sliderOffset = 0
    let sliderWidth = 0
    let sliderUnits = 0

    let currMin = 0
    let currMax = 0

    const leftSliderPos = (): number => {
      return parseInt(sliderUnits * (currMin - options.minThreshold) + '')
    }

    const rightSliderPos = (): number => {
      return parseInt(sliderUnits * (currMax - options.minThreshold) + '')
    }

    const updateDisplay = () => {
      if (mdSliderTLeft.value && mdSlider.value && mdSliderLineSpan.value && mdSliderTRight.value) {
        const lsp = leftSliderPos()
        const rsp = rightSliderPos()
        mdSliderTLeft.value.style.left = lsp + 'px'
        mdSliderTRight.value.style.left = rsp + 'px'

        mdSliderLineSpan.value.style.marginLeft = mdSliderTLeft.value.style.left
        const sllLeft = parseInt(mdSliderLineSpan.value.style.marginLeft)
        const sllRight = parseInt(mdSliderTRight.value.style.left)
        mdSliderLineSpan.value.style.width = (sllRight - sllLeft) + 'px'
      }
    }

    const onMove = (event: Event) => {
      if (clickedMovingSlider === null) {
        return
      }
      let eventTouch: Touch | Event | null = null
      const te = (event as TouchEvent)
      const me = (event as MouseEvent)

      if (te.touches) {
        eventTouch = te.touches[0]
      }

      const screenX = me.screenX || eventTouch?.screenX || 0

      if (mdSliderTLeft.value && mdSlider.value && mdSliderLineSpan.value && mdSliderTRight.value) {
        if (clickedMovingSlider === 'l') {
          const lPos = screenX - sliderOffset - bodyRect.x
          const calcMin = Math.max((options.minThreshold + (lPos / sliderUnits)), options.minThreshold)

          if (calcMin < currMax) {
            currMin = calcMin
            emit('update:min', parseInt(calcMin + ''))
          }
        } else if (clickedMovingSlider === 'r') {
          const rPos = screenX - sliderOffset - bodyRect.x
          const calcMax = Math.min((options.minThreshold + (rPos / sliderUnits)), options.maxThreshold)

          if (calcMax > currMin) {
            currMax = calcMax
            emit('update:max', parseInt(currMax + ''))
          }
        }

        updateDisplay()
      }
    }

    const onStop = () => {
      clickedMovingSlider = null
    }

    document.addEventListener('mousemove', onMove)
    document.addEventListener('mouseup', onStop)
    document.addEventListener('touchmove', onMove)
    document.addEventListener('touchend', onStop)

    const onStart = (p: string, event: Event) => {
      clickedMovingSlider = p
      event.preventDefault()
      let eventTouch: Touch | Event | null = null
      const te = (event as TouchEvent)
      const me = (event as MouseEvent)

      if (te.touches) {
        eventTouch = te.touches[0]
      }

      const met = me.target
      if (met) {
        console.log((met as Element).className)
      }

      console.log('onStart')
    }

    onMounted(() => {
      console.log('onMounted')

      currMin = Math.max(options.min, options.minThreshold)
      currMax = Math.min(options.max, options.maxThreshold)

      nextTick(() => {
        if (mdSliderLineTrack.value) {
          sliderOffset = mdSliderLineTrack.value.getBoundingClientRect().x
          console.log(sliderOffset)

          sliderWidth = mdSliderLineTrack.value.getBoundingClientRect().width
          sliderUnits = sliderWidth / (options.maxThreshold - options.minThreshold)
        }

        updateDisplay()
      })
    })

    return {
      mdSlider,
      mdSliderTLeft,
      mdSliderTRight,
      mdSliderLineSpan,
      mdSliderLineTrack,
      onStart
    }
  }
})

</script>

<style scoped>
  .slider {
    display: block;
    position: relative;
    height: 36px;
    width: 100%;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    -o-user-select: none;
    user-select: none;
  }

  .slider .slider-touch-left,
  .slider .slider-touch-right {
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    display: block;
    position: absolute;
    height: 36px;
    width: 36px;
    padding: 6px;
    z-index: 2;
    left: 0px;
    margin-left: 0px;
  }

  .slider .slider-touch-left span,
  .slider .slider-touch-right span {
    display: block;
    width: 100%;
    height: 100%;
    border: 1px solid #d9d9d9;
    border-radius: 50%;
    margin-left: 0px;
  }

  .slider .slider-line {
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    position: absolute;
    width: calc(100% - 36px);
    left: 18px;
    top: 16px;
    height: 4px;
    border-radius: 4px;
    z-index: 0;
    overflow: hidden;
  }

  .slider .slider-line span {
    display: block;
    height: 100%;
    width: 0%;
  }

</style>
