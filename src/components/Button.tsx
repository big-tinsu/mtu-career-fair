'use client';

import { Button as HeroButton } from '@heroui/react';

import { ButtonProps as HeroButtonProps } from '@heroui/react';

type ButtonProps = React.PropsWithChildren<HeroButtonProps>;

export function Button({ children, ...props }: ButtonProps) {
  return (
    <HeroButton
      {...props}
      className='rounded-xl bg-brand text-white font-semibold hover:bg-brand-dark'
    >
      {children}
    </HeroButton>
  );
}
