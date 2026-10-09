exports.generateResponse = async (

    question,

    analytics

)=>{

    const q=question.toLowerCase();

    if(q.includes("weak")){

        return `Your weak topics are ${
            analytics.weaknesses.join(", ")
        }. Practice these first.`;
    }

    if(q.includes("strong")){

        return `Your strongest topics are ${
            analytics.strengths.join(", ")
        }.`;

    }

    if(q.includes("score")){

        return `Based on your current performance you can score around ${
            analytics.learningCoach?.estimatedNextScore || 90
        }% next time.`;

    }

    if(q.includes("study")){

        return `Study ${
            analytics.learningCoach?.recommendedStudyTime || 30
        } minutes daily.`;

    }

    return "Keep learning consistently. You're improving every day 🚀";

};