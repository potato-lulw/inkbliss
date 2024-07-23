import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const getFiles = query({
    args: {
        teamId: v.string(),
    },
    handler: async (ctx, args) => {
        const result = await ctx.db.query("files")
        .filter((q) => q.eq(q.field("teamId"), args.teamId))
        .order("desc")
        .collect();
        return result;
    }
})
export const getFileById = query({
    args: {
        fileId: v.string(),
    },
    handler: async (ctx, args) => {
        const result = await ctx.db.query("files")
        .filter((q) => q.eq(q.field("_id"), args.fileId))
        .collect();
        return result;
    }
})

export const createFile = mutation({
    args: {
        fileName: v.string(),
        teamId: v.string(),
        createdBy: v.string(),
        archived: v.boolean(),
        document: v.string(),
        whiteboard: v.string(),
    },
    handler: async (ctx, args) => {
        const result = await ctx.db.insert("files", args);
        return result;
    }
})