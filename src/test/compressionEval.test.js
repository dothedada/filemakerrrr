import { describe, it, expect } from 'vitest';
import { compressionForecast } from '../compressionEval';

const isFloatBetween0And1 = (value) => {
    return typeof value === 'number' && value > 0 && !Number.isInteger(value);
};

describe('Funcionality of comrpessionEval', () => {
    it('throws error if a parameter is missing', () => {
        expect(() => compressionForecast()).toThrowError(
            'A parameter is missing!',
        );
    });

    it('returns an object with two keys, "shoul" and "rate"', () => {
        const forecast = compressionForecast(123, 123);
        expect('should' in forecast).toBe(true);
        expect('rate' in forecast).toBe(true);
    });

    it('"should" is a bolean', () => {
        const forecast = compressionForecast(123, 123);
        expect(typeof forecast.should).toBe('boolean');
    });

    it('"rate" is a number between 0 and 1', () => {
        const forecast = compressionForecast(123, 123);
        expect(isFloatBetween0And1(forecast.rate)).toBe(true);
    });

    it('returns "should":true if the length is way bigger than the char count', () => {
        const string1 = 5000;
        const chars1 = 45;
        const string2 = 500;
        const chars2 = 40;
        const string3 = 30;
        const chars3 = 30;
        const string4 = 120;
        const chars4 = 30;
        const string5 = 5;
        const chars5 = 3;

        const forecast1 = compressionForecast(string1, chars1);
        const forecast2 = compressionForecast(string2, chars2);
        const forecast3 = compressionForecast(string3, chars3);
        const forecast4 = compressionForecast(string4, chars4);
        const forecast5 = compressionForecast(string5, chars5);

        expect(forecast1.should).toBe(true);
        expect(forecast2.should).toBe(true);
        expect(forecast3.should).toBe(false);
        expect(forecast4.should).toBe(false);
        expect(forecast5.should).toBe(true);
    });
});
