import { FREE_PLAN_LANGUAGES } from './../app/(root)/_constants/index';

import { ConvexError, v } from "convex/values";
import { mutation } from "./_generated/server";

export const saveExeuction = mutation({
    args: {
        code: v.string(),
        language: v.string(),
        output: v.optional(v.string()),
        error: v.optional(v.string()),
        userId: v.string()
    },
    handler: async (ctx, args) => {
        //const identity = await ctx.auth.getUserIdentity()

        // console.log(ctx.auth)

        // console.log("userId", args.userId)

        //if (!identity) throw new ConvexError("Not authenticated")

        const user = await ctx.db.query("users").withIndex("by_user_id").filter(q => q.eq(q.field("userId"), args.userId)).first()

        if (!user?.isPro && !FREE_PLAN_LANGUAGES.includes(args.language)) {
            throw new ConvexError("Pro subscription required to use this language")
        }

        await ctx.db.insert("codeExecutions", {
            ...args,
            userId: args.userId
        })
    }
})