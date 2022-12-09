<template>
  <div class="w-full" :class="[mask ? 'h-[240px] overflow-hidden' : '']">
    <div class="card transition-card relative">
      <ion-img
        class="h-[240px] object-cover bg-black"
        :src="
          card.asset_contract && card.asset_contract.image_url
            ? card.asset_contract.image_url
            : '/assets/img/pic.png'
        "
        :alt="
          card.asset_contract === null ? 'NFT Token' : card.asset_contract.name
        "
      />
      <div class="font-poppins absolute top-[10px] left-[10px]">
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
import { toRefs } from 'vue'
import { IonImg } from '@ionic/vue'

import { ICard } from '../interfaces'

interface IProps {
  card: ICard
  mask: boolean
}

const props = defineProps<IProps>()
const { card, mask } = toRefs(props)
</script>

<style scoped>
.transition-card {
  transition: all 5s;
}

ion-img::part(image) {
  border-radius: 5px;
}
</style>
