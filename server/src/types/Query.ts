import { intArg, queryType } from 'nexus'
import { getUserId } from '../utils'

export const Query = queryType({
  definition(t) {
    t.nullable.field('me', {
      type: 'User',
      resolve: (parent, args, ctx) => {
        const userId = getUserId(ctx)
        return ctx.prisma.user.findUnique({
          where: {
            id: Number(userId),
          },
        })
      },
    })

    t.list.field('users', {
      type: 'User',
      resolve: (parent, args, ctx) => {
        return ctx.prisma.user.findMany()
      },
    })

    t.list.field('speeks', {
      type: 'Speek',
      resolve: (parent, args, ctx) => {
        return ctx.prisma.speek.findMany({
          orderBy: {
            createdAt: 'desc',
          },
        })
      },
    })
  },
})
