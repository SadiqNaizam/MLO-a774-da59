import React, { useState, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import TransactionListItem, { Transaction } from '@/components/TransactionListItem';
import Footer from '@/components/layout/Footer';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';
import { ArrowLeft, ListFilter, Search, Download } from 'lucide-react';

// Mock transactions - in a real app, this would come from an API
const ALL_TRANSACTIONS: Transaction[] = [
  { id: 'tx101', accountId: 'ACC12345', date: '2024-07-28T10:30:00Z', description: 'Amazon Purchase', amount: 49.99, type: 'debit', currency: 'GBP' },
  { id: 'tx102', accountId: 'ACC12345', date: '2024-07-28T09:15:00Z', description: 'Salary Deposit - July', amount: 2200.00, type: 'credit', currency: 'GBP' },
  { id: 'tx103', accountId: 'SAV98765', date: '2024-07-27T14:00:00Z', description: 'Transfer to Current Account', amount: 500.00, type: 'debit', currency: 'GBP' },
  { id: 'tx104', accountId: 'ACC12345', date: '2024-07-26T11:00:00Z', description: 'Tesco Groceries', amount: 65.20, type: 'debit', currency: 'GBP' },
  { id: 'tx105', accountId: 'SAV98765', date: '2024-07-25T16:45:00Z', description: 'Interest Payment', amount: 12.50, type: 'credit', currency: 'GBP' },
  { id: 'tx106', accountId: 'ACC12345', date: '2024-07-25T08:20:00Z', description: 'Coffee Shop', amount: 3.50, type: 'debit', currency: 'GBP' },
  { id: 'tx107', accountId: 'ACC12345', date: '2024-07-24T18:00:00Z', description: 'Restaurant Bill', amount: 85.00, type: 'debit', currency: 'GBP' },
  { id: 'tx108', accountId: 'SAV98765', date: '2024-07-23T12:30:00Z', description: 'Birthday Gift Received', amount: 100.00, type: 'credit', currency: 'GBP' },
  { id: 'tx109', accountId: 'ACC12345', date: '2024-06-28T09:15:00Z', description: 'Salary Deposit - June', amount: 2200.00, type: 'credit', currency: 'GBP' },
  { id: 'tx110', accountId: 'ACC12345', date: '2024-06-26T11:00:00Z', description: 'Asda Groceries', amount: 72.10, type: 'debit', currency: 'GBP' },
   // Add more for pagination
  { id: 'tx111', accountId: 'ACC12345', date: '2024-05-20T10:00:00Z', description: 'Council Tax', amount: 150.00, type: 'debit', currency: 'GBP' },
  { id: 'tx112', accountId: 'SAV98765', date: '2024-05-15T10:00:00Z', description: 'Savings Top-up', amount: 200.00, type: 'credit', currency: 'GBP' },
  { id: 'tx113', accountId: 'ACC12345', date: '2024-05-10T10:00:00Z', description: 'Netflix Subscription', amount: 10.99, type: 'debit', currency: 'GBP' },
];

const ITEMS_PER_PAGE = 5;

const TransactionHistoryPage: React.FC = () => {
  const navigate = useNavigate();
  const { accountId: accountIdFromParams } = useParams<{ accountId: string }>();
  console.log('TransactionHistoryPage loaded for account:', accountIdFromParams);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'credit' | 'debit'>('all');
  const [filterAccount, setFilterAccount] = useState<string>(accountIdFromParams || 'all');
  const [currentPage, setCurrentPage] = useState(1);

  const filteredTransactions = useMemo(() => {
    return ALL_TRANSACTIONS
      .filter(tx => filterAccount === 'all' || tx.accountId === filterAccount)
      .filter(tx => filterType === 'all' || tx.type === filterType)
      .filter(tx => tx.description.toLowerCase().includes(searchTerm.toLowerCase()))
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()); // Sort by most recent
  }, [searchTerm, filterType, filterAccount]);

  const totalPages = Math.ceil(filteredTransactions.length / ITEMS_PER_PAGE);
  const paginatedTransactions = filteredTransactions.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm py-4 sticky top-0 z-40">
         <div className="container mx-auto px-4 flex items-center justify-between">
            <div className="flex items-center">
                <ListFilter className="h-8 w-8 text-blue-600 mr-2" />
                <h1 className="text-xl font-semibold text-blue-700">Transaction History</h1>
            </div>
            <Button variant="outline" size="sm" onClick={() => navigate(-1)}>
                <ArrowLeft className="mr-1 h-4 w-4" /> Back
            </Button>
         </div>
      </header>

      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="mb-6 p-4 bg-white rounded-lg shadow">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
            <div className="md:col-span-2">
              <Label htmlFor="search-transactions">Search Description</Label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  id="search-transactions"
                  type="text"
                  placeholder="e.g., Amazon, Salary"
                  value={searchTerm}
                  onChange={(e) => {setSearchTerm(e.target.value); setCurrentPage(1);}}
                  className="pl-10"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="filter-account">Account</Label>
              <Select value={filterAccount} onValueChange={(value) => {setFilterAccount(value); setCurrentPage(1);}}>
                <SelectTrigger id="filter-account">
                  <SelectValue placeholder="Select Account" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Accounts</SelectItem>
                  <SelectItem value="ACC12345">Current Account (•••• 6789)</SelectItem>
                  <SelectItem value="SAV98765">Savings Account (•••• 1234)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="filter-type">Type</Label>
              <Select value={filterType} onValueChange={(value: 'all' | 'credit' | 'debit') => {setFilterType(value); setCurrentPage(1);}}>
                <SelectTrigger id="filter-type">
                  <SelectValue placeholder="All Types" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="credit">Credit (Incoming)</SelectItem>
                  <SelectItem value="debit">Debit (Outgoing)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
            <div className="mt-4 flex justify-end">
                <Button variant="outline" onClick={() => alert('Download functionality to be implemented.')}>
                    <Download className="mr-2 h-4 w-4"/> Download CSV
                </Button>
            </div>
        </div>

        <div className="bg-white rounded-lg shadow overflow-hidden">
          <Table>
            <TableCaption className="py-4">
              {paginatedTransactions.length === 0 ? 'No transactions match your filters.' : `Showing ${paginatedTransactions.length} of ${filteredTransactions.length} transactions.`}
            </TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[120px]">Date</TableHead>
                <TableHead>Description</TableHead>
                <TableHead className="text-right">Amount</TableHead>
                <TableHead className="w-[100px] text-center">Type</TableHead>
                 {filterAccount === 'all' && <TableHead className="w-[150px]">Account</TableHead>}
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedTransactions.map((tx) => (
                // Using TableRow and TableCell for structure, TransactionListItem for content styling
                <TableRow key={tx.id} className="hover:bg-gray-50">
                    <TableCell className="font-medium text-sm text-gray-700">{new Date(tx.date).toLocaleDateString()}</TableCell>
                    <TableCell>
                        <p className="font-medium text-gray-800">{tx.description}</p>
                        <p className="text-xs text-gray-500">{tx.accountId}</p> {/* Display Account ID under description */}
                    </TableCell>
                    <TableCell className={`text-right font-semibold ${tx.type === 'credit' ? 'text-green-600' : 'text-red-600'}`}>
                        {tx.type === 'credit' ? '+' : '-'} {tx.currency} {tx.amount.toFixed(2)}
                    </TableCell>
                    <TableCell className="text-center">
                        <span className={`px-2 py-1 text-xs rounded-full ${tx.type === 'credit' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                            {tx.type}
                        </span>
                    </TableCell>
                    {filterAccount === 'all' && (
                        <TableCell className="text-sm text-gray-600">
                            {tx.accountId === 'ACC12345' ? 'Current' : 'Savings'}
                        </TableCell>
                    )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {totalPages > 1 && (
          <Pagination className="mt-8">
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious href="#" onClick={(e) => { e.preventDefault(); handlePageChange(currentPage - 1); }} aria-disabled={currentPage === 1} className={currentPage === 1 ? "pointer-events-none opacity-50" : undefined} />
              </PaginationItem>
              {[...Array(totalPages)].map((_, i) => {
                const page = i + 1;
                // Basic pagination display logic (can be improved for many pages)
                if (totalPages <= 5 || page === 1 || page === totalPages || Math.abs(page - currentPage) <= 1 || (currentPage <=3 && page <=3) || (currentPage >= totalPages -2 && page >= totalPages -2) ) {
                  return (
                    <PaginationItem key={page}>
                      <PaginationLink href="#" onClick={(e) => { e.preventDefault(); handlePageChange(page); }} isActive={currentPage === page}>
                        {page}
                      </PaginationLink>
                    </PaginationItem>
                  );
                } else if ( (currentPage > 3 && page === 2) || (currentPage < totalPages - 2 && page === totalPages - 1) ) {
                    return <PaginationEllipsis key={`ellipsis-${page}`} />;
                }
                return null;
              })}
              <PaginationItem>
                <PaginationNext href="#" onClick={(e) => { e.preventDefault(); handlePageChange(currentPage + 1); }} aria-disabled={currentPage === totalPages} className={currentPage === totalPages ? "pointer-events-none opacity-50" : undefined}/>
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default TransactionHistoryPage;