import { createAnimation } from '@ionic/vue'
import { allDomSelector, domSelector } from '../utils'

const createRootAnimation = (
  baseEl: HTMLElement,
  presentingEl: HTMLElement,
  opts: object,
  elementRef?: HTMLElement,
  duration?: number
) => {
  const rootAnimation = createAnimation()
    .duration(duration || 600)
    .addElement(baseEl)
    .easing('cubic-bezier(0.32, 0.72, 0, 1)')
    .beforeAddClass('transaction-modal-hidden')
    .afterRemoveClass('transaction-modal-hidden')

  const cardDetail = createAnimation()
    .duration(duration || 600)
    .addElement(domSelector('#card-detail', baseEl))
    .keyframes([
      { offset: 0, opacity: 1, zIndex: 26 },
      { offset: 0.7, opacity: 1 },
      { offset: 1, opacity: 1 },
    ])

  let foundMainCard = false
  const allCards = Array.from(allDomSelector('.card-group', baseEl))
  let beforeCards = [] as HTMLElement[]
  let afterCards = [] as HTMLElement[]

  const cardElement = elementRef?.parentElement?.parentElement as HTMLElement

  allCards.forEach((card) => {
    if (card === cardElement) {
      foundMainCard = true
    } else {
      if (foundMainCard) {
        afterCards.push(card as HTMLElement)
      } else {
        beforeCards.push(card as HTMLElement)
      }
    }
  })

  const beforeCardsAnimation = createAnimation()
    .duration(800)
    .addElement(beforeCards)
    .keyframes([
      { offset: 0, transform: 'translate(0, -150vh)' },
      { offset: 1, transform: 'translate(0, 0)' },
    ])

  const cardelementAnimation = createAnimation()
    .addElement(cardElement)
    .keyframes([
      { offset: 0, opacity: 0 },
      { offset: 0.7, opacity: 0 },
      { offset: 0.7, opacity: 1 },
      { offset: 1, opacity: 1 },
    ])

  const afterCardsAnimation = createAnimation()
    .duration(800)
    .addElement(afterCards)
    .keyframes([
      { offset: 0, transform: 'translate(0, 150vh)' },
      { offset: 1, transform: 'translate(0, 0)' },
    ])

  const appHome = createAnimation()
    .duration(duration || 600)
    .addElement(domSelector('#app-home', baseEl))
    .keyframes([
      { offset: 0, opacity: 1, zIndex: 24 },
      { offset: 0.7, opacity: 1 },
      { offset: 1, opacity: 1 },
    ])
    .beforeRemoveClass('ion-page-hidden')

  return rootAnimation.addAnimation([
    cardDetail,
    beforeCardsAnimation,
    afterCardsAnimation,
    cardelementAnimation,
    appHome,
  ])
}

export const createTransactionLeaveAnimation = (
  baseEl: HTMLElement,
  opts: object,
  presentingEl: HTMLElement,
  elementRef: HTMLElement,
  translateCardElement?: HTMLElement
) => {
  const cardElement = elementRef as HTMLElement
  const translateParentElement =
    translateCardElement?.parentElement as HTMLElement
  const rootAnimation = createRootAnimation(
    baseEl,
    presentingEl,
    opts,
    translateCardElement,
    1200
  )

  const transactionsList = createAnimation()
    .addElement(allDomSelector('.transactions-list', baseEl))
    .easing('cubic-bezier(0.17, 0.67, 0.22, 1.26)')
    .keyframes([
      { offset: 0, opacity: 1 },
      { offset: 0.3, opacity: 0 },
      { offset: 1, opacity: 0 },
    ])

  const parentElement = cardElement?.parentElement?.parentElement as HTMLElement

  const cardBBox = translateParentElement.getBoundingClientRect()

  const mainCard = createAnimation()
    .addElement(parentElement)
    .keyframes([
      {
        offset: 0,
        transform: `translate(0, calc(-${
          cardBBox.top - 150
        }px + var(--ion-safe-area-top)))`,
      },
      {
        offset: 0.7,
        transform: `translate(0, calc(${
          cardBBox.top - 60
        }px + var(--ion-safe-area-top)))`,
        opacity: 1,
      },
      {
        offset: 0.7,
        transform: `translate(0, calc(${
          cardBBox.top - 60
        }px + var(--ion-safe-area-top)))`,
        opacity: 0,
      },
      {
        offset: 1,
        transform: `translate(0, calc(${
          cardBBox.top - 60
        }px + var(--ion-safe-area-top)))`,
        opacity: 0,
      },
    ])

  return rootAnimation.addAnimation([transactionsList, mainCard])
}
