'use client'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from '@/components/ui/command'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Textarea } from '@/components/ui/textarea'
import { useUserAuthStore } from '@/store/userAuthStore'
import { useScheduleStore } from '@/store/useScheduleStore'
import { cn } from '@/utils/calculate'
import { zodResolver } from '@hookform/resolvers/zod'
import { useQueryClient } from '@tanstack/react-query'
import { NotebookPen, X } from 'lucide-react'
import { useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { AdminAddScheduleModal } from './AdminAddScheduleModal'

const formSchema = z.object({
  name: z.string().min(5, { message: 'El nombre de la clase es obligatorio' }),
  description: z.string()
})

type Props = {
  sidebarState: boolean
}
export const AdminAddClassModal = ({ sidebarState }: Props) => {
  const role = useUserAuthStore((state) => state.user?.role)
  const { schedules } = useScheduleStore((state) => state)
  const queryCLient = useQueryClient()
  const [open, setOpen] = useState(false)
  const [openPopover, setOpenPopover] = useState(false)
  const [selectedValues, setSelectedValues] = useState<string[]>([])

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      description: ''
    }
  })

  const selectedSchedules = useMemo(
    () => schedules.filter((item) => selectedValues.includes(item.id)),
    [selectedValues, schedules]
  )

  const handleModal = () => {
    setOpen(!open)
    form.reset()
  }

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log(values)
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
                <NotebookPen className='text-black w-4 h-4' />
                <span>Crear clase</span>
              </>
            ) : (
              <NotebookPen className='text-black w-4 h-4' />
            )}
          </Button>
        </DialogTrigger>
        <DialogContent className='max-w-2xl max-h-[90vh] overflow-y-auto'>
          <DialogHeader>
            <DialogTitle>Crear nueva clase</DialogTitle>
            <DialogDescription>Completa los campos para agregar una nueva clase</DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className='grid md:grid-cols-2 xs:grid-cols-1 gap-4'>
                <FormField
                  control={form.control}
                  name='name'
                  render={({ field }) => (
                    <FormItem className='col-span-full'>
                      <FormLabel>Nombre de la clase</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder='Nombre de la clase'
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='description'
                  render={({ field }) => (
                    <FormItem className='col-span-full '>
                      <FormLabel>Descripción de la clase</FormLabel>
                      <FormControl>
                        <Textarea
                          className='w-full h-[7rem] max-h-[7rem]'
                          {...field}
                          placeholder='Descripción de la clase'
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  name='name'
                  render={({ field }) => (
                    <FormItem className='col-span-full w-full'>
                      <FormLabel>Seleccionar horarios de clase</FormLabel>
                      <FormControl className='w-full'>
                        <Popover
                          open={openPopover}
                          onOpenChange={setOpenPopover}>
                          <PopoverTrigger asChild>
                            <div
                              aria-controls='combobox'
                              aria-expanded={openPopover}
                              className={cn(
                                'flex min-h-10 w-full flex-wrap items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
                                selectedValues.length > 0 && 'pb-1'
                              )}
                              onClick={() => setOpenPopover(!openPopover)}>
                              {selectedSchedules.length > 0 ? (
                                <div className='flex flex-wrap gap-1'>
                                  {selectedSchedules.map((item) => (
                                    <Badge
                                      key={item.id}
                                      variant='secondary'
                                      className='mr-1 mb-1 flex items-center gap-1'>
                                      {item.name}
                                      <button
                                        className='ml-1 rounded-full outline-none ring-offset-background focus:ring-2 focus:ring-ring focus:ring-offset-2'
                                        onKeyDown={(e) => {
                                          if (e.key === 'Enter') {
                                            e.preventDefault()
                                            e.stopPropagation()
                                            setSelectedValues(
                                              selectedValues.filter((value) => value !== item.id)
                                            )
                                          }
                                        }}
                                        onMouseDown={(e) => {
                                          e.preventDefault()
                                          e.stopPropagation()
                                        }}
                                        onClick={(e) => {
                                          e.preventDefault()
                                          e.stopPropagation()
                                          setSelectedValues(
                                            selectedValues.filter((value) => value !== item.id)
                                          )
                                        }}>
                                        <X className='h-3 w-3 text-muted-foreground hover:text-foreground' />
                                      </button>
                                    </Badge>
                                  ))}
                                </div>
                              ) : (
                                <span className='text-muted-foreground'>
                                  Seleccionar horarios de clase...
                                </span>
                              )}
                            </div>
                          </PopoverTrigger>
                          <PopoverContent
                            className='w-full p-0'
                            align='start'>
                            <>
                              <AdminAddScheduleModal sidebarState={true} />
                              <Command className='w-[38.7rem]'>
                                <CommandInput placeholder='Buscar horarios de clase...' />
                                <CommandList>
                                  <CommandEmpty>Horario no encontrado.</CommandEmpty>
                                  <CommandGroup className='max-h-64 overflow-auto'>
                                    {schedules.map((item) => {
                                      const isSelected = selectedValues.includes(item.id)
                                      return (
                                        <CommandItem
                                          key={item.id}
                                          onSelect={() => {
                                            setSelectedValues((prev) => {
                                              if (isSelected) {
                                                return prev.filter((value) => value !== item.id)
                                              } else {
                                                return [...prev, item.id]
                                              }
                                            })
                                          }}>
                                          <div
                                            className={cn(
                                              'mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary',
                                              isSelected
                                                ? 'bg-primary text-primary-foreground'
                                                : 'opacity-50 [&_svg]:invisible'
                                            )}>
                                            <svg
                                              className='h-3 w-3'
                                              fill='none'
                                              stroke='currentColor'
                                              strokeLinecap='round'
                                              strokeLinejoin='round'
                                              strokeWidth='2'
                                              viewBox='0 0 24 24'>
                                              <path d='M5 12l5 5 9-9' />
                                            </svg>
                                          </div>
                                          <span>{item.name}</span>
                                        </CommandItem>
                                      )
                                    })}
                                  </CommandGroup>
                                </CommandList>
                              </Command>
                              <div className='flex justify-center gap-5 my-3 px-3'>
                                <Button
                                  type='button'
                                  className=' w-full'
                                  onClick={() => setOpenPopover(!openPopover)}
                                  variant='ghost'>
                                  Cancelar
                                </Button>
                                <Button
                                  className=' bg-green-500 hover:bg-green-700 w-full'
                                  onClick={() => setOpenPopover(!openPopover)}>
                                  Listo
                                </Button>
                              </div>
                            </>
                          </PopoverContent>
                        </Popover>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <DialogFooter className='flex mt-3 flex-row w-full gap-5 justify-center'>
                <Button
                  type='button'
                  variant='ghost'
                  className='w-full'
                  //   disabled={isPending}
                  onClick={handleModal}>
                  {/* {isPending && <Loader2 className='animate-spin' />} */}
                  Cancelar
                </Button>
                <Button
                  className=' bg-green-500 hover:bg-green-700 w-full'
                  //   disabled={isPending}
                >
                  {/* {isPending && <Loader2 className='animate-spin' />} */}
                  Crear clase
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  )
}
