import { v } from "convex/values";
import { mutation } from "./_generated/server";

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
            username: user.name,
            title: args.title
        })

        return snippetId
    }
})