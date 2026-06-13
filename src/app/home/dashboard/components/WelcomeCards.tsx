import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";

export default function WelcomeCards() {
    return (
        <div className="lg:col-span-2">
            <Card className="h-full">
                <CardHeader>
                    <CardTitle className="text-xl font-bold">Welcome to Central!</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-sm font-mono text-neutral-600">
                    <p>
                        This control panel is styled with the custom **Nothing OS** minimalist aesthetic, utilizing TailwindCSS v4 and reusable Shadcn-like components.
                    </p>
                    <p>
                        All elements are organized as modules or "widgets" mimicking a mobile dashboard home screen layout. Circular indicators, high-contrast monochrome values, and subtle red details provide a unique user experience.
                    </p>
                </CardContent>
            </Card>
        </div>
    );
}
