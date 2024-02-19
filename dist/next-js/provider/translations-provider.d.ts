type Props = {
    children: React.ReactNode;
    locale: string;
    fallbackLng: string[];
    resources: {
        [key: string]: any;
    };
};
declare const TranslationsProvider: ({ children, locale, fallbackLng, resources }: Props) => import("react/jsx-runtime").JSX.Element;
export default TranslationsProvider;
