import { useRouter } from 'next/router';

export type LocalePath = {
  isLithuanian: boolean;
  prefix: string;
};

export function useLocalePath(): LocalePath {
  const router = useRouter();
  const asPath = router?.asPath || (typeof window !== 'undefined' ? window.location.pathname : '/');
  const isLithuanian = asPath === '/lt' || asPath === '/lt/' || asPath.startsWith('/lt/');
  const prefix = isLithuanian ? '/lt' : '/en';
  return { isLithuanian, prefix };
}
