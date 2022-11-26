<template>
  <ion-page id="card-detail">
    <ion-header>
      <ion-toolbar>
        <ion-buttons>
          <ion-button
            class="done font-poppins text-white opacity-[1]"
            @click="goBack"
            >Done</ion-button
          >
        </ion-buttons>

        <ion-buttons slot="end">
          <ion-icon
            name="ellipsis-horizontal-circle-sharp"
            class="text-[28px]"
          ></ion-icon>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <transaction-card-detail :group="selectedCardGroup[0]" />
  </ion-page>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import {
  IonButtons,
  IonButton,
  IonPage,
  IonHeader,
  IonToolbar,
  IonIcon,
  useIonRouter,
} from '@ionic/vue'
import { useRoute } from 'vue-router'
import { createTransactionLeaveAnimation } from '../animations/leave'

import store from '../store'
import TransactionCardDetail from '../components/TransactionCardDetail.vue'
import { ICard } from '../interfaces'

const router = useIonRouter()
const route = useRoute()

const nftCardList = computed(() => store.state.nftCardList)

const selectedCardGroup: ICard[] = nftCardList.value.filter(
  (cardGroup: ICard, index: number) => cardGroup.slug === route.params.slug
)

const presentingEl = document.querySelector('#app-home') as HTMLElement

function goBack() {
  router.push('/home', (baseEl, opts) =>
    createTransactionLeaveAnimation(
      baseEl,
      opts,
      presentingEl,
      baseEl.querySelector(
        `#transaction-${selectedCardGroup[0].slug} .card`
      ) as HTMLElement,
      baseEl.querySelector(`#card-${selectedCardGroup[0].slug}`) as HTMLElement
    )
  )
}
</script>

<style scoped>
ion-header ion-toolbar {
  --border-width: 0px;
  --background: black;
}

ion-header .done {
  --color: white;
  font-weight: 800;
  font-size: 17px;
}
</style>
