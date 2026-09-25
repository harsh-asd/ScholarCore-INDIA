import React from 'react';
import { CheckCircle2, Circle, Clock, XCircle, Loader2 } from 'lucide-react';

const Timeline = ({ events, isLoading }) => {
  return (
    <div className="flex flex-col space-y-6">
      {events.map((event, index) => {
        const isLast = index === events.length - 1;
        
        return (
          <div key={event.step} className="flex relative">
            {!isLast && (
              <div 
                className={`absolute top-8 bottom-[-24px] left-3 w-[2px] ${
                  event.status === 'completed' ? 'bg-indigo-600' : 
                  event.status === 'rejected' ? 'bg-red-500' : 'bg-gray-300'
                }`}
              />
            )}
            <div className="relative z-10 flex items-start">
              <div className="flex-shrink-0 mr-4">
                {event.status === 'completed' ? (
                  <CheckCircle2 className="w-6 h-6 text-indigo-600 bg-white" />
                ) : event.status === 'current' ? (
                  isLoading ? (
                    <Loader2 className="w-6 h-6 text-indigo-500 bg-white animate-spin" />
                  ) : (
                    <Clock className="w-6 h-6 text-yellow-500 bg-white" />
                  )
                ) : event.status === 'rejected' ? (
                  <XCircle className="w-6 h-6 text-red-500 bg-white" />
                ) : (
                  <Circle className="w-6 h-6 text-gray-300 bg-white" />
                )}
              </div>
              <div className="pt-0.5">
                <p className={`text-sm font-semibold ${
                  event.status === 'pending' ? 'text-gray-500' : 
                  event.status === 'rejected' ? 'text-red-600' : 'text-gray-900'
                }`}>
                  {event.title}
                </p>
                {event.date && (
                  <p className="text-xs text-gray-500 mt-1">{event.date}</p>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Timeline;
