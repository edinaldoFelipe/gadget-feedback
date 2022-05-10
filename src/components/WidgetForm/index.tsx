import bugImageUrl from '../../assets/bug.svg';
import ideaImageUrl from '../../assets/idea.svg';
import thoughtImageUrl from '../../assets/thought.svg';
import { useState } from "react";
import { FeedbackTypeStep } from "./Steps/FeedbackTypeStep";
import { FeedbackContentStep } from "./Steps/FeedbackContentStep";
import { FeedbackSuccessStep } from './Steps/FeedbackSuccessStep';

export const feedBackTypes = {
    BUG: {
        title: 'Problema',
        image: {
            source: bugImageUrl,
            alt: 'Imagem de inseto'
        }
    },
    IDEA: {
        title: 'Idéia',
        image: {
            source: ideaImageUrl,
            alt: 'Imagem de lâmpada'
        }
    },
    OTHER: {
        title: 'Outro',
        image: {
            source: thoughtImageUrl,
            alt: 'Imagem de pensamento'
        }
    }
}

export type FeedBackType = keyof typeof feedBackTypes;

export function WidgetForm() {
    const [feedBackType, setFeedBackType] = useState<FeedBackType | null>(null)
    const [feeebackSent, setFeedBackSent] = useState(false)

    function handleRestartFeedback() {
        setFeedBackSent(false)
        setFeedBackType(null)
    }

    return (
        <div className="bg-zinc-900 p-4 relative rounded-2xl mb-4 flex flex-col items-center shadow-lg w-[calc(100vw-2rem)] md:w-auto">
            {feeebackSent ? (
                <FeedbackSuccessStep onFeedbackRestartRequested={handleRestartFeedback}/>
            ) : (
                <>
                    {!feedBackType ? (
                        <FeedbackTypeStep onFeedbackTypeChanged={setFeedBackType} />
                    ) : (
                        <FeedbackContentStep
                            feedbackType={feedBackType}
                            onFeedbackRestartRequested={handleRestartFeedback}
                            onFeedBackSent={() => setFeedBackSent(true)}
                        />
                    )}
                </>
            )

            }

            <footer>
                Smart Tecnologia Corporation
            </footer>
        </div>
    )
}