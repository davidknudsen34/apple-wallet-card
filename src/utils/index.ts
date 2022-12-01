export const domSelector = (
  selctor: string,
  baseEl: HTMLElement | ShadowRoot
) => document.documentElement && (baseEl.querySelector(selctor) as HTMLElement)

export const allDomSelector = (selctor: string, baseEl: HTMLElement) =>
  document.documentElement && baseEl.querySelectorAll(selctor)
