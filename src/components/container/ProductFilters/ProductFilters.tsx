"use client";

import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import type { ProductFiltersProps } from "@/types/Products.type";

const ProductFilters = ({
  categories,
  onFilterChange,
}: ProductFiltersProps) => {
  return (
    <div className="flex flex-wrap items-center gap-3 w-full">
      <div className="flex flex-1 flex-row items-center gap-1">
        {/* Category Filter */}
        <Select
          onValueChange={(value) =>
            onFilterChange({ categoryId: Number(value), page: 1, limit: 20 })
          }
        >
          <SelectTrigger className="flex-1">
            <SelectValue placeholder="Filter" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((cat) => (
              <SelectItem key={cat.id} value={String(cat.id)}>
                {cat.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Sort Filter */}
        <Select
          defaultValue="newest"
          onValueChange={(value) => {
            onFilterChange({ sort: value, page: 1, limit: 20 });
          }}
        >
          <SelectTrigger className="flex-1">
            <SelectValue placeholder="Sort By" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="newest">Newest</SelectItem>
            <SelectItem value="price">Price</SelectItem>
            <SelectItem value="rating">Rating</SelectItem>
            <SelectItem value="popular">Popular</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default ProductFilters;
