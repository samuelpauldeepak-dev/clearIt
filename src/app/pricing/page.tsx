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

  const handleSubscribe = (tier: any, price: string, limit: number) => {
    updateSubscription({
      tier,
      usageLimit: limit,
      status: "active",
    });
    toast.success(`Successfully subscribed to ${tier} plan!`);
  };

  const plans = [
    {
      name: "Free",
      price: "$0",
      description: "Perfect for occasional tasks",
      limit: 1,
      features: [
        "1 use per month",
        "Basic text tools",
        "Standard support",
        "Privacy-first processing",
      ],
      tier: "free",
      icon: <Zap className="h-6 w-6 text-muted-foreground" />,
    },
    {
      name: "Basic",
      price: "$5",
      description: "Ideal for small projects",
      limit: 30,
      features: [
        "30 uses per month",
        "All core tools",
        "Email support",
        "No ads",
        "Advanced text features",
      ],
      tier: "basic",
      icon: <Check className="h-6 w-6 text-blue-500" />,
      popular: false,
    },
    {
      name: "Pro",
      price: "$10",
      description: "For power users and pros",
      limit: 100,
      features: [
        "100 uses per month",
        "Priority processing",
        "Beta tool access",
        "Priority support",
        "Web dev suite",
      ],
      tier: "pro",
      icon: <Sparkles className="h-6 w-6 text-primary" />,
      popular: true,
    },
    {
      name: "Unlimited",
      price: "$25",
      description: "The ultimate freedom",
      limit: 999999,
      features: [
        "Unlimited monthly uses",
        "Customizable settings",
        "Enterprise support",
        "Early access features",
        "Personalized tools",
      ],
      tier: "unlimited",
      icon: <Infinity className="h-6 w-6 text-purple-600" />,
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
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

      <div className="mt-20 text-center bg-muted/30 p-12 rounded-3xl border border-border">
        <h2 className="text-2xl font-bold mb-4">
          Need a custom plan for your team?
        </h2>
        <p className="text-muted-foreground mb-8">
          We offer enterprise solutions with volume discounts and custom
          deployments.
        </p>
        <Button variant="outline" size="lg" className="h-12 px-8 font-semibold">
          Contact Sales
        </Button>
      </div>
    </div>
  );
}
