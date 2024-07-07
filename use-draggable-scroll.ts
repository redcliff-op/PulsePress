import { RefObject, useEffect, useRef, useMemo } from 'react'
import { Platform, findNodeHandle } from 'react-native'
import type { ScrollView } from 'react-native'
import {mergeRefs} from 'react-merge-refs'

type Props<Scrollable extends ScrollView = ScrollView> = {
  cursor?: string
  outerRef?: RefObject<Scrollable>
}

export function useDraggableScroll<Scrollable extends ScrollView = ScrollView>({
  outerRef,
  cursor = 'grab',
}: Props<Scrollable> = {}) {
  const ref = useRef<Scrollable>(null)

  useEffect(
    function listeners() {
      if (Platform.OS !== 'web' || !ref.current) {
        return
      }
      const slider = (findNodeHandle(ref.current) as unknown) as HTMLDivElement
      if (!slider) {
        return
      }
      let isDragging = false
      let startX = 0
      let scrollLeft = 0

      const mouseDown = (e: MouseEvent) => {
        isDragging = true
        startX = e.pageX - slider.offsetLeft
        scrollLeft = slider.scrollLeft

        slider.style.cursor = cursor
      }
      const mouseLeave = () => {
        isDragging = false
      }

      const mouseUp = () => {
        isDragging = false
        slider.style.cursor = 'default'
      }

      const mouseMove = (e: MouseEvent) => {
        if (!isDragging) return
        e.preventDefault()
        const x = e.pageX - slider.offsetLeft
        const walk = x - startX
        slider.scrollLeft = scrollLeft - walk
      }

      slider.addEventListener('mousedown', mouseDown)
      slider.addEventListener('mouseleave', mouseLeave)
      slider.addEventListener('mouseup', mouseUp)
      slider.addEventListener('mousemove', mouseMove)

      return () => {
        slider.removeEventListener('mousedown', mouseDown)
        slider.removeEventListener('mouseleave', mouseLeave)
        slider.removeEventListener('mouseup', mouseUp)
        slider.removeEventListener('mousemove', mouseMove)
      }
    },
    [cursor]
  )

  const refs = useMemo(() => mergeRefs(outerRef ? [ref, outerRef] : [ref]), [
    ref,
    outerRef,
  ])

  return {
    refs,
  }
}