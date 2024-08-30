"use client";

import React from "react";
import lessonConfig from "@/data/lessons";
import TypingTest from "@/components/TypingTest";

const LessonPage = ({ params }: { params: { lessonId: string } }) => {
    const { lessonId } = params;

    return (
        <div>
            <h1>{lessonConfig[lessonId].name}</h1>
            <TypingTest testTexts={lessonConfig[lessonId].lines} />
        </div>
    );
};

export default LessonPage;
