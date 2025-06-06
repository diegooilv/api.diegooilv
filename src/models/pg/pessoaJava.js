import { pgTable, serial, varchar } from "drizzle-orm/pg-core";

export const users = pgTable("pessoaJava", {
  id: serial("id").primaryKey(), 
  nome: varchar("nome", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  senha: varchar("senha", { length: 255 }).notNull(),
  endereco: varchar("endereco", { length: 255 }).notNull(),
});

export default users;