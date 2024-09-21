"use client";

import React, { useEffect, useState } from "react";
import lessonConfig, { Lesson } from "@/data/lessons";
import TypingTest from "@/components/TypingTest";

const LessonPage = ({ params }: { params: { lessonId: string } }) => {
    const [testsStrings, setTestsString] = useState<Lesson>();
    useEffect(() => {
        const { lessonId } = params;
        setTestsString(lessonConfig[lessonId]);
    }, [params]);

    return testsStrings && <TypingTest testTexts={testsStrings.lines} />;
};

export default LessonPage;
