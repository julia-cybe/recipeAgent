export interface Ingredient {
  id?: number;
  name: string;
  quantity: number;
  unit: string;
}

export interface Recipe {
  id?: number;
  title: string;
  description: string;
  preparation_steps: string;
  ingredients: Ingredient[];
}
