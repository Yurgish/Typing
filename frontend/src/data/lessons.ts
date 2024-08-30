"use client";

import { CombinationsGenerator } from "@/app/utils/CombinationsGenerator";

export interface Lesson {
    name: string;
    lines: string[];
}

interface Lessons {
    [key: string]: Lesson;
}

const lessons: Lessons = {
    "1": {
        name: "Lesson 1: J and F Keys",
        lines: [
            "jj jj jj jj jj jj",
            "ff ff ff ff ff ff",
            "jj ff jj ff jj ff",
            "fj fj fj fj fj fj",
            "jf jf jf jf jf jf",
            "jjj jjj jjf jfj jff fjj fjf ffj fff",
            "jjjj jjjj jjjf jjfj jjff jfjf jfjf jffj jfff fjjj fjjf fjfj fjff ffjj ffjf fffj ffff",
            new CombinationsGenerator([
                { chars: ["f", "j"], length: 3 },
                { chars: ["f", "j"], length: 4 },
            ]).getShuffledCombinationsAsString(),
        ],
    },
    "2": {
        name: "Lesson 2: D and K Keys",
        lines: [
            "dd dd dd dd dd dd",
            "kk kk kk kk kk kk",
            "dd kk dd kk dd kk",
            "kd kd kd kd kd kd",
            "dk dk dk dk dk dk",
            "ddd ddk dkd dkk kdd kdk kkd kkk",
            "dddd dddk ddkd dkkk dkdk dkdd dkkd dkkk kddd kddk kdkd kdkk kkdd kkdk kkkd kkkk",
            new CombinationsGenerator([
                { chars: ["d", "k"], length: 3 },
                { chars: ["d", "k"], length: 4 },
            ]).getShuffledCombinationsAsString(),
        ],
    },
    "3": {
        name: "Lesson 3: S and L Keys",
        lines: [
            // "ss ss ss ss ss ss",
            // "ll ll ll ll ll ll",
            // "ss ll ss ll ss ll",
            // "ls ls ls ls ls ls",
            // "sl sl sl sl sl sl",
            // "sss ssl sls sll lss lsl lls lll",
            // "ssss sssl ssls ssll slsl slss slls slll lsss lssl lsls lsll llss llsl llls llll",
            new CombinationsGenerator([
                { chars: ["s", "l"], length: 3 },
                { chars: ["s", "l"], length: 4 },
                { chars: ["s", "l"], length: 5 },
                { chars: ["s", "l"], length: 6 },
            ]).getShuffledCombinationsAsString(),
        ],
    },
    "4": {
        name: "Lesson 4: A and ; Keys",
        lines: [
            "aa aa aa aa aa aa",
            ";; ;; ;; ;; ;; ;;",
            "aa ;; aa ;; aa ;;",
            ";a ;a ;a ;a ;a ;a",
            "a; a; a; a; a; a;",
            "aaa aa; a;a a;; ;aa ;a; ;;a ;;;",
            "aaaa aaa; aa;a aa;; a;a; a;;a a;;; ;aaa ;aa; ;a;a ;a;; ;;aa ;;a; ;;;a ;;;;",
            new CombinationsGenerator([
                { chars: ["a", ";"], length: 3 },
                { chars: ["a", ";"], length: 4 },
            ]).getShuffledCombinationsAsString(),
        ],
    },
    "5": {
        name: "Lesson 5: Home Row Review",
        lines: [
            "jf jf jf dk dk sl sl ;a ;a",
            "fd fd jk jk sa sa l; l;",
            "as df jk ;l fj dk sa ;l",
            "fj kd ls a; fj dk sl a;",
            "jf kd sl ;a fj dk sa l;",
        ],
    },
};

export default lessons;
