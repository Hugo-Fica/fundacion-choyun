import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/prisma/prisma'
import { validarToken } from '@/utils/auth'
import bcrypt from 'bcrypt'

export async function POST(req: NextRequest) {
  try {
    const { dataValidate } = await req.json()

    if (!dataValidate.tokenPass)
      return NextResponse.json({ message: 'Error no se proporciono el token' }, { status: 400 })

    const decoded = validarToken(dataValidate.tokenPass)

    if (!dataValidate.password) {
      return NextResponse.json(
        { message: 'Error no se proporciono la contraseña' },
        { status: 400 }
      )
    }
    if (!decoded) return NextResponse.json({ message: 'Token no válido' }, { status: 400 })

    const passEncrypted = await bcrypt.hash(dataValidate.password, 10)

    const usuario = await prisma.users.update({
      where: { id: decoded.user_id },
      data: { password: passEncrypted, valid: true }
    })

    if (!usuario) return NextResponse.json({ message: 'El usuario no existe' })

    return NextResponse.json({
      message: `Contraseña creada correctamente`
    })
  } catch (error) {
    return NextResponse.json({ message: 'Hubo un error', error: error }, { status: 500 })
  }
}
