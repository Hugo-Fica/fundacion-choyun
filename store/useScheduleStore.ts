import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

export const useScheduleStore = create(
  devtools(
    persist(
      (set) => {
        return {}
      },
      { name: 'schedule-store' }
    )
  )
)
