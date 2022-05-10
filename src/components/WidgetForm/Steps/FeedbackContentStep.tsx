import { ArrowLeft, Camera } from "phosphor-react";
import { FormEvent, useState } from "react";
import { FeedBackType, feedBackTypes } from "..";
import { api } from "../../../lib/api";
import { CloseButton } from "../../CloseButton";
import { Loading } from "../../Loading";
import { ScreenshotButton } from "../SreenshotButton";

interface FeedbackContentProps {
    feedbackType: FeedBackType
    onFeedbackRestartRequested: () => void
    onFeedBackSent: () => void
}

export function FeedbackContentStep({ feedbackType, onFeedbackRestartRequested, onFeedBackSent }: FeedbackContentProps) {
    const feedBackTypeInfo = feedBackTypes[feedbackType]
    const [screenshot, setScreenshot] = useState<string | null>(null)
    const [comment, setComment] = useState('')
    const [isSendingFeedback, setIsSendingFeedback] = useState(false)

    function handleSubmitFeedback(event: FormEvent) {
        event.preventDefault()
        setIsSendingFeedback(true)
        
        api.post('/feedbacks', {
            type: feedbackType,
            comment,
            screenshot
        })
            .then(onFeedBackSent)
            .catch(error => console.log('Error send feedback', error))
            .finally(() => setIsSendingFeedback(false))
    }

    return (
        <>
            <header>
                <button className="top-5 left-5 text-zinc-400 absolute hover:text-zinc-100"
                    onClick={onFeedbackRestartRequested}
                >
                    <ArrowLeft weight="bold" className="w-4 h-4" />
                </button>
                <span className="text-xl leading-6 flex items-center gap-2">
                    <img src={feedBackTypeInfo.image.source} alt={feedBackTypeInfo.image.alt} className="w-6 h-6" />
                    {feedBackTypeInfo.title}
                </span>
                <CloseButton />
            </header>

            <form onSubmit={handleSubmitFeedback} className="my-4 w-full">
                <textarea className="min-w-[304px] w-full min-h-[112px] text-sm placeholder-zinc-400 text-zinc-400 bg-zinc-600 bg-transparent rounded-md focus:border-brand-500 focus:ring-brand-500 focus:ring-1 resize-none focus:outline-none scrollbar scrollbar-thumb-zinc-700 scrollbar-track-transparent scrollbar-thin"
                    placeholder="Conte com detalhes o que está acontecendo!"
                    onChange={event => setComment(event.target.value)}
                ></textarea>
                <footer className="flex gap-2 mt-2">
                    <ScreenshotButton
                        screenshot={screenshot}
                        onScreenshotTook={setScreenshot}
                    />
                    <button
                        type="submit"
                        disabled={comment.length == 0 || isSendingFeedback}
                        className="p-2 bg-brand-500 rounded-md border-transparent flex-1 flex justify-center items-center text-sm hover:bg-brand-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-900 focus:ring-brand-500 transition-colors disabled:opacity-50 disabled:hover:bg-brand-500"
                    >
                        {
                            isSendingFeedback
                                ? <Loading />
                                : 'Enviar Feedback'
                        }

                    </button>
                </footer>
            </form>
        </>

    )
}