import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogTrigger, DialogClose } from '@/components/ui/dialog';
import Footer from '@/components/layout/Footer';
import { CreditCard, Lock, Unlock, Eye, AlertTriangle, ArrowLeft, ShieldCheck } from 'lucide-react';

// Mock card data - in a real app, this would come from an API based on accountId/cardId
const MOCK_CARDS = [
    { id: 'CARD001', accountId: 'ACC12345', type: 'Debit Card', lastFour: '6789', isFrozen: false, spendingLimit: 500, pin: '1234' },
    { id: 'CARD002', accountId: 'ACC12345', type: 'Credit Card', lastFour: '5432', isFrozen: true, spendingLimit: 1000, pin: '5678' },
    { id: 'CARD003', accountId: 'SAV98765', type: 'Debit Card', lastFour: '1234', isFrozen: false, spendingLimit: 200, pin: '9012' },
];


const CardManagementPage: React.FC = () => {
  const navigate = useNavigate();
  const { accountId } = useParams<{ accountId: string }>(); // Get accountId from URL if needed
  console.log('CardManagementPage loaded for account:', accountId);

  // Find cards related to the current account, or show all if no accountId
  const relevantCards = accountId ? MOCK_CARDS.filter(card => card.accountId === accountId) : MOCK_CARDS;
  
  // If no accountId is passed, or no cards for that account, we might show a selection or a generic page.
  // For simplicity, let's assume we always find cards or use the first card if no accountId.
  const [selectedCard, setSelectedCard] = useState(relevantCards.length > 0 ? relevantCards[0] : MOCK_CARDS[0]);
  const [isFrozen, setIsFrozen] = useState(selectedCard.isFrozen);
  const [showPin, setShowPin] = useState(false);


  const handleFreezeToggle = (checked: boolean) => {
    setIsFrozen(checked);
    // API call to update card status
    console.log(`Card ${selectedCard.id} ${checked ? 'frozen' : 'unfrozen'}`);
    // Update mock data for demo
    setSelectedCard(prev => ({...prev, isFrozen: checked}));
  };
  
  const handleReportLostStolen = () => {
    console.log(`Card ${selectedCard.id} reported lost/stolen.`);
    // API call, then likely disable card controls and show a message.
    alert('Card reported lost/stolen. Please contact customer support for next steps.');
  };

  if (!selectedCard) {
    return (
        <div className="flex flex-col min-h-screen bg-gray-100">
             <header className="bg-white shadow-sm py-4">
                <div className="container mx-auto px-4 flex items-center justify-between">
                    <div className="flex items-center">
                        <CreditCard className="h-8 w-8 text-blue-600 mr-2" />
                        <h1 className="text-xl font-semibold text-blue-700">Card Management</h1>
                    </div>
                    <Button variant="outline" size="sm" onClick={() => navigate(-1)}>
                        <ArrowLeft className="mr-1 h-4 w-4" /> Back
                    </Button>
                </div>
            </header>
            <main className="flex-grow container mx-auto px-4 py-8 text-center">
                <p className="text-xl text-gray-700">No card selected or found for this account.</p>
            </main>
            <Footer/>
        </div>
    );
  }


  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm py-4">
         <div className="container mx-auto px-4 flex items-center justify-between">
            <div className="flex items-center">
                <CreditCard className="h-8 w-8 text-blue-600 mr-2" />
                <h1 className="text-xl font-semibold text-blue-700">Card Management</h1>
            </div>
            <Button variant="outline" size="sm" onClick={() => navigate(-1) /* Go back to previous page, likely dashboard */}>
                <ArrowLeft className="mr-1 h-4 w-4" /> Back
            </Button>
         </div>
      </header>

      <main className="flex-grow container mx-auto px-4 py-8">
        <Card className="w-full max-w-lg mx-auto shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl">Manage Your {selectedCard.type}</CardTitle>
            <CardDescription>Card ending in •••• {selectedCard.lastFour}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Card Selection - if multiple cards for an account */}
            {relevantCards.length > 1 && (
                 <div className="mb-4">
                    <Label htmlFor="card-selector">Select Card:</Label>
                    <select 
                        id="card-selector" 
                        value={selectedCard.id}
                        onChange={(e) => {
                            const newSelectedCard = MOCK_CARDS.find(c => c.id === e.target.value);
                            if (newSelectedCard) {
                                setSelectedCard(newSelectedCard);
                                setIsFrozen(newSelectedCard.isFrozen);
                            }
                        }}
                        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                    >
                        {relevantCards.map(card => (
                            <option key={card.id} value={card.id}>{card.type} ending in {card.lastFour}</option>
                        ))}
                    </select>
                 </div>
            )}


            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-md">
              <div>
                <Label htmlFor="freeze-card" className="text-base font-medium">
                  {isFrozen ? <Lock className="inline mr-2 h-5 w-5 text-orange-500" /> : <Unlock className="inline mr-2 h-5 w-5 text-green-500" />}
                  Freeze Card
                </Label>
                <p className="text-sm text-gray-500">
                  {isFrozen ? 'Your card is currently frozen. Unfreeze to resume transactions.' : 'Temporarily freeze your card to prevent new transactions.'}
                </p>
              </div>
              <Switch
                id="freeze-card"
                checked={isFrozen}
                onCheckedChange={handleFreezeToggle}
                aria-label="Freeze or unfreeze card"
              />
            </div>

            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="pin-reminder">
                <AccordionTrigger className="text-base">PIN Reminder</AccordionTrigger>
                <AccordionContent className="space-y-2">
                  <p className="text-sm text-gray-600">For security, we can show your PIN temporarily.</p>
                   <Button variant="outline" onClick={() => setShowPin(true)}>
                    <Eye className="mr-2 h-4 w-4" /> Show PIN
                  </Button>
                  {showPin && (
                    <Dialog open={showPin} onOpenChange={setShowPin}>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Your PIN</DialogTitle>
                          <DialogDescription>
                            Make sure no one is looking over your shoulder. This PIN will be hidden automatically after a short period.
                          </DialogDescription>
                        </DialogHeader>
                        <div className="my-4 text-center text-3xl font-bold tracking-widest bg-blue-100 text-blue-700 p-4 rounded">
                          {selectedCard.pin}
                        </div>
                        <DialogFooter>
                          <DialogClose asChild>
                            <Button onClick={() => setShowPin(false)}>Close</Button>
                          </DialogClose>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  )}
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="spending-limits">
                <AccordionTrigger className="text-base">Spending Limits</AccordionTrigger>
                <AccordionContent>
                  <p className="text-sm text-gray-600">Current daily spending limit: £{selectedCard.spendingLimit.toFixed(2)}</p>
                  <Button variant="outline" className="mt-2" onClick={() => alert('Feature to change spending limits coming soon!')}>
                    Adjust Limit
                  </Button>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="security-features">
                <AccordionTrigger className="text-base">Security Features</AccordionTrigger>
                <AccordionContent className="space-y-3">
                    <div className="flex items-center justify-between">
                        <Label htmlFor="online-payments">Enable Online Payments</Label>
                        <Switch id="online-payments" defaultChecked />
                    </div>
                     <div className="flex items-center justify-between">
                        <Label htmlFor="contactless-payments">Enable Contactless Payments</Label>
                        <Switch id="contactless-payments" defaultChecked />
                    </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            <Dialog>
              <DialogTrigger asChild>
                <Button variant="destructive" className="w-full mt-4">
                  <AlertTriangle className="mr-2 h-4 w-4" /> Report Card Lost or Stolen
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Report Card Lost or Stolen?</DialogTitle>
                  <DialogDescription>
                    Reporting your card will permanently block it. A new card will be issued. Are you sure you want to proceed?
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <DialogClose asChild><Button variant="outline">Cancel</Button></DialogClose>
                  <Button variant="destructive" onClick={() => {handleReportLostStolen(); navigate('/dashboard'); /* Close dialog implicitly */ }}>Confirm Report</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>

          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
};

export default CardManagementPage;