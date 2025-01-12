import { v } from "convex/values";

import { mutation } from "./_generated/server";

const images = [
    '/placeholders/logoipsum-1.svg',
    '/placeholders/logoipsum-2.svg',
    '/placeholders/logoipsum-3.svg',
    '/placeholders/logoipsum-4.svg',
    '/placeholders/logoipsum-5.svg',
    '/placeholders/logoipsum-6.svg',
    '/placeholders/logoipsum-7.svg',
    '/placeholders/logoipsum-8.svg',
    '/placeholders/logoipsum-9.svg',
    '/placeholders/logoipsum-10.svg',
    '/placeholders/logoipsum-11.svg',
    '/placeholders/logoipsum-12.svg',
]

// create board
export const create = mutation({
    args: {
        orgId: v.string(),
        title: v.string(),
    },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity()

        if (!identity) {
            throw new Error('Unauthorized')
        }

        const randomImage = images[Math.floor(Math.random() * images.length)]

        const board = await ctx.db.insert('boards', {
            orgId: args.orgId,
            title: args.title,
            authorId: identity.subject,
            authorName: identity.name!,
            imageUrl: randomImage
        })

        return board
    },
})

// Delete board
export const remove = mutation({
    args: {
        id: v.id('boards'),
    },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity()

        if (!identity) {
            throw new Error('Unauthorized')
        }

        // TODO: Later check to delete favorite relation as well

        await ctx.db.delete(args.id)
    }
});