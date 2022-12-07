<template>
  <ion-page id="card-detail">
    <ion-header>
      <ion-toolbar>
        <ion-buttons class="uppercase">
          <ion-button
            class="done font-poppins opacity-[1]"
            @click="goBack"
            fill="clear"
            >Done</ion-button
          >
        </ion-buttons>

        <ion-buttons slot="end">
          <ion-icon
            name="ellipsis-horizontal-circle-sharp"
            class="text-[28px] text-white"
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
import { storeToRefs } from 'pinia'

import { useCardsStore } from '../store'
import CardDetailPanel from '../components/CardDetailPanel.vue'
import { ICard } from '../interfaces'
import { domSelector } from '../utils'
import { createTransactionLeaveAnimation } from '../animations/leave'

const router = useIonRouter()
const route = useRoute()

const cardList = useCardsStore()
const { nftCardList } = storeToRefs(cardList)

const selectedCardGroup: ICard[] = nftCardList.value.filter(
  (cardGroup: ICard, index: number) => cardGroup.slug === route.params.slug
)

function goBack() {
  router.push('/home', (baseEl, opts) =>
    createTransactionLeaveAnimation(
      baseEl,
      opts,
      domSelector('#app-home', baseEl),
      domSelector(`#transaction-${selectedCardGroup[0].slug} .card`, baseEl),
      domSelector(`#card-${selectedCardGroup[0].slug}`, baseEl)
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
