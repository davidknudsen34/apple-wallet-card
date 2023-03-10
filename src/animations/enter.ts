import { createAnimation } from '@ionic/vue'

import { domSelector, allDomSelector } from '../utils'

/**
 * TODO: There is some pretty gnarly strings/math/values in this file.
 * It would be nice to find a way to better generalize it to
 * work with more screen sizes.
 */

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

  const homePageTitle = createAnimation()
    .addElement(domSelector('.header ion-title', baseEl))
    .keyframes([
      { offset: 0, opacity: 1, transform: 'translate(0, 0) scale(1)' },
      { offset: 1, opacity: 0, transform: 'translate(0, -40px) scale(0.6)' },
    ])

  const homePageButton = createAnimation()
    .addElement(domSelector('.header ion-icon.add-to-wallet', baseEl))
    .keyframes([
      { offset: 0, opacity: 1, transform: 'translate(0, 0) scale(1)' },
      {
        offset: 1,
        opacity: 0.1,
        transform: 'translate(12px, -50px) scale(0.85)',
      },
    ])

  // /**
  //  * This lets us control which direction
  //  * each of the cards go. Given a tapped card,
  //  * cards below it should move down and away but
  //  * cards above it should move up and away.
  //  */
  let foundMainCard = false
  const allCards = Array.from(allDomSelector('.card-group', baseEl))
  let beforeCards = [] as HTMLElement[]
  let afterCards = [] as HTMLElement[]

  // /**
  //  * TODO: See if you can find a way to do this without using a loop!
  //  */
  const cardElement = elementRef?.parentElement as HTMLElement
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
    .duration(1200)
    .addElement(beforeCards)
    .keyframes([
      { offset: 0, transform: 'translate(0, 0)' },
      { offset: 1, transform: 'translate(0, -150vh)' },
    ])

  const afterCardsAnimation = createAnimation()
    .duration(1500)
    .addElement(afterCards)
    .keyframes([
      { offset: 0, transform: 'translate(0, 0)' },
      { offset: 1, transform: 'translate(0, 150vh)' },
    ])

  return rootAnimation.addAnimation([
    homePageTitle,
    homePageButton,
    beforeCardsAnimation,
    afterCardsAnimation,
  ])
}

export const createTransactionEnterAnimation = (
  baseEl: HTMLElement,
  opts: object,
  presentingEl: HTMLElement,
  elementRef?: EventTarget | null
) => {
  const cardElement = elementRef as HTMLElement
  const rootAnimation = createRootAnimation(
    baseEl,
    presentingEl,
    opts,
    cardElement,
    1400
  )

  const transactionsList = createAnimation()
    .addElement(domSelector('.transactions-list', baseEl))
    .keyframes([
      { offset: 0, opacity: 0 },
      { offset: 1, opacity: 1 },
    ])

  const parentElement = cardElement as HTMLElement

  const cardBBox = parentElement.getBoundingClientRect()

  const mainCard = createAnimation()
    .addElement(parentElement)
    .keyframes([
      { offset: 0, transform: 'translate(0, 0)' },
      {
        offset: 1,
        transform: `translate(0, calc(-${
          cardBBox.top - 72
        }px + var(--ion-safe-area-top)))`,
      },
    ])

  return rootAnimation.addAnimation([transactionsList, mainCard])
}
