import flattenErrorDefinition from './flattenErrorDefinitions';

describe('Flatten Error Definition Edge case', () => {
    it.each([null, undefined, {}])('should return as-is if given empty object', (empty) => {
        try {
            flattenErrorDefinition(empty);
        }catch(exception) {
            expect(exception.message).toBe('Invalid input for flattenErrorDefintion')
        }
    });
})

describe('Flatten Error Definitions', () => {
    it('should return leave basic object untouched', () => {
        const basic = {a: 'b'}
        expect(basic).toEqual(flattenErrorDefinition(basic))
    });

    it('should leave basic expanded object untouched', () => {
        const basic = {a: 'b', c: 'd'}
        //console.log('ARRRR', flattenErrorDefinition(basic))
        expect(basic).toEqual(flattenErrorDefinition(basic))
    });

    it('should return flatten complex object', () => {
        const basic = {a: { a1: 'b', a2: 'd'}}
        const expected = { 'a:a1': 'b', 'a:a2': 'd' }
        console.log('FLAT', flattenErrorDefinition(basic))
        expect(flattenErrorDefinition(basic)).toEqual(expected)
    });
})