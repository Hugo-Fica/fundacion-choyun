import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { useUserAuthStore } from '@/store/userAuthStore'
import { Users } from 'lucide-react'
import React, { useState } from 'react'

type Props = {
  sidebarState: boolean
}

export const AdminAddTeacherAndStudent = ({ sidebarState }: Props) => {
  const role = useUserAuthStore((state) => state.user?.role)
  const [open, setOpen] = useState(false)

  const handleModal = () => {
    setOpen(!open)
    // form.reset()
  }
  return (
    <>
      <Dialog
        open={open}
        onOpenChange={handleModal}>
        <DialogTrigger asChild>
          <Button
            className={`${
              sidebarState ? '' : 'border border-black hover:bg-black hover:bg-opacity-5'
            } `}
            variant='ghost'
            disabled={role?.includes('user')}>
            {sidebarState ? (
              <>
                <Users className='text-black w-4 h-4' />
                <span>Asignar usuarios</span>
              </>
            ) : (
              <Users className='text-black w-4 h-4' />
            )}
          </Button>
        </DialogTrigger>
        <DialogContent className='max-w-2xl max-h-[90vh] overflow-y-auto'>
          <DialogHeader>
            <DialogTitle>Asignar profesores y estudiantes</DialogTitle>
            <DialogDescription>
              Completa los campos para asignar profesores y estudiantes a una clase
            </DialogDescription>
          </DialogHeader>
          {/* <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className='grid md:grid-cols-2 xs:grid-cols-1 gap-4'>
                <FormField
                  control={form.control}
                  name='day'
                  render={({ field }) => (
                    <FormItem className='col-span-full'>
                      <FormLabel>Día</FormLabel>
                      <FormControl>
                        <Select
                          value={field.value}
                          onValueChange={(value) => field.onChange(value)}>
                          <SelectTrigger className='w-full'>
                            <SelectValue placeholder='Selecciona un día' />
                          </SelectTrigger>
                          <SelectContent className='h-[15rem]'>
                            {days.map((h) => (
                              <SelectItem
                                key={h}
                                value={h}>
                                {h}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='startTime'
                  render={({ field }) => (
                    <FormItem className='xs:col-span-full md:col-span-1'>
                      <FormLabel>Hora inicio</FormLabel>
                      <FormControl>
                        <HourPicker onTimeChange={field.onChange} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='endTime'
                  render={({ field }) => (
                    <FormItem className='xs:col-span-full md:col-span-1'>
                      <FormLabel>Hora fin</FormLabel>
                      <FormControl>
                        <HourPicker onTimeChange={field.onChange} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <DialogFooter className='flex mt-3 flex-row w-full gap-5 justify-center'>
                <Button
                  type='button'
                  className='w-full'
                  variant='ghost'
                  disabled={isPending}
                  onClick={handleModal}>
                  {isPending && <Loader2 className='animate-spin' />}
                  Cancelar
                </Button>
                <Button
                  className=' bg-green-500 hover:bg-green-700 w-full'
                  disabled={isPending}>
                  {isPending && <Loader2 className='animate-spin' />}
                  Crear hora de clase
                </Button>
              </DialogFooter>
            </form>
          </Form> */}
        </DialogContent>
      </Dialog>
    </>
  )
}
