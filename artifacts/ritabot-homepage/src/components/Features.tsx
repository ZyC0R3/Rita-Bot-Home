import { Globe, RefreshCw, Flag, Users, Webhook, Zap } from "lucide-react";

const features = [
  {
    icon: Globe,
    title: "100+ Languages",
    description: "Communicate globally. RitaBot supports highly accurate translations across more than 100 languages powered by Google Translate.",
    color: "text-blue-400",
    bg: "bg-blue-400/10",
  },
  {
    icon: RefreshCw,
    title: "Auto Channel Translation",
    description: "Set up dedicated channels where every message is automatically translated and forwarded to your target destination instantly.",
    color: "text-primary",
    bg: "bg-primary/10",
  },
  {
    icon: Flag,
    title: "Flag Reactions",
    description: "The simplest way to translate. React to any message with a country's flag emoji, and receive a translation in that language.",
    color: "text-rose-400",
    bg: "bg-rose-400/10",
  },
  {
    icon: Users,
    title: "Group Cross-Channel Chat",
    description: "Connect multiple channels across different servers. Speak natively while everyone else reads in their preferred language.",
    color: "text-amber-400",
    bg: "bg-amber-400/10",
  },
  {
    icon: Webhook,
    title: "Beautiful Webhooks",
    description: "Translations are delivered cleanly using Discord Webhooks, making it look like the original user sent the translated message.",
    color: "text-emerald-400",
    bg: "bg-emerald-400/10",
  },
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Built for scale and speed. Rita handles high-volume active chats without breaking a sweat, ensuring conversations flow naturally.",
    color: "text-purple-400",
    bg: "bg-purple-400/10",
  },
];

export function Features() {
  return (
    <section id="features" className="py-24 bg-background relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-6">
            Everything you need to connect
          </h2>
          <p className="text-lg text-muted-foreground">
            RitaBot is packed with powerful features designed to make cross-language communication on Discord feel completely invisible.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div 
                key={index}
                className="group relative bg-card rounded-3xl p-8 border border-white/5 hover:border-white/10 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-black/50 overflow-hidden"
              >
                {/* Subtle hover gradient background */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/0 to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                
                <div className={`w-14 h-14 rounded-2xl ${feature.bg} flex items-center justify-center mb-6 border border-white/5 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className={`w-7 h-7 ${feature.color}`} />
                </div>
                
                <h3 className="text-xl font-bold text-white mb-3 font-display">
                  {feature.title}
                </h3>
                
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
