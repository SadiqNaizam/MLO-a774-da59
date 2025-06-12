import React from 'react';
import { useNavigate } from 'react-router-dom';
import AccountSummaryCard from '@/components/AccountSummaryCard';
import Footer from '@/components/layout/Footer'; // Assuming Footer is in a layout subfolder
import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuLink, navigationMenuTriggerStyle } from '@/components/ui/navigation-menu';
import { ScrollArea } from '@/components/ui/scroll-area';
import { CreditCard, Users, Settings, LogOut, LayoutDashboard } from 'lucide-react';

// Placeholder data for AccountSummaryCard
const sampleAccount1Transactions = [
  { id: 'tx1', date: new Date(Date.now() - 86400000).toISOString(), description: 'Online Purchase', amount: 75.50, type: 'debit' as const, currency: 'GBP' },
  { id: 'tx2', date: new Date(Date.now() - 172800000).toISOString(), description: 'Salary Deposit', amount: 2500.00, type: 'credit' as const, currency: 'GBP' },
  { id: 'tx3', date: new Date(Date.now() - 259200000).toISOString(), description: 'Utility Bill', amount: 120.00, type: 'debit' as const, currency: 'GBP' },
];

const sampleAccount2Transactions = [
  { id: 'tx4', date: new Date(Date.now() - 90000000).toISOString(), description: 'Grocery Shopping', amount: 45.20, type: 'debit' as const, currency: 'GBP' },
  { id: 'tx5', date: new Date(Date.now() - 180000000).toISOString(), description: 'Refund Processed', amount: 30.00, type: 'credit' as const, currency: 'GBP' },
];

const DashboardPage: React.FC = () => {
  const navigate = useNavigate();
  console.log('DashboardPage loaded');

  const handleMoveMoney = (accountId: string) => {
    console.log(`Move money initiated for account: ${accountId}`);
    navigate('/move-money'); // Navigate to the move money flow
  };

  const handleViewAllTransactions = (accountId: string) => {
    console.log(`View all transactions for account: ${accountId}`);
    navigate(`/transactions/${accountId}`); // Navigate to transaction history for a specific account
  };
  
  const handleCardControls = (accountId: string) => {
    console.log(`Card controls for account: ${accountId}`);
    navigate(`/card-management/${accountId}`);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
               <LayoutDashboard className="h-8 w-8 text-blue-600 mr-2" />
               <span className="font-bold text-xl text-blue-700">TSB Dashboard</span>
            </div>
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuLink href="/dashboard" className={navigationMenuTriggerStyle()}>
                    <LayoutDashboard className="mr-2 h-4 w-4" /> Dashboard
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink href="/move-money" className={navigationMenuTriggerStyle()}>
                     <CreditCard className="mr-2 h-4 w-4" /> Move Money
                  </NavigationMenuLink>
                </NavigationMenuItem>
                 <NavigationMenuItem>
                  <NavigationMenuLink href="/transactions" className={navigationMenuTriggerStyle()}>
                     <Users className="mr-2 h-4 w-4" /> Transactions
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink href="/card-management" className={navigationMenuTriggerStyle()}>
                    <Settings className="mr-2 h-4 w-4" /> Card Management
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink href="/login" className={navigationMenuTriggerStyle()} onClick={() => console.log('Logout clicked')}>
                    <LogOut className="mr-2 h-4 w-4" /> Logout
                  </NavigationMenuLink>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>
        </div>
      </header>

      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-semibold text-gray-800 mb-6">Your Accounts</h1>
        <ScrollArea className="h-full"> {/* Adjust height as needed */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AccountSummaryCard
              accountId="ACC12345"
              accountName="Current Account"
              accountNumber="•••• 6789"
              balance={5250.75}
              currency="GBP"
              recentTransactions={sampleAccount1Transactions}
              onMoveMoneyClick={handleMoveMoney}
              onViewAllTransactionsClick={handleViewAllTransactions}
            />
            <AccountSummaryCard
              accountId="SAV98765"
              accountName="Savings Account"
              accountNumber="•••• 1234"
              balance={12800.20}
              currency="GBP"
              recentTransactions={sampleAccount2Transactions}
              onMoveMoneyClick={handleMoveMoney}
              onViewAllTransactionsClick={handleViewAllTransactions}
            />
            {/* Add more AccountSummaryCard components as needed */}
             <AccountSummaryCard
              accountId="ISA00001"
              accountName="ISA Account"
              accountNumber="•••• 5555"
              balance={7500.00}
              currency="GBP"
              onMoveMoneyClick={handleMoveMoney}
              onViewAllTransactionsClick={handleViewAllTransactions}
              // No recent transactions for this example
            />
          </div>
        </ScrollArea>
      </main>
      <Footer />
    </div>
  );
};

export default DashboardPage;