'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/Accordian';

import { faqs } from '@/lib/config/faq';

export default function FAQ() {
  return (
    <div className="w-[42rem] min-h-screen">
      <h1 className=" text-xl md:text-3xl font-bold text-center my-12 ">
        Frequently Asked Questions
      </h1>
      <Accordion type="multiple">
        {faqs.map((item, index) => (
          <AccordionItem key={item.question} value={`item-${index}`}>
            <AccordionTrigger className="text-base">{item.question}</AccordionTrigger>
            <AccordionContent className="text-base mt-4 font-normal leading-loose">
              {item.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
