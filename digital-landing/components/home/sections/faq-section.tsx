"use client";

import * as Accordion from "@radix-ui/react-accordion";
import { ChevronDown } from "lucide-react";
import { faqItems } from "@/content/site-content";
import { SectionHeading } from "@/components/ui/section-heading";
import { SectionShell } from "@/components/ui/section-shell";

export function FaqSection() {
  return (
    <SectionShell>
      <SectionHeading
        eyebrow="FAQ"
        title="Answers for common launch questions"
        description="Clear details on integration, themes, and operational support."
      />

      <Accordion.Root
        type="single"
        collapsible
        defaultValue="faq-0"
        className="mt-8 space-y-3"
      >
        {faqItems.map((item, index) => {
          const value = `faq-${index}`;

          return (
            <Accordion.Item
              key={item.question}
              value={value}
              className="faq-item overflow-hidden rounded-2xl"
            >
              <Accordion.Header>
                <Accordion.Trigger className="group flex w-full cursor-pointer items-center justify-between gap-5 px-5 py-4 text-left sm:px-6">
                  <span className="font-medium text-white">{item.question}</span>
                  <ChevronDown
                    size={18}
                    className="text-teal-100 transition-transform duration-150 ease-out group-data-[state=open]:rotate-180"
                  />
                </Accordion.Trigger>
              </Accordion.Header>

              <Accordion.Content className="faq-accordion-content">
                <p className="px-5 pb-5 text-sm leading-7 text-slate-300 sm:px-6">{item.answer}</p>
              </Accordion.Content>
            </Accordion.Item>
          );
        })}
      </Accordion.Root>
    </SectionShell>
  );
}


