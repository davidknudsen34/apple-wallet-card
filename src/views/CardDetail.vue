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
    <card-detail-panel :group="selectedCardGroup[0]" />
  </ion-page>
</template>

<script lang="ts" setup>
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
import { storeToRefs } from 'pinia'

import { useCardsStore } from '../store'
import CardDetailPanel from '../components/CardDetailPanel.vue'
import { ICard } from '../interfaces'

const router = useIonRouter()
const route = useRoute()

const cardList = useCardsStore()
const { nftCardList } = storeToRefs(cardList)

const selectedCardGroup: ICard[] = nftCardList.value.filter(
  (cardGroup: ICard, index: number) => cardGroup.slug === route.params.slug
)

const presentingEl =
  document && (document.querySelector('#app-home') as HTMLElement)

function goBack() {
  router.push('/home', (baseEl, opts) =>
    createTransactionLeaveAnimation(
      baseEl,
      opts,
      presentingEl,
      baseEl &&
        (baseEl.querySelector(
          `#transaction-${selectedCardGroup[0].slug} .card`
        ) as HTMLElement),
      baseEl &&
        (baseEl.querySelector(
          `#card-${selectedCardGroup[0].slug}`
        ) as HTMLElement)
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
