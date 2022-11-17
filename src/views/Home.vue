<template>
  <ion-page id="app-home">
    <ion-content class="ion-padding" ref="demo" v-wheel="wheelHandler">
      <div class="header">
        <ion-title class="float-left text-[34px] font-black">Wallet</ion-title>
        <ion-button
          class="transform-top-left text-white pointer-events-none absolute left-0 opacity-0 font-semibold m-0 float-left"
          fill="clear"
          >Done</ion-button
        >

        <ion-icon
          name="add-circle"
          slot="icon-only"
          class="float-right add-to-wallet trans text-[32px] my-2 mx-0"
        >
        </ion-icon>
        <ion-icon
          name="ellipsis-horizontal-circle-sharp"
          class="pointer-events-none absolute right-0 transform-top-left opacity-0 text-[28px] m-0 float-right"
        ></ion-icon>
        <div class="float-clear"></div>
      </div>

      <div class="card-groups mt-[10px]">
        <div
          class="card-group w-full relative block trans-slow"
          v-for="(card, index) in nftCardGroups"
          :key="index"
          :style="{
            top: `${generateCardOffset(index)}px`,
          }"
        >
          <card-group :card="card" />
        </div>
      </div>
      <ion-infinite-scroll
        :style="{
          marginTop: `${
            generateCardOffset(nftCardGroups.length) + 250
          }px !important`,
        }"
        @ionInfinite="ionInfinite"
      >
        <ion-infinite-scroll-content
          loading-text="Please wait..."
          loading-spinner="circles"
        ></ion-infinite-scroll-content>
      </ion-infinite-scroll>
    </ion-content>
  </ion-page>
</template>

<script lang="ts" setup>
import { onMounted, ref, computed, watch, reactive } from 'vue'
import {
  IonContent,
  IonButton,
  IonPage,
  IonTitle,
  IonIcon,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
  IonInfiniteCustomEvent,
  IonSpinner,
} from '@ionic/vue'

import CardGroup from '../components/CardGroup.vue'
import store from '../store'
import { ICard } from '../interfaces'

const nftCardGroups = ref<Array<ICard>>([]) // change reactive
let offset = 0
const nftCardList = computed(() => store.state.nftCardList)

onMounted(async () => {
  await store.dispatch('mutateNftCardListAsync', offset)
})

function generateCardOffset(index: number) {
  return (space.value + gap.value) * index
}

watch(nftCardList, () => {
  if (nftCardList) {
    nftCardGroups.value = nftCardList.value
  }
})

const loadmore = async (offset: number) => {
  try {
    await store.dispatch('mutateNftCardListAsync', offset)
    nftCardGroups.value = nftCardList.value
  } catch (error) {
    console.error('error', error)
  }
}

const ionInfinite = (ev: IonInfiniteCustomEvent) => {
  offset++
  loadmore(offset)
  setTimeout(() => ev.target.complete(), 1000)
}

const demo = ref()
const space = ref(45)
const gap = ref(10)
const isWheeling = ref(false)
const prevY = ref<null | number>(0)
const timer = ref<NodeJS.Timer | null>(null)
const step = ref(0.5)

type wheelHandlerProps = {
  movement: [x: number, y: number]
  wheeling: any
}

const wheelHandler = ({ movement: [x, y], wheeling }: wheelHandlerProps) => {
  isWheeling.value = wheeling

  if (isWheeling.value) {
    if (timer.value) {
      clearInterval(timer.value)
      step.value = 0.2
    }
    if (prevY.value !== null) {
      const delta = (y - prevY.value) / 50.0
      gap.value = Math.max(7, Math.min(50, gap.value + delta))
    }
    prevY.value = y
  } else {
    timer.value = setInterval(() => {
      if (gap.value === 10) {
        clearInterval(timer.value as NodeJS.Timer)
        step.value = 0.2
      } else {
        if (gap.value > 10) {
          gap.value = Math.max(gap.value - step.value, 10)
        } else if (gap.value < 10) {
          gap.value = Math.min(gap.value + step.value, 10)
        }
        step.value += 0.2
      }
    }, 10)
    prevY.value = null
  }
}
</script>

<style scoped>
ion-content {
  --padding-top: calc(50px + var(--ion-safe-area-top));
}

.header {
  position: relative;
}

.header .transform-top-left {
  transform-origin: top left;
}

ion-title {
  position: relative;
  height: auto;
  padding: 0;
  width: 150px;
  min-width: auto;
  transform-origin: top left;
}

.add-to-wallet {
  transform-origin: top right;
}

.add-to-wallet:active {
  opacity: 0.7;
}

.card-groups {
  z-index: 1;
}

.card-groups [data-v-9d82030b] {
  text-align: center;
}

.card-group {
  transform-origin: top;
}
</style>
