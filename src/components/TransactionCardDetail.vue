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
      <ion-list-header>
        <ion-label>Latest Transactions</ion-label>
      </ion-list-header>
      <ion-list>
        <ion-item
          class="bg-transaction"
          v-for="(transaction, index) in transactions"
          :key="index"
        >
          <div class="float-left w-full pb-[10px] pl-[10px]">
            <div class="font-semibold text-base leading-6">
              {{ transaction.vendor }}
            </div>
            <div
              class="text-[#ffffffb3] text-[15px] leading-5"
              v-if="transaction.location"
            >
              {{ transaction.location }}
            </div>
            <div class="text-[#ffffffb3] text-[15px] leading-5">
              {{ transaction.date }}
            </div>
          </div>

          <div class="float-right items-center flex mt-[-36px]">
            <div class="text-base">{{ transaction.price }}</div>
            <ion-icon
              name="chevron-forward"
              class="text-[#ffffff4d] ml-2 text-xl"
            ></ion-icon>
          </div>

          <div class="float-clear"></div>
        </ion-item>
      </ion-list>
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
import { transactions } from '../constants'
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
  animation: transactionList 1.5s;
}

@keyframes transactionList {
  from {
    top: 3000px;
  }
  to {
    top: 270px;
  }
}
</style>
