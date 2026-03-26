export interface Recipe {
  id: string
  name: string
  image: string
  category: string
  area: string
  instructions: string
  ingredients: { ingredient: string; measure: string }[]
  source?: string
  youtube?: string
}
