CREATE TYPE gender AS ENUM ('мужчина', 'женщина');

CREATE TABLE IF NOT EXISTS "district" (
	"id" serial NOT NULL UNIQUE PRIMARY KEY,
	"name" varchar(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS "establishment_type" (
	"id" serial NOT NULL UNIQUE PRIMARY KEY,
	"name" varchar(255) NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS "cuisine" (
	"id" serial NOT NULL UNIQUE PRIMARY KEY,
	"name" varchar(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS "user" (
	"id" varchar(255) PRIMARY KEY NOT NULL,
	"gender" gender,
	"phone" varchar(255),
	"password" varchar(255) NOT NULL,
	"surname" varchar(255),
	"age" int,
	"email" varchar(255),
	"name" varchar(255),
	"code" varchar(255),
	"registered" BOOLEAN DEFAULT FALSE,
	"createdAt" TIMESTAMP NOT NULL DEFAULT timezone('utc', now()),
	"updatedAt" TIMESTAMP NOT NULL DEFAULT timezone('utc', now())
);

CREATE TABLE IF NOT EXISTS "restaurant" (
	"id" serial NOT NULL UNIQUE PRIMARY KEY,
	"name" varchar(255) NOT NULL,
	"address" varchar(255) NOT NULL,
	"images" TEXT[],
	"phone_number" varchar(255) NOT NULL,
	"district_id" int NOT NULL REFERENCES "district" ("id"),
	"establishment_type_id" int NOT NULL REFERENCES "establishment_type" ("id"),
	"vk_link" varchar(255),
	"instagram_link" varchar(255),
	"site_link" varchar(255),
	"cuisine_id" int NOT NULL REFERENCES "cuisine" ("id"),
	"average_check" int NOT NULL
);

CREATE TABLE IF NOT EXISTS "user_pin_restaurant" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" VARCHAR(255) NOT NULL REFERENCES "user" ("id"),
	"restaurant_id" int NOT NULL REFERENCES "restaurant" ("id")
);

CREATE TABLE IF NOT EXISTS "tokens" (
	"user_id" varchar(255) NOT NULL REFERENCES "user" ("id"),
	"refreshToken" varchar(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS "restaurant_review" (
	"id" serial NOT NULL UNIQUE PRIMARY KEY,
	"user_id" varchar(255) NOT NULL REFERENCES "user" ("id"),
	"restaurant_id" int NOT NULL REFERENCES "restaurant" ("id"),
	"rating" float NOT NULL,
	"comment" text,
	"publication_date" date NOT NULL
);

CREATE TABLE IF NOT EXISTS "work_mode" (
  "id" serial NOT NULL PRIMARY KEY UNIQUE,
	"restaurant_id" int NOT NULL REFERENCES "restaurant" ("id"),
	"weekdays" int[] NOT NULL,
	"date" date,
	"time_from" time without time zone NOT NULL,
	"time_to" time without time zone NOT NULL
);