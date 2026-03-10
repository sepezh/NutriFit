"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";

import logoImage from "@/assets/logo.png";
import classes from "./main-header.module.css";
import NavLink from "./nav-link";

export default function MainHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const prevPath = useRef(pathname);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "auto";
  }, [menuOpen]);

  useEffect(() => {
    if (prevPath.current !== pathname) {
      setMenuOpen(false);
      prevPath.current = pathname;
    }
  }, [pathname]);

  return (
    <header className={classes.header}>
      <div className={classes.logoWrapper}>
        <Link href="/" className={classes.logo}>
          <Image src={logoImage} alt="NutriFit logo" priority />
          NutriFit
        </Link>
      </div>

      <button
        className={classes.burger}
        onClick={() => setMenuOpen((prev) => !prev)}
      >
        <span />
        <span />
        <span />
      </button>

      <nav className={`${classes.nav} ${menuOpen ? classes.open : ""}`}>
        <ul>
          <li>
            <NavLink href="/meals">Browse Athlete Meals</NavLink>
          </li>
          <li>
            <NavLink href="/community">Nutrition Community</NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}
