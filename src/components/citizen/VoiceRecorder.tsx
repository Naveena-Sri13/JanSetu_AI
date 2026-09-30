import React, { useState, useEffect, useRef } from 'react';
import { Mic, MicOff, AlertCircle, Volume2 } from 'lucide-react';
import { LanguageCode } from '../../types';

interface VoiceRecorderProps {
  language: LanguageCode;
  onTranscription: (text: string) => void;
  disabled?: boolean;
}

const LANGUAGE_SPEECH_MAP: Record<LanguageCode, string> = {
  ta: 'ta-IN',
  hi: 'hi-IN',
  en: 'en-IN',
  te: 'te-IN',
  kn: 'kn-IN',
  bn: 'bn-IN',
};

export const VoiceRecorder: React.FC<VoiceRecorderProps> = ({
  language,
  onTranscription,
  disabled,
}) => {
  const [isRecording, setIsRecording] = useState(false);
  const [isSupported, setIsSupported] = useState(true);
  const [interimText, setInterimText] = useState('');
  const [statusMessage, setStatusMessage] = useState('');
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setIsSupported(false);
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = LANGUAGE_SPEECH_MAP[language] || 'en-IN';

      recognition.onstart = () => {
        setIsRecording(true);
        setStatusMessage('Listening to your voice in your chosen language...');
      };

      recognition.onresult = (event: any) => {
        let currentInterim = '';
        let finalTranscript = '';

        for (let i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            finalTranscript += event.results[i][0].transcript;
          } else {
            currentInterim += event.results[i][0].transcript;
          }
        }

        if (finalTranscript) {
          onTranscription(finalTranscript);
          setInterimText('');
        } else {
          setInterimText(currentInterim);
        }
      };

      recognition.onerror = (event: any) => {
        console.warn('Speech recognition status:', event.error);
        setIsRecording(false);
        if (event.error === 'not-allowed') {
          setStatusMessage('Microphone access was denied. Please allow microphone permissions or type your request.');
        } else {
          setStatusMessage('Voice recognition paused. You can also type your request directly.');
        }
      };

      recognition.onend = () => {
        setIsRecording(false);
      };

      recognitionRef.current = recognition;
    } catch (e) {
      setIsSupported(false);
    }

    return () => {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.abort();
        } catch {
          // ignore
        }
      }
    };
  }, [language, onTranscription]);

  const toggleRecording = () => {
    if (!recognitionRef.current) return;

    if (isRecording) {
      recognitionRef.current.stop();
      setIsRecording(false);
    } else {
      setInterimText('');
      setStatusMessage('');
      try {
        recognitionRef.current.lang = LANGUAGE_SPEECH_MAP[language] || 'en-IN';
        recognitionRef.current.start();
      } catch (err) {
        console.warn('Failed to start speech recognition:', err);
      }
    }
  };

  if (!isSupported) {
    return (
      <div className="rounded-lg border border-amber-200 bg-amber-50/70 p-3 text-xs text-amber-800 dark:border-amber-900/50 dark:bg-amber-950/20 dark:text-amber-300">
        <div className="flex items-center gap-2">
          <AlertCircle className="h-4 w-4 shrink-0 text-amber-600" />
          <span>
            Voice input isn&apos;t supported in this browser. You can type your request instead.
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center">
      <div className="relative">
        {isRecording && (
          <span className="absolute -inset-2 rounded-full bg-rose-500/20 animate-ping" />
        )}
        <button
          type="button"
          onClick={toggleRecording}
          disabled={disabled}
          className={`relative flex h-16 w-16 sm:h-20 sm:w-20 items-center justify-center rounded-full transition-all shadow-md ${
            isRecording
              ? 'bg-rose-600 text-white ring-4 ring-rose-300 dark:ring-rose-900'
              : 'bg-indigo-600 text-white hover:bg-indigo-700 ring-2 ring-indigo-300/40'
          } ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer active:scale-95'}`}
          title={isRecording ? 'Click to stop recording' : 'Click to speak your development request'}
        >
          {isRecording ? <MicOff className="h-7 w-7" /> : <Mic className="h-7 w-7" />}
        </button>
      </div>

      <div className="mt-3 text-center">
        <span className="font-medium text-xs sm:text-sm text-slate-700 dark:text-slate-300">
          {isRecording ? 'Listening... Speak clearly in your selected language' : 'Tap to speak your community request'}
        </span>
        <p className="text-[11px] text-slate-500 dark:text-slate-400">
          Browser Speech-to-Text active (Architected for Google Cloud Speech-to-Text)
        </p>
      </div>

      {interimText && (
        <div className="mt-2 max-w-md rounded-md bg-indigo-50/80 px-3 py-1.5 text-xs text-indigo-900 dark:bg-indigo-950/50 dark:text-indigo-200">
          <span className="font-semibold">Transcribing:</span> &ldquo;{interimText}&rdquo;
        </div>
      )}

      {statusMessage && !interimText && (
        <p className="mt-1 text-xs text-amber-700 dark:text-amber-400">{statusMessage}</p>
      )}
    </div>
  );
};
