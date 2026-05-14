export interface Figure {
  id: string;

  name: string;
  anime: string;
  collection: string;

  size: {
    width: number;
    height: number;
    depth: number;
  };

  description: string;

  imageUrl: string;
}
