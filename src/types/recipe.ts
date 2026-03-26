export interface Recipe {
  id: string
  name: string
  description: string
  image: string
  category: string
  prepTime: string
  difficulty: 'Easy' | 'Medium' | 'Hard'
}
