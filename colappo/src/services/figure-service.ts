import { mockFigures } from "@/data/mock-figures";
import { Figure } from "@/types/figure";

export async function getFigures(): Promise<
  Figure[]
> {
  return mockFigures;
}
