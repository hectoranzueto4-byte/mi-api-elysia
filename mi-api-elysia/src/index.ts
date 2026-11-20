import { Elysia } from 'elysia'
import prisma from './db'

const app = new Elysia()
  .get('/', () => ({ message: 'API con Bun, Elysia y Prisma Estable funcionando perfectamente' }))

  // 1. GET - Obtener todos los usuarios
  .get('/users', async () => {
    return await prisma.user.findMany()
  })

  // 2. POST - Crear un usuario
  .post('/users', async ({ body }) => {
    const { name, email } = body as { name: string; email: string }
    return await prisma.user.create({
      data: { name, email },
    })
  })

  // 3. PUT - Actualizar un usuario por ID
  .put('/users/:id', async ({ params, body }) => {
    const id = parseInt(params.id)
    const { name, email } = body as { name: string; email: string }
    return await prisma.user.update({
      where: { id },
      data: { name, email },
    })
  })

  // 4. DELETE - Eliminar un usuario por ID
  .delete('/users/:id', async ({ params }) => {
    const id = parseInt(params.id)
    return await prisma.user.delete({
      where: { id },
    })
  })

  .listen(3000)

console.log(`🦊 Elysia corriendo en http://${app.server?.hostname}:${app.server?.port}`)
