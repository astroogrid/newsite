import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Product } from '@/data/products';
import { Skeleton } from "@/components/ui/skeleton";

interface ProductHistoryContentProps {
  product: Product;
  loading?: boolean;
}

const ProductHistoryContent: React.FC<ProductHistoryContentProps> = ({ product, loading = false }) => {
  // Skip rendering actual content if loading
  if (loading) {
    return (
      <div className="space-y-10">
        {Array.from({ length: 5 }).map((_, index) => (
          <motion.div 
            key={index}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="space-y-4"
          >
            <Skeleton className="h-8 w-1/4 mb-2" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
            {index === 2 && (
              <div className="pt-4">
                <Skeleton className="h-40 w-full" />
              </div>
            )}
          </motion.div>
        ))}
      </div>
    );
  }

  // For demo purposes, we'll generate some content based on product data
  const generateHistoryContent = (product: Product) => {
    return {
      introduction: `The ${product.name} is one of ${product.brand}'s finest products in the ${product.category} category. Since its introduction, it has gone through multiple iterations to become the industry-leading product it is today.`,
      originStory: `${product.brand} first conceptualized the ${product.name} as a response to growing demand for high-quality ${product.category} products. The development team spent years perfecting the technology and design before releasing it to the public.`,
      evolutionStages: [
        {
          version: "1.0",
          year: "2018",
          features: "Initial release with basic functionality",
          reception: "Positive customer feedback with suggestions for improvements"
        },
        {
          version: "2.0",
          year: "2020",
          features: "Added enhanced performance and new design elements",
          reception: "Critical acclaim and increased market share"
        },
        {
          version: "3.0 (Current)",
          year: "2023",
          features: "Complete redesign with cutting-edge technology",
          reception: "Market-leading position with excellent reviews"
        }
      ],
      manufacturingProcess: [
        "Research and Development - Creating the initial concept and prototypes",
        "Material Sourcing - Selecting premium materials from trusted suppliers",
        "Precision Manufacturing - Using automated and manual processes for accuracy",
        "Quality Control - Rigorous testing to ensure performance standards",
        "Distribution - Global network ensuring product availability"
      ],
      awards: [
        { year: "2019", award: `Best ${product.category} Product`, organization: "Tech Excellence Awards" },
        { year: "2021", award: "Innovation in Design", organization: "Consumer Choice Awards" },
        { year: "2023", award: "Sustainable Manufacturing", organization: "Green Tech Foundation" }
      ],
      testimonials: [
        { name: "Michael K.", comment: "This product changed how I approach my work. Incredible quality and reliability." },
        { name: "Sarah J.", comment: "I've used many similar products, but this one stands out for its intuitive design and performance." },
        { name: "David R.", comment: "Worth every penny. The attention to detail and craftsmanship is evident in every aspect." }
      ]
    };
  };

  const history = generateHistoryContent(product);

  return (
    <div className="space-y-10">
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="space-y-4"
      >
        <h2 className="text-base font-bold">Introduction</h2>
        <p className="text-muted-foreground">{history.introduction}</p>
      </motion.section>
      
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="space-y-4"
      >
        <h2 className="text-base font-bold">Origin Story</h2>
        <p className="text-muted-foreground">{history.originStory}</p>
      </motion.section>
      
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="space-y-4"
      >
        <h2 className="text-base font-bold">Evolution</h2>
        <Card>
          <CardHeader>
            <CardTitle className=' text-lg tracking-normal'>Product Evolution Timeline</CardTitle>
            <CardDescription>How {product.name} has evolved over the years</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Version</TableHead>
                  <TableHead>Year</TableHead>
                  <TableHead>Features</TableHead>
                  <TableHead>Reception</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {history.evolutionStages.map((stage, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{stage.version}</TableCell>
                    <TableCell>{stage.year}</TableCell>
                    <TableCell>{stage.features}</TableCell>
                    <TableCell>{stage.reception}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </motion.section>
      
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="space-y-4"
      >
        <h2 className="text-xl font-bold">Manufacturing Process</h2>
        <Accordion type="single" collapsible className="w-full">
          {history.manufacturingProcess.map((step, index) => (
            <AccordionItem key={index} value={`step-${index}`}>
              <AccordionTrigger>Step {index + 1}</AccordionTrigger>
              <AccordionContent>
                <p className="text-muted-foreground">{step}</p>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </motion.section>
      
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="space-y-4"
      >
        <h2 className="text-xl font-bold">Awards & Recognition</h2>
        <Card>
          <CardContent className="pt-6 p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Year</TableHead>
                  <TableHead>Award</TableHead>
                  <TableHead>Organization</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {history.awards.map((award, index) => (
                  <TableRow key={index}>
                    <TableCell>{award.year}</TableCell>
                    <TableCell className="font-medium">{award.award}</TableCell>
                    <TableCell>{award.organization}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </motion.section>
      
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="space-y-4 pb-10"
      >
        <h2 className="text-2xl font-bold">Customer Testimonials</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {history.testimonials.map((testimonial, index) => (
            <Card key={index} className="bg-muted/20">
              <CardContent className="pt-6">
                <blockquote className="border-l-4 border-primary pl-4 italic">
                  "{testimonial.comment}"
                </blockquote>
                <p className="text-right font-medium mt-4">— {testimonial.name}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </motion.section>
    </div>
  );
};

export default ProductHistoryContent;
