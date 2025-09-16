"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Migration20250916113716 = void 0;
const migrations_1 = require("@mikro-orm/migrations");
class Migration20250916113716 extends migrations_1.Migration {
    async up() {
        this.addSql(`drop table if exists "users" cascade;`);
        this.addSql(`alter table "products" drop column "id";`);
        this.addSql(`alter table "products" add column "created_at" timestamptz not null default now(), add column "updated_at" timestamptz not null default now(), add column "id" serial primary key;`);
        this.addSql(`alter table "products" alter column "description" type varchar(255) using ("description"::varchar(255));`);
        this.addSql(`alter table "products" alter column "image" type varchar(255) using ("image"::varchar(255));`);
        this.addSql(`alter table "products" alter column "price" type int using ("price"::int);`);
        this.addSql(`alter table "products" alter column "category" type varchar(255) using ("category"::varchar(255));`);
        this.addSql(`alter table "products" alter column "category" set not null;`);
    }
    async down() {
        this.addSql(`create table "users" ("id" serial primary key, "first_name" varchar(100) not null, "last_name" varchar(100) not null, "email" varchar(255) not null, "phone_number" varchar(20) null, "password_hash" varchar(255) not null, "agreed_terms" bool not null default false, "subscribed_newsletter" bool not null default false, "created_at" timestamp(6) null default CURRENT_TIMESTAMP);`);
        this.addSql(`alter table "users" add constraint "users_email_key" unique ("email");`);
        this.addSql(`alter table "products" drop column "id", drop column "created_at", drop column "updated_at";`);
        this.addSql(`alter table "products" add column "id" int4 generated always as identity not null;`);
        this.addSql(`alter table "products" alter column "category" type varchar(100) using ("category"::varchar(100));`);
        this.addSql(`alter table "products" alter column "category" drop not null;`);
        this.addSql(`alter table "products" alter column "description" type text using ("description"::text);`);
        this.addSql(`alter table "products" alter column "image" type varchar(2083) using ("image"::varchar(2083));`);
        this.addSql(`alter table "products" alter column "price" type numeric(10,2) using ("price"::numeric(10,2));`);
    }
}
exports.Migration20250916113716 = Migration20250916113716;
//# sourceMappingURL=Migration20250916113716.js.map