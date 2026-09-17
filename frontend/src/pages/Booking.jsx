import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar } from 'lucide-react';
import Header from '../components/layout/Header';
import Card from '../components/shared/Card';

const Booking = () => {
  const navigate = useNavigate();
  const [isBookingSimulated, setIsBookingSimulated] = useState(false);

  // Simulated booking handler - replace with real calendar booking logic
  const handleSimulatedBooking = () => {
    console.log('[Analytics] Booking completed - navigating to post-booking page');
    
    // In production, this will be triggered by the calendar widget's success callback
    // For Calendly: Listen for 'calendly.event_scheduled' event
    // For Cal.com: Use the onBookingComplete callback
    
    navigate('/booking-confirmed');
  };

  return (
    <div className="min-h-screen bg-black">
      {/* Header removed to maintain focus */}
      <main className="pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <button
              onClick={() => navigate('/success')}
              className="inline-flex items-center text-[#9A9C9F] hover:text-[#FF6B87] transition-colors mb-6"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to confirmation
            </button>
            
            <div className="text-center space-y-4">
              <div className="flex justify-center">
                <div className="w-16 h-16 bg-[#FF6B87]/20 rounded-full flex items-center justify-center">
                  <Calendar className="w-8 h-8 text-[#FF6B87]" />
                </div>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-[#FAF9F6]">
                Book your interview with the Order Flow School team
              </h1>
              <p className="text-xl text-[#9A9C9F] max-w-2xl mx-auto">
                Choose a time below to review your application and see if OFS is a fit.
              </p>
            </div>
          </div>

          <Card className="space-y-6">
            <div className="bg-[#FF6B87]/10 border border-[#FF6B87]/30 rounded-lg p-6 space-y-3">
              <h3 className="text-lg font-semibold text-[#FAF9F6]">Before you book:</h3>
              <ul className="space-y-2 text-[#9A9C9F]">
                <li className="flex items-start space-x-2">
                  <span className="text-[#FF6B87]">•</span>
                  <span>This call will be hosted on Zoom. You'll receive meeting details by email.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-[#FF6B87]">•</span>
                  <span>Please only book a call if you are serious about improving your trading and committed to showing up.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-[#FF6B87]">•</span>
                  <span>Missed calls may result in removal from the application list.</span>
                </li>
              </ul>
            </div>

            {/* CALENDAR EMBED PLACEHOLDER */}
            {/* 
              To add your Calendly or booking calendar:
              
              1. For Calendly integration:
              
              <div className="calendly-inline-widget" 
                   data-url="https://calendly.com/YOUR_USERNAME/YOUR_EVENT" 
                   style={{ minWidth: '320px', height: '700px' }}>
              </div>
              
              And add the Calendly script to your public/index.html:
              <script src="https://assets.calendly.com/assets/external/widget.js" type="text/javascript" async></script>
              
              Then add event listener for successful booking:
              <script>
                window.addEventListener('message', function(e) {
                  if (e.data.event && e.data.event === 'calendly.event_scheduled') {
                    // Redirect to post-booking page
                    window.location.href = '/booking-confirmed';
                  }
                });
              </script>
              
              2. For Cal.com integration:
              
              import Cal from '@calcom/embed-react';
              
              <Cal 
                calLink="YOUR_USERNAME/YOUR_EVENT"
                config={{
                  theme: 'dark',
                  hideEventTypeDetails: false
                }}
                onBookingComplete={() => {
                  navigate('/booking-confirmed');
                }}
              />
              
              3. For other booking tools, follow their embed instructions and redirect to /booking-confirmed after successful booking
            */}
            <div className="min-h-[600px] bg-gray-800/50 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-700">
              <div className="text-center space-y-6 p-8">
                <Calendar className="w-16 h-16 text-[#9A9C9F] mx-auto" />
                <div className="space-y-2">
                  <p className="text-lg font-semibold text-[#FAF9F6]">Calendar Booking Placeholder</p>
                  <p className="text-[#9A9C9F] max-w-md">
                    Replace this section with your Calendly, Cal.com, or other booking calendar embed code.
                  </p>
                  <p className="text-sm text-[#9A9C9F] max-w-md">
                    See comments in /app/frontend/src/pages/Booking.jsx for integration instructions.
                  </p>
                </div>
                
                {/* TEMPORARY DEMO BUTTON - Remove when real calendar is integrated */}
                <div className="pt-6">
                  <button
                    onClick={handleSimulatedBooking}
                    className="px-6 py-3 text-base font-semibold bg-[#FF6B87] hover:bg-[#FF6B87] text-white rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl hover:shadow-red-600/25"
                  >
                    Simulate Booking (Demo Only)
                  </button>
                  <p className="text-xs text-[#9A9C9F] mt-2">
                    Remove this button when calendar is integrated
                  </p>
                </div>
              </div>
            </div>
          </Card>

          <div className="mt-8 text-center">
            <p className="text-sm text-[#9A9C9F]">
              Having trouble booking? Email us at <span className="text-[#FF6B87]">support@orderflowschool.com</span>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Booking;
