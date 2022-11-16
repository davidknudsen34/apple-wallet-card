<template>
  <div class="card-container" :class="[mask ? 'card-mask' : '']">
    <div class="card transition-card relative">
      <ion-img
        class="h-[240px] object-cover"
        :src="
          card.asset_contract === null
            ? image_url
            : card.asset_contract.image_url
        "
        :alt="
          card.asset_contract === null ? 'NFT Token' : card.asset_contract.name
        "
      />
      <div class="absolute top-[10px] left-[10px]">
        <p class="font-medium text-lg truncate text-ellipsis w-[300px]">
          {{ card.name }}
        </p>
        <p class="font-medium text-xs text-[#0A84FF]">
          {{ card.assets.length }} members
        </p>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { IonImg, IonItem, IonLabel } from '@ionic/vue'
import { ICard } from '../interfaces'

interface IProps {
  card: ICard
  mask: boolean
}

const props = defineProps<IProps>()
const { card, mask } = props

const image_url = '/assets/img/pic.png'
</script>

<style scoped>
.card-container {
  width: 100%;
}
.card-container.card-mask {
  height: 240px;
  overflow: hidden;
}

.card-container .card ion-img {
  border-radius: 2px;
  border-width: 1px;
  border-color: #1a1a1a;
}

.transition-card {
  transition: all 5s;
}
</style>
