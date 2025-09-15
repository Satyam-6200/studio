import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

const pricingTiers = [
  {
    name: "Starter",
    price: "$0",
    period: "per month",
    description: "For individuals and small teams getting started.",
    features: [
      "10 UI generations per day",
      "Basic UX analysis",
      "Access to component library",
      "Community support",
    ],
    cta: "Get Started for Free",
    link: "/login",
    highlight: false,
  },
  {
    name: "Pro",
    price: "$29",
    period: "per month",
    description: "For professionals who need more power and features.",
    features: [
      "Unlimited UI generations",
      "Advanced UX analysis",
      "Full access to component library",
      "Code export options",
      "Priority email support",
    ],
    cta: "Upgrade to Pro",
    link: "/login",
    highlight: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "for your team",
    description: "For large organizations with custom needs.",
    features: [
      "Everything in Pro, plus:",
      "Team collaboration features",
      "Custom integrations",
      "Dedicated account manager",
      "24/7 priority support",
    ],
    cta: "Contact Sales",
    link: "#",
    highlight: false,
  },
];

export function Pricing() {
  return (
    <section className="py-20 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold font-headline text-foreground">
            Choose the Right Plan for You
          </h2>
          <p className="text-lg text-muted-foreground mt-2">
            Simple, transparent pricing that scales with your needs.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {pricingTiers.map((tier) => (
            <Card
              key={tier.name}
              className={`flex flex-col ${tier.highlight ? "border-primary shadow-primary/20 shadow-lg" : ""}`}
            >
              <CardHeader className={tier.highlight ? "bg-primary/5" : ""}>
                <CardTitle className="font-headline text-2xl">{tier.name}</CardTitle>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-bold">{tier.price}</span>
                  <span className="text-muted-foreground">{tier.period}</span>
                </div>
                <CardDescription>{tier.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow space-y-4 pt-6">
                <h3 className="font-semibold">Features</h3>
                <ul className="space-y-3">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2">
                      <Check className="h-5 w-5 text-primary" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Link href={tier.link} className="w-full">
                  <Button className={`w-full ${tier.highlight ? 'bg-primary' : 'bg-secondary text-secondary-foreground'}`}>
                    {tier.cta}
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
