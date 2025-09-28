import React from "react";
import { IconTrendingDown, IconTrendingUp } from "@tabler/icons-react";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function SectionCards({
  CardDescriptionContent = 'Total Revenue',
  CardTitleContent = '$1,250.00',
  BadgeContent = '+12.5%',
  FooterMainContent = 'Trending up this month',
  FooterSubContent = 'Visitors for the last 6 months',
}) {
  return (
    <div className="">
      <Card>
        <CardHeader>
          <CardDescription>{CardDescriptionContent}</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums sm:text-3xl">
            {CardTitleContent}
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              <IconTrendingUp className="mr-1" />
              {BadgeContent}
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="flex gap-2 font-medium">
            {FooterMainContent} <IconTrendingUp className="size-4" />
          </div>
          <div className="text-muted-foreground">
            {FooterSubContent}
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
