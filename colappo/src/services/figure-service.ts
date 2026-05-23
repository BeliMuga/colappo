import { mockFigures } from "@/data/mock-figures";
import { Figure } from "@/types/figure";

/*export async function getFigures(): Promise<
  Figure[]
> {
  return mockFigures;
}*/
export async function getFigures() {
  const response = await fetch(
    "http://localhost:3000/figures",
  );

  const data = await response.json();

  console.log("getFigures response:", data);

  return data;
}
