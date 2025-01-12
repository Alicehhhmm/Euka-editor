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

// Update board
export const update = mutation({
    args: {
        id: v.id('boards'),
        title: v.string(),
    },
    handler: async (ctx, args) => {
        const title = args.title.trim()
        const identity = await ctx.auth.getUserIdentity()

        if (!identity) {
            throw new Error('Unauthorized')
        }

        if (!title) {
            throw new Error('Title is required')
        }

        if (title.length > 30) {
            throw new Error('Title cannot be less than 30 characters')
        }

        const board = await ctx.db.patch(args.id, {
            title: args.title,
        })

        return board
    }
});

// Add favorite
export const favorite = mutation({
    args: {
        id: v.id('boards'),
        orgId: v.string(),
    },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity()

        if (!identity) {
            throw new Error('Unauthorized')
        }

        const board = await ctx.db.get(args.id)

        if (!board) {
            throw new Error('Board not found')
        }

        const userId = identity.subject

        const existingFavorites = await ctx.db.query('userFavorites')
            .withIndex("by_user_board_org", (q) => (
                q
                    .eq("userId", userId)
                    .eq("boardId", board._id)
                    .eq("orgId", args.orgId)
            ))
            .unique();

        if (existingFavorites) {
            throw new Error("Board already favorited");
        }

        await ctx.db.insert('userFavorites', {
            userId,
            boardId: board._id,
            orgId: args.orgId,
        })

        return board
    }
});

// Close Favorite
export const unFavorite = mutation({
    args: {
        id: v.id('boards'),
    },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity()

        if (!identity) {
            throw new Error('Unauthorized')
        }

        const board = await ctx.db.get(args.id)

        if (!board) {
            throw new Error('Board not found')
        }

        const userId = identity.subject

        const existingFavorites = await ctx.db.query('userFavorites')
            .withIndex("by_user_board", (q) => (
                q
                    .eq("userId", userId)
                    .eq("boardId", board._id)
                // TODO: chack if orgId needs
            ))
            .unique();

        if (!existingFavorites) {
            throw new Error("Favorite board not found");
        }

        await ctx.db.delete(existingFavorites._id)

        return board
    }
});