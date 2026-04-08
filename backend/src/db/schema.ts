

import { boolean, index, pgTable, serial, text, timestamp, uuid, varchar } from "drizzle-orm/pg-core";
import { relations, Table } from "drizzle-orm";

export const users = pgTable("users", {
    id: uuid('id').primaryKey(),
    email: text("email").notNull().unique(),
    name: text("name").notNull(),
    passwordHash: text("password_hash").notNull(),
    role: varchar('role', { length: 50 }).default('user').notNull(),
    isActive: boolean('is_active').default(true).notNull(),
    imageUrl: text("image_url"),
    createdAt: timestamp("created_at", { mode: "date" }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { mode: "date" }).notNull().defaultNow().$onUpdate(() => new Date()),
});

export const products = pgTable("products", {
    id: uuid('id').primaryKey(),
    title: text("title").notNull(),
    description: text("description").notNull(),
    imageUrl: text("image_url").notNull(),
    userID: uuid("user_id")
        .notNull()
        .references(() => users.id, { onDelete: "cascade" }),
    createdAt: timestamp("created_at", { mode: "date" }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { mode: "date" }).notNull().defaultNow().$onUpdate(() => new Date()),
});

export const comments = pgTable("comments", {
    id: uuid("id").defaultRandom().primaryKey(),
    content: text("content").notNull(),
    userID: uuid("user_id")
        .notNull()
        .references(() => users.id, { onDelete: "cascade" }),
    productID: uuid("product_id")
        .notNull()
        .references(() => products.id, { onDelete: "cascade" }),
    createdAt: timestamp("created_at", { mode: "date" }).notNull().defaultNow(),
});



// RElacion uno a muchos 

export const usersRlations = relations(users, ({ many }) => ({
    products: many(products),
    comments: many(comments),

}))

// fields = foreign key de esat tabla (products.userId)
// references = primary key en la tabla relacinada (users.id)
export const productsRelations = relations(products, ({ one, many }) => ({
    comments: many(comments),
    user: one(users, { fields: [products.userID], references: [users.id] })
}))


export const commentsRelations = relations(comments, ({ one }) => ({
    user: one(users, { fields: [comments.userID], references: [users.id] }),
    product: one(products, { fields: [comments.productID], references: [products.id] })
}))


// type inference
export type User = typeof users.$inferSelect
export type NewUser = typeof users.$inferInsert

export type Product = typeof products.$inferSelect
export type NewProduct = typeof products.$inferInsert

export type Coment = typeof comments.$inferSelect
export type NewComent = typeof comments.$inferInsert