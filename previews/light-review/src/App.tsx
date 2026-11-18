import RefreshPage, { type RefreshVariant } from './RefreshPage';
import type { Language } from './i18n';
// Every visual variant renders the same content and interaction implementation.
export default function App({initialLanguage='en'}:{initialLanguage?:Language}) {
 const selected=import.meta.env.VITE_REFRESH_VARIANT;
 const variant:RefreshVariant=selected==='original'||selected==='mobile'?selected:'light';
 return <RefreshPage initialLanguage={initialLanguage} variant={variant} />;
}
