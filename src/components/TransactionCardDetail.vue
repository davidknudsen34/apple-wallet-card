<template>
  <ion-content id="transaction-card-detail" class="ion-padding relative">
    <div class="card-wrapper">
      <card
        :card="group"
        :id="`transaction-${group.slug}`"
        :mask="false"
        @click="goBack"
      ></card>
    </div>

    <div class="transactions-list absolute top-[270px]">
      <span
        class="font-poppins font-light text-sm leading-5 tracking-[0.5px] opacity-[.4] mix-blend-normal"
      >
        A limited NFT collection where the token itself doubles as your
        membership as your membership to a swamp club for apes. The club is
        open! Ape in with us.
      </span>
      <br />
    </div>
  </ion-content>
</template>

<script lang="ts" setup>
import {
  IonIcon,
  IonItem,
  IonContent,
  IonList,
  IonListHeader,
  IonLabel,
  useIonRouter,
} from '@ionic/vue'

import Card from './Card.vue'
import { createTransactionLeaveAnimation } from '../animations/leave'
import { ICard } from '../interfaces'

interface IProps {
  group: ICard
}

const props = defineProps<IProps>()
const { group } = props
const router = useIonRouter()

const presentingEl = document.querySelector('#app-home') as HTMLElement

const goBack = () => {
  router.push('/home', (baseEl, opts) =>
    createTransactionLeaveAnimation(
      baseEl,
      opts,
      presentingEl,
      baseEl.querySelector(`#transaction-${group.slug} .card`) as HTMLElement,
      baseEl.querySelector(`#card-${group.slug}`) as HTMLElement
    )
  )
}
</script>

<style scoped>
ion-header ion-toolbar {
  --border-width: 0px;
  --background: black;
}

ion-content {
  --padding-bottom: 20px;
}

ion-list-header,
ion-list {
  padding: 0;
  margin: 0 !important;
}

ion-list-header {
  font-size: 22px;
  color: white;
}

ion-list {
  border-radius: 10px !important;
}

ion-item {
  --padding-start: 12px;
  --padding-top: 6px;
}

ion-item .transaction-detail .price {
  font-size: 16px;
}

.bg-transaction::part(native) {
  background-color: #1a1a1a;
  padding-left: 0px;
}

.transactions-list {
  width: calc(100% - 32px);
  animation: transactionList 2s;
}

@keyframes transactionList {
  from {
    top: 5000px;
  }
  to {
    top: 270px;
  }
}
</style>
