import Router from 'express'
import jwt from 'jsonwebtoken'
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
const router = Router()

router.get('/user', async (request: any, response: any) => {
  try {
    const result = prisma.users.findMany({})
    response.send({ result: 'ok', data: 'node + express + mongo', user: request.user })
  } catch (e) {
    response.send({ result: 'error', data: e })
  }
})

router.post('/user', async (request: any, response: any) => {
  try {
    const data = request.body.data
    const profile = request.body.profile
    const result = prisma.users.create({
      data: {
        ...data,
        create: {
          profile: {
            data: profile
          }
        }
      }

    })

    response.send({ result })
  } catch (e) {
    response.send({ result: 'error', data: e })
  }
})

router.put('/user', async (request: any, response: any) => {
  try {
    const data = request.body
    const id = data.id
    delete data.id
    const result = prisma.users.update({
      data,
      where: {
        id
      }
    })

    response.send({ result })
  } catch (e) {
    response.send({ result: 'error', data: e })
  }
})

router.delete('/user', async (request: any, response: any) => {
  try {
    const id = request.body.id
    const result = prisma.users.delete({
      where: {
        id
      }
    })

    response.send({ result })
  } catch (e) {
    response.send({ result: 'error', data: e })
  }
})

router.get('/post', async (request: any, response: any) => {
  try {
    const result = prisma.posts.findMany({})
    response.send({ result: 'ok', data: 'node + express + mongo', user: request.user })
  } catch (e) {
    response.send({ result: 'error', data: e })
  }
})

router.post('/post', async (request: any, response: any) => {
  try {
    const data = request.body.post
    const id: number = request.body.user_id
    const result = prisma.posts.create({
      data: {
        ...data,
        users: {
          connect: {
            id
          }
        }
      }
    })

    response.send({ result })
  } catch (e) {
    response.send({ result: 'error', data: e })
  }
})

router.put('/post', async (request: any, response: any) => {
  try {
    const data = request.body
    const id = data.id
    delete data.id
    const result = prisma.posts.update({
      data,
      where: {
        id
      }
    })

    response.send({ result })
  } catch (e) {
    response.send({ result: 'error', data: e })
  }
})

router.delete('/post', async (request: any, response: any) => {
  try {
    const id = request.body.id
    const result = prisma.posts.delete({
      where: {
        id
      }
    })

    response.send({ result })
  } catch (e) {
    response.send({ result: 'error', data: e })
  }
})

export default router
