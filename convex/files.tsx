import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const getFiles = query({
    args: {
        createdBy: v.string(),
        teamId: v.string(),
    },
    handler: async (ctx, args) => {
        const result = await ctx.db.query("files")
        .filter((q) => q.eq(q.field("createdBy"), args.createdBy && args.teamId))
        .collect();
        return result;
    }
})

export const createFile = mutation({
    args: {
        fileName: v.string(),
        teamId: v.string(),
        createdBy: v.string(),
    },
    handler: async (ctx, args) => {
        const result = await ctx.db.insert("files", args);
        return result;
    }
})