'use client';

import { useState } from 'react';
import ImagePicker from './image-picker';
import { Btn, inputClass } from './ui';
import { LuImage } from 'react-icons/lu';

export default function ImageField({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <div className="flex items-center gap-3">
        <span className="flex h-14 w-20 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-gray-200 bg-gray-50">
          {value ? (
            <img src={value} alt="" className="h-14 w-20 object-contain" />
          ) : (
            <LuImage className="h-5 w-5 text-gray-300" />
          )}
        </span>
        <input
          className={inputClass + ' flex-1 font-mono text-xs'}
          value={value}
          placeholder="/img/… sau /uploads/…"
          onChange={(e) => onChange(e.target.value)}
        />
        <Btn kind="outline" onClick={() => setOpen(true)}>
          Alege
        </Btn>
      </div>
      <ImagePicker
        open={open}
        onClose={() => setOpen(false)}
        onSelect={(p) => {
          onChange(p);
          setOpen(false);
        }}
      />
    </div>
  );
}
