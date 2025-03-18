import { BaseModel } from './global'
import { StudentInClassMongo } from './student'

export type ScheduleMongo = BaseModel & {
  startTime: string
  endTime: string
  name: string
  day: string
  classIds: string[]
  classes: StudentInClassMongo[]
}
export type CreateScheduleRequest = {
  startTime: string
  endTime: string
  day: string
  name: string
}

export type UpdateScheduleRequest = {
  startTime?: string
  endTime?: string
  dayId?: string
  classIds?: string[]
}

export type ScheduleStore = {
  schedules: ScheduleMongo[]
  setSchedules: (schedules: ScheduleMongo[]) => void
}
