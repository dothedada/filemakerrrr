export interface BitsExtension {
    [key: string]: number;
}
export interface FileExtension {
    zipped: string;
    plain: string;
}
export type Signature = string[];

export type Message = string | ((input: number) => string);
export interface Messages {
    [lang: string]: {
        [section: string]: {
            [message: string]: Message;
        };
    };
}
