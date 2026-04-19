import useAppStore from '../store/appStore';
import { TRANSLATIONS } from '../data/translations';

export default function useTranslation() {
  const language = useAppStore((state) => state.language);

  const t = (key) => {
    return TRANSLATIONS[language]?.[key] || TRANSLATIONS['en']?.[key] || key;
  };

  return { t, language };
}
