import classes from "./footer.module.css";

export default function Footer() {
  return (
    <footer className={classes.footer}>
      <p>&copy; {new Date().getFullYear()} NutriFit. All rights reserved.</p>
    </footer>
  );
}
