import TypingTest from "@/components/TypingTest";

function generateCombinations(chars: string[], length: number): string {
    const results: string[] = [];
    const totalCombinations = Math.pow(chars.length, length);

    for (let i = 0; i < totalCombinations; i++) {
        let combination = "";
        let temp = i;

        for (let j = 0; j < length; j++) {
            combination = chars[temp % chars.length] + combination;
            temp = Math.floor(temp / chars.length);
            console.log(temp % chars.length, combination, temp);
        }

        results.push(combination);
    }

    return results.join(" ");
}

export default function Home() {
    console.log(generateCombinations(["f", "j"], 2));
    return (
        <>
            <TypingTest testTexts={["qwe", "In JavaScript, ", "hour and minute by "]} />
        </>
    );
}
