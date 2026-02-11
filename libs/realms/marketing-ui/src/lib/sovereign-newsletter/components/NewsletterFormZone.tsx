/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus NewsletterFormZone
 * @description Atuador de captura de dados com gestão de estado local.
 */

'use client';

import React, { useState } from 'react';
import { Send, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';

interface INewsletterFormZone {
  readonly placeholder: string;
  readonly submitLabel: string;
  readonly isLoading: boolean;
  readonly onSubscribe: (email: string) => Promise<void>;
}

export const NewsletterFormZone: React.FC<INewsletterFormZone> = ({
  placeholder,
  submitLabel,
  isLoading,
  onSubscribe
}) => {
  const [email, setEmail] = useState('');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onSubscribe(email);
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      onSubmit={handleSubmit}
      className="flex flex-col gap-5 w-full"
    >
      <div className="group relative">
        <input
          required
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder={placeholder}
          disabled={isLoading}
          className="w-full px-8 py-6 bg-white dark:bg-black border border-neutral-200 dark:border-white/10 rounded-sm font-mono text-sm focus:ring-2 focus:ring-brand-action outline-none transition-all shadow-sm disabled:opacity-50"
        />
        <Send
          className={`absolute right-6 top-1/2 -translate-y-1/2 transition-colors ${isLoading ? 'text-neutral-500' : 'text-neutral-300 group-focus-within:text-brand-action'}`}
          size={20}
        />
      </div>

      <button
        disabled={isLoading}
        className="relative overflow-hidden w-full py-6 bg-brand-primary dark:bg-white text-white dark:text-black font-serif font-black uppercase tracking-[0.4em] text-xs transition-all hover:scale-[1.01] active:scale-[0.98] disabled:cursor-wait"
      >
        {isLoading ? <Loader2 className="mx-auto animate-spin" size={20} /> : submitLabel}
      </button>
    </motion.form>
  );
};
