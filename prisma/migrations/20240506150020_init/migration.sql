-- AlterTable
ALTER TABLE "Category" ALTER COLUMN "status" SET DEFAULT true;

-- AlterTable
ALTER TABLE "Module" ALTER COLUMN "status" SET DEFAULT true;

-- AlterTable
ALTER TABLE "Module_profiles" ALTER COLUMN "status" SET DEFAULT true;

-- AlterTable
ALTER TABLE "Month" ALTER COLUMN "status" SET DEFAULT true;

-- AlterTable
ALTER TABLE "Payment_methods" ALTER COLUMN "status" SET DEFAULT true;

-- AlterTable
ALTER TABLE "Priority" ALTER COLUMN "status" SET DEFAULT true;

-- AlterTable
ALTER TABLE "Profile" ALTER COLUMN "status" SET DEFAULT true;

-- AlterTable
ALTER TABLE "Tags" ALTER COLUMN "status" SET DEFAULT true;

-- AlterTable
ALTER TABLE "Type_accounts" ALTER COLUMN "status" SET DEFAULT true;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "change_password" DROP NOT NULL,
ALTER COLUMN "change_password" SET DEFAULT true,
ALTER COLUMN "status" DROP NOT NULL,
ALTER COLUMN "status" SET DEFAULT true;

-- AlterTable
ALTER TABLE "User_profiles" ALTER COLUMN "read" SET DEFAULT true,
ALTER COLUMN "write" SET DEFAULT true;

-- AlterTable
ALTER TABLE "Year" ALTER COLUMN "status" SET DEFAULT true;
