import React from 'react';
import { ArrowUpRight, ArrowDownLeft } from 'lucide-react';
import { cn } from '@/lib/utils'; // For conditional classes

export interface Transaction {
  id: string;
  date: string; // Consider using Date object and formatting
  description: string;
  amount: number;
  type: 'credit' | 'debit'; // 'credit' for incoming, 'debit' for outgoing
  currency?: string;
}

interface TransactionListItemProps {
  transaction: Transaction;
}

const TransactionListItem: React.FC<TransactionListItemProps> = ({ transaction }) => {
  console.log("Rendering TransactionListItem:", transaction.description, transaction.amount);

  const isDebit = transaction.type === 'debit';
  const amountColor = isDebit ? 'text-red-600' : 'text-green-600';
  const IconComponent = isDebit ? ArrowUpRight : ArrowDownLeft;
  const currencySymbol = transaction.currency || '$';

  return (
    <div className="flex items-center justify-between py-3 px-1 border-b border-gray-100 last:border-b-0 hover:bg-gray-50 transition-colors duration-150">
      <div className="flex items-center space-x-3">
        <IconComponent
          className={cn("h-5 w-5 flex-shrink-0", amountColor)}
          aria-label={isDebit ? 'Outgoing transaction' : 'Incoming transaction'}
        />
        <div>
          <p className="text-sm font-medium text-gray-800 truncate max-w-[150px] sm:max-w-xs" title={transaction.description}>
            {transaction.description}
          </p>
          <p className="text-xs text-gray-500">{new Date(transaction.date).toLocaleDateString()}</p>
        </div>
      </div>
      <div className={cn("text-sm font-semibold", amountColor)}>
        {isDebit ? '-' : '+'}
        {currencySymbol}
        {transaction.amount.toFixed(2)}
      </div>
    </div>
  );
};

export default TransactionListItem;