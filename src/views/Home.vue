<template>
  <ion-page id="app-home">
    <ion-content
      class="ion-padding"
      :scroll-events="true"
      @ion-scroll="ionScroll"
      @ion-scroll-end="ionScrollEnd"
      :force-overscroll="false"
    >
      <div class="height-100"></div>
      <div class="header">
        <ion-title class="font-poppins float-left text-[34px] font-black"
          >Wallet</ion-title
        >
        <ion-button
          class="transform-top-left font-poppins text-white pointer-events-none absolute left-0 opacity-0 font-semibold m-0 float-left"
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

      <div v-if="isLoading" class="`card-groups mt-[10px]">
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
      <div v-else class="text-center">
        <ion-spinner class="mt-[50%]"></ion-spinner><br />
        <ion-label class="">Please wait...</ion-label>
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
          v-if="isLoading"
          loading-text="Please wait..."
          loading-spinner="circles"
        ></ion-infinite-scroll-content>
      </ion-infinite-scroll>
    </ion-content>
  </ion-page>
</template>

<script lang="ts" setup>
import { onMounted, ref, computed, watch } from 'vue'
import {
  IonContent,
  IonButton,
  IonPage,
  IonLabel,
  IonTitle,
  IonIcon,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
  IonInfiniteCustomEvent,
  IonSpinner,
} from '@ionic/vue'
import { IonContentCustomEvent, ScrollDetail } from '@ionic/core'

import CardGroup from '../components/CardGroup.vue'
import store from '../store'
import { ICard } from '../interfaces'

const nftCardGroups = ref<Array<ICard>>([]) // change reactive
const isLoading = ref(false)
let offset = 0
const space = ref(45)
const gap = ref(10)
const prevY = ref<null | number>(0)
const timer = ref<NodeJS.Timer | null>(null)
const scrollTimer = ref<NodeJS.Timer | null>(null)
const step = ref(0.7)
const nftCardList = computed(() => store.state.nftCardList)

const ionScroll = (e: IonContentCustomEvent<ScrollDetail>) => {
  let y = e.detail.scrollTop
  prevY.value = e.detail.startY
  console.log('e.detail.scrollTop', e.detail.scrollTop)

  if (e.detail.scrollTop < 150 + 1) {
    if (timer.value) {
      clearInterval(timer.value)
      step.value = 0.3
    }
    if (prevY.value !== null) {
      const delta = (y - prevY.value) / 60.0
      gap.value = Math.max(10, Math.min(20, gap.value - delta))
    }
    prevY.value = y
  } else {
    if (timer.value) {
      clearInterval(timer.value)
      step.value = 0.3
    }
    if (prevY.value !== null) {
      const delta = (y - prevY.value) / 60.0
      gap.value = Math.max(10, Math.min(15, gap.value - delta))
    }
  }
}

const ionScrollEnd = () => {
  timer.value = setInterval(() => {
    if (gap.value === 10) {
      clearInterval(timer.value as NodeJS.Timer)
      step.value = 0.3
    } else {
      if (gap.value > 10) {
        gap.value = Math.max(gap.value - step.value, 10)
      } else if (gap.value < 10) {
        gap.value = Math.min(gap.value + step.value, 10)
      }
      step.value += 0.3
    }
  }, 20)
  prevY.value = null

  if (!scrollTimer.value) {
    scrollTimer.value = setInterval(() => {
      const element = document.querySelector('ion-content')
      const shadowElement = element?.shadowRoot?.querySelector(
        'main'
      ) as HTMLElement
      if (shadowElement.scrollTop < 150)
        shadowElement.scrollTop = Math.min(150, shadowElement.scrollTop + 5)
    }, 20)
  }
}

onMounted(async () => {
  await store.dispatch('mutateNftCardListAsync', offset)
  isLoading.value = true
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
  setTimeout(() => ev.target.complete(), 1500)
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

/* ion-content::part(scroll) {
  margin-top: -150px;
  padding-top: 350px;
} */

.height-100 {
  height: 150px;
}
</style>
