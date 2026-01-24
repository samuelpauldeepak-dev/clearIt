"use client";

import React from "react";
import { useUserStore } from "@/store/use-user-store";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, Sparkles, Zap, ShieldCheck, Infinity } from "lucide-react";
import { toast } from "sonner";

export default function PricingPage() {
  const { subscription, updateSubscription } = useUserStore();
  const [currency, setCurrency] = React.useState<"INR" | "USD">("USD");

  React.useEffect(() => {
    // Simple timezone check for India
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    if (timeZone === "Asia/Kolkata") {
      setCurrency("INR");
    }
  }, []);

  const handleSubscribe = (tier: any, price: string, limit: number) => {
    // STRIPE INTEGRATION PLACEHOLDER
    // TODO: Initialize Stripe checkout session here
    // const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY);
    // await stripe.redirectToCheckout({ ... });

    console.log(
      `Initiating checkout for ${tier} plan (${price}) in ${currency}`,
    );

    updateSubscription({
      tier,
      usageLimit: limit,
      status: "active",
    });
    toast.success(`Successfully subscribed to ${tier} plan!`);
  };

  const pricingData = {
    INR: {
      free: "₹0",
      personal: "₹199",
      pro: "₹699",
    },
    USD: {
      free: "$0",
      personal: "$5",
      pro: "$10",
    },
  };

  const plans = [
    {
      name: "Free",
      price: pricingData[currency].free,
      description: "Trust and trial",
      limit: 10,
      features: [
        "10 uses per month",
        "All tools accessible",
        "No ads",
        "No file storage",
      ],
      tier: "free",
      icon: <Zap className="h-6 w-6 text-muted-foreground" />,
    },
    {
      name: "Personal",
      price: pricingData[currency].personal,
      description: "For regular everyday use",
      limit: 500,
      features: [
        "500 uses per month",
        "Faster processing",
        "Batch actions",
        "No ads",
        "Priority access to new tools",
      ],
      tier: "personal",
      icon: <Check className="h-6 w-6 text-primary" />,
      popular: true,
    },
    {
      name: "Pro",
      price: pricingData[currency].pro,
      description: "For power users",
      limit: 2000,
      features: [
        "2,000+ uses per month",
        "Priority processing",
        "Advanced tools",
        "Early feature access",
      ],
      tier: "pro",
      icon: <Sparkles className="h-6 w-6 text-purple-600" />,
      popular: false,
    },
  ];

  return (
    <div className="max-w-7xl mx-auto py-16 px-4 animate-fade-in">
      <div className="text-center mb-16 space-y-4">
        <h1 className="text-5xl font-black tracking-tighter">
          Simple, transparent pricing
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Choose the plan that fits your needs. All processing remains on your
          device regardless of the plan.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {plans.map((plan) => (
          <Card
            key={plan.name}
            className={`relative flex flex-col h-full border-2 transition-all hover:shadow-2xl hover:-translate-y-1 ${
              plan.popular
                ? "border-primary shadow-xl shadow-primary/10"
                : "border-border"
            }`}
          >
            {plan.popular && (
              <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-primary text-primary-foreground font-bold">
                Most Popular
              </Badge>
            )}
            <CardHeader className="text-center">
              <div className="mx-auto w-12 h-12 rounded-xl bg-muted/50 flex items-center justify-center mb-4">
                {plan.icon}
              </div>
              <CardTitle className="text-2xl font-bold">{plan.name}</CardTitle>
              <CardDescription className="text-sm">
                {plan.description}
              </CardDescription>
              <div className="mt-4 flex items-baseline justify-center gap-1">
                <span className="text-4xl font-black">{plan.price}</span>
                <span className="text-muted-foreground">/month</span>
              </div>
            </CardHeader>
            <CardContent className="flex-grow">
              <ul className="space-y-3">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3 text-sm">
                    <ShieldCheck className="h-4 w-4 text-success mt-0.5 shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button
                className={`w-full h-11 text-base font-bold transition-all ${
                  subscription.tier === plan.tier
                    ? "bg-success hover:bg-success/90 cursor-default"
                    : plan.popular
                      ? "bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20"
                      : "variant-outline"
                }`}
                onClick={() =>
                  handleSubscribe(plan.tier, plan.price, plan.limit)
                }
                disabled={subscription.tier === plan.tier}
              >
                {subscription.tier === plan.tier
                  ? "Current Plan"
                  : "Get Started"}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <div className="mt-12 text-center">
        <p className="text-sm text-muted-foreground flex items-center justify-center gap-2">
          <ShieldCheck className="h-4 w-4" />
          Secure payments powered by Stripe (Integration Ready)
        </p>
      </div>

      <div className="mt-8 text-center bg-muted/30 p-12 rounded-3xl border border-border">
        <h2 className="text-2xl font-bold mb-4">
          Need an Enterprise Solution?
        </h2>
        <p className="text-muted-foreground mb-8">
          We offer custom solutions for large teams with volume discounts and
          dedicated support.
        </p>
        <Button variant="outline" size="lg" className="h-12 px-8 font-semibold">
          Contact Sales
        </Button>
      </div>
    </div>
  );
}
