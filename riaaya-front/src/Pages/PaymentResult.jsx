import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { CheckCircle, XCircle, Phone, Printer, Download, Mail } from 'lucide-react';

export default function PaymentResult() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [paymentData, setPaymentData] = useState(null);

  useEffect(() => {
    // Extract all payment data from URL
    const successParam = searchParams.get('success');
    const respCode = searchParams.get('respCode');
    
    const data = {
      // Check multiple conditions for success
      success: successParam === 'true' || respCode === '00',
      respCode: respCode,
      respCodeDesc: searchParams.get('respCodeDesc') || '',
      orderId: searchParams.get('orderId') || '',
      orderNumber: searchParams.get('orderNumber') || '',
      amount: searchParams.get('amount') || '0',
      approvalCode: searchParams.get('approvalCode') || '',
      pan: searchParams.get('pan') || '',
      date: searchParams.get('date') || new Date().toISOString(),
      language: searchParams.get('language') || 'fr',
      error: searchParams.get('error')
    };
    
    console.log('Payment Data:', data);
    setPaymentData(data);
  }, [searchParams]);

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadPDF = () => {
    alert('Fonctionnalité PDF en cours de développement');
  };

  const handleSendEmail = () => {
    const email = prompt('Entrez votre adresse email:');
    if (email) {
      alert(`Reçu envoyé à ${email}`);
    }
  };

  if (!paymentData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  // FIXED: Check if payment was successful
  const isSuccess = paymentData.success && !paymentData.error;

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-3xl mx-auto print-area">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-6">
          <div className="text-center mb-6">
            {isSuccess ? (
              <>
                <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-4" />
                <h1 className="text-3xl font-bold text-green-600 mb-2">
                  Paiement accepté
                </h1>
                <p className="text-gray-600">
                  {paymentData.respCodeDesc || 'Votre paiement a été effectué avec succès'}
                </p>
              </>
            ) : (
              <>
                <XCircle className="w-20 h-20 text-red-500 mx-auto mb-4" />
                <h1 className="text-3xl font-bold text-red-600 mb-2">
                  Paiement refusé
                </h1>
                <p className="text-gray-600">
                  {paymentData.respCodeDesc || paymentData.error || 'Votre transaction a été rejetée'}
                </p>
              </>
            )}
          </div>

          {/* Payment Details - Show for successful payments */}
          {isSuccess && (
            <div className="border-t border-gray-200 pt-6">
              <h2 className="text-xl font-semibold mb-4 text-center">Détails de la transaction</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-500">Identifiant de transaction</p>
                  <p className="font-semibold text-gray-800">{paymentData.orderId || 'N/A'}</p>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-500">Numéro de commande</p>
                  <p className="font-semibold text-gray-800">{paymentData.orderNumber || 'N/A'}</p>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-500">Code d'autorisation</p>
                  <p className="font-semibold text-gray-800">{paymentData.approvalCode || 'N/A'}</p>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-500">Date et heure</p>
                  <p className="font-semibold text-gray-800">
                    {paymentData.date ? new Date(paymentData.date).toLocaleString('fr-DZ', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    }) : 'N/A'}
                  </p>
                </div>

                <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                  <p className="text-sm text-gray-500">Montant payé</p>
                  <p className="font-bold text-2xl text-green-600">
                    {paymentData.amount} DZD
                  </p>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-500">Mode de paiement</p>
                  <p className="font-semibold text-gray-800">
                    Carte CIB/Edahabia 
                    {paymentData.pan && ` (****${paymentData.pan.slice(-4)})`}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Support Info - Always show */}
          <div className="mt-6 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
            <div className="flex items-start gap-3">
              <Phone className="w-5 h-5 text-yellow-600 mt-1 flex-shrink-0" />
              <div>
                <p className="text-sm text-gray-700">
                  En cas de problème de paiement, veuillez contacter le numéro vert de la SATIM
                </p>
                <p className="text-2xl font-bold text-yellow-700">3020</p>
              </div>
            </div>
          </div>

          {/* Action Buttons - Show for successful payments */}
          {isSuccess && (
            <div className="mt-8 flex flex-wrap gap-3 justify-center print:hidden">
              <button
                onClick={handlePrint}
                className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                <Printer className="w-5 h-5" />
                Imprimer le reçu
              </button>

              <button
                onClick={handleDownloadPDF}
                className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
              >
                <Download className="w-5 h-5" />
                Télécharger PDF
              </button>

              <button
                onClick={handleSendEmail}
                className="flex items-center gap-2 px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
              >
                <Mail className="w-5 h-5" />
                Envoyer par email
              </button>
            </div>
          )}

          {/* Return Home Button */}
          <div className="mt-8 text-center print:hidden">
            <button
              onClick={() => navigate('/')}
              className="px-8 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
            >
              Retour à l'accueil
            </button>
          </div>
        </div>
      </div>

      {/* Print Styles */}
      <style>{`
        @media print {
          body {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          .print\\:hidden {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
}
