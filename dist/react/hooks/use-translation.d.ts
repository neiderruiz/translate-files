import { FlattenKeys } from '..';
export declare function useTypedTranslation<T>(): {
    t: (key: FlattenKeys<T>, args?: string[]) => any;
};
