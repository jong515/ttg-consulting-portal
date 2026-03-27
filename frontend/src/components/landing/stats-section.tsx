const stats = [
  { value: '500+', label: 'Families served' },
  { value: '4', label: 'Programmes' },
  { value: '92%', label: 'Parent satisfaction' },
  { value: '8+', label: 'Years of experience' },
] as const;

export function StatsSection() {
  return (
    <section id="about" className="mx-auto max-w-[1200px] px-6 py-12">
      <div className="bg-brand-border rounded-2xl overflow-hidden">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-px">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="flex flex-col items-center justify-center bg-white py-8 px-4"
            >
              <span className="font-serif text-[28px] font-semibold text-brand-accent">
                {stat.value}
              </span>
              <span className="text-sm text-brand-text-muted mt-1">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
