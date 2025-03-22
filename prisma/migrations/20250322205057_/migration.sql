-- CreateTable
CREATE TABLE "users" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "email" VARCHAR(512),
    "password" VARCHAR(512),
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "image_sliders" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "title" VARCHAR(512),
    "image" VARCHAR(512),
    "order" INTEGER,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "image_sliders_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "business_values" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "title" VARCHAR(512),
    "description" VARCHAR(512),
    "code" VARCHAR(512),
    "order" INTEGER,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "business_values_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "work_values" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "description" VARCHAR(512),
    "subtitle_1" VARCHAR(512),
    "subdescription_1" VARCHAR(512),
    "subtitle_2" VARCHAR(512),
    "subdescription_2" VARCHAR(512),
    "call_to_action_1" VARCHAR(512),
    "call_to_action_2" VARCHAR(512),
    "image" TEXT,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "work_values_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "achievements" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "title" VARCHAR(512),
    "total" INTEGER,
    "code" VARCHAR(512),
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "achievements_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "call_to_actions" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "title" VARCHAR(512),
    "description" VARCHAR(512),
    "call_to_action_1" VARCHAR(512),
    "call_to_action_2" VARCHAR(512),
    "image_1" TEXT,
    "image_2" TEXT,
    "image_3" TEXT,
    "image_4" TEXT,
    "image_5" TEXT,
    "image_6" TEXT,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "call_to_actions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "faqs" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "question" VARCHAR(512),
    "answer" VARCHAR(512),
    "order" INTEGER,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "faqs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "clients" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" VARCHAR(512),
    "image" VARCHAR(512),
    "order" INTEGER,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "clients_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "section_headers" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "title" VARCHAR(512),
    "code" VARCHAR(512),
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "section_headers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "page_headers" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "title" VARCHAR(512),
    "code" VARCHAR(512),
    "image" VARCHAR(512),
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "page_headers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "contacts" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "title" VARCHAR(512),
    "description" VARCHAR(512),
    "link" VARCHAR(512),
    "code" VARCHAR(512),
    "image" VARCHAR(512),
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "contacts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "abouts" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "title" VARCHAR(512),
    "description" TEXT,
    "call_to_action" VARCHAR(512),
    "image_1" VARCHAR(512),
    "image_2" VARCHAR(512),
    "image_3" VARCHAR(512),
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "abouts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "services" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "title" VARCHAR(512),
    "description" VARCHAR(512),
    "image" VARCHAR(512),
    "order" INTEGER,
    "status" BOOLEAN,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "services_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "portfolioes" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "title" VARCHAR(512),
    "slug" VARCHAR(512),
    "description" TEXT,
    "client" VARCHAR(512),
    "start" TIMESTAMP(3),
    "end" TIMESTAMP(3),
    "address" VARCHAR(512),
    "image_1" VARCHAR(512),
    "image_2" VARCHAR(512),
    "image_3" VARCHAR(512),
    "image_4" VARCHAR(512),
    "image_5" VARCHAR(512),
    "image_6" VARCHAR(512),
    "image_7" VARCHAR(512),
    "image_8" VARCHAR(512),
    "image_9" VARCHAR(512),
    "image_10" VARCHAR(512),
    "status" BOOLEAN,
    "service_id" UUID,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "portfolioes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "blog_categories" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "title" VARCHAR(512),
    "order" INTEGER,
    "status" BOOLEAN,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "blog_categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "blogs" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "title" VARCHAR(512),
    "slug" VARCHAR(512),
    "description" TEXT,
    "author" VARCHAR(512),
    "date" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "body" TEXT,
    "tags" TEXT,
    "image" VARCHAR(512),
    "status" BOOLEAN,
    "category_id" UUID,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "blogs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "social_media" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "title" VARCHAR(512),
    "link" VARCHAR(512),
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "social_media_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "quotations" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "title" VARCHAR(512),
    "description" TEXT,
    "fullname" VARCHAR(512),
    "email" VARCHAR(512),
    "phone" VARCHAR(512),
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "quotations_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "portfolioes" ADD CONSTRAINT "portfolioes_service_id_fkey" FOREIGN KEY ("service_id") REFERENCES "services"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "blogs" ADD CONSTRAINT "blogs_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "blog_categories"("id") ON DELETE SET NULL ON UPDATE CASCADE;
