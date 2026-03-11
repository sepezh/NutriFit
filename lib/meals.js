import { DeleteObjectCommand, S3 } from "@aws-sdk/client-s3";
import sql from "better-sqlite3";
import slugify from "slugify";
import xss from "xss";

const s3 = new S3({
  region: "eu-central-1",
});

const db = sql("meals.db");

export async function getMeals() {
  await new Promise((resolve) => setTimeout(resolve, 2000));

  return db.prepare("SELECT * FROM meals").all();
}

export async function getMeal(slug) {
  return db.prepare("SELECT * FROM meals WHERE slug = ?").get(slug);
}

export async function saveMeal(meal) {
  meal.slug = slugify(meal.title, { lower: true });
  meal.instructions = xss(meal.instructions);

  const extention = meal.image.name.split(".").pop();
  const fileName = `${meal.slug}.${extention}`;

  const bufferedImage = await meal.image.arrayBuffer();

  await s3.putObject({
    Bucket: "sepezh-nextjs-demo-users-image",
    Key: fileName,
    Body: Buffer.from(bufferedImage),
    ContentType: meal.image.type,
  });

  meal.image = fileName;

  db.prepare(
    `
    INSERT INTO meals
      (title, summary, instructions, creator, creator_email, image, slug)
    VALUES (
      @title,
      @summary,
      @instructions,
      @creator,
      @creator_email,
      @image,
      @slug
    )
    `,
  ).run(meal);
}

export async function deleteMeal(slug) {
  const meal = await getMeal(slug);

  if (!meal) {
    throw new Error("Meal not found");
  }

  const key = meal.image.split("/").pop();

  await s3.send(
    new DeleteObjectCommand({
      Bucket: "sepezh-nextjs-demo-users-image",
      Key: key,
    }),
  );

  db.prepare("DELETE FROM meals WHERE slug = ?").run(slug);
}
