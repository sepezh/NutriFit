import Image from "next/image";

import classes from "./page.module.css";
import { getMeal } from "@/lib/meals";
import { notFound } from "next/navigation";
import { removeMeal } from "@/lib/actions";
import DeleteRecipeButton from "@/components/modal/modal";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const meal = await getMeal(slug);

  if (!meal) {
    notFound();
  }

  return {
    title: meal.title,
    description: meal.summary,
  };
}

export default async function MealDetailsPage({ params }) {
  const { slug } = await params;
  const meal = await getMeal(slug);

  if (!meal) {
    notFound();
  }

  meal.instructions = meal.instructions.replace(/\n/g, "<br />");

  return (
    <>
      <header className={classes.header}>
        <div className={classes.imageWrapper}>
          <div className={classes.image}>
            <Image
              src={`https://sepezh-nextjs-demo-users-image.s3.eu-central-1.amazonaws.com/${meal.image}`}
              alt={meal.title}
              fill
            />
          </div>
        </div>
        <div className={classes.headerText}>
          <h1 className="highlight">{meal.title}</h1>
          <p className={classes.creator}>
            BY{" "}
            <a className="highlight" href={`mailto:${meal.creator_email}`}>
              {meal.creator}
            </a>
          </p>
          <p className={classes.summary}>{meal.summary}</p>
        </div>
      </header>
      <main>
        <p
          className={classes.instructions}
          dangerouslySetInnerHTML={{
            //we use it beacause instructios are a markdown value
            __html: meal.instructions,
          }}
        ></p>
        <DeleteRecipeButton slug={meal.slug} removeMeal={removeMeal} />
      </main>
    </>
  );
}
