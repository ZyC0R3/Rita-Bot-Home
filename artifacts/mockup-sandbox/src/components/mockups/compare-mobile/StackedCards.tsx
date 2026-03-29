import { useState } from "react";

const plans = [
  { name: "Trial", price: "FREE FOR 1 MONTH", sub: "or until limits have been reached.", period: "", highlighted: false },
  { name: "Reaction", price: "$2.99", sub: "Renews monthly until cancelled", period: "/mo", highlighted: false },
  { name: "Casual", price: "$6.99", sub: "Renews monthly until cancelled", period: "/mo", highlighted: false },
  { name: "Tinkerer", price: "$10.99", sub: "Renews monthly until cancelled", period: "/mo", highlighted: false },
  { name: "Pro", price: "$15.99", sub: "Renews monthly until cancelled", period: "/mo", highlighted: true },
  { name: "Ultima", price: "$21.99", sub: "Renews monthly until cancelled", period: "/mo", highlighted: false },
];

type CellValue = boolean | string;

interface FeatureRow {
  feature: string;
  sup?: number;
  values: CellValue[];
}

const features: FeatureRow[] = [
  { feature: "99% Uptime Guarantee", values: [true, true, true, true, true, true] },
  { feature: "Flag Reaction Translations", values: [true, true, true, true, true, true] },
  { feature: "Unlimited Translations", values: [true, true, true, true, true, true] },
  { feature: "Channel to Channel Translations (Tasks)", values: [true, false, true, true, true, true] },
  { feature: "Edited Message Translations", sup: 2, values: [true, false, true, true, true, true] },
  { feature: "Tasks Limit", sup: 3, values: ["25 Tasks", "—", "100 Tasks", "200 Tasks", "350 Tasks", "550 Tasks"] },
  { feature: "Google Characters Limit", sup: 4, values: ["10k Characters", "100k Characters", "200k Characters", "400k Characters", "600k Characters", "800k Characters"] },
  { feature: "Custom Translation Engine (ML)", sup: 5, values: ["10k Characters", "Unlimited", "Unlimited", "Unlimited", "Unlimited", "Unlimited"] },
  { feature: "Early Access to Dev Features", values: [false, false, false, false, true, true] },
  { feature: "BITA Bot Access", values: [false, false, false, false, false, "BITA for 1 Server"] },
];

const descriptions = [
  "Let's see if RITA is right for you, take advantage of our TRIAL. Invite RITA to your server, Activate and Go.",
  "Translate as much as you want but flag reaction only — add a flag emoji to each message to translate it.",
  "Running a small server? 100 tasks is a good place to start with RITA.",
  "Perfect for medium-sized servers. 200 tasks gives you freedom to expand.",
  "350 tasks — have multiple large groups all translating to each other in real-time.",
  "Our highest plan: 550 tasks, and BITA Access for 1 additional server.",
];

function CheckIcon() {
  return (
    <svg className="w-4 h-4 text-green-500 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg className="w-4 h-4 text-zinc-500/40 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

function FeatureItem({ feature, value, sup }: { feature: string; value: CellValue; sup?: number }) {
  return (
    <div className="flex items-center justify-between py-2 border-b border-white/5 last:border-0">
      <span className="text-xs text-zinc-400 pr-2">
        {feature}
        {sup && <sup className="ml-0.5 text-cyan-400 text-[8px]">{sup}</sup>}
      </span>
      <span className="shrink-0 text-right">
        {value === true ? (
          <CheckIcon />
        ) : value === false ? (
          <XIcon />
        ) : (
          <span className="text-xs font-medium text-zinc-200">{value}</span>
        )}
      </span>
    </div>
  );
}

export function StackedCards() {
  const [expandedCard, setExpandedCard] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100" style={{ maxWidth: 390 }}>
      <div className="px-4 pt-16 pb-8">
        <h1 className="text-2xl font-bold text-center mb-2">Compare Plans</h1>
        <p className="text-sm text-zinc-400 text-center mb-8">
          Find the perfect fit for your server's translation needs.
        </p>

        <div className="space-y-4">
          {plans.map((plan, i) => {
            const isExpanded = expandedCard === i;
            return (
              <div
                key={plan.name}
                className={`rounded-2xl border p-5 transition-all duration-200 ${
                  plan.highlighted
                    ? "border-cyan-500/40 bg-cyan-500/5"
                    : "border-white/10 bg-white/[0.02]"
                }`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h2 className={`text-lg font-bold ${plan.highlighted ? "text-cyan-400" : "text-zinc-100"}`}>
                      {plan.name}
                    </h2>
                    <p className="text-xs text-zinc-500 mt-0.5">{descriptions[i]}</p>
                  </div>
                  {plan.highlighted && (
                    <span className="text-[10px] font-bold uppercase bg-cyan-500/20 text-cyan-400 px-2 py-0.5 rounded-full">Popular</span>
                  )}
                </div>

                <div className="mb-4">
                  <span className="text-2xl font-extrabold text-zinc-100">
                    {plan.price}
                    {plan.name === "Trial" && <sup className="ml-0.5 text-cyan-400 text-[10px]">1</sup>}
                  </span>
                  {plan.period && <span className="text-sm text-zinc-500">{plan.period}</span>}
                  <div className="text-[11px] text-zinc-500 mt-0.5">{plan.sub}</div>
                </div>

                <button
                  onClick={() => setExpandedCard(isExpanded ? null : i)}
                  className="w-full text-left text-xs font-semibold text-cyan-400 mb-2 cursor-pointer hover:text-cyan-300 transition-colors"
                >
                  {isExpanded ? "Hide features ▲" : "Show features ▼"}
                </button>

                {isExpanded && (
                  <div className="pt-2 border-t border-white/5">
                    {features.map((row) => (
                      <FeatureItem key={row.feature} feature={row.feature} value={row.values[i]} sup={row.sup} />
                    ))}
                  </div>
                )}

                <button
                  className={`w-full mt-3 py-2.5 rounded-xl font-bold text-sm text-center transition-all duration-200 ${
                    plan.highlighted
                      ? "bg-cyan-500 text-zinc-950 hover:bg-cyan-400"
                      : plan.name === "Trial"
                        ? "bg-white/5 text-zinc-100 hover:bg-white/10 border border-white/10"
                        : "bg-white/5 text-zinc-100 hover:bg-white/10"
                  }`}
                >
                  {plan.name === "Trial" ? "Get Trial" : `Get ${plan.name}`}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
