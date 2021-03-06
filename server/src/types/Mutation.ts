import { compare, hash } from 'bcryptjs'
import { sign } from 'jsonwebtoken'
import { intArg, mutationType, nonNull, stringArg } from 'nexus'
import { APP_SECRET, getUserId } from '../utils'

export const Mutation = mutationType({
  definition(t) {
    t.field('signup', {
      type: 'AuthPayload',
      args: {
        name: stringArg(),
        email: nonNull(stringArg()),
        password: nonNull(stringArg()),
      },
      resolve: async (_parent, { name, email, password }, ctx) => {
        const hashedPassword = await hash(password, 10)
        const user = await ctx.prisma.user.create({
          data: {
            name,
            email,
            password: hashedPassword,
          },
        })
        return {
          token: sign({ userId: user.id }, APP_SECRET),
          user,
        }
      },
    })

    t.field('login', {
      type: 'AuthPayload',
      args: {
        email: nonNull(stringArg()),
        password: nonNull(stringArg()),
      },
      resolve: async (_parent, { email, password }, ctx) => {
        const user = await ctx.prisma.user.findUnique({
          where: {
            email,
          },
        })
        if (!user) {
          throw new Error(`No user found for email: ${email}`)
        }
        const passwordValid = await compare(password, user.password)
        if (!passwordValid) {
          throw new Error('Invalid password')
        }
        return {
          token: sign({ userId: user.id }, APP_SECRET),
          user,
        }
      },
    })

    t.field('createProfile', {
      type: 'Profile',
      args: {
        bio: stringArg(),
        location: stringArg(),
        website: stringArg(),
        avatar: stringArg(),
      },
      resolve: (parent, args, ctx) => {
        const userId = getUserId(ctx)
        if (!userId) throw new Error('Could not authenticate user.')
        return ctx.prisma.profile.create({
          data: { ...args, User: { connect: { id: Number(userId) } } },
        })
      },
    })

    t.field('updateProfile', {
      type: 'Profile',
      args: {
        id: intArg(),
        bio: stringArg(),
        location: stringArg(),
        website: stringArg(),
        avatar: stringArg(),
      },
      resolve: (parent, { id, ...args }, ctx) => {
        const userId = getUserId(ctx)
        if (!userId) throw new Error('Could not authenticate user.')

        return ctx.prisma.profile.update({
          data: { ...args },
          where: {
            id: Number(id),
          },
        })
      },
    })

    t.field('createSpeek', {
      type: 'Speek',
      args: {
        title: stringArg(),
        excerpt: stringArg(),
        content: stringArg(),
      },
      resolve: (parent, { content, title, excerpt }, ctx) => {
        const userId = getUserId(ctx)
        if (!userId) throw new Error('Could not authenticate user.')
        return ctx.prisma.speek.create({
          data: {
            content,
            title,
            excerpt,
            author: { connect: { id: Number(userId) } },
          },
        })
      },
    })

    t.field('likeSpeek', {
      type: 'LikedSpeek',
      args: {
        id: intArg(),
      },
      resolve: (parent, { id }, ctx) => {
        const userId = getUserId(ctx)
        if (!userId) throw new Error('Could not authenticate user.')
        return ctx.prisma.likedSpeek.create({
          data: {
            User: { connect: { id: Number(userId) } },
            speek: { connect: { id: Number(id) } },
          },
        })
      },
    })

    t.field('deleteLike', {
      type: 'LikedSpeek',
      args: {
        id: nonNull(intArg()),
      },
      resolve: (parent, { id }, ctx) => {
        const userId = getUserId(ctx)
        if (!userId) throw new Error('Could not authenticate user.')
        return ctx.prisma.likedSpeek.delete({
          where: { id: id },
        })
      },
    })

    t.field('createComment', {
      type: 'Comment',
      args: {
        id: nonNull(intArg()),
        content: nonNull(stringArg()),
      },
      resolve: (parent, { content, id }, ctx) => {
        const userId = getUserId(ctx)
        if (!userId) throw new Error('Could not authenticate user.')
        return ctx.prisma.comment.create({
          data: {
            content,
            User: { connect: { id: Number(userId) } },
            Speek: { connect: { id: Number(userId) } },
          },
        })
      },
    })
  },
})
