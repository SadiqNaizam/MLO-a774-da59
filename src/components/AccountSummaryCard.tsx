import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import TransactionListItem, { Transaction } from './TransactionListItem'; // Import the new TransactionListItem
import { ArrowRight, TrendingUp } from 'lucide-react'; // Example icons

interface AccountSummaryCardProps {
  accountId: string;
  accountName: string;
  accountNumber: string; // Masked, e.g., "•••• 1234"
  balance: number;
  currency?: string;
  recentTransactions?: Transaction[]; // For the quick view accordion
  onMoveMoneyClick: (accountId: string) => void;
  onViewAllTransactionsClick?: (accountId: string) => void; // Optional: for a "View All" link
}

const AccountSummaryCard: React.FC<AccountSummaryCardProps> = ({
  accountId,
  accountName,
  accountNumber,
  balance,
  currency = '$',
  recentTransactions = [],
  onMoveMoneyClick,
  onViewAllTransactionsClick,
}) => {
  console.log("Rendering AccountSummaryCard for:", accountName, accountId);

  const handleMoveMoney = () => {
    console.log("Move money clicked for account:", accountId);
    onMoveMoneyClick(accountId);
  };

  return (
    <Card className="w-full max-w-md shadow-lg">
      <CardHeader className="pb-4">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-xl text-blue-700">{accountName}</CardTitle>
            <CardDescription className="text-sm text-gray-600">Account No: {accountNumber}</CardDescription>
          </div>
          {/* Optional: Icon or logo */}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-center py-4 bg-blue-50 rounded-lg">
          <p className="text-sm text-blue-600">Available Balance</p>
          <p className="text-3xl font-bold text-blue-800">
            {currency}
            {balance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </p>
        </div>

        {recentTransactions.length > 0 && (
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="recent-activity">
              <AccordionTrigger className="text-sm font-medium hover:no-underline">
                Quick View Recent Activity
              </AccordionTrigger>
              <AccordionContent className="pt-1 max-h-60 overflow-y-auto">
                {recentTransactions.length > 0 ? (
                  recentTransactions.map(tx => (
                    <TransactionListItem key={tx.id} transaction={tx} />
                  ))
                ) : (
                  <p className="text-sm text-gray-500 py-2">No recent transactions.</p>
                )}
                {onViewAllTransactionsClick && recentTransactions.length > 0 && (
                  <Button
                    variant="link"
                    size="sm"
                    className="w-full mt-2 text-blue-600"
                    onClick={() => onViewAllTransactionsClick(accountId)}
                  >
                    View All Transactions <ArrowRight className="ml-1 h-4 w-4" />
                  </Button>
                )}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        )}
      </CardContent>
      <CardFooter>
        <Button
          className="w-full bg-white text-blue-700 border-blue-700 border-2 hover:bg-blue-50 focus-visible:ring-blue-500"
          variant="outline" // Using outline for the "pill-shaped, white background, blue stroke" effect
          onClick={handleMoveMoney}
        >
          <TrendingUp className="mr-2 h-4 w-4" /> Move Money
        </Button>
      </CardFooter>
    </Card>
  );
};

export default AccountSummaryCard;