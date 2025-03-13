import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
  SidebarTrigger
} from '@/components/ui/sidebar'

export const AdministrarClasesSidebar = () => {
  return (
    <Sidebar
      collapsible='icon'
      side='right'
      className='h-[20rem] mt-[4rem]'>
      <SidebarHeader>
        <SidebarTrigger />
      </SidebarHeader>
      <SidebarContent className='bg-cyan-500'></SidebarContent>
      <SidebarFooter></SidebarFooter>
      {/* <SidebarRail /> */}
    </Sidebar>
  )
}
