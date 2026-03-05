import { TerritoryResults } from "@/components/create/territory-results";

export default function TerritoriesPage() {
  return (
    <main className="min-h-screen bg-paper text-ink">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 py-4 md:px-6 md:py-6">
        <TerritoryResults />
      </div>
    </main>
  );
}
