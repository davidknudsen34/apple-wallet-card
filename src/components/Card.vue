<template>
  <div class="card-container" :class="[mask ? 'card-mask' : '']">
    <div class="card transition-card">
      <ion-img
        class="w-full h-[240px] object-cover"
        :src="
          card.asset_contract === null
            ? image_url
            : card.asset_contract.image_url
        "
        :alt="
          card.asset_contract === null ? 'NFT Token' : card.asset_contract.name
        "
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { IonImg } from '@ionic/vue'
import { ICard } from '../interfaces'

interface IProps {
  card: ICard
  mask: boolean
}

const props = defineProps<IProps>()
const { card, mask } = props

const image_url = '../assets/pic.png'
</script>

<style scoped>
.card-container {
  width: 100%;
}

.card-container.card-mask {
  height: 240px;
  overflow: hidden;
}

.card-container .card {
  width: 100%;
  height: 240px;
  border-radius: 10px;
  background-position: center center;
}

.transition-card {
  transition: all 5s;
}
</style>
