export const convertToBanglaNum = (num: any) => {
    const banglaDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
    const monthMap: { [key: string]: string } = {
        "January": "জানুয়ারি",
        "February": "ফেব্রুয়ারি",
        "March": "মার্চ",
        "April": "এপ্রিল",
        "May": "মে",
        "June": "জুন",
        "July": "জুলাই",
        "August": "অগাস্ট",
        "September": "সেপ্টেম্বর",
        "October": "অক্টোবর",
        "November": "নভেম্বর",
        "December": "ডিসেম্বর",
    };

    return num
        ?.toString()
        .split(" ")
        .map((word: string) => {
            if (monthMap[word]) {
                return monthMap[word]; // Convert month names
            }
            return word
                .split("")
                .map((char: string) => {
                    if (char >= "0" && char <= "9") {
                        return banglaDigits[parseInt(char)];
                    }
                    return char; // Keep non-numeric characters like `/`, `.`, `x`, etc.
                })
                .join("");
        })
        .join(" ");
};