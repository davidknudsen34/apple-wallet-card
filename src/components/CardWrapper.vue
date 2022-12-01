<template>
  <div class="card-wrapper absolute w-full" @click="showDetail">
    <card :card="card" :id="`card-${card.slug}`" :mask="true"></card>
  </div>
</template>

<script lang="ts" setup>
import { useIonRouter } from '@ionic/vue'
import { toRefs } from 'vue'

import Card from './Card.vue'
import { createTransactionEnterAnimation } from '../animations/enter'
import { domSelector } from '../utils'
import { ICard, CardWrapperProps } from '../interfaces'

const router = useIonRouter()

interface IProps {
  card: ICard
}

const props = defineProps<CardWrapperProps>()
const { card } = toRefs(props)

const showDetail = (e: MouseEvent) => {
  router.push(`/card/${card.value.slug}`, (baseEl, opts) =>
    createTransactionEnterAnimation(
      baseEl,
      opts,
      domSelector('#app-home', baseEl),
      e.target
    )
  )
}
</script>

<style scoped>
:host {
  display: block;
  position: relative;
}
</style>
