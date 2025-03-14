'use client'
import { Button } from '@/components/ui/button'
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
import { zodResolver } from '@hookform/resolvers/zod'
import dayjs from 'dayjs'
import { CalendarPlus, Loader2 } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import 'dayjs/locale/es'
type Props = {
  sidebarState: boolean
}
dayjs.locale('es')
const formSchema = z.object({
  day: z.string().min(5, { message: 'El nombre del día es obligatorio' })
})

export const ModalAddSchedule = ({ sidebarState }: Props) => {
  const [open, setOpen] = useState(false)

  const handleModal = () => {
    setOpen(!open)
  }

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      day: ''
    }
  })

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const weekdays = []
    for (let i = 0; i < 7; i++) {
      weekdays.push(dayjs().day(i).format('dddd'))
    }
    console.log(weekdays)
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
            // disabled={role?.includes('user')}
          >
            {sidebarState ? (
              <>
                <CalendarPlus className='text-black w-4 h-4' />
                <span>Crear día</span>
              </>
            ) : (
              <CalendarPlus className='text-black w-4 h-4' />
            )}
          </Button>
        </DialogTrigger>
        <DialogContent className='max-w-2xl max-h-[90vh] overflow-y-auto'>
          <DialogHeader>
            <DialogTitle>Crear nuevo usuario</DialogTitle>
            <DialogDescription>Completa los campos para agregar un nuevo usuario</DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className='grid md:grid-cols-2 xs:grid-cols-1 gap-4'>
                <FormField
                  control={form.control}
                  name='day'
                  render={({ field }) => (
                    <FormItem className='col-span-full'>
                      <FormLabel>Nombre del día</FormLabel>
                      <FormControl>
                        <Input
                          placeholder='nombres del día'
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <DialogFooter className='flex mt-3 flex-row w-full gap-5 justify-center'>
                <Button
                  type='button'
                  className=' bg-yellow-500 hover:bg-yellow-700 w-full'
                  //   disabled={isPending || sendMail}
                  onClick={handleModal}>
                  {/* {(isPending || sendMail) && <Loader2 className='animate-spin' />} */}
                  Cancelar
                </Button>
                <Button
                  className=' bg-green-500 hover:bg-green-700 w-full'
                  //   disabled={isPending || sendMail}
                >
                  {/* {(isPending || sendMail) && <Loader2 className='animate-spin' />} */}
                  Crear Usuario
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  )
}
