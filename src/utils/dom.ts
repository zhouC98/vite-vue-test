import { camelize, isObject } from "@vue/shared"
import isServer from "./isServer"

const trim = function (s: string) {
  return (s || '').replace(/^[\s\uFEFF]+|[\s\uFEFF]+$/g, '')
}

export const on = function (
  element: HTMLElement | Window | Document,
  event: string,
  handler: EventListenerOrEventListenerObject,
  useCapture = false
): void {
  if (element && event && handler) {
    element.addEventListener(event, handler, useCapture)
  }
}

export const off = function (
  element: HTMLElement | Window | Document,
  event: string,
  handler: EventListenerOrEventListenerObject,
  useCapture = false
): void {
  if (element && event && handler) {
    element.removeEventListener(event, handler, useCapture)
  }
}

export const once = function (
  element: HTMLElement,
  event: string,
  fn: EventListener
): void {
  const listener = function(...args: unknown[]) {
    if (fn) {
      fn.apply(this, args)
    }
    off(element, event, listener)
  }
  on(element, event, listener)
}

export function hasClass(el: HTMLElement, cls: string): boolean {
  if (!el || !cls) return false
  if (cls.indexOf(' ') !== -1) 
    throw new Error('className should not contain space.')
  if (el.classList) {
    return el.classList.contains(cls)
  } else {
    return (' ' + el.className + ' ').indexOf(' ' + cls + ' ') > -1
  }
}

export function addClass(el: HTMLElement, cls: string): void {
  if (!el) return
  let curClass = el.className
  const classes = (cls || '').split(' ')

  for (let i = 0, j = classes.length; i < j; i++) {
    const clsName = classes[i];
    if (!clsName) continue

    if (el.classList) {
      el.classList.add(clsName)
    } else if (!hasClass(el, clsName)) {
      curClass += ' ' + clsName
    }
  }
  if (!el.classList) {
    el.className = curClass
  }
}

export function removeClass(el: HTMLElement, cls: string): void {
  if (!el || !cls) return
  const classes = cls.split(' ')
  let curClass = ' ' + el.className + ' '

  for (let i = 0, j = classes.length; i < j; i++) {
    const clsName = classes[i];
    if (!clsName) continue

    if (el.classList) {
      el.classList.remove(clsName)
    } else if (hasClass(el, clsName)) {
      curClass = curClass.replace(' ' + clsName + ' ', ' ')
    }
  }
  if (!el.classList) {
    el.className = trim(curClass)
  }
}

export const getStyle = function(
  element: HTMLElement,
  styleName: string
): string {
  if (isServer) return
  if (!element || !styleName) return null
  styleName = camelize(styleName)
  if (styleName === 'float') {
    styleName = 'cssFloat'
  }

  try {
    const style = element.style[styleName]
    if (style) return style
    const computed = document.defaultView?.getComputedStyle(element, '')
    return computed ? computed[styleName] : ''
  } catch (e) {
    return element.style[styleName]
  }
}

export function setStyle(
  element: HTMLElement,
  styleName: CSSStyleDeclaration | string,
  value?: string
): void {
  if (!element || !styleName) return

  if (isObject(styleName)) {
    Object.keys(styleName).forEach(prop => {
      setStyle(element, prop, styleName[prop])
    })
  } else {
    styleName = camelize(styleName)
    element.style[styleName] = value
  }
}

export function removeStyle(
  element: HTMLElement,
  style: CSSStyleDeclaration | string
) {
  if (!element || !style) return

  if (isObject(style)) {
    Object.keys(style).forEach(prop => {
      setStyle(element, prop, '')
    })
  } else {
    setStyle(element, style, '')
  }
}

export const isSroll = (
  el: HTMLElement, 
  isVertical?: Nullable<boolean>
): RegExpMatchArray => {
    if (isServer) return
    const determinedDirection = isVertical === null || isVertical === undefined
    const overflow = determinedDirection
      ? getStyle(el, 'overflow')
      : isVertical
        ? getStyle(el, 'overflow-y')
        : getStyle(el, 'overflow-x')
  
    return overflow.match(/(scroll|auto)/)
}


export const getScrollContainer = (
  el: HTMLElement,
  isVertical?: Nullable<boolean>
): Window | HTMLElement => {
  if (isServer) return
  let parent: HTMLElement = el
  while (parent) {
    if ([window, document, document.documentElement].includes(parent)) {
      return window
    }
    if (isSroll(parent, isVertical)) {
      return parent
    }
    parent = parent.parentNode as HTMLElement
  }
  return parent
}


