import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

import { deleteMeal } from "./meals";

export async function removeMeal(formData) {
  const slug = formData.get("slug");

  await deleteMeal(slug);

  revalidatePath("/meals");
  redirect("/meals");
}
