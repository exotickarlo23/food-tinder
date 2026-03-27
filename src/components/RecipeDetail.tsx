import type { Recipe } from '../types/recipe'

interface RecipeDetailProps {
  recipe: Recipe
}

function parseSteps(instructions: string): string[] {
  const lines = instructions
    .split(/\r?\n/)
    .map((s) => s.trim())
    .filter((s) => s.length > 0)

  return lines
    .filter((s) => !/^step\s*\d+\s*[:.)\-]?\s*$/i.test(s))
    .map((s) => s.replace(/^step\s*\d+\s*[:.)\-]\s*/i, ''))
    .map((s) => s.replace(/^\d+\s*[:.)\-]\s*/, ''))
    .map((s) => s.trim())
    .filter((s) => s.length > 0)
}

export default function RecipeDetail({ recipe }: RecipeDetailProps) {
  const steps = parseSteps(recipe.instructions)

  return (
    <div className="px-10 pb-6 -mt-4">
      <h2 className="text-xl font-bold text-gray-800 mb-1">{recipe.name}</h2>
      <p className="text-sm text-gray-400 mb-4">{recipe.area} · {recipe.category}</p>

      {/* Ingredients */}
      <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wide mb-2">Ingredients</h3>
      <ul className="space-y-1.5 mb-5">
        {recipe.ingredients.map((ing, i) => (
          <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
            <span className="w-1.5 h-1.5 rounded-full bg-coral mt-1.5 flex-shrink-0" />
            <span>
              {ing.measure && <span className="text-gray-800 font-medium">{ing.measure}</span>}{' '}
              {ing.ingredient}
            </span>
          </li>
        ))}
      </ul>

      {/* Steps */}
      <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wide mb-2">Preparation</h3>
      <ol className="space-y-3">
        {steps.map((step, i) => (
          <li key={i} className="flex gap-3 text-sm text-gray-600">
            <span className="w-6 h-6 rounded-full bg-coral/10 text-coral text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
              {i + 1}
            </span>
            <p className="leading-relaxed">{step}</p>
          </li>
        ))}
      </ol>
    </div>
  )
}
