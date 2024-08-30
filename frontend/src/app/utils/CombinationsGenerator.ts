export class CombinationsGenerator {
    private sets: { chars: string[]; length: number }[];

    constructor(sets: { chars: string[]; length: number }[]) {
        this.sets = sets;
    }

    private generateCombinations(chars: string[], length: number): string[] {
        const results: string[] = [];
        const totalCombinations = Math.pow(chars.length, length);

        for (let i = 0; i < totalCombinations; i++) {
            let combination = "";
            let temp = i;

            for (let j = 0; j < length; j++) {
                combination = chars[temp % chars.length] + combination;
                temp = Math.floor(temp / chars.length);
            }

            results.push(combination);
        }

        return results;
    }

    private combineSets(): string[] {
        const allCombinations: string[] = [];
        for (const set of this.sets) {
            const combinations = this.generateCombinations(set.chars, set.length);
            allCombinations.push(...combinations);
        }
        return allCombinations;
    }

    public getCombinationsAsArray(): string[] {
        return this.combineSets();
    }

    public getCombinationsAsString(): string {
        return this.combineSets().join(" ");
    }

    public getShuffledCombinations(): string[] {
        const combinations = this.combineSets();
        for (let i = combinations.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [combinations[i], combinations[j]] = [combinations[j], combinations[i]];
        }
        return combinations;
    }

    public getShuffledCombinationsAsString(): string {
        return this.getShuffledCombinations().join(" ");
    }
}
