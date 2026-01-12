export function server(): Promise<{ result: "heads" | "tails" }> {
    return new Promise((resolve) => {
        const delay = 500 + Math.random() * 1000;

        setTimeout(() => {
            const result: "heads" | "tails" = Math.random() < 0.5 ? "heads" : "tails";

            resolve({ result });
        }, delay);
    });
}