"use client";

import { useState } from "react";

import classes from "./modal.module.css";

export default function DeleteRecipeButton({ slug, removeMeal }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className={classes["delete-recipe"]}>
      <button
        onClick={() => setShowModal(true)}
        className={classes["delete-btn"]}
      >
        Delete Recipe
      </button>

      {showModal && (
        <div
          className={classes["modal-backdrop"]}
          onClick={() => setShowModal(false)}
        >
          <div className={classes.modal} onClick={(e) => e.stopPropagation()}>
            <div className={classes.texts}>
              <h3>Are you sure?</h3>
              <p>This action will permanently delete this recipe.</p>
            </div>

            <div className={classes.actions}>
              <button
                className={classes.cancel}
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>

              <form action={removeMeal}>
                <input type="hidden" name="slug" value={slug} />
                <button type="submit" className={classes.delete}>
                  Delete
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
