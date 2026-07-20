"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, PhoneOff, Mic, MicOff, Delete } from 'lucide-react';

export default function PremiumDialer() {
  const [number, setNumber] = useState('');
  const [callState, setCallState] = useState('idle'); // idle, calling, in-call
  const [isMuted, setIsMuted] = useState(false);

  const handleKeyPress = (key: string) => {
    if (number.length < 15) setNumber((prev) => prev + key);
  };

  const handleCall = () => {
    if (!number) return;
    setCallState('calling');
    setTimeout(() => setCallState('in-call'), 3000); 
  };

  const handleHangup = () => {
    setCallState('idle');
    setNumber('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative w-full max-w-sm backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] p-8 overflow-hidden"
      >
        {callState !== 'idle' && (
          <motion.div
            animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0.1, 0.3] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute -top-20 -left-20 w-64 h-64 bg-fuchsia-500 rounded-full blur-3xl pointer-events-none"
          />
        )}

        <div className="relative z-10">
          <div className="h-24 flex flex-col items-center justify-end mb-8">
            <span className="text-gray-400 text-sm font-medium tracking-widest uppercase mb-2">
              {callState === 'idle' ? 'Bağlantı Hazır' : callState === 'calling' ? 'Aranıyor...' : 'Görüşmede'}
            </span>
            <div className="text-4xl font-light text-white tracking-wider h-10">
              {number || ' '}
            </div>
          </div>

          <AnimatePresence mode="wait">
            {callState === 'idle' ? (
              <motion.div
                key="dialpad"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="grid grid-cols-3 gap-4"
              >
                {['1', '2', '3', '4', '5', '6', '7', '8', '9', '*', '0', '#'].map((key) => (
                  <motion.button
                    key={key}
                    whileHover={{ scale: 1.1, backgroundColor: 'rgba(255,255,255,0.15)' }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleKeyPress(key)}
                    className="h-16 rounded-2xl bg-white/5 border border-white/10 text-2xl text-white font-light flex items-center justify-center transition-colors"
                  >
                    {key}
                  </motion.button>
                ))}
              </motion.div>
            ) : (
              <motion.div
                key="incall"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center space-y-8 py-8"
              >
                <div className="flex items-center space-x-2 h-16">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <motion.div
                      key={i}
                      animate={{ height: callState === 'in-call' ? ['20%', '100%', '20%'] : '20%' }}
                      transition={{ duration: 0.5, repeat: Infinity, delay: i * 0.1 }}
                      className="w-2 bg-fuchsia-400 rounded-full"
                    />
                  ))}
                </div>
                
                <div className="flex space-x-6">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setIsMuted(!isMuted)}
                    className={`p-4 rounded-full ${isMuted ? 'bg-red-500/20 text-red-400' : 'bg-white/10 text-white'}`}
                  >
                    {isMuted ? <MicOff size={24} /> : <Mic size={24} />}
                  </motion.button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="mt-8 flex justify-center items-center space-x-6">
            {callState === 'idle' && number.length > 0 && (
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                onClick={() => setNumber(number.slice(0, -1))}
                className="p-4 text-gray-400 hover:text-white"
              >
                <Delete size={24} />
              </motion.button>
            )}
            
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={callState === 'idle' ? handleCall : handleHangup}
              className={`p-5 rounded-full shadow-lg ${
                callState === 'idle' 
                  ? 'bg-gradient-to-r from-emerald-400 to-emerald-600 shadow-emerald-500/30' 
                  : 'bg-gradient-to-r from-red-500 to-rose-600 shadow-red-500/30'
              }`}
            >
              {callState === 'idle' ? <Phone size={28} color="white" /> : <PhoneOff size={28} color="white" />}
            </motion.button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
