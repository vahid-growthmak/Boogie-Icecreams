import { formatEnergy } from '@/lib/format';
import type { Product } from '@/lib/schema';

/** A real table with row headers and a caption. Server-rendered. */
export function NutritionTable({ nutrition }: { nutrition: Product['nutritionPer100g'] }) {
  const rows: Array<[string, string]> = [
    ['Energy', formatEnergy(nutrition.energyKj, nutrition.energyKcal)],
    ['Fat', `${nutrition.fat} g`],
    ['of which saturates', `${nutrition.saturates} g`],
    ['Carbohydrate', `${nutrition.carbohydrate} g`],
    ['of which sugars', `${nutrition.sugars} g`],
    ['Protein', `${nutrition.protein} g`],
    ['Salt', `${nutrition.salt} g`],
  ];

  return (
    <table className="w-full border-collapse text-body">
      <caption className="mb-3 text-left text-caption text-cocoa-60">
        Typical values per 100g
      </caption>
      <tbody>
        {rows.map(([label, value]) => (
          <tr key={label} className="border-b border-cocoa/10 last:border-b-0">
            <th scope="row" className="py-2 text-left font-normal text-cocoa">
              {label}
            </th>
            <td className="py-2 text-right text-cocoa">{value}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
