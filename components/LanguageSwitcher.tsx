import { useRouter } from 'next/router';
import Link from 'next/link';

export type LocaleOption = 'lt' | 'en';

export const flags: Record<LocaleOption, string> = {
  lt: '🇱🇹',
  en: '🇬🇧',
};

export function getAlternateUrl(asPath: string, locale: LocaleOption): string {
  const cleanPath = asPath.split('?')[0].split('#')[0];
  const stripped = cleanPath.replace(/^\/(lt|en)(\/|$)/, '/');
  const target = stripped === '/' ? '' : stripped;

  const slugMap: Record<string, Record<string, string>> = {
    lt: { '/services': '/paslaugos', '/about': '/apie', '/contact': '/kontaktai' },
    en: { '/paslaugos': '/services', '/apie': '/about', '/kontaktai': '/contact' },
  };

  let translated = target;
  if (slugMap[locale] && slugMap[locale][target]) {
    translated = slugMap[locale][target];
  }

  return `/${locale}${translated}`;
}

export default function LanguageSwitcher({ initialLocale }: { initialLocale: LocaleOption }) {
  const router = useRouter();
  const currentLocale: LocaleOption = initialLocale;

  return (
    <div className='flex items-center gap-2'>
      {(['lt', 'en'] as LocaleOption[]).map((loc) => (
        <Link
          key={loc}
          href={getAlternateUrl(router.asPath, loc)}
          className={`text-xs uppercase tracking-wider transition-colors ${
            loc === currentLocale
              ? 'text-primary font-semibold'
              : 'text-text-muted hover:text-primary'
          }`}
        >
          {loc.toUpperCase()}
        </Link>
      ))}
    </div>
  );
}
