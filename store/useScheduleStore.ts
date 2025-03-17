import { ScheduleStore } from '@/types/schedule'
import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

export const useScheduleStore = create<ScheduleStore>()(
  devtools(
    persist(
      (set) => {
        return {
          schedules: [],
          setSchedules: (schedules) => {
            set({ schedules }, false, 'SET_SCHEDULES')
          }
        }
      },
      { name: 'schedule-store' }
    )
  )
)
