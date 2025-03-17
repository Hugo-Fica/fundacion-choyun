import { CreateScheduleRequest, ScheduleMongo } from '@/types/schedule'
import axios, { AxiosError } from 'axios'

export const useScheduleClass = () => {
  const postScheduleClass = async (schedule: CreateScheduleRequest) => {
    try {
      const { data } = await axios.post('/api/protected/schedule', schedule)

      return {
        message: data.message
      }
    } catch (error) {
      const err = error as AxiosError<{ message: string }>
      if (err.response && err.response.data && err.response.data.message) {
        return {
          message: err.response.data.message
        }
      } else {
        return {
          message: 'Error desconocido'
        }
      }
    }
  }
  const getScheduleClass = async () => {
    try {
      const { data } = await axios.get('/api/protected/schedule')

      return {
        data: data as ScheduleMongo[],
        message: 'Lista de horarios cargada'
      }
    } catch (error) {
      const err = error as AxiosError<{ message: string }>
      if (err.response && err.response.data && err.response.data.message) {
        return {
          message: err.response.data.message,
          data: null
        }
      } else {
        return {
          message: 'Error desconocido',
          data: null
        }
      }
    }
  }

  return { getScheduleClass, postScheduleClass }
}
