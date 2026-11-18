import RefreshPage from './RefreshPage';
import type { Language } from './i18n';
// Compatibility entry point; the Light presentation remains unchanged.
export default function LightApp({initialLanguage='en'}:{initialLanguage?:Language}) {
 return <RefreshPage initialLanguage={initialLanguage} variant="light" />;
}
