"use client"

type NewsCategoriesProps = {
  categories: string[]
  selectedCategory: string
  onSelectCategory: (category: string) => void
}

export function NewsCategories({ categories, selectedCategory, onSelectCategory }: NewsCategoriesProps) {
  return (
    <div className="flex flex-wrap gap-3">
      {categories.map((category) => {
        const isSelected = category === selectedCategory
        return (
          <button
            key={category}
            type="button"
            onClick={() => onSelectCategory(category)}
            className={[
              "rounded-full border px-4 py-2 font-sans text-sm font-semibold transition-all",
              isSelected
                ? "border-[#E05780] bg-[#E05780] text-white shadow-sm"
                : "border-black/10 bg-[#F8FAFC] text-black/60 hover:border-[#75A5E3]/50 hover:text-[#75A5E3]",
            ].join(" ")}
          >
            {category}
          </button>
        )
      })}
    </div>
  )
}
