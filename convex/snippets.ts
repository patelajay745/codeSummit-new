import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const createSnippet = mutation({
    args: {
        title: v.string(),
        language: v.string(),
        code: v.string(),
        userId: v.string(),
    },
    handler: async (ctx, args) => {

        if (!args.userId) throw new Error("Not Authorized")

        const user = await ctx.db.query("users").withIndex("by_user_id").filter(q => q.eq(q.field("userId"), args.userId)).first()

        if (!user) throw new Error("user Not found")

        const snippetId = await ctx.db.insert("snippets", {
            userId: args.userId,
            language: args.language,
            code: args.code,
            userName: user.name,
            title: args.title
        })

        return snippetId
    }
})

export const getSnippets = query({
    handler: async (ctx) => {
        const snippets = await ctx.db.query("snippets").order("desc").collect();

        return snippets
    }
})

export const deleteSnippet = mutation({
    args: {
        snippetId: v.id("snippets"),
        userId: v.string()
    },
    handler: async (ctx, args) => {
        if (!args.userId) throw new Error("Not Authenticated")

        const snippet = await ctx.db.get(args.snippetId)

        if (!snippet) throw new Error("snippet not found")

        if (snippet.userId !== args.userId) {
            throw new Error("Not authorized to delete this snippet")
        }

        const comments = await ctx.db.query("snippetComments").withIndex("by_snippet_id").filter(q => q.eq(q.field("snippetId"), args.snippetId)).collect()

        for (const comment of comments) {
            await ctx.db.delete(comment._id)
        }

        const stars = await ctx.db.query("stars").withIndex("by_snippet_id").filter(q => q.eq(q.field("snippetId"), args.snippetId)).collect()

        for (const star of stars) {
            await ctx.db.delete(star._id)
        }

        await ctx.db.delete(args.snippetId)
    }
})

export const starSnippet = mutation({
    args: {
        snippetId: v.id("snippets"),
        userId: v.string()
    },
    handler: async (ctx, args) => {

        const existing = await ctx.db
            .query("stars")
            .withIndex("by_user_id_and_snippet_id")
            .filter(
                (q) =>
                    q.eq(q.field("userId"), args.userId) && q.eq(q.field("snippetId"), args.snippetId)
            )
            .first();

        if (existing) {
            await ctx.db.delete(existing._id);
        } else {
            await ctx.db.insert("stars", {
                userId: (args.userId),
                snippetId: args.snippetId,
            });
        }
    },
});

export const isSnippetStarted = query({
    args: {
        snippetId: v.id("snippets"),
        userId: v.string()
    },
    handler: async (ctx, args) => {
        const star = await ctx.db.query("stars").withIndex("by_user_id_and_snippet_id").filter(q => q.eq(q.field("userId"), args.userId) && q.eq(q.field("snippetId"), args.snippetId)).first()

        return !!star
    }
})

export const getSnippetStarCount = query({
    args: {
        snippetId: v.id("snippets"),
    },
    handler: async (ctx, args) => {
        const stars = await ctx.db.query("stars").withIndex("by_snippet_id").filter(q => q.eq(q.field("snippetId"), args.snippetId)).collect()

        return stars.length
    }
})