import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "What happens if I forget to ping?",
    answer: "If the owner is inactive for 10 years, the recipient can claim the funds.",
    color: 'bg-gradient-to-r from-red-600 to-red-800',
  },
  {
    question: "Can the recipient claim funds before 10 years?",
    answer: "No, the contract ensures funds are locked unless inactivity is proven.",
    color: 'bg-gradient-to-r from-blue-600 to-blue-800',
  },
  {
    question: "What happens if I want to change the recipient?",
    answer: "You can change the recipient by interacting with the contract and providing the new recipient's address.",
    color: 'bg-gradient-to-r from-green-600 to-green-800',
  }
];

export default function FAQ() {
  return (
    <div className="py-8 px-4 bg-mario-brown">
      <div className="max-w-2xl mx-auto text-center">
        <h2 className="text-3xl mb-6 text-mario-yellow font-pixel-large">FAQ</h2>
        <Accordion type="single" collapsible className="space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className={`text-center p-4 ${faq.color} rounded-xl shadow-xl transform transition-all duration-300 hover:scale-105 hover:shadow-2xl`}
            >
              <AccordionTrigger className="text-xl mb-4 text-white font-pixel">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-lg text-mario-yellow font-pixel">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
}
