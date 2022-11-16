<template>
  <div class="card-wrapper absolute w-full" @click="showDetail">
    <card :card="card" :id="`card-${card.slug}`" :mask="true"></card>
  </div>
</template>

<script lang="ts" setup>
import { useIonRouter } from '@ionic/vue'

import { createTransactionEnterAnimation } from '../animations/enter'

import Card from '../components/Card.vue'
import { ICard } from '../interfaces'

interface IProps {
  card: ICard
}

const router = useIonRouter()

const props = defineProps<IProps>()
const { card } = props

const presentingEl = document.querySelector('#app-home') as HTMLElement

const showDetail = (e: MouseEvent) => {
  router.push(`/card/${card.slug}`, (baseEl, opts) =>
    createTransactionEnterAnimation(baseEl, opts, presentingEl, e.target)
  )
}
</script>

<style scoped>
:host {
  display: block;
  position: relative;
}
</style>
