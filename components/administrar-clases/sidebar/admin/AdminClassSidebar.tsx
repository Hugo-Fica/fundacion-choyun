'use client'
import { Button } from '@/components/ui/button'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  useSidebar
} from '@/components/ui/sidebar'
import { BookPlus } from 'lucide-react'
import { AdminAddScheduleModal } from './AdminAddScheduleModal'
import { useQuery } from '@tanstack/react-query'
import { useScheduleClass } from '@/hooks/useScheduleClass'
import { AdminAddClassModal } from './AdminAddClassModal'
import { useScheduleStore } from '@/store/useScheduleStore'
import { useEffect } from 'react'

export const AdminClassSidebar = () => {
  const { open, toggleSidebar } = useSidebar()
  const { setSchedules } = useScheduleStore((state) => state)
  const { getScheduleClass } = useScheduleClass()

  const { data: dataSchedules, isPending: isPendingSchedules } = useQuery({
    queryKey: ['getScheduleClass'],
    queryFn: getScheduleClass
  })

  useEffect(() => {
    if (dataSchedules?.data) {
      setSchedules(dataSchedules.data)
    }
  }, [dataSchedules, isPendingSchedules, setSchedules])
  return (
    <Sidebar
      className='fixed top-16 h-[87.8%] z-[9]'
      side='right'
      collapsible='icon'>
      <SidebarHeader className='z-[9]'>
        <Button
          onClick={toggleSidebar}
          className={`${open ? '' : 'border border-black hover:bg-black hover:bg-opacity-5'} `}
          variant='ghost'>
          {open ? (
            <>
              <BookPlus className='text-black w-4 h-4' />
              <span className='text-black'>Administrar Clases</span>
            </>
          ) : (
            <BookPlus className='text-black w-4 h-4' />
          )}
        </Button>
      </SidebarHeader>
      <SidebarContent className='z-[9]'>
        <SidebarGroup
          title='Administrar información basica'
          className='gap-3'>
          <AdminAddScheduleModal sidebarState={open} />
          <AdminAddClassModal sidebarState={open} />
        </SidebarGroup>
        <SidebarGroup />
      </SidebarContent>
      <SidebarFooter className='' />
    </Sidebar>
  )
}
