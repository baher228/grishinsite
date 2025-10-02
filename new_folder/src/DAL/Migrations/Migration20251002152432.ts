import { Migration } from '@mikro-orm/migrations';

export class Migration20251002152432 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create table "orders" ("id" serial primary key, "created_at" timestamptz not null default now(), "updated_at" timestamptz not null default now(), "customer_email" varchar(255) not null, "total_amount" int not null, "status" varchar(255) not null default 'pending', "stripe_checkout_session_id" varchar(255) not null);`);
    this.addSql(`alter table "orders" add constraint "orders_stripe_checkout_session_id_unique" unique ("stripe_checkout_session_id");`);

    this.addSql(`create table "products" ("id" serial primary key, "created_at" timestamptz not null default now(), "updated_at" timestamptz not null default now(), "name" varchar(255) not null, "category" varchar(255) not null, "brand" varchar(255) null, "description" varchar(255) null, "image" varchar(255) null, "price" int not null, "stock" int not null);`);

    this.addSql(`create table "order_items" ("id" serial primary key, "created_at" timestamptz not null default now(), "updated_at" timestamptz not null default now(), "order_id" int not null, "product_id" int not null, "quantity" int not null, "price_at_purchase" int not null);`);

    this.addSql(`alter table "order_items" add constraint "order_items_order_id_foreign" foreign key ("order_id") references "orders" ("id") on update cascade;`);
    this.addSql(`alter table "order_items" add constraint "order_items_product_id_foreign" foreign key ("product_id") references "products" ("id") on update cascade;`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table "order_items" drop constraint "order_items_order_id_foreign";`);

    this.addSql(`alter table "order_items" drop constraint "order_items_product_id_foreign";`);

    this.addSql(`drop table if exists "orders" cascade;`);

    this.addSql(`drop table if exists "products" cascade;`);

    this.addSql(`drop table if exists "order_items" cascade;`);
  }

}
