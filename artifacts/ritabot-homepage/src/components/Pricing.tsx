import { Check } from "lucide-react";

const plans = [
  {
    name: "Reaction",
    price: "$2.99",
    period: "/mo",
    description: "Perfect for casual use and small servers.",
    tasks: "0",
    features: [
      "Unlimited Flag Reaction Translations",
      "Google Translate API",
      "Standard Support",
      "No Auto-translation tasks"
    ],
    highlighted: false,
    cta: "Add to Server"
  },
  {
    name: "Casual",
    price: "$6.99",
    period: "/mo",
    description: "For active communities needing automation.",
    tasks: "100",
    features: [
      "100 Auto-Translation Tasks",
      "Unlimited Individual Translations",
      "Webhook Support",
      "Group Cross-Channel Chat"
    ],
    highlighted: false,
    cta: "Subscribe"
  },
  {
    name: "Pro",
    price: "$15.99",
    period: "/mo",
    description: "The sweet spot for large, diverse communities.",
    tasks: "350",
    features: [
      "350 Auto-Translation Tasks",
      "Priority Bot Support",
      "All Casual Features Included",
      "Customizable Prefix"
    ],
    highlighted: true,
    cta: "Get Pro"
  },
  {
    name: "Tinkerer",
    price: "$10.99",
    period: "/mo",
    description: "More power for growing international groups.",
    tasks: "200",
    features: [
      "200 Auto-Translation Tasks",
      "Unlimited Individual Translations",
      "Webhook Support",
      "Group Cross-Channel Chat"
    ],
    highlighted: false,
    cta: "Subscribe"
  },
  {
    name: "Ultima",
    price: "$21.99",
    period: "/mo",
    description: "For massive networks and enterprise servers.",
    tasks: "550",
    features: [
      "550 Auto-Translation Tasks",
      "Highest Priority Support",
      "All Pro Features Included",
      "Dedicated Setup Help"
    ],
    highlighted: false,
    cta: "Subscribe"
  }
];

// Reordering array to put Pro in middle visually
const displayPlans = [plans[0], plans[1], plans[3], plans[2], plans[4]];

export function Pricing() {
  return (
    <section id="pricing" className="py-24 relative bg-background/50 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-6">
            Simple, predictable pricing
          </h2>
          <p className="text-lg text-muted-foreground">
            Pricing is based on Auto-Translation Tasks (channel setups), not per-character. 
            Enjoy unlimited individual translations on all tiers.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-6 lg:gap-8 items-stretch">
          {displayPlans.map((plan) => (
            <div 
              key={plan.name}
              className={`relative flex flex-col w-full md:w-[calc(50%-12px)] lg:w-[calc(33.333%-22px)] rounded-3xl p-8 transition-all duration-300 ${
                plan.highlighted 
                  ? "bg-secondary border-2 border-primary shadow-[0_0_30px_rgba(88,101,242,0.15)] transform md:-translate-y-4 z-10" 
                  : "bg-card border border-white/10 hover:border-white/20"
              }`}
            >
              {plan.highlighted && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-primary text-white text-xs font-bold uppercase tracking-wider rounded-full shadow-lg">
                  Most Popular
                </div>
              )}
              
              <div className="mb-8">
                <h3 className="text-xl font-bold text-white mb-2">{plan.name}</h3>
                <p className="text-sm text-muted-foreground h-10">{plan.description}</p>
              </div>
              
              <div className="mb-8 pb-8 border-b border-white/10">
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-display font-extrabold text-white">{plan.price}</span>
                  {plan.period && <span className="text-muted-foreground font-medium">{plan.period}</span>}
                </div>
                <div className="mt-2 text-sm font-medium text-primary bg-primary/10 inline-block px-3 py-1 rounded-full">
                  {plan.tasks} Tasks included
                </div>
              </div>
              
              <ul className="space-y-4 mb-8 flex-grow">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground">
                    <Check className="w-5 h-5 text-primary shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              
              <a 
                href="https://dashboard.ritabot.gg"
                className={`w-full py-3.5 rounded-xl font-bold text-sm text-center transition-all duration-200 mt-auto ${
                  plan.highlighted
                    ? "bg-primary text-white hover:bg-primary/90 shadow-lg shadow-primary/25 hover:shadow-primary/40"
                    : "bg-white/5 text-white hover:bg-white/10"
                }`}
              >
                {plan.cta}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
