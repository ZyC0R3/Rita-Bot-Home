import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Check, X } from "lucide-react";

const plans = [
  { name: "Trial", price: "FREE FOR 1 MONTH", sub: "or until limits have been reached.", period: "", highlighted: false },
  { name: "Reaction", price: "$2.99", sub: "Charged on 1st of each month", period: "/mo", highlighted: false },
  { name: "Casual", price: "$6.99", sub: "Charged on 1st of each month", period: "/mo", highlighted: false },
  { name: "Tinkerer", price: "$10.99", sub: "Charged on 1st of each month", period: "/mo", highlighted: false },
  { name: "Pro", price: "$15.99", sub: "Charged on 1st of each month", period: "/mo", highlighted: true },
  { name: "Ultima", price: "$21.99", sub: "Charged on 1st of each month", period: "/mo", highlighted: false },
];

type CellValue = boolean | string;

interface FeatureRow {
  feature: string;
  values: CellValue[];
}

const features: FeatureRow[] = [
  { feature: "99% Uptime Guarantee", values: [true, true, true, true, true, true] },
  { feature: "Flag Reaction Translations", values: [true, true, true, true, true, true] },
  { feature: "Unlimited Translations", values: [true, true, true, true, true, true] },
  { feature: "Channel to Channel Translations (Tasks)", values: [true, false, true, true, true, true] },
  { feature: "Edited Message Translations", values: [true, false, true, true, true, true] },
  { feature: "Tasks Limit", values: ["25 Tasks", "—", "100 Tasks", "200 Tasks", "350 Tasks", "550 Tasks"] },
  { feature: "Google Characters Limit", values: ["10k Characters", "100k Characters", "200k Characters", "400k Characters", "600k Characters", "800k Characters"] },
  { feature: "Custom Translation Engine (ML)", values: ["10k Characters", "Unlimited", "Unlimited", "Unlimited", "Unlimited", "Unlimited"] },
  { feature: "Early Access to Dev Features", values: [false, false, false, false, true, true] },
  { feature: "BITA Bot Access", values: [false, false, false, false, false, "BITA for 1 Server"] },
];

const descriptions = [
  "Let's see if RITA is right for you, take advantage of our TRIAL.\n\nInvite RITA to your server, Activate and Go.",
  "Do you just need the odd sentence or post translated here and there. You can translate as much as you want but flag reaction only, meaning you need to add a flag emoji to each message to translate it.",
  "Do you just need something to get started with RITA? Are you running a small server? This should be sufficient for your needs, 100 tasks is a good place to start.",
  "Do you run a community server, or have a game focused server? Are you trying to coordinate between large groups? This plan is perfect for Medium-sized servers. 200 tasks gives you freedom to expand.",
  "Do you run a large community or game server? Then this is perfect for you. 350 tasks will give you the ability to have multiple large groups all translating to each other in real-time.",
  "Our \"ultima\" Plan is our highest plan we offer, with 550 tasks, and BITA Access for 1 Additional servers. Allowing you to coordinate and translate the even the largest servers going.",
];

const footnotes = [
  "* The TRIAL will allow a user to try RITA for a period of one (1) month, or until limits have been reached, whichever comes first. Servers are limited to 1 TRIAL Per Server · Per User. Once Limit has been reached RITA will stop functioning for translations. Users do not need to be a Member of the RMS (RITA Management Server) to use the TRIAL.",
  "** Edited messages will always utilise our ML Engine for translations, regardless if google soft limits are reached or not.",
  "*** A task is a singular channel setup for automatic channel translation. For example; 1 channel translating from english to french counts as 1 task, if you wanted to create an interchangeable setup of 10 channels (10 languages which are all connected); it would be 10 × (10-1) tasks so 90 tasks overall.",
  "**** Each plan has a Soft Limit on the number of Google Characters they are assigned for the Google Translation API. This soft limit comes into effect for all translations. Once a user hits the assigned limit, translations will fall back to our Machine Learning (ML) Translation Engine. However, if our ML Engine is not trained in the target language or its confidence is not suitable for translation then it will continue to use the Google Translation API for translation. There is no Hard Limit on the number of Characters that a user can use on the Google API however after 2 Million a review may be conducted to ensure there is no abuse of service.",
  "***** A Hard limit for 30 Million Characters is applied to our ML Translation Engine, Once a user has reached this limit a Review of service will be conducted to ensure there is no abuse of service, this is not restriction from the service and is only intended to ensure service can be maintained.",
];

function CellContent({ value }: { value: CellValue }) {
  if (value === true) return <Check className="w-5 h-5 text-green-500 mx-auto" />;
  if (value === false) return <X className="w-5 h-5 text-muted-foreground/40 mx-auto" />;
  return <span className="text-sm font-medium text-foreground">{value}</span>;
}

export default function Plans() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col selection:bg-primary/30 selection:text-primary-foreground">
      <Navbar />

      <main className="flex-grow pt-32 pb-20 md:pt-40 md:pb-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h1 className="text-3xl md:text-5xl font-display font-bold text-foreground mb-6">
              Pricing Plans
            </h1>
            <p className="text-lg text-muted-foreground">
              Compare all features across every RITA plan. Find the perfect fit for your server's translation needs.
            </p>
          </div>

          <div className="overflow-x-auto -mx-4 px-4">
            <table className="w-full min-w-[900px] border-collapse">
              <thead>
                <tr>
                  <th className="text-left p-4 w-[180px]"></th>
                  {plans.map((plan) => (
                    <th
                      key={plan.name}
                      className={`p-4 text-center ${plan.highlighted ? "bg-primary/10 rounded-t-2xl" : ""}`}
                    >
                      <div className={`text-lg font-display font-bold ${plan.highlighted ? "text-primary" : "text-foreground"}`}>
                        {plan.name}
                      </div>
                    </th>
                  ))}
                </tr>
                <tr>
                  <td className="p-4 align-top">
                    <span className="text-sm font-semibold text-muted-foreground">Description</span>
                  </td>
                  {descriptions.map((desc, i) => (
                    <td
                      key={i}
                      className={`p-4 align-top text-center ${plans[i].highlighted ? "bg-primary/10" : ""}`}
                    >
                      <p className="text-xs text-muted-foreground leading-relaxed whitespace-pre-line">{desc}</p>
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="p-4 border-b border-border/50 dark:border-white/10">
                    <span className="text-sm font-semibold text-muted-foreground">Cost</span>
                  </td>
                  {plans.map((plan) => (
                    <td
                      key={plan.name}
                      className={`p-4 text-center border-b border-border/50 dark:border-white/10 ${plan.highlighted ? "bg-primary/10" : ""}`}
                    >
                      <div className="text-xl font-display font-extrabold text-foreground">
                        {plan.price}
                        {plan.period && <span className="text-sm font-medium text-muted-foreground">{plan.period}</span>}
                      </div>
                      <div className="text-xs text-muted-foreground mt-1">{plan.sub}</div>
                    </td>
                  ))}
                </tr>
              </thead>
              <tbody>
                {features.map((row, rowIndex) => (
                  <tr
                    key={row.feature}
                    className={rowIndex % 2 === 0 ? "bg-muted/30 dark:bg-white/[0.02]" : ""}
                  >
                    <td className="p-4 text-sm font-semibold text-foreground border-b border-border/30 dark:border-white/5">
                      {row.feature}
                    </td>
                    {row.values.map((val, colIndex) => (
                      <td
                        key={colIndex}
                        className={`p-4 text-center border-b border-border/30 dark:border-white/5 ${plans[colIndex].highlighted ? "bg-primary/10" : ""}`}
                      >
                        <CellContent value={val} />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <td className="p-4"></td>
                  {plans.map((plan) => (
                    <td key={plan.name} className={`p-4 text-center ${plan.highlighted ? "bg-primary/10 rounded-b-2xl" : ""}`}>
                      <a
                        href="https://dashboard.ritabot.gg"
                        className={`inline-block w-full py-3 rounded-xl font-bold text-sm text-center transition-all duration-200 ${
                          plan.highlighted
                            ? "bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/25"
                            : "bg-muted dark:bg-white/5 text-foreground hover:bg-muted/80 dark:hover:bg-white/10"
                        }`}
                      >
                        Get {plan.name}
                      </a>
                    </td>
                  ))}
                </tr>
              </tfoot>
            </table>
          </div>

          <div className="mt-16 max-w-5xl mx-auto space-y-3">
            {footnotes.map((note, i) => (
              <p key={i} className="text-xs text-muted-foreground/60 leading-relaxed">
                {note}
              </p>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
