import Link from "next/link";

import classes from "./page.module.css";
import ImageSlideshow from "@/components/images/image-slideshow";

export default function Home() {
  return (
    <>
      <header className={classes.header}>
        <div className={classes.slideshow}>
          <ImageSlideshow />
        </div>
        <div>
          <div className={classes.hero}>
            <h1 className="highlight">NextLevel Nutrition for NextLevel Athletes</h1>
            <p>Fuel your body with fresh, healthy, high‑protein meals.</p>
          </div>
          <div className={classes.cta}>
            <Link href="/community">Join the Community</Link>
            <Link href="/meals">Explore Meals</Link>
          </div>
        </div>
      </header>
      <main>
        <section className={classes.section}>
          <h2>How it works</h2>
          <p>
            NutriFit helps athletes and active individuals discover clean,
            high‑protein recipes designed to boost energy, performance, and
            recovery.
          </p>
          <p>
            Browse meals tailored for muscle growth, weight management, and a
            healthier lifestyle — all made with fresh, nutrient‑dense
            ingredients.
          </p>
        </section>

        <section className={classes.section}>
          <h2>Why NutriFit?</h2>
          <p>
            Because eating right should be simple. NutriFit gives you
            access to balanced, athlete‑focused meals that support your fitness
            goals.
          </p>
          <p>
            From quick protein-packed dishes to clean, energizing meals,
            everything is crafted to help you train stronger and feel better
            every day.
          </p>
        </section>
      </main>
    </>
  );
}
