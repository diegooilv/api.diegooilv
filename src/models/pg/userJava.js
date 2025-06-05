import { integer, pgTable, varchar } from "drizzle-orm/pg-core";

export const users = pgTable("userJava", {
  id: integer("id").primaryKey(),
  nome: varchar("nome", { length: 200 }).notNull(),
  numero: varchar("numero", { length: 20 }).notNull(),
  email: varchar("email", { length: 150 }).notNull(),
  cpf: varchar("cpf", { length: 15 }).notNull(),
  endereco: varchar("endereco", { length: 150 }),
});

export default users;