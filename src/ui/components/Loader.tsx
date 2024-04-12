import React from 'react';

interface Props {
  className: string,
}

export const Loader: React.FC<Props> = ({ className }) => (
  <div className={className}>
    <div
      className="inline-block h-8 w-8 animate-spin
        rounded-full border-4 border-solid border-current
        border-e-transparent align-[-0.125em] text-surface
        motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white">
    </div>
  </div>
);
