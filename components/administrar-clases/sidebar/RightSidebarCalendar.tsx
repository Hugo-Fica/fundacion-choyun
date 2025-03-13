import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarTrigger
} from '@/components/ui/sidebar'

export const RightSidebarCalendar = () => {
  return (
    <Sidebar
      className='fixed top-16 h-[87.8%] '
      side='right'
      collapsible='icon'>
      <SidebarHeader>
        <SidebarTrigger />
      </SidebarHeader>
      <SidebarContent className='bg-purple-500'>
        <SidebarGroup />
        <SidebarGroup />
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  )
}
