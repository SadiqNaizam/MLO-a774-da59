import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { toast } from "sonner"; // Using sonner directly
import Footer from '@/components/layout/Footer';
import { ArrowLeft, Send, Banknote } from 'lucide-react';

type Step = 'recipient' | 'amount' | 'review';

const MoveMoneyFlowPage: React.FC = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState<Step>('recipient');
  
  // Form state
  const [fromAccount, setFromAccount] = useState<string>('ACC12345'); // Default account
  const [recipientName, setRecipientName] = useState('');
  const [recipientSortCode, setRecipientSortCode] = useState('');
  const [recipientAccountNumber, setRecipientAccountNumber] = useState('');
  const [amount, setAmount] = useState<string>('');
  const [reference, setReference] = useState('');

  console.log('MoveMoneyFlowPage loaded, current step:', currentStep);

  const handleNextStep = () => {
    if (currentStep === 'recipient') setCurrentStep('amount');
    else if (currentStep === 'amount') setCurrentStep('review');
  };

  const handlePreviousStep = () => {
    if (currentStep === 'review') setCurrentStep('amount');
    else if (currentStep === 'amount') setCurrentStep('recipient');
    else if (currentStep === 'recipient') navigate('/dashboard'); // Go back to dashboard from first step
  };
  
  const handleSubmitTransfer = () => {
    // Basic validation (can be more robust)
    if (!fromAccount || !recipientName || !recipientSortCode || !recipientAccountNumber || !amount) {
        toast.error("Validation Error", { description: "Please fill all required fields." });
        return;
    }
    console.log('Transfer submitted:', { fromAccount, recipientName, recipientSortCode, recipientAccountNumber, amount, reference });
    toast.success("Transfer Successful!", {
      description: `£${amount} sent to ${recipientName}.`,
      action: {
        label: "View Dashboard",
        onClick: () => navigate('/dashboard'),
      },
    });
    // Optionally reset form or navigate away
    // For now, let's assume it stays on a confirmation/status view or navigates after toast
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 'recipient':
        return (
          <>
            <CardHeader>
              <CardTitle>Recipient Details</CardTitle>
              <CardDescription>Enter the details of the person you want to pay.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="recipientName">Recipient's Full Name</Label>
                <Input id="recipientName" placeholder="e.g., John Doe" value={recipientName} onChange={(e) => setRecipientName(e.target.value)} />
              </div>
              <div>
                <Label htmlFor="recipientSortCode">Sort Code (XX-XX-XX)</Label>
                <Input id="recipientSortCode" placeholder="e.g., 12-34-56" value={recipientSortCode} onChange={(e) => setRecipientSortCode(e.target.value)} />
              </div>
              <div>
                <Label htmlFor="recipientAccountNumber">Account Number</Label>
                <Input id="recipientAccountNumber" placeholder="e.g., 12345678" value={recipientAccountNumber} onChange={(e) => setRecipientAccountNumber(e.target.value)} />
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={handlePreviousStep}><ArrowLeft className="mr-2 h-4 w-4"/>Back to Dashboard</Button>
              <Button onClick={handleNextStep}>Next: Amount</Button>
            </CardFooter>
          </>
        );
      case 'amount':
        return (
          <>
            <CardHeader>
              <CardTitle>Amount & Reference</CardTitle>
              <CardDescription>Specify the amount and a reference for your payment.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="fromAccount">From Account</Label>
                <Select value={fromAccount} onValueChange={setFromAccount}>
                  <SelectTrigger id="fromAccount">
                    <SelectValue placeholder="Select account" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ACC12345">Current Account (•••• 6789) - £5,250.75</SelectItem>
                    <SelectItem value="SAV98765">Savings Account (•••• 1234) - £12,800.20</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="amount">Amount (£)</Label>
                <Input id="amount" type="number" placeholder="e.g., 50.00" value={amount} onChange={(e) => setAmount(e.target.value)} />
              </div>
              <div>
                <Label htmlFor="reference">Reference (Optional)</Label>
                <Input id="reference" placeholder="e.g., Invoice #123" value={reference} onChange={(e) => setReference(e.target.value)} />
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={handlePreviousStep}><ArrowLeft className="mr-2 h-4 w-4"/>Recipient</Button>
              <Button onClick={handleNextStep}>Next: Review</Button>
            </CardFooter>
          </>
        );
      case 'review':
        return (
          <>
            <CardHeader>
              <CardTitle>Review Your Transfer</CardTitle>
              <CardDescription>Please check the details below before confirming.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <p><strong>From Account:</strong> {fromAccount === 'ACC12345' ? 'Current Account (•••• 6789)' : 'Savings Account (•••• 1234)'}</p>
              <p><strong>To:</strong> {recipientName}</p>
              <p><strong>Sort Code:</strong> {recipientSortCode}</p>
              <p><strong>Account Number:</strong> {recipientAccountNumber}</p>
              <p><strong>Amount:</strong> £{parseFloat(amount || '0').toFixed(2)}</p>
              <p><strong>Reference:</strong> {reference || 'N/A'}</p>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={handlePreviousStep}><ArrowLeft className="mr-2 h-4 w-4"/>Amount</Button>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="default"><Send className="mr-2 h-4 w-4"/>Confirm Transfer</Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                      You are about to transfer £{parseFloat(amount || '0').toFixed(2)} to {recipientName}. This action cannot be undone.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleSubmitTransfer} className="bg-green-600 hover:bg-green-700">Proceed</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </CardFooter>
          </>
        );
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
       <header className="bg-white shadow-sm py-4">
         <div className="container mx-auto px-4 flex items-center justify-between">
            <div className="flex items-center">
              <Banknote className="h-8 w-8 text-blue-600 mr-2" />
              <h1 className="text-xl font-semibold text-blue-700">Move Money</h1>
            </div>
            <Button variant="outline" size="sm" onClick={() => navigate('/dashboard')}>
                <ArrowLeft className="mr-1 h-4 w-4" /> Back to Dashboard
            </Button>
         </div>
      </header>
      <main className="flex-grow container mx-auto px-4 py-8">
        <Breadcrumb className="mb-6">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink onClick={() => setCurrentStep('recipient')} className={currentStep === 'recipient' ? 'font-medium' : 'cursor-pointer'}>
                Recipient
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink onClick={() => currentStep !== 'recipient' && setCurrentStep('amount')} className={currentStep === 'amount' ? 'font-medium' : (currentStep !== 'recipient' ? 'cursor-pointer' : 'text-gray-400')}>
                Amount
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage className={currentStep === 'review' ? 'font-medium' : 'text-gray-400'}>
                Review
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <Card className="w-full max-w-2xl mx-auto shadow-lg">
          {renderStepContent()}
        </Card>
      </main>
      <Footer />
    </div>
  );
};

export default MoveMoneyFlowPage;