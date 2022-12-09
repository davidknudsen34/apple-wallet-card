<template>
  <div
    :id="`card-wrapper-${card.id}`"
    class="card-wrapper absolute w-full"
    @click="showDetail"
  >
    <card :card="card" :id="`card-${card.id}`" :mask="true"></card>
  </div>
</template>

<script lang="ts" setup>
import { useIonRouter } from '@ionic/vue'
import { toRefs } from 'vue'

import Card from './Card.vue'
import { createTransactionEnterAnimation } from '../animations/enter'
import { domSelector } from '../utils'
import { ICard } from '../interfaces'

const router = useIonRouter()

interface IProps {
  card: ICard
}

const props = defineProps<IProps>()
const { card } = toRefs(props)

const showDetail = () => {
  router.push(`/card/${card.value.id}`, (baseEl, opts) =>
    createTransactionEnterAnimation(
      baseEl,
      opts,
      domSelector('#app-home', baseEl),
      domSelector(`#card-wrapper-${card.value.id}`, baseEl)
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
