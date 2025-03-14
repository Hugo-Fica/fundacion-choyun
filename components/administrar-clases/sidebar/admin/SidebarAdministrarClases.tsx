import { Button } from '@/components/ui/button'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarTrigger,
  useSidebar
} from '@/components/ui/sidebar'
import { BookPlus } from 'lucide-react'
import { ModalAddSchedule } from './ModalAddClass'

export const SidebarAdministrarClases = () => {
  const { open, toggleSidebar } = useSidebar()
  return (
    <Sidebar
      className='fixed top-16 h-[87.8%] '
      side='right'
      collapsible='icon'>
      <SidebarHeader className=''>
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
      <SidebarContent className=''>
        <SidebarGroup title='Administrar información basica'>
          <ModalAddSchedule sidebarState={open} />
        </SidebarGroup>
        <SidebarGroup />
      </SidebarContent>
      <SidebarFooter className='' />
    </Sidebar>
  )
}
